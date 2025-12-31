import React, { useState } from "react";

export default function UploadCard({ onUploaded }) {
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const saveToLocalStorage = (file) => {
    const existing = JSON.parse(localStorage.getItem("uploadedFiles") || "[]");

    existing.push({
      id: Date.now(),
      name: file.name,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem("uploadedFiles", JSON.stringify(existing));

    // Notify dashboard
    if (onUploaded) onUploaded(file.name);
  };

  const handleFileUpload = (file) => {
    if (!file) return;

    setFileName(file.name);
    saveToLocalStorage(file);

    console.log("Uploaded file:", file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  return (
    <div className="bg-[#140A2C] rounded-2xl p-6 mt-6 shadow-lg border border-white/5 min-w-[360px]">

      {/* Title */}
      <h2 className="text-xl font-semibold text-white mb-2">
        Upload Document
      </h2>
      <p className="text-sm text-white/60 mb-4">
        Generate flashcards & summaries
      </p>

      {/* DROP ZONE */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`h-40 border-2 rounded-xl flex flex-col items-center justify-center cursor-pointer transition 
          ${isDragging ? "border-purple-400 bg-white/10" : "border-white/10 bg-white/5"}
        `}
      >
        <span className="text-4xl text-purple-400 font-light">+</span>
        <p className="text-xs text-white/50 mt-1">Drag & drop your PDF here</p>
      </div>

      {/* Upload Button */}
      <label className="block w-full mt-5">
        <div className="bg-gradient-to-r from-purple-500 to-purple-400 hover:opacity-90 
                        cursor-pointer py-3 rounded-xl text-center font-semibold text-white text-sm">
          Upload PDF
        </div>

        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files[0])}
        />
      </label>

      {/* Uploaded Filename */}
      {fileName && (
        <p className="text-xs text-purple-300 text-center mt-3">
          Uploaded: {fileName}
        </p>
      )}
    </div>
  );
}
