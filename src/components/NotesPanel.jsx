// src/components/NotesPanel.jsx
import React, { useEffect, useState } from "react";
import { downloadSummaryAsPDF } from "../utils/downloadUtils";

export default function NotesPanel({ onSelect, selected }) {
  const [uploaded, setUploaded] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [flashcards, setFlashcards] = useState([]);

  // Load all localStorage data
  const loadData = () => {
    setUploaded(JSON.parse(localStorage.getItem("uploadedFiles") || "[]"));
    setSummaries(JSON.parse(localStorage.getItem("summaries") || "[]"));
    setFlashcards(JSON.parse(localStorage.getItem("flashcards") || "[]"));
  };

  useEffect(() => {
    loadData();
  }, []);

  // Helpers
  const summaryFor = (name) => summaries.filter((x) => x.title === name);
  const flashFor = (name) => flashcards.filter((x) => x.title === name);

  // Delete uploaded PDF + its summaries + flashcards
  const handleDeletePDF = (name) => {
    if (!window.confirm("Delete this PDF and all its data?")) return;

    localStorage.setItem(
      "uploadedFiles",
      JSON.stringify(uploaded.filter((x) => x.name !== name))
    );

    localStorage.setItem(
      "summaries",
      JSON.stringify(summaries.filter((x) => x.title !== name))
    );

    localStorage.setItem(
      "flashcards",
      JSON.stringify(flashcards.filter((x) => x.title !== name))
    );

    loadData();
    onSelect(null);
  };

  return (
    <div className="w-full bg-[#140A2C] p-6 rounded-2xl border border-white/10 shadow-xl mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-[#D7A4FF]">Your Notes</h2>

      {/* Uploaded PDFs */}
      <div className="mb-6">
        <h3 className="text-lg text-white/80 mb-2">Uploaded PDFs</h3>

        {uploaded.length === 0 ? (
          <p className="text-white/40 text-sm">No uploads yet.</p>
        ) : (
          <ul className="space-y-2 max-h-40 overflow-auto pr-2">
            {uploaded.map((file, idx) => (
              <li
                key={idx}
                className={`p-3 rounded-lg flex justify-between items-center transition
                  ${selected === file.name ? "bg-purple-500/30" : "bg-white/5 hover:bg-white/10"}
                `}
              >
                {/* File details */}
                <div
                  onClick={() => onSelect(file.name)}
                  className="cursor-pointer flex-1"
                >
                  <p className="text-white font-medium truncate">
                    📄 {file.name}
                  </p>
                  <p className="text-white/40 text-xs">
                    {new Date(file.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Stats */}
                <div className="text-right text-xs text-white/60 mr-3">
                  <p>{summaryFor(file.name).length} summaries</p>
                  <p>{flashFor(file.name)[0]?.cards.length || 0} cards</p>
                </div>

                {/* DELETE */}
                <button
                  onClick={() => handleDeletePDF(file.name)}
                  className="bg-red-500/30 hover:bg-red-500/50 text-red-300 px-2 py-1 rounded-md text-xs"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Summaries */}
      <div className="mb-6">
        <h3 className="text-lg text-white/80 mb-2">Generated Summaries</h3>

        {summaries.length === 0 ? (
          <p className="text-white/40 text-sm">No summaries yet.</p>
        ) : (
          <ul className="space-y-2 max-h-40 overflow-auto pr-2">
            {summaries.map((s, idx) => (
              <li
                key={idx}
                className="p-3 bg-white/5 rounded-lg flex justify-between cursor-pointer hover:bg-white/10 transition"
              >
                <div onClick={() => onSelect(s.title)} className="flex-1">
                  📝 {s.title}
                  <p className="text-white/40 text-xs">
                    {new Date(s.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  {/* Download */}
                  <button
                    onClick={() => downloadSummaryAsPDF(s.content, s.title)}
                    className="px-3 py-1 bg-[#2b1050] text-white rounded-md text-xs hover:bg-[#3a1372]"
                  >
                    PDF
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      const updated = summaries.filter(
                        (x) => x.title !== s.title
                      );
                      localStorage.setItem(
                        "summaries",
                        JSON.stringify(updated)
                      );
                      loadData();
                    }}
                    className="px-2 py-1 bg-red-500/30 text-red-300 rounded-md text-xs hover:bg-red-500/50"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Flashcards */}
      <div>
        <h3 className="text-lg text-white/80 mb-2">Generated Flashcards</h3>

        {flashcards.length === 0 ? (
          <p className="text-white/40 text-sm">No flashcards yet.</p>
        ) : (
          <ul className="space-y-2 max-h-40 overflow-auto pr-2">
            {flashcards.map((set, idx) => (
              <li
                key={idx}
                onClick={() => onSelect(set.title)}
                className="p-3 bg-white/5 rounded-lg flex justify-between cursor-pointer hover:bg-white/10 transition"
              >
                <div>
                  🎴 Flashcards — {set.title}
                  <p className="text-white/40 text-xs">
                    {set.cards.length} cards •{" "}
                    {new Date(set.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Delete flashcard set */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const updated = flashcards.filter(
                      (x) => x.title !== set.title
                    );
                    localStorage.setItem(
                      "flashcards",
                      JSON.stringify(updated)
                    );
                    loadData();
                  }}
                  className="px-2 py-1 bg-red-500/30 text-red-300 rounded-md text-xs hover:bg-red-500/50"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
    