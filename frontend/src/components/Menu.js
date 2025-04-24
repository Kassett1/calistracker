import React, { useState } from "react";

function Goals() {
  return (
    <div className="bg-color5 sticky bottom-0">
        <ul className="flex gap-[3vw] justify-between px-[5vw] relative bottom-[3vh]">
            <li className="bg-color4 rounded-[50%] p-[6vw] py-[2vh] border-[3px] border-color5">A</li>
            <li className="bg-color4 rounded-[50%] p-[6vw] py-[2vh] border-[3px] border-color5">B</li>
            <li className="bg-color4 rounded-[50%] p-[6vw] py-[2vh] border-[3px] border-color5">C</li>
            <li className="bg-color4 rounded-[50%] p-[6vw] py-[2vh] border-[3px] border-color5">D</li>
        </ul>
    </div>
  );
}

export default Goals;
