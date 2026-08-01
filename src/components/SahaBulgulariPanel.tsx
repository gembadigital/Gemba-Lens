import React, { useState, useRef } from 'react';
import { 
  Camera, Plus, Trash2, AlertCircle, FileText, Image, 
  Layers, Star, CheckCircle, Upload, Sparkles 
} from 'lucide-react';
import { Observation, GembaDB } from '../db';

interface SahaBulgulariPanelProps {
  companyId: string;
}

export default function SahaBulgulariPanel({ companyId }: SahaBulgulariPanelProps) {
  const [observations, setObservations] = useState<Observation[]>(() => 
    GembaDB.getObservations(companyId)
  );

  // Form states
  const [category, setCategory] = useState('SMED / Hızlı Kurulum');
  const [finding, setFinding] = useState('');
  const [improvement, setImprovement] = useState('');
  const [priority, setPriority] = useState('Orta');
  const [impact, setImpact] = useState('Orta');
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync observations when companyId changes
  React.useEffect(() => {
    setObservations(GembaDB.getObservations(companyId));
  }, [companyId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!finding.trim()) return;

    GembaDB.addObservation(
      companyId,
      category,
      finding,
      improvement,
      priority,
      impact,
      photo
    );

    // Reset and sync
    setFinding('');
    setImprovement('');
    setPhoto(undefined);
    setIsFormOpen(false);
    setObservations(GembaDB.getObservations(companyId));
  };

  const handleDeleteObservation = (obsId: string) => {
    if (confirm('Bu saha gözlemini silmek istediğinizden emin misiniz?')) {
      GembaDB.deleteObservation(obsId);
      setObservations(GembaDB.getObservations(companyId));
    }
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'Kritik': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Yüksek': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Orta': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getImpactColor = (i: string) => {
    switch (i) {
      case 'Yüksek': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Orta': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const categories = [
    'SMED / Hızlı Kurulum',
    '5S ve Görsel Yönetim',
    'Otonom Bakım (TPM)',
    'Hata Önleme (Poka-Yoke)',
    'Standart İş ve İş Gücü',
    'Kapasite / Darboğaz Çözümü',
    'İş Güvenliği (İSG)',
    'Çevresel Atık / Hurda',
    'Lojistik / Malzeme Akışı',
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 space-y-6 no-print" id="saha-bulgulari-yonetim-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-100">
        <div>
          <h4 className="font-display font-black text-xs uppercase tracking-widest text-slate-900 flex items-center gap-2">
            <Camera className="w-5 h-5 text-red-600" />
            V. SAHA BULGULARI VE GÖZLEM MATRİSİ
          </h4>
          <p className="text-[11px] text-slate-500 font-semibold mt-1">
            Saha incelemesi sırasında yakalanan görsel bulgular ve önerilen iyileştirme aksiyonları
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[11px] px-3.5 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          YENİ BULGU EKLE
        </button>
      </div>

      {/* Observation Form */}
      {isFormOpen && (
        <form onSubmit={handleAddObservation} className="bg-stone-50/50 rounded-2xl border border-slate-200 p-5 space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Bulgu Kategorisi</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold bg-white text-slate-800"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Öncelik Derecesi</label>
              <div className="flex gap-2">
                {['Düşük', 'Orta', 'Yüksek', 'Kritik'].map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`flex-1 text-[10px] font-bold py-1.5 px-2 rounded-lg border transition-all cursor-pointer ${
                      priority === p ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Finansal/Operasyonel Etki</label>
              <div className="flex gap-2">
                {['Düşük', 'Orta', 'Yüksek'].map(i => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImpact(i)}
                    className={`flex-1 text-[10px] font-bold py-1.5 px-2 rounded-lg border transition-all cursor-pointer ${
                      impact === i ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Saha Bulgusu ve Tespit (Finding)</label>
              <textarea
                value={finding}
                onChange={e => setFinding(e.target.value)}
                required
                placeholder="Sahada gözlemlenen problemi, israfı veya verimsizliği detaylıca yazın..."
                rows={3}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-600 bg-white text-slate-850 font-medium leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Önerilen İyileştirme Aksiyonu (Improvement)</label>
              <textarea
                value={improvement}
                onChange={e => setImprovement(e.target.value)}
                placeholder="Önerilen yalın çözümü, uygulanacak metodolojiyi ve aksiyonu tanımlayın..."
                rows={3}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-600 bg-white text-slate-850 font-medium leading-relaxed"
              />
            </div>
          </div>

          {/* Photo upload field supporting Drag & Drop */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Görsel Kanıt / Saha Fotoğrafı</label>
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                isDragActive ? 'border-red-500 bg-red-50/20' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              {photo ? (
                <div className="relative group max-w-[200px]">
                  <img src={photo} alt="Bulgu kanıtı" className="rounded-lg max-h-32 object-contain" />
                  <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white text-[9px] font-bold">Fotoğrafı Değiştir</span>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="w-5 h-5 text-slate-400" />
                  <p className="text-[10px] text-slate-500 font-semibold">
                    Fotoğrafı buraya <span className="text-red-600">sürükleyip bırakın</span> veya <span className="text-red-600">tıklayarak yükleyin</span>
                  </p>
                  <p className="text-[9px] text-slate-400">PNG, JPG, JPEG (Maks 3MB)</p>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              Kaydet ve Ekle
            </button>
          </div>
        </form>
      )}

      {/* Observations list */}
      <div className="space-y-4">
        {observations.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-slate-200 rounded-2xl bg-slate-50/40">
            <AlertCircle className="w-8 h-8 text-slate-350 mx-auto mb-2" />
            <h5 className="font-bold text-xs text-slate-700">Henüz Saha Bulgusu Girilmedi</h5>
            <p className="text-[10px] text-slate-400 max-w-[280px] mx-auto mt-1 font-medium">
              Saha turunuz sırasında tespit ettiğiniz verimsizlikleri ve fırsatları üstteki butona basarak ekleyin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {observations.map(obs => (
              <div key={obs.observationId} className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-all flex gap-4 p-4 relative group border-l-4 border-l-red-500">
                
                {/* Photo container if exists */}
                {obs.photo && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 shrink-0">
                    <img src={obs.photo} alt={obs.category} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 truncate uppercase">
                      {obs.category}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${getPriorityColor(obs.priority)}`}>
                      P: {obs.priority}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${getImpactColor(obs.impact)}`}>
                      E: {obs.impact}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-slate-800 font-extrabold leading-snug">
                      Bulgu: <span className="font-medium text-slate-600">{obs.finding}</span>
                    </p>
                    {obs.improvement && (
                      <p className="text-xs text-emerald-800 font-extrabold leading-snug flex items-start gap-1">
                        <span>Çözüm:</span>
                        <span className="font-semibold text-slate-650">{obs.improvement}</span>
                      </p>
                    )}
                  </div>

                  <span className="text-[8px] font-mono text-slate-400 block mt-1">
                    Kayıt: {new Date(obs.createdDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleDeleteObservation(obs.observationId)}
                  className="absolute top-3 right-3 p-1.5 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer border border-slate-100"
                  title="Saha Bulgusunu Sil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
