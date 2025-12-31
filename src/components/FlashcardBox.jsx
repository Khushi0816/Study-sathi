// src/components/FlashcardBox.jsx
import React, { useState, useEffect } from "react";

export default function FlashcardBox({ flashcards }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    setDeck(flashcards || []);
    setIdx(0);
    setFlipped(false);
  }, [flashcards]);

  if (!deck || deck.length === 0) {
    return (
      <div className="bg-[#1A0D2E] h-full rounded-2xl p-6 border border-white/10 flex items-center justify-center text-white/60">
        No flashcards for this note.
      </div>
    );
  }

  const card = deck[idx];

  const next = () => {
    setFlipped(false);
    setIdx((p) => (p + 1) % deck.length);
  };
  const prev = () => {
    setFlipped(false);
    setIdx((p) => (p - 1 + deck.length) % deck.length);
  };
  const shuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setIdx(0);
    setFlipped(false);
  };

  return (
    <div className="bg-[#1A0D2E] h-full rounded-2xl p-6 border border-white/10 flex flex-col">
      <h2 className="text-lg font-semibold text-purple-300 mb-4">
        Flashcards ({idx + 1}/{deck.length})
      </h2>

      <div
        className="flex-1 rounded-xl bg-white/5 p-6 text-white relative cursor-pointer perspective"
        onClick={() => setFlipped((f) => !f)}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {/* card content with simple flip animation using transform */}
        <div
          className={`relative w-full h-full flex items-center justify-center transition-transform duration-500`}
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex items-center justify-center p-6"
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="text-xl font-medium">{card.q}</p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex items-center justify-center p-6"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
          >
            <p className="text-xl font-medium">{card.a}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center gap-3">
        <button onClick={prev} className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition">
          Prev
        </button>

        <div className="flex gap-2">
          <button onClick={() => setFlipped((f) => !f)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
            Flip
          </button>
          <button onClick={shuffle} className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600">
            Shuffle
          </button>
        </div>

        <button onClick={next} className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition">
          Next
        </button>
      </div>
    </div>
  );
}
