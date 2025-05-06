import React, { useState } from "react";
import PropTypes from "prop-types";

function Sessions({ onSessionAdded }) {
  const [session, setSession] = useState({
    date: new Date(2025, 3, 19),
    exercises: ["4*10 Tractions", "4*15 Dips"],
  });

  const handleFinish = () => {
    const token = localStorage.getItem("token");

    const date = session.date;
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    fetch("http://localhost:3001/add-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: formattedDate, // On envoie la date
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de l'envoi");
        // ✅ Appelle onSessionAdded pour incrémenter refreshCount
        onSessionAdded();
        return response.text();
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi :", error);
      });
  };

  return (
    <div
      className="border-t-[3px] border-l-[3px] border-b-[6px] border-r-[6px] 
    border-color5 shadow-lg bg-color4 rounded-[10px] mx-[5vw] my-[3vh]"
    >
      <h2 className="bg-color3 text-center rounded-t-[5px] border-b-[3px] border-color5 px-[5vw] py-[2vh] current-date font-luckiest text-3xl">
        Prochaine séance
      </h2>
      <div className="flex flex-col items-center gap-[2vh]">
        <p className="mt-[2vh] current-date font-cabin text-xl">
          {session.date.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
          })}
        </p>
        <ul className="flex flex-col gap-[1vh]">
          {session.exercises.map((exercice, index) => (
            <li key={index} className="font-cabin text-lg">
              {exercice}
            </li>
          ))}
        </ul>
        <button
          className="bg-accent2 rounded-[10px] px-[3vw] py-[0.5vh] border-t-[2px] border-l-[2px] border-b-[4px] border-r-[4px] 
    border-color5 mb-[2vh] font-cabin text-xl"
          onClick={handleFinish}
        >
          Terminer
        </button>
      </div>
    </div>
  );
}

Sessions.propTypes = {
  onSessionAdded: PropTypes.func.isRequired,
};

export default Sessions;
