import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NotesPanel from "../components/NotesPanel";
import FlashcardBox from "../components/FlashcardBox";
import PomodoroMini from "../components/PomodoroMini";
import UploadCard from "../components/UploadCard";
import ProfileDropdown from "../components/ProfileDropdown";

export default function Dashboard() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [summary, setSummary] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Load summary + flashcards when a file is selected
  useEffect(() => {
    if (!selectedNote) return;

    const summaries = JSON.parse(localStorage.getItem("summaries") || "[]");
    const flashData = JSON.parse(localStorage.getItem("flashcards") || "[]");

    const foundSummary = summaries.find((x) => x.title === selectedNote);
    const foundFlashcards = flashData.find((x) => x.title === selectedNote);

    setSummary(foundSummary ? foundSummary.content : "");
    setFlashcards(foundFlashcards ? foundFlashcards.cards : []);
  }, [selectedNote]);

  return (
    <div className="min-h-screen bg-[#12081F] flex flex-col">

      {/* 🔥 NAVBAR BUTTON NOW OPENS DROPDOWN */}
      <Navbar onProfileClick={() => setShowDropdown(!showDropdown)} />

      {/* PROFILE DROPDOWN */}
      <ProfileDropdown open={showDropdown} onClose={() => setShowDropdown(false)} />

      {/* MAIN GRID */}
      <main className="
        flex-1 max-w-7xl mx-auto px-6 py-4
        grid grid-cols-1 lg:grid-cols-12 gap-6
      ">
        <section className="lg:col-span-4 h-full">
          <NotesPanel onSelect={setSelectedNote} selected={selectedNote} />
        </section>

        <section className="lg:col-span-5 h-full">
          <FlashcardBox flashcards={flashcards} />
        </section>

        <aside className="lg:col-span-3 flex flex-col gap-4">
          <PomodoroMini />
          <UploadCard />
        </aside>
      </main>
    </div>
  );
}
