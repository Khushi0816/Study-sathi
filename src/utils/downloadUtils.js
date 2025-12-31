// src/utils/downloadUtils.js
import jsPDF from "jspdf";

export function downloadSummaryAsPDF(summaryText, title = "summary") {
  try {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const left = 40;
    const top = 50;
    const lineHeight = 14;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - left * 2;

    doc.setFontSize(16);
    doc.text(title, left, top);
    doc.setFontSize(11);

    // split text by lines to fit page
    const lines = doc.splitTextToSize(summaryText, maxLineWidth);
    let cursorY = top + 25;

    lines.forEach((line) => {
      if (cursorY > doc.internal.pageSize.getHeight() - 60) {
        doc.addPage();
        cursorY = 40;
      }
      doc.text(line, left, cursorY);
      cursorY += lineHeight;
    });

    doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
  } catch (err) {
    console.error("PDF download failed:", err);
    alert("Could not generate PDF.");
  }
}
