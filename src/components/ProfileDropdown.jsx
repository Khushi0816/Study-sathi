import React from "react";

export default function ProfileDropdown({ open, onClose }) {
  if (!open) return null;

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
  const summaries = JSON.parse(localStorage.getItem("summaries")) || [];
  const flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div
      className="
        absolute 
        right-6 
        top-24
        w-64
        bg-[#1A112D]/95
        backdrop-blur-xl
        rounded-xl
        shadow-[0_0_20px_rgba(120,64,213,0.2)]
        border border-white/10
        p-4 
        z-50
        transition-all duration-200
        animate-fadeIn
      "
    >

      {/* HEADER */}
      <div className="mb-3">
        <p className="text-white font-semibold text-sm">
          {user.name || "User"}
        </p>
        <p className="text-white/50 text-xs">{user.email || "email@example.com"}</p>
      </div>

      <hr className="border-white/10 my-2" />

      {/* STATS */}
      <div className="text-sm space-y-2">
        <div className="flex justify-between text-white/80">
          <span>Uploaded PDFs</span>
          <span className="font-semibold text-white">{uploadedFiles.length}</span>
        </div>

        <div className="flex justify-between text-white/80">
          <span>Summaries</span>
          <span className="font-semibold text-white">{summaries.length}</span>
        </div>

        <div className="flex justify-between text-white/80">
          <span>Flashcards</span>
          <span className="font-semibold text-white">{flashcards.length}</span>
        </div>
      </div>

      <hr className="border-white/10 my-3" />

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="
          w-full 
          text-left 
          text-red-400 
          font-semibold 
          hover:text-red-300
          hover:bg-red-400/10
          p-2 
          rounded-md 
          text-sm 
          transition
        "
      >
        Logout
      </button>
    </div>
  );
}
