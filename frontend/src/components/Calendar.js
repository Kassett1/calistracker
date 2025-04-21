import React, { useState, useRef, useEffect } from "react";

function Calendar() {
  const date = new Date();
  const [currYear, setCurrYear] = useState(date.getFullYear());
  const [currMonth, setCurrMonth] = useState(date.getMonth());

  let daysInMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  let lastDayOfLastMonth = new Date(currYear, currMonth, 0).getDate();
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

  for (let i = firstDayOfMonth; i > 0; i--) {
    calendarDays.push(
      <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh] inactive">
        {lastDayOfLastMonth - i + 1}
      </li>
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(
      <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh]">{i}</li>
    );
  }

  if (lastDayOfMonth !== 6) {
    for (let i = 1; i <= 6 - lastDayOfMonth; i++) {
      calendarDays.push(
        <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh] inactive">
          {i}
        </li>
      );
    }
  }

  const prevFunction = () => {
    if (currMonth == 0) {
      setCurrMonth(11);
      setCurrYear(currYear - 1);
    } else {
      setCurrMonth(currMonth - 1);
    }
  };

  const nextFunction = () => {
    if (currMonth == 11) {
      setCurrMonth(0);
      setCurrYear(currYear + 1);
    } else {
      setCurrMonth(currMonth + 1);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-color4 rounded-[10px]">
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
          <ul className="flex flex-wrap text-center">
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh]">L</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh]">M</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh]">M</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh]">J</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh]">V</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh]">S</li>
            <li className="w-[calc(100%/7)] mt-[1vh] mb-[1vh]">D</li>
          </ul>
          <ul className="flex flex-wrap text-center">{calendarDays}</ul>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
