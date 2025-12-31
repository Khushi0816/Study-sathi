import React, { useState } from "react";
import { extractTextFromPDF } from "../utils/pdfUtils";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // -------------------------
  // SIMPLE OFFLINE SUMMARY
  // -------------------------
  function generateSummary(text) {
    const sentences = text.split(/[.!?]/).map(s => s.trim()).filter(Boolean);

    const intro = sentences.slice(0, 4);

    const keywords = ["system", "process", "data", "model", "method", "steps", "components", "function"];

    const important = sentences.filter(s =>
      keywords.some(k => s.toLowerCase().includes(k))
    ).slice(0, 6);

    return `
📌 **Summary**

${intro.map(s => "• " + s).join("\n")}

**Key Points**
${important.map(s => "• " + s).join("\n")}
    `;
  }

  // -------------------------
  // SIMPLE OFFLINE FLASHCARDS
  // -------------------------
  function generateFlashcards(text) {
    const lines = text.split("\n").filter(l => l.length > 5);

    let cards = [];

    lines.forEach((line) => {
      if (line.length < 50) {
        cards.push({
          q: `What is ${line}?`,
          a: `${line} refers to a topic explained in the notes.`,
        });
      } else {
        cards.push({
          q: `Explain: ${line.slice(0, 30)}...`,
          a: line.slice(0, 120) + "...",
        });
      }
    });

    return cards.slice(0, 10); // limit to 10
  }

  // -------------------------
  // MAIN PROCESS
  // -------------------------
  const processAI = async (type) => {
    if (!file) return alert("Please upload a PDF first.");

    setLoading(true);

    try {
      const text = await extractTextFromPDF(file);

      if (!text) return alert("Failed to read PDF");

      if (type === "summary") {
        const summary = generateSummary(text);

        const summaries = JSON.parse(localStorage.getItem("summaries") || "[]");
        summaries.push({
          title: file.name,
          content: summary,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem("summaries", JSON.stringify(summaries));

        alert("Summary created!");
      }

      if (type === "flashcards") {
        const flashcards = generateFlashcards(text);

        const flashData = JSON.parse(localStorage.getItem("flashcards") || "[]");
        flashData.push({
          title: file.name,
          cards: flashcards,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem("flashcards", JSON.stringify(flashData));

        alert("Flashcards created!");
      }

      navigate("/Dashboard");

    } catch (err) {
      console.error(err);
      alert("Error generating content.");
    }

    setLoading(false);
  };

  // -------------------------

  return (
    <div className="min-h-screen bg-[#0D0718] text-white flex flex-col items-center justify-center px-4">

      <h1 className="text-4xl font-poppins font-semibold mb-8 text-[#D7A4FF]">
        Upload Notes
      </h1>

      <div className="w-full max-w-2xl bg-[#140A2C] p-10 rounded-2xl border border-white/10 shadow-xl">

        {/* Drag & Drop */}
        <div
          className={`w-full h-64 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center 
                      ${dragging ? "border-purple-400 bg-purple-500/10" : "border-white/20 bg-white/5"} transition`}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const pdf = e.dataTransfer.files[0];
            if (pdf?.type === "application/pdf") setFile(pdf);
          }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
        >
          <div className="text-6xl text-purple-400 mb-3">+</div>
          <p className="text-white/70 font-nunito">
            {file ? `Selected: ${file.name}` : "Drop your PDF here"}
          </p>
        </div>

        <p className="text-center text-white/50 mt-4 mb-2">OR</p>

        {/* File input */}
        <label className="block w-full cursor-pointer">
          <div className="w-full py-3 text-center rounded-xl bg-gradient-to-r from-purple-500 to-purple-400 font-medium hover:opacity-90 transition">
            Select PDF From Your Computer
          </div>
          <input type="file" accept="application/pdf" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
        </label>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => processAI("summary")}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-white font-semibold"
          >
            {loading ? "Processing..." : "Generate Summary"}
          </button>

          <button
            onClick={() => processAI("flashcards")}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 transition text-white font-semibold"
          >
            {loading ? "Processing..." : "Generate Flashcards"}
          </button>
        </div>

      </div>
    </div>
  );
}
