import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";

function Login() {
  const [mode, setMode] = useState("login");

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "login") {
      fetch(`http://localhost:3001/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem("token", data.token);
            console.log("Utilisateur connecté !");
            navigate("/");
          } else {
            console.log("Erreur :", data.message);
          }
        });
    } else {
      fetch(`http://localhost:3001/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }).then((res) => res.json());
    }
  };

  const handleLogin = () => {
    setMode("login");
  };

  const handleSignup = () => {
    setMode("signup");
  };

  const handleDisconnect = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col gap-[10vh] mx-[10vw]">
        <div className="flex justify-center gap-[5vw]">
          <button
            onClick={handleLogin}
            className={`
              rounded-[10px] px-[3vw] py-[0.5vh]
              border-t-[2px] border-l-[2px] border-b-[4px] border-r-[4px] border-color5
              font-cabin text-lg
              transition-colors duration-200 transition-transform duration-100 active:scale-95
              ${mode === "login" ? "bg-accent1" : "bg-accent2"}
          `}
          >
            Se connecter
          </button>

          <button
            onClick={handleSignup}
            className={`
              rounded-[10px] px-[3vw] py-[0.5vh]
              border-t-[2px] border-l-[2px] border-b-[4px] border-r-[4px] border-color5
              font-cabin text-lg
              transition-colors duration-200 transition-transform duration-100 active:scale-95 
              ${mode === "signup" ? "bg-accent1" : "bg-accent2"}
            `}
          >
            S'inscrire
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[3vh] items-center"
        >
          <div className="flex gap-[1vw] items-center">
            <label htmlFor="email" className="font-cabin text-lg">
              Email :
            </label>
            <input
              type="mail"
              name="email"
              id="email"
              className="bg-color1 rounded-[10px] px-[1vw] py-[0.5vh]
              border-t-[2px] border-l-[2px] border-b-[4px] border-r-[4px] border-color5
              font-cabin 
              text-sm
              w-[50vw]
              focus:outline-none       
            focus:border-accent1       
              transition-colors duration-150"
              required
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex gap-[1vw] items-center">
            <label htmlFor="password" className="font-cabin text-lg">
              Mot de passe :
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-color1 rounded-[10px] px-[1vw] py-[0.5vh]
              border-t-[2px] border-l-[2px] border-b-[4px] border-r-[4px] border-color5
              font-cabin
              text-sm
              w-[50vw]
              focus:outline-none       
            focus:border-accent1       
              transition-colors duration-150"
              required
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <button
            type="submit"
            className="bg-accent2 rounded-[10px] px-[3vw] py-[0.5vh] border-t-[2px] border-l-[2px] border-b-[4px] border-r-[4px] 
          border-color5 font-cabin w-fit
          transition-transform duration-100 active:scale-95"
          >
            Valider
          </button>
        </form>
        <button
          onClick={handleDisconnect}
          className="bg-accent1 rounded-[10px] px-[3vw] py-[0.5vh] border-t-[2px] border-l-[2px] border-b-[4px] border-r-[4px] 
          border-color5 font-cabin
          transition-transform duration-100 active:scale-95"
        >
          Déconnexion
        </button>
      </div>
      <Menu />
    </>
  );
}

export default Login;
