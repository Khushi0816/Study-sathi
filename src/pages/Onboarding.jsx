import React, { use } from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#12081F] flex flex-col justify-center items-center text-center px-4">

      <div className="flex flex-col items-center justify-center text-center mt-[-10px]">
          <img
            src="/src/assets/logo/main-logo-rbg.png"
            alt="StudySathi Logo"
            className="w-52 mx-auto mb-0"     
          />

          <h1 className="text-5xl font-semibold mb-1 text-[#D7A4FF] font-poppins mt-[-50px]">
            Welcome To StudySathi
          </h1>

          <p className="text-accent font-bold text-xl mb-2">
            YOUR AI STUDY PARTNER
          </p>
        </div>
      {/* Features */}
      <div className="mt-10 space-y-6 text-left">

        <div className="flex items-center gap-3">
          <img src="./src/assets/logo/upload.png" className="w-10" />
          <p className="text-[#C084FC] font-nunito text-2xl font-bold">
            Upload your notes with ease
          </p>
        </div>

        <div className="flex items-center gap-3">
          <img src="./src/assets/logo/flash.png" className="w-10" />
          <p className="text-[#C084FC] font-nunito text-2xl font-bold">
            Generate Flashcards instantly
          </p>
        </div>

        <div className="flex items-center gap-3">
          <img src="./src/assets/logo/pen.png" className="w-10" />
          <p className="text-[#C084FC] font-nunito text-2xl font-bold">
            Get an overview with the summary
          </p>
        </div>

      </div>
      {/* Get Started Button */}
      <button
        className="mt-12 bg-gradient-to-r from-[#A855F7] to-[#9333EA] 
        text-white font-poppins px-10 py-3 rounded-lg text-lg hover:opacity-90 transition"

        onClick={() => navigate('/Signup')}
      >
        Get Started
      </button>

    </div>
  );
}
