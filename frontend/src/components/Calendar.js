import React, { useState, useEffect } from "react";

function Calendar() {
  const date = new Date();
  const [currYear, setCurrYear] = useState(date.getFullYear());
  const [currMonth, setCurrMonth] = useState(date.getMonth());

  const daysInMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const lastDayOfLastMonth = new Date(currYear, currMonth, 0).getDate();
  let lastDayOfMonth = new Date(currYear, currMonth + 1, 0).getDay();
  lastDayOfMonth = lastDayOfMonth === 0 ? 6 : lastDayOfMonth - 1;

  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() &&
    currMonth === today.getMonth() &&
    currYear === today.getFullYear();

  const [successDates, setSuccessDates] = useState([]);
  const [failDates, setFailDates] = useState([]);

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

  const prevDays = Array.from(
    { length: firstDayOfMonth },
    (_, i) => lastDayOfLastMonth - firstDayOfMonth + i + 1
  );
  const currDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const nextDays = Array.from(
    { length: lastDayOfMonth !== 6 ? 6 - lastDayOfMonth : 0 },
    (_, i) => i + 1
  );

  // Fonctions changement de mois
  const prevFunction = () => {
    if (currMonth === 0) {
      setCurrMonth(11);
      setCurrYear(currYear - 1);
    } else {
      setCurrMonth(currMonth - 1);
    }
  };

  const nextFunction = () => {
    if (currMonth === 11) {
      setCurrMonth(0);
      setCurrYear(currYear + 1);
    } else {
      setCurrMonth(currMonth + 1);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/get-sessions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Erreur lors de la récupération des sessions");
        return res.json();
      })
      .then((data) => {
        setSuccessDates(data.successDates);
        setFailDates(data.failDates);
      })
      .catch((err) => {
        console.error("Erreur fetch :", err);
      });
  }, []);

  return (
    <div className="flex items-center justify-center border-t-[3px] border-l-[3px] border-b-[6px] border-r-[6px] border-color5 shadow-xl bg-color4 rounded-[10px] mx-[5vw] my-[3vh]">
      <div className="w-full">
        <header className="flex items-center justify-between px-[5vw] py-[2vh] bg-color3 rounded-t-[5px] border-b-[3px] border-color5">
          <button onClick={prevFunction}>
            <img className="w-5 h-5" src="icones/arrow-left.svg" alt="<" />
          </button>
          <h2 className="current-date font-luckiest text-3xl">
            {months[currMonth]} {currYear}
          </h2>
          <button onClick={nextFunction}>
            <img className="w-5 h-5" src="icones/arrow-right.svg" alt=">" />
          </button>
        </header>

        <div className="px-[2vw] py-[2vh]">
          {/* En-têtes des jours */}
          <ul className="flex flex-wrap text-center">
            {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
              <li
                key={index}
                className="w-[calc(100%/7)] mt-[1vh] mb-[1vh] font-cabin text-xl"
              >
                {day}
              </li>
            ))}
          </ul>

          {/* Jours du calendrier */}
          <ul className="flex flex-wrap text-center items-center justify-center">
            {/* Jours du mois précédent */}
            {prevDays.map((day, index) => (
              <li
                key={`prev-${index}`}
                className="w-[calc(100%/7)] mt-[1vh] mb-[1vh] text-gray-500 font-cabin text-base"
              >
                {day}
              </li>
            ))}

            {/* Jours du mois courant */}
            {currDays.map((day) => {
              const dateStr = formatDate(day);
              const isSuccess = successDates.includes(dateStr);
              const isFail = failDates.includes(dateStr);
              const isTodayClass = isToday(day)
                ? "calendar-active text-color1"
                : "";
              const bgIcon = isSuccess
                ? "calendar-validate"
                : isFail
                ? "calendar-fail"
                : "";

              return (
                <li
                  key={`curr-${day}`}
                  className={`w-[calc(100%/7)] mt-[1vh] mb-[1vh] font-cabin text-lg ${isTodayClass} ${bgIcon}`}
                >
                  {day}
                </li>
              );
            })}

            {/* Jours du mois suivant */}
            {nextDays.map((day, index) => (
              <li
                key={`next-${index}`}
                className="w-[calc(100%/7)] mt-[1vh] mb-[1vh] text-gray-500 font-cabin text-base"
              >
                {day}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ul>
        {failDates.map((day, index) => {
          <li>{index}</li>;
        })}
      </ul>
    </div>
  );
}

export default Calendar;
