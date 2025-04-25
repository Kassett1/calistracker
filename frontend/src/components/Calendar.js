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

  // Récupère la date d'aujourd'hui
  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() &&
    currMonth === today.getMonth() &&
    currYear === today.getFullYear();

  const successDates = ["2025-04-23", "2025-04-20", "2025-03-20"];
  const failDates = ["2025-04-22"];

  const formatDate = (day) => {
    const m = currMonth + 1;
    return `${currYear}-${m < 10 ? "0" + m : m}-${day < 10 ? "0" + day : day}`;
  };

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
      <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh] text-gray-500 font-cabin text-base">
        {lastDayOfLastMonth - i + 1}
      </li>
    );
  }

  // Jours du mois actuel
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = formatDate(i);
    const isSuccess = successDates.includes(dateStr);
    const isFail = failDates.includes(dateStr);
    const isTodayClass = isToday(i) ? "calendar-active text-color1" : "";

    const bgIcon = isSuccess ? "calendar-fail" : isFail ? "calendar-validate" : "";

    calendarDays.push(
      <li
        key={i}
        className={`w-[calc(100%/7)] mt-[1vh] mb-[1vh] font-cabin text-lg ${isTodayClass} ${bgIcon}`}
      >
        {i}
      </li>
    );
  }

  // Jours du mois suivant à afficher (gris), seulement si le dernier jour n’est pas un dimanche
  if (lastDayOfMonth !== 6) {
    for (let i = 1; i <= 6 - lastDayOfMonth; i++) {
      calendarDays.push(
        <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh] text-gray-500 font-cabin text-base">{i}</li>
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
    <div
      className="flex items-center justify-center border-t-[3px] border-l-[3px] border-b-[6px] border-r-[6px] 
    border-color5 shadow-xl bg-color4 rounded-[10px] mx-[5vw] my-[3vh]"
    >
      <div className="w-full">
        <header className="flex items-center justify-between px-[5vw] py-[2vh] bg-color3 rounded-t-[5px] border-b-[3px] border-color5">
          <button onClick={prevFunction}><img className="w-5 h-5" src="icones/arrow-left.svg" alt="<"/></button>
          <h2 className="current-date font-luckiest text-3xl">
            {months[currMonth]} {currYear}
          </h2>
          <button onClick={nextFunction}><img className="w-5 h-5" src="icones/arrow-right.svg" alt=">"/></button>
        </header>

        <div className="px-[2vw] py-[2vh]">
          {/* En-têtes des jours de la semaine */}
          <ul className="flex flex-wrap text-center">
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh] font-cabin text-xl ">L</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh] font-cabin text-xl ">M</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh] font-cabin text-xl ">M</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh] font-cabin text-xl ">J</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh] font-cabin text-xl ">V</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh] font-cabin text-xl ">S</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh] font-cabin text-xl ">D</li>
          </ul>
          {/* Jours du calendrier (mois précédent + mois courant + mois suivant) */}
          <ul className="flex flex-wrap text-center items-center justify-center">{calendarDays}</ul>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
