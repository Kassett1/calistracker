import React, { useState } from "react";

function Calendar() {
  const date = new Date();
  const [currYear, setCurrYear] = useState(date.getFullYear()); // Année actuelle
  const [currMonth, setCurrMonth] = useState(date.getMonth()); // Mois actuel (0 = janvier)

  // Nombre de jours dans le mois actuel
  let daysInMonth = new Date(currYear, currMonth + 1, 0).getDate();

  // Jour de la semaine du 1er du mois (0 = dimanche, 6 = samedi)
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  // Réajustement : on veut que lundi = 0, dimanche = 6
  firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Dernier jour du mois précédent (pour afficher les jours grisés avant le 1er)
  let lastDayOfLastMonth = new Date(currYear, currMonth, 0).getDate();

  // Jour de la semaine du dernier jour du mois (pareil : lundi = 0, dimanche = 6)
  let lastDayOfMonth = new Date(currYear, currMonth + 1, 0).getDay();
  lastDayOfMonth = lastDayOfMonth === 0 ? 6 : lastDayOfMonth - 1;

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const calendarDays = [];

  // Jours du mois précédent à afficher (gris)
  for (let i = firstDayOfMonth; i > 0; i--) {
    calendarDays.push(
      <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh] inactive">
        {lastDayOfLastMonth - i + 1}
      </li>
    );
  }

  // Jours du mois actuel
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(
      <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh]">{i}</li>
    );
  }

  // Jours du mois suivant à afficher (gris), seulement si le dernier jour n’est pas un dimanche
  if (lastDayOfMonth !== 6) {
    for (let i = 1; i <= 6 - lastDayOfMonth; i++) {
      calendarDays.push(
        <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh] inactive">{i}</li>
      );
    }
  }

  // Fonction pour passer au mois précédent
  const prevFunction = () => {
    if (currMonth === 0) {
      setCurrMonth(11);
      setCurrYear(currYear - 1);
    } else {
      setCurrMonth(currMonth - 1);
    }
  };

  // Fonction pour passer au mois suivant
  const nextFunction = () => {
    if (currMonth === 11) {
      setCurrMonth(0);
      setCurrYear(currYear + 1);
    } else {
      setCurrMonth(currMonth + 1);
    }
  };

  return (
    <div className="flex items-center justify-center border-t-[2px] border-l-[2px] border-b-[4px] border-r-[4px] 
    border-color5 shadow-lg bg-color4 rounded-[10px] mx-[5vw] my-[3vh]">
      <div>
        <header className="flex items-center justify-between px-[2vw] py-[2vh]">
          <p className="current-date">
            {months[currMonth]} {currYear}
          </p>
          <div>
            <button onClick={prevFunction}>L</button>
            <button onClick={nextFunction}>R</button>
          </div>
        </header>

        <div className="px-[2vw] py-[2vh]">
          {/* En-têtes des jours de la semaine */}
          <ul className="flex flex-wrap text-center">
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh]">L</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh]">M</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh]">M</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh]">J</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh]">V</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh]">S</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh]">D</li>
          </ul>
          {/* Jours du calendrier (mois précédent + mois courant + mois suivant) */}
          <ul className="flex flex-wrap text-center">{calendarDays}</ul>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
