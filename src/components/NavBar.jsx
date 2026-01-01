import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ onProfileClick }) {
  const logoUrl = `/src/assets/logo/v-logo-main.png`;

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="w-full bg-[#0E0A24] border-b border-white/10">
      <div className="w-full flex items-center justify-between px-6 h-24">

        <img
          src={logoUrl}
          alt="StudySathi Logo"
          className="w-48 object-contain"
        />

        <div className="flex items-center gap-6 mr-16">
          <Link
            to="/UploadPage"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-400
                       text-white font-semibold shadow-lg shadow-purple-900/40
                       hover:opacity-90 transition-all"
          >
            Generate
          </Link>

          {/* 🔥 CLICK → SHOW DROPDOWN */}
          <div
            className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center cursor-pointer"
            onClick={onProfileClick}
          >
            <span className="text-base text-white/90"><img src="src/assets/logo/profile .png"/></span>
          </div>

          <span className="text-white/70 text-sm font-medium">
            {today}
          </span>
        </div>
      </div>
    </header>
  );
}
