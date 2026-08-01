import { jsPDF } from 'jspdf';

export interface TableColumn {
  header: string;
  width: number; // in mm
  align?: 'left' | 'center' | 'right';
}

export class TableRenderer {
  /**
   * Draws a professional table with auto page-breaking and header repetition.
   * Handles multi-line cells automatically.
   */
  public static drawTable(
    doc: jsPDF,
    columns: TableColumn[],
    rows: any[][],
    startX: number,
    startY: number,
    footerCallback: (doc: jsPDF) => void,
    themeColor: string = '#0F172A',
    headerBgColor: string = '#1E293B',
    zebraColor: string = '#F8FAFC',
    fontName: string = 'Roboto'
  ): number {
    const pageHeight = 297; // mm
    const bottomMargin = 25; // mm
    const topMargin = 25; // mm
    const maxContentHeight = pageHeight - bottomMargin;
    const headerHeight = 9; // mm
    const defaultCellPadding = 2.5; // mm (top & bottom padding total)

    let currentY = startY;

    // Helper to draw the table header
    const drawHeader = (y: number) => {
      doc.setFillColor(headerBgColor);
      
      // Calculate total width of table to draw header background rect
      const totalWidth = columns.reduce((sum, col) => sum + col.width, 0);
      doc.rect(startX, y, totalWidth, headerHeight, 'F');

      doc.setFont(fontName, 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor('#FFFFFF');

      let currentX = startX;
      columns.forEach((col) => {
        const textX = col.align === 'center' 
          ? currentX + col.width / 2 
          : col.align === 'right' 
          ? currentX + col.width - 3 
          : currentX + 3;

        const alignStr = col.align || 'left';
        doc.text(col.header, textX, y + 6, { align: alignStr });
        currentX += col.width;
      });

      doc.setDrawColor('#E2E8F0');
      doc.setLineWidth(0.2);
      doc.line(startX, y + headerHeight, startX + totalWidth, y + headerHeight);

      return y + headerHeight;
    };

    // Draw initial header
    if (currentY + headerHeight > maxContentHeight) {
      footerCallback(doc);
      doc.addPage();
      currentY = topMargin;
    }
    currentY = drawHeader(currentY);

    // Render Rows
    rows.forEach((row, rowIndex) => {
      doc.setFont(fontName, 'normal');
      doc.setFontSize(8);
      
      // 1. Process and wrap cell texts first to calculate the height of this row
      const cellLines: string[][] = [];
      let maxLines = 1;

      row.forEach((cellVal, colIdx) => {
        const col = columns[colIdx];
        const valStr = cellVal !== undefined && cellVal !== null ? String(cellVal) : '';
        // Wrap text based on column width (leaving some padding margin)
        const wrapped = doc.splitTextToSize(valStr, col.width - 5);
        cellLines.push(wrapped);
        if (wrapped.length > maxLines) {
          maxLines = wrapped.length;
        }
      });

      // Calculate row height (height per text line is ~4.2mm in pdf scale)
      const rowHeight = (maxLines * 4.2) + defaultCellPadding;

      // 2. Page Break Check
      if (currentY + rowHeight > maxContentHeight) {
        // Draw footer of current page, add a new page, and redraw headers
        footerCallback(doc);
        doc.addPage();
        currentY = topMargin;
        currentY = drawHeader(currentY);
      }

      // 3. Draw zebra background or standard white
      if (rowIndex % 2 === 0) {
        doc.setFillColor(zebraColor);
        const totalWidth = columns.reduce((sum, col) => sum + col.width, 0);
        doc.rect(startX, currentY, totalWidth, rowHeight, 'F');
      }

      // 4. Draw Row Cell Contents
      let currentX = startX;
      row.forEach((_, colIdx) => {
        const col = columns[colIdx];
        const lines = cellLines[colIdx];
        const alignStr = col.align || 'left';

        // Draw light vertical cell borders
        doc.setDrawColor('#E2E8F0');
        doc.setLineWidth(0.1);
        doc.line(currentX, currentY, currentX, currentY + rowHeight);

        doc.setTextColor('#334155');
        
        // Render lines inside cell
        lines.forEach((lineText, lineIdx) => {
          const textX = col.align === 'center'
            ? currentX + col.width / 2
            : col.align === 'right'
              ? currentX + col.width - 3
              : currentX + 3;
          
          // Vertically align text inside the cell height
          const lineY = currentY + 4.2 + (lineIdx * 4.2) + (defaultCellPadding / 2 - 1);
          doc.text(lineText, textX, lineY, { align: alignStr });
        });

        currentX += col.width;
      });

      // Draw right edge and bottom row border
      const totalWidth = columns.reduce((sum, col) => sum + col.width, 0);
      doc.line(startX + totalWidth, currentY, startX + totalWidth, currentY + rowHeight); // Right edge
      doc.line(startX, currentY + rowHeight, startX + totalWidth, currentY + rowHeight); // Bottom border

      currentY += rowHeight;
    });

    return currentY;
  }
}
