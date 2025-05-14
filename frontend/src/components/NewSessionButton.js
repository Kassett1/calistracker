import React, { useState } from "react";

export default function NewSessionButton({ }) {

    const handleSubmitList = () => {};

    const handleDeleteList = () => {};
  
  return (
    <div className="flex flex-col items-center gap-[1vh]">
    <h2 className="font-luckiest text-3xl">
      Ajouter une séance
    </h2>
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
      //onClick={handleOpen}
    >
      +
    </button>
  </div>
  );
}
