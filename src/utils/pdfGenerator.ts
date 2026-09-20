import { ChecklistItem } from '../types';

/**
 * Generates and downloads a clean, beautifully formatted PDF or print-ready document
 * summarizing the 7-Day Action Plan for offline reference.
 */
export const downloadActionPlanPDF = (
  checklist: ChecklistItem[],
  customTitle: string = 'خطة الـ 7 أيام للعمل الحر واستقبال أول أرباح رقمية'
): void => {
  const currentDate = new Date().toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const completedCount = checklist.filter(i => i.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  // Group steps into 3 Strategic Phases
  const phases = [
    {
      name: 'المرحلة الأولى: التأسيس والبنية التحتية واستلام الأرباح',
      days: checklist.filter(s => s.day <= 2)
    },
    {
      name: 'المرحلة الثانية: بناء التموضع ومعرض الأعمال الرقمي',
      days: checklist.filter(s => s.day > 2 && s.day <= 4)
    },
    {
      name: 'المرحلة الثالثة: الانطلاق الميداني، اقتناص العملاء وتأمين العقود المستمرة',
      days: checklist.filter(s => s.day > 4)
    }
  ];

  // Construct print-optimized, styling-contained HTML
  const printWindow = window.open('', '_blank', 'width=900,height=950');
  if (!printWindow) {
    // Fallback if popups are blocked: trigger standard print
    window.print();
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>${customTitle} - ملخص PDF للطباعة والقراءة أوفلاين</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');

    @page {
      size: A4;
      margin: 14mm 16mm 14mm 16mm;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Cairo', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 24px;
      color: #0f172a;
      background-color: #ffffff;
      line-height: 1.6;
      font-size: 13px;
    }

    .header-box {
      border: 2px solid #059669;
      background: linear-gradient(135deg, #064e3b 0%, #022c22 100%);
      color: #ffffff;
      border-radius: 14px;
      padding: 20px 24px;
      margin-bottom: 24px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }

    .header-title {
      font-size: 20px;
      font-weight: 900;
      margin: 0 0 6px 0;
      color: #ffffff;
    }

    .header-subtitle {
      font-size: 13px;
      color: #a7f3d0;
      margin: 0 0 14px 0;
      line-height: 1.5;
    }

    .meta-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 8px 14px;
      font-size: 12px;
      font-weight: 700;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .progress-pill {
      background-color: #10b981;
      color: #022c22;
      padding: 2px 10px;
      border-radius: 9999px;
      font-weight: 800;
    }

    .phase-container {
      margin-bottom: 20px;
      page-break-inside: avoid;
    }

    .phase-title {
      font-size: 14px;
      font-weight: 800;
      color: #047857;
      background: #ecfdf5;
      border-right: 4px solid #059669;
      padding: 8px 12px;
      border-radius: 6px;
      margin-bottom: 12px;
    }

    .step-card {
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 10px;
      page-break-inside: avoid;
    }

    .step-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      font-size: 13px;
    }

    .step-day-badge {
      font-weight: 900;
      color: #065f46;
      background: #d1fae5;
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 11px;
    }

    .step-title {
      font-size: 14px;
      font-weight: 800;
      color: #0f172a;
      flex: 1;
      margin: 0 10px;
    }

    .step-time {
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
      white-space: nowrap;
    }

    .step-task {
      color: #334155;
      font-size: 12.5px;
      margin: 6px 0;
      line-height: 1.55;
    }

    .step-tip {
      background: #fefce8;
      border-right: 3px solid #eab308;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 11.5px;
      color: #713f12;
      margin-top: 6px;
    }

    .step-status {
      font-weight: 700;
      font-size: 11px;
      display: inline-block;
      margin-top: 4px;
    }

    .status-done {
      color: #059669;
    }

    .status-pending {
      color: #94a3b8;
    }

    .footer-note {
      border-top: 1px dashed #cbd5e1;
      margin-top: 24px;
      padding-top: 14px;
      text-align: center;
      font-size: 11px;
      color: #64748b;
      page-break-inside: avoid;
    }

    .action-print-bar {
      position: fixed;
      top: 12px;
      left: 12px;
      z-index: 9999;
      background: #0f172a;
      padding: 10px 16px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      display: flex;
      gap: 10px;
    }

    .print-btn {
      background: #10b981;
      color: #022c22;
      font-family: inherit;
      font-weight: 800;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 13px;
    }

    .close-btn {
      background: #334155;
      color: #ffffff;
      font-family: inherit;
      border: none;
      padding: 8px 14px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 13px;
    }

    @media print {
      .action-print-bar {
        display: none !important;
      }
      body {
        padding: 0;
      }
    }
  </style>
</head>
<body>

  <div class="action-print-bar">
    <button class="print-btn" onclick="window.print()">🖨️ طباعة أو حفظ كـ PDF</button>
    <button class="close-btn" onclick="window.close()">إغلاق النافذة</button>
  </div>

  <div class="header-box">
    <h1 class="header-title">${customTitle}</h1>
    <p class="header-subtitle">
      الدليل الميداني الواقعي من الصفر لبناء أول مصدر دخل واستقبال الأرباح مع قوالب العمل المعتمدة لعام 2026.
    </p>
    <div class="meta-bar">
      <div class="meta-item">
        <span>تاريخ الاستخراج:</span>
        <span>${currentDate}</span>
      </div>
      <div class="meta-item">
        <span>نسبة الإنجاز المحققة:</span>
        <span class="progress-pill">${progressPercent}% (${completedCount} من 7 أيام)</span>
      </div>
      <div class="meta-item">
        <span>الترخيص:</span>
        <span>مجاني 100% للاستخدام الشخصي</span>
      </div>
    </div>
  </div>

  ${phases
    .map(
      phase => `
    <div class="phase-container">
      <div class="phase-title">${phase.name}</div>
      ${phase.days
        .map(
          item => `
        <div class="step-card">
          <div class="step-header">
            <span class="step-day-badge">اليوم ${item.day}</span>
            <span class="step-title">${item.title}</span>
            <span class="step-time">⏱️ ${item.timeEstimate}</span>
          </div>
          <div class="step-task">
            <strong>المهمة الميدانية:</strong> ${item.task}
          </div>
          <div class="step-tip">
            💡 <strong>نصيحة الخبراء:</strong> ${item.resourceTip}
          </div>
          <div class="step-status ${item.completed ? 'status-done' : 'status-pending'}">
            ${item.completed ? '✓ تم إنجاز هذه المهمة' : '○ بانتظار التنفيذ'}
          </div>
        </div>
      `
        )
        .join('')}
    </div>
  `
    )
    .join('')}

  <div class="footer-note">
    <strong>دليل العمل والربح الرقمي الواقعي 2026</strong> • تم توليد هذا المستند للاستخدام الشخصي وأداء المهام دون اتصال بالإنترنت (Offline Reference).
  </div>

  <script>
    // Automatically open print dialog after load
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.print();
      }, 500);
    });
  </script>
</body>
</html>
`;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};
