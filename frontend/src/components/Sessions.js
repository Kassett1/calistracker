import React, { useState } from "react";

function Sessions() {
  return (
    <div
      className="border-t-[2px] border-l-[2px] border-b-[4px] border-r-[4px] 
    border-color5 shadow-lg bg-color4 rounded-[10px] mx-[5vw] my-[3vh]"
    >
      <h2 className="bg-color3 text-center rounded-t-[7px] border-b-[2px] border-color5">Prochaine séance</h2>
      <div className="flex flex-col items-center gap-[2vh]">
        <p className="mt-[2vh]">Lundi 14/04</p>
        <ul>
          <li>4*10 Tractions</li>
          <li>4*15 Dips</li>
        </ul>
        <button
          className="bg-accent2 rounded-[10px] px-[3vw] py-[0.5vh] border-t-[2px] border-l-[2px] border-b-[4px] border-r-[4px] 
    border-color5 mb-[2vh]"
        >
          Terminée
        </button>
      </div>
    </div>
  );
}

export default Sessions;
