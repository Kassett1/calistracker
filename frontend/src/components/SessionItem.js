import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function SessionItem({
  session,
  onSessionAdded,
  serverBaseUrl,
}) {
  const [newExercise, setNewExercise] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [days, setDays] = useState(JSON.parse(session.days));
  const [isFormDaysOpen, setIsFormDaysOpen] = useState(false);

  const week = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  const handleDeleteExercise = (exercise) => {
    const token = localStorage.getItem("token");
    fetch(
      `${serverBaseUrl}delete-exercise/${session.id}/${encodeURIComponent(
        exercise
      )}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((r) => {
        if (!r.ok) throw new Error("Suppression échouée");
        return r.json();
      })
      .then(({ message }) => {
        console.log(message);
        onSessionAdded(); // rafraîchir la liste
      })
      .catch((err) => console.error("Erreur fetch :", err));
  };

  const handleDeleteSession = () => {
    const token = localStorage.getItem("token");
    fetch(`${serverBaseUrl}delete-session/${session.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Suppression échouée");
        return r.json();
      })
      .then(({ message }) => {
        console.log(message);
        onSessionAdded(); // rafraîchir la liste
      })
      .catch((err) => console.error("Erreur fetch :", err));
  };

  const handleOpen = () => {
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setNewExercise("");
  };

  function handleSubmitExercise(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    fetch(`${serverBaseUrl}add-exercise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: session.id,
        exercise: newExercise,
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
  }

  const handleSelectDays = () => {
    // setDays([]);
    setIsFormDaysOpen(true);
  };

  const handleCloseDays = () => {
    setDays(JSON.parse(session.days));
    setIsFormDaysOpen(false);
  };

  function handleSubmitDays(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    fetch(`${serverBaseUrl}sessions/${session.id}/days`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ days: days }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Échec de la mise à jour des jours");
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
        onSessionAdded();
      })
      .catch(console.error);

    setIsFormDaysOpen(false);
  }

  useEffect(() => {
    setDays(JSON.parse(session.days));
  }, [session.days]);

  return (
    <div
      key={session.id}
      className="border-t-[3px] border-l-[3px] border-b-[6px] border-r-[6px] border-color5 shadow-lg bg-color4 rounded-[10px] mx-[5vw] my-[3vh]"
    >
      <h2 className="bg-color3 text-center rounded-t-[7px] border-b-[3px] border-color5 font-luckiest text-3xl px-[5vw] py-[2vh]">
        {session.name}
      </h2>
      <ul>
        {session.exercises.map((exercise, index) => (
          <li
            key={index}
            className="border-b-[2px] border-color5 px-[5vw] py-[1vh] flex justify-between items-center"
          >
            <span className="font-cabin text-lg">{exercise}</span>
            <button
              className="ml-4 text-accent1 font-luckiest text-3xl"
              onClick={() => handleDeleteExercise(exercise)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {/* Bouton + pour ouvrir la popup */}
      <div className="grid grid-cols-3 items-center mx-[5vw]">
        <button
          className="w-[8vw] justify-self-start "
          onClick={handleSelectDays}
        >
          <img src="icones/calendar.svg" className="w-full" />
        </button>
        <button
          className="
         bg-accent2
         rounded-full
         w-10 h-10 
         border-[3px] border-color5
         flex items-center justify-center 
         font-luckiest text-3xl
         my-[2vh]
         justify-self-center
         "
          onClick={handleOpen}
        >
          +
        </button>
        <button
          className="w-[8vw] justify-self-end "
          onClick={handleDeleteSession}
        >
          <img src="icones/bin.svg" className="w-full" />
        </button>
      </div>

      {/* Popup du formulaire */}
      <form
        key={session.id}
        onSubmit={(e) => handleSubmitExercise(e, session.id)}
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

          <label htmlFor="exercise" className="font-cabin text-xl">
            Nouvel exercice :
          </label>
          <input
            type="text"
            id="exercise"
            value={newExercise}
            onChange={(e) => setNewExercise(e.target.value)}
            required
            placeholder="Ex : 4*15 pompes"
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
              font-cabin text-l"
          >
            Ajouter
          </button>
        </div>
      </form>

      {/* Popup du formulaire changement jours */}
      <form
        onSubmit={(e) => handleSubmitDays(e)}
        className={`
          fixed inset-0 flex items-center justify-center
          bg-black/50
          z-20
          transition-opacity duration-300
          ${isFormDaysOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <div
          className="
              relative
              bg-color4 h-[35vh] w-[95vw] max-w-md
              rounded-[10px]
              border-t-[3px] border-l-[3px] border-b-[6px] border-r-[6px] border-color5
              shadow-xl
              flex flex-col items-center justify-center gap-[3vh]
              p-4
            "
        >
          <button
            type="button"
            className="absolute top-3 right-3 text-2xl"
            onClick={handleCloseDays}
          >
            ×
          </button>

          <p className="font-cabin text-xl">Jour(s) de la séance :</p>
          <div className="flex gap-[3vw] flex-wrap">
            {week.map((day) => (
              <label key={day} className="flex gap-[1vw] font-cabin">
                <input
                  type="checkbox"
                  value={day}
                  checked={days.includes(day)}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    setDays((prev) =>
                      checked
                        ? [...prev, value]
                        : prev.filter((d) => d !== value)
                    );
                  }}
                />
                {day}
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="bg-accent2 rounded-[10px] px-[3vw] py-[0.5vh]
              border-t-[2px] border-l-[2px] border-b-[4px] border-r-[4px] border-color5
              font-cabin text-l"
          >
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
}

SessionItem.propTypes = {
  onSessionAdded: PropTypes.func.isRequired,
  serverBaseUrl: PropTypes.string,
  session: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    exercises: PropTypes.arrayOf(PropTypes.string).isRequired,
    day: PropTypes.string,
  }).isRequired,
};
