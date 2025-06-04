import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

function Chrono() {
  // État du chrono : "initial", "running" ou "stopped"
  const [state, setState] = useState("initial");
  // Temps écoulé en ms
  const [elapsedTime, setElapsedTime] = useState(0);
  // Réf pour stocker l’instant de départ (ou de reprise)
  const startRef = useRef(0);
  // Réf pour garder l’ID de l’interval
  const intervalRef = useRef(null);

  const [checkpoints, setCheckpoints] = useState([]);

  const handleStart = () => {
    startRef.current = Date.now() - elapsedTime;
    setState("running");
  };

  const handleStop = () => {
    setState("stopped");
  };

  const handleCheckpoint = (time) => {
    setCheckpoints((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        difference: `+ ${formatTime(timeDifference(time))}`,
        formattedTime: formatTime(time),
        time: time,
      },
    ]);
  };

  const handleReset = () => {
    setState("initial");
    setElapsedTime(0);
    setCheckpoints([]);
  };

  const timeDifference = (time) => {
    const last = checkpoints[checkpoints.length - 1]?.time ?? 0;
    return time - last;
  };

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3_600_000);
    const minutes = Math.floor((ms % 3_600_000) / 60_000);
    const seconds = Math.floor((ms % 60_000) / 1_000);
    const centiseconds = Math.floor((ms % 1_000) / 10);

    const numberFormat = (n) => n.toString().padStart(2, "0");

    return `${numberFormat(hours)}:${numberFormat(minutes)}:${numberFormat(
      seconds
    )}:${numberFormat(centiseconds)}`;
  };

  // Hook pour lancer/arrêter l’intervalle
  useEffect(() => {
    if (state === "running") {
      // À chaque tick (ici toutes les 50 ms), on recalcule le temps exact
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startRef.current);
      }, 50);
    } else {
      // Si on n’est plus en "running", on supprime l’intervalle
      clearInterval(intervalRef.current);
    }
    // Au démontage ou au changement de state, on nettoie
    return () => clearInterval(intervalRef.current);
  }, [state]);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-[10vw] gap-[5vh]">
      {/* Affichage du chrono */}
      <div className="text-5xl font-luckiest">{formatTime(elapsedTime)}</div>

      {/* Affichage des checkpoints */}
      {checkpoints.length > 0 && (
        <ul className="w-full flex flex-col gap-4 max-h-48 overflow-y-scroll ">
          {[...checkpoints].reverse().map((checkpoint) => (
            <li key={checkpoint.id} className="flex w-full font-cabin">
              <span className="w-[10%] text-center">{checkpoint.id}</span>
              <span className="w-[45%] text-center">
                {checkpoint.difference}
              </span>
              <span className="w-[45%] text-center">
                {checkpoint.formattedTime}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Boutons */}
      <div className="flex justify-center w-full gap-[10vw]">
        {state === "stopped" && (
          <button
            onClick={handleReset}
            className="transition-all duration-300 active:scale-95"
          >
            <img src="/icones/reset.svg" alt="Reset" className="h-[15vw]" />
          </button>
        )}

        {(state === "initial" || state === "stopped") && (
          <button
            onClick={handleStart}
            className="transition-all duration-300 active:scale-95"
          >
            <img src="/icones/play.svg" alt="Play" className="h-[15vw]" />
          </button>
        )}

        {state === "running" && (
          <button
            onClick={() => handleCheckpoint(elapsedTime)}
            className="transition-all duration-300 active:scale-95"
          >
            <img
              src="/icones/checkpoint.svg"
              alt="Checkpoint"
              className="h-[15vw]"
            />
          </button>
        )}

        {state === "running" && (
          <button
            onClick={handleStop}
            className="transition-all duration-300 active:scale-95"
          >
            <img src="/icones/pause.svg" alt="Pause" className="h-[15vw]" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Chrono;
