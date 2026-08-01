import { jsPDF } from 'jspdf';
import { ReportData } from './types';
import { SectionRenderer } from './SectionRenderer';
import { loadUnicodeFonts } from './fontLoader';

export class ReportGenerator {
  /**
   * Generates a complete multi-page PDF document.
   * Employs a two-pass architecture to dynamically compute total pages and stamp headers/footers.
   */
  public static async generateReport(data: ReportData): Promise<jsPDF> {
    // 1. Initialize jsPDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16
    });

    // Load Unicode fonts dynamically
    const fontsLoaded = await loadUnicodeFonts(doc);
    const fontName = fontsLoaded ? 'Roboto' : 'helvetica';
    doc.setFont(fontName, 'normal');

    // 2. Render Page Sections
    // Page 1: Cover Page
    SectionRenderer.drawCoverPage(doc, data, fontName);

    // Page 2: Table of Contents
    doc.addPage();
    SectionRenderer.drawTableOfContents(doc, fontName);

    // Page 3: Executive Summary
    doc.addPage();
    SectionRenderer.drawExecutiveSummary(doc, data, fontName);

    // Page 4: Company Profile
    doc.addPage();
    SectionRenderer.drawCompanyInfo(doc, data, fontName);

    // Page 5: Operational KPIs
    doc.addPage();
    SectionRenderer.drawOperationalData(doc, data, fontName);

    // Page 6: Lean Assessment & Radar Chart
    doc.addPage();
    SectionRenderer.drawLeanAssessment(doc, data, fontName);

    // Page 7: Saha Gözlemleri (Observations) - can expand dynamically
    doc.addPage();
    SectionRenderer.drawObservations(doc, data, fontName);

    // Page 8: Potential Savings & Pie Chart
    doc.addPage();
    SectionRenderer.drawPotentialSavings(doc, data, fontName);

    // Page 9: AI Analysis
    doc.addPage();
    SectionRenderer.drawAiAnalysis(doc, data, fontName);

    // Page 10: Action Plan
    doc.addPage();
    SectionRenderer.drawActionPlan(doc, data, fontName);

    // Page 11: Conclusion and Sign-off
    doc.addPage();
    SectionRenderer.drawConclusion(doc, data, fontName);

    // 3. Post-render pass: Inject headers, footers, and dynamic page numbering!
    const totalPages = doc.getNumberOfPages();
    const rDate = new Date().toLocaleDateString('tr-TR');
    
    // Format company name cleanly
    let companyName = data.company.companyName || 'Gemba Danışmanlık';
    if (companyName.length > 25) {
      companyName = companyName.substring(0, 22) + '...';
    }

    for (let i = 2; i <= totalPages; i++) {
      doc.setPage(i);

      // --- HEADER ---
      // Thin slate line
      doc.setDrawColor('#E2E8F0');
      doc.setLineWidth(0.2);
      doc.line(15, 15, 195, 15);

      // Header Text
      doc.setFont(fontName, 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor('#94A3B8');
      doc.text('GEMBA SAHA ANALİZ VE OPERASYONEL ROI RAPORU', 15, 12);
      
      doc.setTextColor('#10B981'); // Accent green
      doc.text('GEMBA PARTNER AI', 195, 12, { align: 'right' });

      // --- FOOTER ---
      // Thin slate line
      doc.setDrawColor('#E2E8F0');
      doc.setLineWidth(0.2);
      doc.line(15, 280, 195, 280);

      // Footer metadata (Company Name & Date)
      doc.setFont(fontName, 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor('#64748B');
      doc.text(`Firma: ${companyName.toUpperCase()}   •   Rapor Tarihi: ${rDate}`, 15, 285);

      // Page Numbering
      doc.setFont(fontName, 'bold');
      doc.setTextColor('#475569');
      doc.text(`Sayfa ${i} / ${totalPages}`, 195, 285, { align: 'right' });
    }

    return doc;
  }
}
