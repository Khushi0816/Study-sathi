// pdfUtils.js

import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// Vite: workerSrc must be a string URL
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(workerUrl, import.meta.url).toString();

export async function extractTextFromPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((it) => it.str).join(" ");
      text += pageText + "\n\n";
    }

    return text.trim();
  } catch (e) {
    console.error("PDF extraction error:", e);
    return "";
  }
}
