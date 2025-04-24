import React, { useState } from "react";

function Goals() {
  return (
    <div
      className="border-t-[2px] border-l-[2px] border-b-[4px] border-r-[4px] 
        border-color5 shadow-lg bg-color4 rounded-[10px] mx-[5vw] my-[3vh]"
    >
      <h2 className="bg-color3 text-center rounded-t-[7px] border-b-[2px] border-color5">
        Tableau des objectifs
      </h2>
      <ul>
        <li className="border-b-[2px] border-color5 px-[5vw] py-[1vh] flex justify-between">
          4*10 Tractions <button>x</button>
        </li>
        <li className="border-b-[2px] border-color5 px-[5vw] py-[1vh] flex justify-between">
          4*15 Dips <button>x</button>
        </li>
      </ul>
      <div className="flex justify-center">
        <button className="bg-accent2 rounded-[50%] p-[3vw] py-[0.5vh] border-[3px] border-color5 mb-[2vh] mt-[2vh]">
          +
        </button>
      </div>
    </div>
  );
}

export default Goals;
