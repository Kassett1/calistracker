import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Chrono() {
  const [state, setState] = useState("initial");

  const [checkpoints, setCheckpoints] = useState([]);

  const handleStart = () => {
    setState("running");
  };

  const handleStop = () => {
    setState("stopped");
  };

  const handleLap = () => {};

  const handleReset = () => {
    setState("initial");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-[10vw] gap-[10vh]">
      {/* Affichage du chrono */}
      <div className="text-5xl font-luckiest">00:00:00:00</div>

      {/* Boutons */}
      <div className="flex justify-center w-full gap-[10vw]">
        {state === "stopped" && (
          <button onClick={handleReset} className="transition-all duration-300">
            <img src="/icones/reset.svg" alt="Reset" className="h-[15vw]" />
          </button>
        )}

        {(state === "initial" || state === "stopped") && (
          <button onClick={handleStart} className="transition-all duration-300">
            <img src="/icones/play.svg" alt="Play" className="h-[15vw]" />
          </button>
        )}

        {state === "running" && (
          <button onClick={handleLap} className="transition-all duration-300">
            <img
              src="/icones/checkpoint.svg"
              alt="Checkpoint"
              className="h-[15vw]"
            />
          </button>
        )}

        {state === "running" && (
          <button onClick={handleStop} className="transition-all duration-300">
            <img src="/icones/pause.svg" alt="Pause" className="h-[15vw]" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Chrono;
