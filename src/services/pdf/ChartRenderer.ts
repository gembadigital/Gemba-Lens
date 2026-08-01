/**
 * ChartRenderer
 * Renders high-resolution, professional vector-like charts using HTML Canvas API.
 * Converts drawings to high-quality Base64 images for direct insertion into jsPDF.
 */
export class ChartRenderer {
  private static createHiDPICanvas(width: number, height: number, ratio: number = 2): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(ratio, ratio);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }
    return canvas;
  }

  /**
   * Renders a professional vertical Bar Chart
   */
  public static renderBarChart(
    labels: string[],
    values: number[],
    title: string,
    color: string = '#0F172A'
  ): string {
    const width = 600;
    const height = 320;
    const canvas = this.createHiDPICanvas(width, height);
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Draw background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Padding
    const padLeft = 80;
    const padRight = 30;
    const padTop = 60;
    const padBottom = 50;

    const graphWidth = width - padLeft - padRight;
    const graphHeight = height - padTop - padBottom;

    // Draw title
    ctx.fillStyle = '#1E293B';
    ctx.font = 'bold 14px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(title, padLeft, 30);

    if (values.length === 0) {
      ctx.fillStyle = '#64748B';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Veri bulunamadı', width / 2, height / 2);
      return canvas.toDataURL('image/png', 1.0);
    }

    const maxVal = Math.max(...values, 1) * 1.15;

    // Draw Grid Lines and Y-Axis labels
    const gridCount = 5;
    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#64748B';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';

    for (let i = 0; i <= gridCount; i++) {
      const ratio = i / gridCount;
      const y = padTop + graphHeight * (1 - ratio);
      const val = Math.round(maxVal * ratio);

      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(width - padRight, y);
      ctx.stroke();

      ctx.fillText(val.toLocaleString('tr-TR'), padLeft - 10, y + 4);
    }

    // Draw Bars
    const barSpacing = 20;
    const totalBars = values.length;
    const barWidth = (graphWidth - (barSpacing * (totalBars - 1))) / totalBars;

    labels.forEach((label, idx) => {
      const val = values[idx];
      const barHeight = (val / maxVal) * graphHeight;
      const x = padLeft + idx * (barWidth + barSpacing);
      const y = padTop + graphHeight - barHeight;

      // Draw Bar with slight top rounded corners
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]) : ctx.rect(x, y, barWidth, barHeight);
      ctx.fill();

      // Value label on top of bar
      ctx.fillStyle = '#334155';
      ctx.font = 'bold 9px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(val.toLocaleString('tr-TR'), x + barWidth / 2, y - 6);

      // X-Axis labels
      ctx.save();
      ctx.translate(x + barWidth / 2, padTop + graphHeight + 15);
      ctx.rotate(-0.15); // Slight angle for fit
      ctx.fillStyle = '#475569';
      ctx.font = '9px Arial';
      ctx.textAlign = 'center';
      
      // Truncate long labels
      let dispLabel = label;
      if (dispLabel.length > 15) {
        dispLabel = dispLabel.substring(0, 12) + '...';
      }
      ctx.fillText(dispLabel, 0, 0);
      ctx.restore();
    });

    return canvas.toDataURL('image/png', 1.0);
  }

  /**
   * Renders a professional Pie / Donut Chart with elegant legend
   */
  public static renderPieChart(
    labels: string[],
    values: number[],
    title: string,
    colors: string[] = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']
  ): string {
    const width = 600;
    const height = 320;
    const canvas = this.createHiDPICanvas(width, height);
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Draw background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Draw title
    ctx.fillStyle = '#1E293B';
    ctx.font = 'bold 14px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(title, 40, 30);

    const total = values.reduce((sum, v) => sum + v, 0);

    if (total === 0) {
      ctx.fillStyle = '#64748B';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Veri bulunamadı', width / 2, height / 2);
      return canvas.toDataURL('image/png', 1.0);
    }

    const centerX = 200;
    const centerY = height / 2 + 10;
    const radius = 90;

    let startAngle = -Math.PI / 2;

    values.forEach((val, idx) => {
      const sliceAngle = (val / total) * (2 * Math.PI);
      const endAngle = startAngle + sliceAngle;
      const color = colors[idx % colors.length];

      // Draw Slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Outer border to make it elegant
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      startAngle = endAngle;
    });

    // Draw Donut hole to make it modern
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.45, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // Draw Legend on the right
    const legendX = 370;
    const legendYStart = 60;
    const rowHeight = 22;

    labels.forEach((label, idx) => {
      const val = values[idx];
      const pct = ((val / total) * 100).toFixed(1);
      const color = colors[idx % colors.length];
      const y = legendYStart + idx * rowHeight;

      // Color marker
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(legendX, y, 12, 12, 3) : ctx.rect(legendX, y, 12, 12);
      ctx.fill();

      // Text label
      ctx.fillStyle = '#334155';
      ctx.font = 'bold 11px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`${pct}%`, legendX + 22, y + 10);

      ctx.fillStyle = '#475569';
      ctx.font = '10px Arial';
      let dispLabel = label;
      if (dispLabel.length > 25) {
        dispLabel = dispLabel.substring(0, 22) + '...';
      }
      ctx.fillText(dispLabel, legendX + 62, y + 10);
    });

    return canvas.toDataURL('image/png', 1.0);
  }

  /**
   * Renders a modern Radar Chart (Web chart)
   */
  public static renderRadarChart(
    labels: string[],
    values: number[],
    title: string,
    maxScore: number = 4
  ): string {
    const width = 600;
    const height = 320;
    const canvas = this.createHiDPICanvas(width, height);
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Title
    ctx.fillStyle = '#1E293B';
    ctx.font = 'bold 14px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(title, 40, 30);

    if (values.length === 0) {
      ctx.fillStyle = '#64748B';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Veri bulunamadı', width / 2, height / 2);
      return canvas.toDataURL('image/png', 1.0);
    }

    const centerX = width / 2;
    const centerY = height / 2 + 10;
    const radius = 95;
    const totalAxes = values.length;

    // Draw concentric rings (Radar Grid)
    const ringCount = 4;
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;

    for (let r = 1; r <= ringCount; r++) {
      const rRatio = r / ringCount;
      const currentRadius = radius * rRatio;

      ctx.beginPath();
      for (let i = 0; i < totalAxes; i++) {
        const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
        const x = centerX + Math.cos(angle) * currentRadius;
        const y = centerY + Math.sin(angle) * currentRadius;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();

      // Grid numeric label
      ctx.fillStyle = '#94A3B8';
      ctx.font = '8px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(String(Math.round(maxScore * rRatio)), centerX, centerY - currentRadius + 8);
    }

    // Draw Axis spokes and Labels
    labels.forEach((label, idx) => {
      const angle = (idx * 2 * Math.PI) / totalAxes - Math.PI / 2;
      const endX = centerX + Math.cos(angle) * radius;
      const endY = centerY + Math.sin(angle) * radius;

      // Spoke line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = '#F1F5F9';
      ctx.stroke();

      // Label positioning
      const textRadius = radius + 15;
      const labelX = centerX + Math.cos(angle) * textRadius;
      const labelY = centerY + Math.sin(angle) * textRadius;

      ctx.fillStyle = '#475569';
      ctx.font = 'bold 8px Arial';

      if (Math.abs(Math.cos(angle)) < 0.1) {
        ctx.textAlign = 'center';
      } else if (Math.cos(angle) > 0) {
        ctx.textAlign = 'left';
      } else {
        ctx.textAlign = 'right';
      }

      let dispLabel = label;
      if (dispLabel.length > 18) {
        dispLabel = dispLabel.substring(0, 15) + '...';
      }
      ctx.fillText(dispLabel, labelX, labelY + 3);
    });

    // Draw Data Polygon
    ctx.beginPath();
    values.forEach((val, idx) => {
      const scoreRatio = Math.min(val, maxScore) / maxScore;
      const angle = (idx * 2 * Math.PI) / totalAxes - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius * scoreRatio;
      const y = centerY + Math.sin(angle) * radius * scoreRatio;

      if (idx === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();

    // Fill polygon
    ctx.fillStyle = 'rgba(79, 70, 229, 0.22)';
    ctx.fill();

    // Outline polygon
    ctx.strokeStyle = '#4F46E5';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw small circles at data points
    values.forEach((val, idx) => {
      const scoreRatio = Math.min(val, maxScore) / maxScore;
      const angle = (idx * 2 * Math.PI) / totalAxes - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius * scoreRatio;
      const y = centerY + Math.sin(angle) * radius * scoreRatio;

      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, 2 * Math.PI);
      ctx.fillStyle = '#4F46E5';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    return canvas.toDataURL('image/png', 1.0);
  }

  /**
   * Renders a high-quality Trend Line Chart
   */
  public static renderTrendChart(
    labels: string[],
    planned: number[],
    actual: number[],
    title: string,
    yLabel: string = '%'
  ): string {
    const width = 600;
    const height = 320;
    const canvas = this.createHiDPICanvas(width, height);
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Padding
    const padLeft = 80;
    const padRight = 30;
    const padTop = 60;
    const padBottom = 50;

    const graphWidth = width - padLeft - padRight;
    const graphHeight = height - padTop - padBottom;

    // Title
    ctx.fillStyle = '#1E293B';
    ctx.font = 'bold 14px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(title, padLeft, 30);

    // Legend
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    
    // Planned Legend
    ctx.fillStyle = '#475569';
    ctx.fillRect(width - 150, 20, 15, 8);
    ctx.fillStyle = '#334155';
    ctx.fillText('Hedeflenen', width - 155, 27);

    // Actual Legend
    ctx.fillStyle = '#10B981';
    ctx.fillRect(width - 60, 20, 15, 8);
    ctx.fillStyle = '#334155';
    ctx.fillText('Gerçekleşen', width - 65, 27);

    const allVals = [...planned, ...actual];
    const maxVal = Math.max(...allVals, 100) * 1.1;

    // Draw Grid & Y-Axis
    const gridCount = 5;
    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#64748B';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';

    for (let i = 0; i <= gridCount; i++) {
      const ratio = i / gridCount;
      const y = padTop + graphHeight * (1 - ratio);
      const val = Math.round(maxVal * ratio);

      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(width - padRight, y);
      ctx.stroke();

      ctx.fillText(`${val}${yLabel}`, padLeft - 10, y + 4);
    }

    const stepX = graphWidth / Math.max(labels.length - 1, 1);

    // Draw Planned Line (Muted Slate Dash)
    ctx.beginPath();
    planned.forEach((val, idx) => {
      const x = padLeft + idx * stepX;
      const y = padTop + graphHeight - (val / maxVal) * graphHeight;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash

    // Draw Actual Line (Emerald Green, Solid, Elegant)
    ctx.beginPath();
    actual.forEach((val, idx) => {
      const x = padLeft + idx * stepX;
      const y = padTop + graphHeight - (val / maxVal) * graphHeight;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw points on Actual line
    actual.forEach((val, idx) => {
      const x = padLeft + idx * stepX;
      const y = padTop + graphHeight - (val / maxVal) * graphHeight;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#10B981';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Show values
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 9px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${val}${yLabel}`, x, y - 8);
    });

    // Draw X-Axis labels
    labels.forEach((label, idx) => {
      const x = padLeft + idx * stepX;
      ctx.fillStyle = '#475569';
      ctx.font = '9px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, padTop + graphHeight + 18);
    });

    return canvas.toDataURL('image/png', 1.0);
  }
}
