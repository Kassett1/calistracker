import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Goals({ refreshCount, onSessionAdded, serverBaseUrl }) {
  const [goals, setGoals] = useState(["4*10 Tractions", "4*15 Dips"]);
  const [newGoal, setNewGoal] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchGoals = () => {
    const token = localStorage.getItem("token");

    fetch(`${serverBaseUrl}get-goals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Erreur lors de la récupération des objectifs");
        return res.json();
      })
      .then((data) => {
        setGoals(data.goals);
      })
      .catch((err) => {
        console.error("Erreur fetch :", err);
      });
  };

  const handleDeleteGoal = (g) => {
    const token = localStorage.getItem("token");

    fetch(`${serverBaseUrl}delete-goal/${g.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Suppression échouée");
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
        onSessionAdded();
      })
      .catch((err) => console.error("Erreur fetch :", err));
  };

  const handleOpen = () => {
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setNewGoal("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    fetch(`${serverBaseUrl}add-goal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        goal: newGoal,
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

    handleClose();
  };

  useEffect(() => {
    fetchGoals();
  }, [refreshCount]);

  return (
    <div className="border-t-[3px] border-l-[3px] border-b-[6px] border-r-[6px] border-color5 shadow-lg bg-color4 rounded-[10px] mx-[5vw] my-[3vh] mb-[15vh]">
      <h2 className="bg-color3 text-center rounded-t-[7px] border-b-[3px] border-color5 font-luckiest text-3xl px-[5vw] py-[2vh]">
        Objectifs
      </h2>
      <ul>
        {goals.map((g, index) => (
          <li
            key={index}
            className="border-b-[2px] border-color5 px-[5vw] py-[1vh] flex justify-between items-center"
          >
            <span className="font-cabin text-lg">{g.goal}</span>
            <button
              className="ml-4 text-accent1 font-luckiest text-3xl"
              onClick={() => handleDeleteGoal(g)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {/* Bouton + pour ouvrir la popup */}
      <div className="flex justify-center">
        <button
          className="
         bg-accent2
         rounded-full
         w-10 h-10 
         border-[3px] border-color5
         flex items-center justify-center 
         font-luckiest text-3xl
         my-[2vh]
         transition-transform duration-100 active:scale-95
         "
          onClick={handleOpen}
        >
          +
        </button>
      </div>

      {/* Popup du formulaire */}
      <form
        onSubmit={handleSubmit}
        className={`
          fixed inset-0 flex items-center justify-center
          bg-black/50
          z-20
          transition-opacity duration-300
          ${isFormOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <div
          className="
              relative
              bg-color4 h-[25vh] w-[95vw] max-w-md
              rounded-[10px]
              border-t-[3px] border-l-[3px] border-b-[6px] border-r-[6px] border-color5
              shadow-xl
              flex flex-col items-center justify-center gap-[2vh]
              p-4
            "
        >
          <button
            type="button"
            className="absolute top-3 right-3 text-2xl"
            onClick={handleClose}
          >
            ×
          </button>

          <label htmlFor="goal" className="font-cabin text-xl">
            Nouvel objectif :
          </label>
          <input
            type="text"
            id="goal"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            required
            placeholder="Ex : 50 pompes"
            className="bg-color1 rounded-[10px] px-[3vw] py-[0.5vh]
              border-t-[2px] border-l-[2px] border-b-[4px] border-r-[4px] border-color5
              font-cabin text-l w-full
              focus:outline-none       
            focus:border-accent1       
              transition-colors duration-150
              "
          />
          <button
            type="submit"
            className="bg-accent2 rounded-[10px] px-[3vw] py-[0.5vh]
              border-t-[2px] border-l-[2px] border-b-[4px] border-r-[4px] border-color5
              font-cabin text-l
              transition-transform duration-100 active:scale-95"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}

Goals.propTypes = {
  refreshCount: PropTypes.number.isRequired,
  onSessionAdded: PropTypes.func.isRequired,
  serverBaseUrl: PropTypes.string.isRequired,
};

export default Goals;
