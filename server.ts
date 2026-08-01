import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3001;

  app.use(express.json());

  // Helper for calling Gemini with retry and fallback across multiple models
  async function callGeminiDynamic(ai: GoogleGenAI, systemInstruction: string, contents: any[]): Promise<string> {
    const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"];
    let lastError: any = null;

    for (const model of models) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          console.log(`[Gemba AI / Gemini] Trying Model: ${model}, Attempt: ${attempt}`);
          const response = await ai.models.generateContent({
            model: model,
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.1,
            },
          });
          if (response && response.text) {
            console.log(`[Gemba AI / Gemini] Success using model ${model}`);
            return response.text;
          }
        } catch (err: any) {
          lastError = err;
          console.warn(`[Gemba AI / Gemini] Warning: Model ${model} failed on attempt ${attempt}:`, err.message || err);
          // Small pause before retry
          await new Promise((resolve) => setTimeout(resolve, 150));
        }
      }
    }
    throw lastError || new Error("All tried models and attempts failed.");
  }

  // API Route for Gemini Chat Q&A Interaction with robust fallback
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const {
        messages,
        sector = "Genel İmalat",
        urunGrubu = "Metal ve Plastik Şekillendirme",
        turnoverLira = "150.000.000",
        copqRate = "10.0",
        oee = "58",
        currency = "TRY",
        currencySymbol = "₺"
      } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages array." });
      }

      const lastUserMessageObj = messages.filter(m => m.role === 'user').pop();
      const lastUserMessage = lastUserMessageObj ? lastUserMessageObj.content : "";
      const isReportRequest = !lastUserMessage || 
        lastUserMessage.toLowerCase().includes("rapora") || 
        lastUserMessage.toLowerCase().includes("analiz") || 
        lastUserMessage.toLowerCase().includes("başla") || 
        lastUserMessage.toLowerCase().includes("hesapla") ||
        messages.length <= 2;

      // 1. Try to call Gemini API
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey: apiKey,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              }
            }
          });

          const systemInstruction = `GEMBA AI SALES COACH – SYSTEM ROLE & CONVERSATIONAL BUSINESS LOGIC

Sen, Gemba Partner'ın kıdemli OPEX Sales Director, Cost Control Advisor ve Operational Excellence Coach rolündeki yapay zeka danışmanı ve satış kapanış koçusun (Gemba AI Sales Coach).

Sen sadece statik bir metin üreticisi değilsin; dinamik, son derece zeki, ikna edici ve veriye dayalı bir İLETİŞİMCİ CHATBOT'sun.

TEMEL ROL VE İLETİŞİM DİNAMİĞİ:
1. RAPOR İSTENDİĞİNDE ("rapor oluştur", "analiz et", "başla" veya ilk analizde):
   Sistemdeki 4 temel sütunu değerlendirip satışı kapatacak şekilde kapsamlı rapor üretirsin:
   - ① Fabrika Assessment Olgunluk Seviyesi (Level 1-5 & Teknik Disiplin Skoru)
   - ② Ürün Maliyet Dağılımı (Direkt İşçilik, Hammadde, Enerji, Genel Üretim Giderleri)
   - ③ Cost of Poor Quality (COPQ) Kayıpları (Duruşlar, Hurda, Kalite/Tamir, Mesai, Verimsizlik, Kapasite)
   - ④ OPEX Çalışmaları & Geri Kazanım Potansiyeli (Paket 01-04 danışmanlık bütçeleri, TL/USD/EUR kazanım & ROI)
   Bu 4 sütunu harmanlayarak KESİNLİKLE aşağıdaki 9 başlık altında satışı kapatacak güçlü C-Level satış cümlelerine dönüştürürsün.

2. KULLANICI SORU VEYA İTİRAZ SORDUĞUNDA (İnteraktif Chatbot Modu):
   Kullanıcının her türlü sorusuna, fiyat itirazına, bütçe tereddüdüne veya teknik açıklama talebine kıdemli bir OPEX Satış Direktörü gibi veriye ve finansal mantığa dayalı ikna edici cevap verirsin.
   - İtirazları doğrudan finansal ROI, adam-gün verimliliği ve risk azaltma argümanlarıyla çözersin.
   - Danışmanlığın en büyük çıktısını "müşterinin kendi bünyesinde sürdürülebilir Kaizen yetkinliği kazandırmak" olarak vurgularsın.
   - Cevaplarını kısa, etkili, yönetici seviyesinde ve aksiyona yönlendirici tutarsın.

MÜŞTERİ / FABRİKA VERİ SETİ:
- Sektör / Ürün Grubu: ${sector} / ${urunGrubu}
- Yıllık Ciro: ${currencySymbol} ${turnoverLira}
- COPQ Oranı: %${copqRate}
- Mevcut OEE: %${oee}
- Para Birimi: ${currency} (${currencySymbol})

RAPOR OLUŞTURMA İSTEKLERİ İÇİN ZORUNLU 9 BAŞLIKLI FORMAT:

EXECUTIVE SALES INSIGHT
[Fabrika Assessment seviyesi, Ürün Maliyet yapısı, COPQ kayıpları ve OPEX kazanımlarını özetleyen 2-4 cümlelik satışı kapatıcı yönetici özeti]

--------------------------------------------------

1. CURRENT LOSS PICTURE
- Toplam Ciro: ${currencySymbol} ${turnoverLira}
- Tespit Edilen Yıllık Kayıp: ${currencySymbol} [Hesaplanan Toplam Kayıp]
- Kayıp / Ciro Oranı: %[Hesaplanan Oran]
- COPQ Havuzu: ${currencySymbol} [COPQ Havuzu]

--------------------------------------------------

2. RECOVERY POTENTIAL
- Minimum Potential: ${currencySymbol} [Min Potansiyel]
- Expected Potential: ${currencySymbol} [Beklenen Potansiyel]
- Maximum Potential: ${currencySymbol} [Max Potansiyel]

--------------------------------------------------

3. PHASE 1 – QUICK WINS (HIZLI İYİLEŞTİRMELER)
- Önerilen Çalışmalar: 5S & Standart İş, SMED Setup Kısaltma, Görsel Yönetim, OEE İyileştirme, Temel Kaizen.
- Tahmini Potansiyel Geri Kazanım: ${currencySymbol} [Faz 1 Potansiyel]
- Tahmini Danışmanlık Süresi: [Faz 1 Adam/Gün] Adam-gün

--------------------------------------------------

4. PHASE 2 – STRATEGIC / INVESTMENT IMPROVEMENTS
- Önerilen Çalışmalar: VSM Akış Yenileme, Otomasyon, Layout Değişikliği, Dijital OEE & Poka-Yoke, Üretim Sistemi Dönüşümü.
- Tahmini Potansiyel Geri Kazanım: ${currencySymbol} [Faz 2 Potansiyel]
- Tahmini Yatırım İhtiyacı: [Süreç / Ekipman Odaklı Yatırım]

--------------------------------------------------

5. RECOMMENDED CONSULTING PACKAGE (PRIMARY RECOMMENDATION)
- Paket Adı: [Önerilen Danışmanlık Programı]
- Danışmanlık Süresi: [Adam/Gün] Adam-gün
- Danışmanlık Proje Bütçesi: ${currencySymbol} [Proje Bütçesi]
- Potansiyel Yıllık Geri Kazanım: ${currencySymbol} [Min Kazanç] - ${currencySymbol} [Max Kazanç]
- Potansiyel ROI Oranı: [Min ROI]x – [Max ROI]x
- Ana Gerekçe & Çarpan Etkisi: [Gerekçe açıklaması]

--------------------------------------------------

6. SECOND OPTION (ALTERNATIVE PACKAGE)
- Paket Adı: [Alternatif Program]
- Danışmanlık Süresi: [Adam/Gün] Adam-gün
- Danışmanlık Proje Bütçesi: ${currencySymbol} [Proje Bütçesi]
- Potansiyel Yıllık Geri Kazanım: ${currencySymbol} [Min Kazanç] - ${currencySymbol} [Max Kazanç]
- Potansiyel ROI Oranı: [Min ROI]x – [Max ROI]x

--------------------------------------------------

7. CAPABILITY BUILDING (İÇ YETKİNLİK DÖNÜŞÜMÜ)
- Müşteri Ekibinde Oluşturulacak Yetkinlikler: Kaizen Liderleri, A3 Problem Çözme Yetkinliği, Günlük Yönetim Disiplini, Standart İş Kültürü.
- Stratejik Hedef: "Sürdürülebilir Kaizen ve Kendi Kendine Yeten Operasyonel Mükemmellik Organizasyonu."

--------------------------------------------------

8. SALES MESSAGE (SATAYI KAPATACAK GÜÇLÜ SATIŞ CÜMLELERİ)
- [Assessment seviyesi ve ürün maliyetlerinden türetilmiş 1. satış cümlesi]
- [COPQ kayıplarından ve geri kazanımdan türetilmiş 2. finansal satış cümlesi]
- [İç yetkinlik ve Kaizen dönüşümünü ön plana çıkaran 3. satış cümlesi]

--------------------------------------------------

9. RECOMMENDED NEXT STEP
- [Müşterinin sözleşmeyi imzalamasını kolaylaştıracak tek bir sonraki adım önerisi]`;

          const contentsFormat = messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          }));

          const responseText = await callGeminiDynamic(ai, systemInstruction, contentsFormat);
          return res.json({ response: responseText });
        } catch (apiError: any) {
          console.warn("[Gemini Route] Gemini API calls failed, launching resilient deterministic fallback. Error detail:", apiError.message || apiError);
        }
      } else {
        console.warn("[Gemini Route] GEMINI_API_KEY is not defined. Using localized analytical fallback.");
      }

      // 2. Deterministic Fallback if API key missing or APIs failed (OOS / 503)
      const parsedTurnover = Number(turnoverLira.toString().replace(/\./g, '')) || 150000000;
      if (isReportRequest) {
        const fallBackReport = generateDeterministicReport(sector, urunGrubu, parsedTurnover, currencySymbol);
        return res.json({ response: fallBackReport });
      } else {
        const fallBackChat = getDeterministicChatResponse(lastUserMessage);
        return res.json({ response: fallBackChat });
      }
    } catch (routeErr: any) {
      console.error("[Gemini Route] Serious fallback error:", routeErr);
      return res.status(500).json({ error: routeErr.message || "Bir iç sunucu hatası oluştu." });
    }
  });

  // Local helper generators for programmatic resilience
  function generateDeterministicReport(sec: string, prod: string, turnoverVal: number, currSym: string): string {
    const copqPool = Math.round(turnoverVal * 0.10);
    const op1Min = Math.round(copqPool * 0.05);
    const op1Max = Math.round(copqPool * 0.08);
    const op2Min = Math.round(copqPool * 0.10);
    const op2Max = Math.round(copqPool * 0.15);
    const op3Min = Math.round(copqPool * 0.17);
    const op3Max = Math.round(copqPool * 0.25);
    const op4Min = Math.round(copqPool * 0.20);
    const op4Max = Math.round(copqPool * 0.30);

    const budgetOp1 = 1560000;
    const budgetOp2 = 2808000;

    return `EXECUTIVE SALES INSIGHT
${sec} sektöründeki tesisinizde yapılan ön analizde, yıllık cironuzun yaklaşık %10'u seviyesinde (${currSym}${copqPool.toLocaleString('tr-TR')}) doğrudan adreslenebilir kalitesizlik ve verimsizlik kayıp havuzu tespit edilmiştir. Önerimiz bu kaybın tamamını hedeflemek yerine, Faz 1 kapsamında düşük yatırımla geri kazanılabilecek ${currSym}${op2Min.toLocaleString('tr-TR')} - ${currSym}${op2Max.toLocaleString('tr-TR')} aralığını ilk 104 adam-günlük programla sistematik olarak kâra dönüştürmektir.

--------------------------------------------------

1. CURRENT LOSS PICTURE
- Toplam Ciro: ${currSym}${turnoverVal.toLocaleString('tr-TR')}
- Tespit Edilen Yıllık Kayıp: ${currSym}${copqPool.toLocaleString('tr-TR')}
- Kayıp / Ciro Oranı: %10.0
- COPQ Havuzu: ${currSym}${copqPool.toLocaleString('tr-TR')}

--------------------------------------------------

2. RECOVERY POTENTIAL
- Minimum Potential: ${currSym}${op1Min.toLocaleString('tr-TR')} (%5 Kayıp Azaltımı)
- Expected Potential: ${currSym}${op2Min.toLocaleString('tr-TR')} (%10 Kayıp Azaltımı)
- Maximum Potential: ${currSym}${op4Max.toLocaleString('tr-TR')} (%30 Kayıp Azaltımı)

--------------------------------------------------

3. PHASE 1 – QUICK WINS (HIZLI İYİLEŞTİRMELER)
- Önerilen Çalışmalar: 5S Saha Düzeni, SMED Model Değişimi, Görsel Yönetim, Standart İş Talimatları, Temel Kaizen.
- Tahmini Potansiyel Geri Kazanım: ${currSym}${op1Min.toLocaleString('tr-TR')} - ${currSym}${op1Max.toLocaleString('tr-TR')} / yıl
- Tahmini Danışmanlık Süresi: 52 Adam-gün (1 gün/hafta)

--------------------------------------------------

4. PHASE 2 – STRATEGIC / INVESTMENT IMPROVEMENTS
- Önerilen Çalışmalar: Değer Akış Haritalama (VSM), Sürekli Akış Hücre Tasarımı, Hat Dengeleme, Otomasyon & Dijital OEE.
- Tahmini Potansiyel Geri Kazanım: ${currSym}${op2Min.toLocaleString('tr-TR')} - ${currSym}${op4Max.toLocaleString('tr-TR')} / yıl
- Tahmini Yatırım İhtiyacı: Süreç Standartlaştırma & Düşük Ekipman Yatırımı

--------------------------------------------------

5. RECOMMENDED CONSULTING PACKAGE (PRIMARY RECOMMENDATION)
- Paket Adı: PROGRAM 02 — Hızlandırılmış Dönüşüm Programı
- Danışmanlık Süresi: 104 Adam-gün (2 gün/hafta)
- Danışmanlık Proje Bütçesi: ${currSym}${budgetOp2.toLocaleString('tr-TR')}
- Potansiyel Yıllık Geri Kazanım: ${currSym}${op2Min.toLocaleString('tr-TR')} - ${currSym}${op2Max.toLocaleString('tr-TR')} / yıl
- Potansiyel ROI Oranı: ${(op2Min / budgetOp2).toFixed(1)}x – ${(op2Max / budgetOp2).toFixed(1)}x
- Ana Gerekçe & Çarpan Etkisi: 2 gün/haftalık sahada aktif danışmanlık rehberliği, SMED ile açığa çıkan kapasitenin ciroya dönüşmesini ve ekibin kendi Kaizenlerini yapmasını garanti eder.

--------------------------------------------------

6. SECOND OPTION (ALTERNATIVE PACKAGE)
- Paket Adı: PROGRAM 01 — Standart Gelişim Programı
- Danışmanlık Süresi: 52 Adam-gün (1 gün/hafta)
- Danışmanlık Proje Bütçesi: ${currSym}${budgetOp1.toLocaleString('tr-TR')}
- Potansiyel Yıllık Geri Kazanım: ${currSym}${op1Min.toLocaleString('tr-TR')} - ${currSym}${op1Max.toLocaleString('tr-TR')} / yıl
- Potansiyel ROI Oranı: ${(op1Min / budgetOp1).toFixed(1)}x – ${(op1Max / budgetOp1).toFixed(1)}x

--------------------------------------------------

7. CAPABILITY BUILDING (İÇ YETKİNLİK DÖNÜŞÜMÜ)
- Müşteri Ekibinde Oluşturulacak Yetkinlikler: Kaizen Liderleri, A3 Problem Çözme Yetkinliği, Günlük Yönetim Disiplini, Standart İş Kültürü.
- Stratejik Hedef: "Danışmanlık bittiğinde kendi kayıplarını kendisi bulup çözen sürdürülebilir bir operasyonel mükemmellik organizasyonu."

--------------------------------------------------

8. SALES MESSAGE (C-LEVEL SATIŞ CÜMLELERİ)
- "Bugün tesisinizde yaklaşık ${currSym}${copqPool.toLocaleString('tr-TR')} seviyesinde görünür bir kayıp havuzu bulunuyor. Amacımız bunun tamamını değil, ilk fazda düşük yatırımla geri kazanılacak ${currSym}${op2Min.toLocaleString('tr-TR')}'lik bölümünü kâra dönüştürmektir."
- "Bu çalışma sadece dışarıdan yapılan bir Lean projesi değil; şirketinizin kendi içinde sürekli iyileştirme yapabilecek insan kaynağını yetiştirme dönüşümüdür."
- "104 adam-günlük çalışma yalnızca danışmanlık süresi değildir; daha fazla problem alanına girip ekibinizin problem çözme sistemini sahiplenmesini sağlar."

--------------------------------------------------

9. RECOMMENDED NEXT STEP
- "2 günlük Gemba Loss Assessment ile mevcut kayıp havuzunun sahadaki finansal doğrulamasını yapalım ve 30-60-90 günlük ilk hızlı geri kazanım planını çıkaralım."`;
  }

  function getDeterministicChatResponse(userMsg: string): string {
    const msg = userMsg.toLowerCase();
    
    if (msg.includes("smed") || msg.includes("model") || msg.includes("kalıp") || msg.includes("setup")) {
      return `### SMED (Single-Minute Exchange of Die) - Hızlı Kalıp Değişimi Metodolojisi

SMED, Shigeo Shingo tarafından geliştirilen ve model değişim (setup) sürelerini tek haneli dakikalara (<10 dk) indirmeyi amaçlayan en kritik yalın üretim aracıdır.

**Temel Uygulama Adımları:**
1. **Mevcut Durum Analizi:** Model değişimi sürecinin baştan sona video kaydına alınması ve tüm adımların saniye saniye listelenmesi.
2. **İç (Internal) ve Dış (External) Kurulumların Ayrıştırılması:**
   * **İç Kurulumlar:** Sadece makine dururken yapılabilecek işlemler (örn: kalıbın sökülmesi/takılması).
   * **Dış Kurulumlar:** Makine çalışırken (üretim yaparken) önceden veya sonradan yapılabilecek işlemler (örn: yeni kalıbın ısıtılması, el aletlerinin hazırlanması).
3. **İç Kurulumların Dış Kurulumlara Dönüştürülmesi:** Aparatlar geliştirilerek iç adımların dışarıda yapılması sağlanır.
4. **Tüm Kurulum Adımlarının Standartlaştırılması ve Sürenin Kısaltılması:** Cıvatalar yerine hızlı kelepçeler kullanılması, tek anahtar kuralı, eş zamanlı çalışma kuralları.

**Kazandıracağı Avantajlar:**
* Setup sürelerinde %50 ila %80 oranında net kısalma.
* Küçük partiler halinde üretebilme esnekliği (STOK azaltımı).
* OEE (Kullanılabilirlik) oranlarında doğrudan %5-10 arası artış.`;
    }
    
    if (msg.includes("5s") || msg.includes("temizlik") || msg.includes("düzen") || msg.includes("seiri")) {
      return `### 5S İş Yeri Organizasyonu ve Disiplini

5S, sahada israfı görünür kılan, iş güvenliğini (İSG) artıran ve operasyonel kararlılığın temelini atan yapısal bir yalın yönetim metodolojisidir.

**5S Adımları:**
1. **Seiri (Ayıkla):** Sadece ihtiyaç duyulan malzemelerin sahada kalması, gereksiz her şeyin (arızalı parça, atık, eski evrak) sahadan kırmızı etiket ile uzaklaştırılması.
2. **Seiton (Düzenle):** "Her şeye bir yer ve her şey yerli yerinde." Alet panoları, gölge panoları, zemin çizgileri ile arama kayıplarını sıfırlamak.
3. **Seiso (Temizle):** Temizliği bir bakım ve muayene yöntemi olarak kullanmak. Temizlerken kaçakları, çatlakları, arızaları erkenden tespit etmek.
4. **Seiketsu (Standartlaştır):** İlk 3 adımı kalıcı kılacak standartlar, 5S kontrol listeleri ve görsel talimatlar oluşturmak.
5. **Shitsuke (Sürdür / Eğit):** Denetimler, skor takipleri ve ödüllendirme mekanizmaları ile 5S'i bir kültür haline getirmek.

**Hedeflenen Geri Kazanım:**
Mavi yaka arama kayıplarının önlenmesiyle yıllık tescilli işçilik zamanı tasarrufu ve sıfır iş kazası hedefi.`;
    }

    if (msg.includes("tpm") || msg.includes("bakım") || msg.includes("otonom") || msg.includes("maintenance")) {
      return `### TPM (Toplam Verimli Bakım) & Otonom Bakım

TPM, tüm çalışanların (özellikle operatörlerin) katılımıyla sıfır duruş, sıfır hata ve sıfır iş kazası hedefleyen ekipman yönetim sistemidir.

**TPM'in Sütunları ve Otonom Bakım (Autonomous Maintenance):**
* **Otonom Bakım (Jishu Hozen):** Operatörlerin kendi makinelerini sahiplenmesi. Temizlik, yağlama, sıkma ve basit ayar işlemlerini operatörün kendisinin yapması için eğitilmesi.
* **Planlı Bakım:** Koruyucu ve kestirimci bakım teknikleri ile plansız duruşları önlemek.
* **Odaklanmış İyileştirmeler (Kobetsu Kaizen):** Kronik kayıpları çözmek için kurulan çapraz fonksiyonlu ekipler.
* **Eğitim ve Öğretim:** Operatör ve bakım teknisyenlerinin becerilerini çoklu-matrisler ile artırmak.

**OEE Etkisi:**
* TPM uygulamaları makine ve ekipman kaynaklı plansız duruşları minimum %30-40 oranında azaltır.
* Ekipman ömrünü ve ürün kalitesini güvence altına alır.`;
    }

    if (msg.includes("oee") || msg.includes("verim") || msg.includes("ekipman")) {
      return `### OEE (Toplam Ekipman Etkinliği) Hesaplaması ve Geliştirilmesi

OEE (Overall Equipment Effectiveness), bir makinenin veya tüm tesisin üretim potansiyelini ne kadar verimli kullandığını ölçen altın standart değerdir.

$$\\text{OEE} = \\text{Kullanılabilirlik (Availability)} \\times \\text{Performans (Performance)} \\times \\text{Kalite (Quality)}$$

1. **Kullanılabilirlik (Kullanım Oranı):** Planlı sürenin ne kadarında makinenin gerçekten döndüğü. (Setup, arızalar, duraklamalar düşülür)
2. **Performans (Hız Oranı):** Makinenin tasarlanan çevrim hızına kıyasla ne kadar hızla çalıştığı. (Mikro duruşlar, hız kayıpları düşülür)
3. **Kalite (Sağlam Oranı):** Çıkan ürünlerin ne kadarının ilk seferde doğru üretildiği. (Hurda, fire, rework-tamir düşülür)

**Dünya Klasında İmalat (WCM) Hedefi:**
* Kullanılabilirlik: > %90
* Performans: > %95
* Kalite: > %99
* **Dünya Klasında OEE: > %85**

Türkiye'de pek çok geleneksel KOBİ'de OEE verisi %50 - %60 bandındadır. Bu da tesis kapasitesinin neredeyse yarısının israf edildiği anlamına gelir.`;
    }

    if (msg.includes("kaizen") || msg.includes("iyileştirme")) {
      return `### Kaizen (Sürekli İyileştirme) Felsefesi

Kaizen, "daha iyiye doğru değişim" anlamına gelen, büyük bütçeli yatırımlar yerine küçük, sürekli ve düşük maliyetli iyileştirmelerle israfları önlemeyi amaçlayan yaklaşımdır.

**Önce-Sonra Kaizen Adımları:**
1. Problemin sahada net olarak gözlemlenmesi (Gochaku).
2. Kök neden analizi (Örn: 5 Neden Analizi).
3. Karşı tedbirin sahada hızlıca uygulanması.
4. Sonucun ölçülmesi ve başarının standartlaştırılması.
5. Bilginin tüm tesise yaygınlaştırılması (Yokoten).

**Kültürel Boyut:**
Çalışanların fikir sunma ve iyileştirme yapma alışkanlığı kazanması, işletmenin problem çözme kabiliyetini ve çalışan bağlılığını zirveye taşır.`;
    }

    return `### Değerli Gemba Partner Kullanıcısı

Sorduğunuz soru kapsamlı saha dönüşüm konumuzun önemli bir parçasıdır. 
İmalat sahanızda şu an en büyük israf veya dar boğaz kalemini keşfetmek istiyoruz.

Lütfen aşağıdaki konularda derinleşmek için yazın:
- **SMED (Model Değişimi)**: Kalıp değişim sürelerini %50+ nasıl azaltırız?
- **OEE (Verimlilik Değerlendirmesi)**: Tesisinizin gerçek kapasitesini nasıl ölçersiniz?
- **5S (Saha Temizliği & Düzeni)**: Arama kayıplarını ve iş kazası riskini nasıl sıfırlarız?
- **TPM (Otonom Bakım)**: Operatörlerinize makinelerini nasıl sahiplendiririz?
- **Sektörel Kayıp Dağılımını Analiz Etmek**: Eğer üst kısımdaki "Yeniden Analiz Et" butonu ile rapora başlarsak size tesis maliyet kırılımını kuruşu kuruşuna çıkarabilirim!`;
  }

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
