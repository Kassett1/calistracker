import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function NextSession({ onSessionAdded, serverBaseUrl, refreshCount }) {
  const [sessions, setSessions] = useState([]);

  const [displayedSessions, setDisplayedSessions] = useState([]);

  const today = new Date();

  // Calcul de la différence de jour entre aujourd'hui et un autre jour de la semaine
  const week = {
    // Différence de jour entre ajhourd'hui et dimanche par exemple
    Dimanche: (0 + 7 - today.getDay()) % 7,
    Lundi: (1 + 7 - today.getDay()) % 7,
    Mardi: (2 + 7 - today.getDay()) % 7,
    Mercredi: (3 + 7 - today.getDay()) % 7,
    Jeudi: (4 + 7 - today.getDay()) % 7,
    Vendredi: (5 + 7 - today.getDay()) % 7,
    Samedi: (6 + 7 - today.getDay()) % 7,
  };

  // const [displayedSessions, setDisplayedSessions] = useState({
  //   date: new Date(2025, 4, 19),
  //   exercises: ["4*10 Tractions", "4*15 Dips"],
  // });

  const fetchLists = () => {
    const token = localStorage.getItem("token");

    fetch(`${serverBaseUrl}get-sessions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Erreur lors de la récupération des séances");
        return res.json();
      })
      .then((data) => {
        // 1. Parser le JSON venant de la BDD pour que session.days devienne un vrai tableau JS
        const sessionsParsed = data.sessions.map((session) => ({
          ...session,
          days: JSON.parse(session.days), // ex. ["Lundi", "Vendredi"]
        }));

        // 2. Transformer chaque session.days en dates concrètes en utilisant l’objet 'week' pré-calculé
        const sessionsWithDates = sessionsParsed.map((session) => {
          const daysObjects = session.days.map((dayName) => {
            const diff = week[dayName]; // nombre de jours à ajouter
            const d = new Date(today); // copie de la date du jour
            d.setDate(today.getDate() + diff); // on avance de “diff” jours
            return {
              date: d, // ex. Date("mercredi 4 juin 2025")
              diff: diff, // ex. 6 (si aujourd’hui est jeudi)
            };
          });

          return {
            id: session.id,
            user_id: session.user_id,
            name: session.name,
            exercises: session.exercises, // déjà un tableau
            days: daysObjects, // tableau d’objets { date, diff }
          };
        });

        // À présent, chaque “sessionWithDates” ressemble à :
        // {
        //   id: "1",
        //   user_id: "3",
        //   name: "Séance A",
        //   exercises: ["4*10 Tractions", "4*15 Dips"],
        //   days: [
        //     { date: Date("prochain Mercredi"), diff: 6 },
        //     { date: Date("prochain Samedi"),   diff: 2 }
        //   ]
        // }

        // 3. Sélectionner uniquement la ou les séances les plus proches d'aujourd'hui
        //    On part de sessionsWithDates : chaque session.days est un tableau d’objets {date, diff}.
        //    Pour chaque séance, on ne garde que la date qui a le plus petit “diff”, puis on compare ces “diff” entre sessions.

        let best = []; // contiendra la ou les séances les plus proches d'aujourd'hui

        sessionsWithDates.forEach((session) => {
          // Sélectionne la plus petite "diff" parmi tous les jours de cette séance
          const minForThisSession = session.days.reduce(
            (acc, obj) => {
              return obj.diff < acc.diff ? obj : acc;
            },
            { date: null, diff: 1000 }
          );

          // Si c’est la première séance qu’on traite, on l’ajoute à `best`
          if (best.length === 0) {
            best.push({
              ...session,
              next: minForThisSession,
            });
          } else {
            // Compare sa "diff" avec celle de la première séance dans `best`
            const currentBestDiff = best[0].next.diff;
            const thisDiff = minForThisSession.diff;

            if (thisDiff < currentBestDiff) {
              // on a trouvé une séance encore plus proche → on réinitialise
              best = [
                {
                  ...session,
                  next: minForThisSession,
                },
              ];
            } else if (thisDiff === currentBestDiff) {
              // même “diff” : il y a plusieurs séances ex-aequo → on les accumule
              best.push({
                ...session,
                next: minForThisSession,
              });
            }
          }
        });

        // À ce stade, `best` est un tableau contenant la ou les séances dont
        // la plus petite “diff” est la plus faible de tout le lot.

        setSessions(sessionsWithDates); // si tu veux garder l’historique complet
        setDisplayedSessions(best); // ici, on stocke uniquement la ou les prochaines séances
        onSessionAdded();
      })
      .catch((err) => {
        console.error("Erreur fetch :", err);
      });
  };

  const handleFinish = () => {
    const token = localStorage.getItem("token");

    const date = displayedSessions.date;
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    fetch(`${serverBaseUrl}add-date`, {
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

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    console.log(displayedSessions);
  }, [refreshCount]);

  return (
    <div
      className="border-t-[3px] border-l-[3px] border-b-[6px] border-r-[6px] 
    border-color5 shadow-lg bg-color4 rounded-[10px] mx-[5vw] my-[3vh]"
    >
      <h2 className="bg-color3 text-center rounded-t-[5px] border-b-[3px] border-color5 px-[5vw] py-[2vh] current-date font-luckiest text-3xl">
        Prochaines séances
      </h2>
      {displayedSessions.map((session) => (
        <div className="flex flex-col items-center gap-[2vh]">
          <p className="mt-[2vh] current-date font-cabin text-xl">date</p>
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
      ))}
    </div>
  );
}

NextSession.propTypes = {
  onSessionAdded: PropTypes.func.isRequired,
  serverBaseUrl: PropTypes.string.isRequired,
  refreshCount: PropTypes.number.isRequired,
};

export default NextSession;
