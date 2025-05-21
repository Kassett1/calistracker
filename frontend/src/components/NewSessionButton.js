import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function NewSessionButton({onSessionAdded, serverBaseUrl}) {
  const [newSession, setNewSession] = useState({
    name: "",
    days: [],
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpen = () => {
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setNewSession({
      name: "",
      days: [],
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    fetch(`${serverBaseUrl}add-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: newSession.name,
        days: newSession.days,
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

  return (
    <div className="flex flex-col items-center gap-[1vh] mb-[15vh]">
      <h2 className="font-luckiest text-3xl">Ajouter une séance</h2>
      <button
        className="
     bg-accent2
     rounded-full
     w-10 h-10 
     border-[3px] border-color5
     flex items-center justify-center 
     font-luckiest text-3xl
     my-[2vh]
     "
        onClick={handleOpen}
      >
        +
      </button>

      {/* Popup du formulaire */}
      <form
        onSubmit={(e) => handleSubmit(e)}
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
              bg-color4 h-[50vh] w-[95vw] max-w-md
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
            onClick={handleClose}
          >
            ×
          </button>

          <label htmlFor="exercise" className="font-cabin text-xl">
            Nom de la séance :
          </label>
          <input
            type="text"
            id="name"
            value={newSession.name}
            onChange={(e) =>
              setNewSession((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="Nom de la séance"
            className="bg-color1 rounded-[10px] px-[3vw] py-[0.5vh]
              border-t-[2px] border-l-[2px] border-b-[4px] border-r-[4px] border-color5
              font-cabin text-l w-full
              focus:outline-none       
            focus:border-accent1       
              transition-colors duration-150
              "
          />

          <p className="font-cabin text-xl">Jour(s) de la séance :</p>
          <div className="flex gap-[3vw] flex-wrap">
            {[
              "Lundi",
              "Mardi",
              "Mercredi",
              "Jeudi",
              "Vendredi",
              "Samedi",
              "Dimanche",
            ].map((day) => (
              <label key={day} className="flex gap-[1vw] font-cabin">
                <input
                  type="checkbox"
                  value={day}
                  checked={newSession.days.includes(day)}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    setNewSession((prev) => {
                      const newDays = checked
                        ? [...prev.days, value]
                        : prev.days.filter((d) => d !== value);
                      return { ...prev, days: newDays };
                    });
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
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}

NewSessionButton.propTypes = {
  refreshCount: PropTypes.number.isRequired,
  serverBaseUrl: PropTypes.string.isRequired,
};

export default NewSessionButton;
