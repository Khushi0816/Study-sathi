import React, { useEffect, useState } from "react";

export default function PomodoroMini() {
  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let t;
    if (running) {
      t = setInterval(() => setTime((s) => s - 1), 1000);
    }
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (time <= 0) {
      setRunning(false);
      setTime(25 * 60);
    }
  }, [time]);

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  return (
    <div className="card p-6 w-full min-w-[300px]">  
      {/* ↑ Increased horizontal padding + minimum width */}

      <div className="flex justify-between items-start">
        <h4 className="font-header">Pomodoro</h4>
        <span className="text-sm text-white/70">Focus</span>
      </div>

      <div className="my-6 text-center text-4xl font-bold">{fmt(time)}</div>

      <div className="flex gap-4">
        <button
          onClick={() => setRunning((r) => !r)}
          className="flex-1 btn-accent py-3 text-lg"
        >
          {running ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => {
            setRunning(false);
            setTime(25 * 60);
          }}
          className="px-5 py-3 bg-white/5 rounded-lg text-white/80 text-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
