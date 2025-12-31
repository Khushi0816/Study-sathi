// src/components/UploadDocument.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadDocument() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  function onFileChange(e) {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  }

  function onDrop(e) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  }

  function onDragOver(e) { e.preventDefault(); }

  async function handleGenerate() {
    if (!file) return alert("Please upload a PDF first.");
    // Mock uploading/generation flow
    setUploading(true);

    // Simulate async generation (replace with real API call)
    await new Promise((r) => setTimeout(r, 1500));

    // Save the uploaded filename in localStorage (or context) for the dashboard
    localStorage.setItem("lastUploadedFile", file.name);

    setUploading(false);
    // Navigate to dashboard (where you can read localStorage and show results)
    navigate("/Dashboard");
  }

  return (
    <div className="min-h-screen bg-[#12081F] p-8">
      <div
        className="max-w-4xl mx-auto bg-[#16091A] rounded-xl p-8 shadow-lg"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <h2 className="text-2xl font-poppins text-[#EDE9FE] mb-4">Upload Document</h2>

        <label className="block">
          <input
            type="file"
            accept="application/pdf"
            onChange={onFileChange}
            className="hidden"
            id="fileInput"
          />
          <div
            onClick={() => document.getElementById("fileInput").click()}
            className="cursor-pointer w-full py-5 rounded-lg bg-gradient-to-r from-[#A855F7] to-[#9333EA] text-white text-center"
          >
            {file ? `Uploaded: ${file.name}` : "Upload PDF"}
          </div>
        </label>

        <p className="text-sm text-[#C4B7EA] mt-3">or drag & drop files here</p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleGenerate}
            disabled={uploading}
            className="px-6 py-2 rounded-md bg-[#7C3AED] text-white hover:opacity-90 disabled:opacity-60"
          >
            {uploading ? "Generating..." : "Generate flashcards & summary"}
          </button>

          <button
            onClick={() => { setFile(null); localStorage.removeItem("lastUploadedFile"); }}
            className="px-6 py-2 rounded-md border border-white/20 text-[#EDE9FE]"
          >
            Clear
          </button>
        </div>

        <div className="mt-6 text-sm text-[#BDA7F6]">
          <strong>Example local asset (for design):</strong><br />
          <code>/mnt/data/A_dashboard_user_interface_design_for_"StudySathi".png</code>
        </div>
      </div>
    </div>
  );
}
