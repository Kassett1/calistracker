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
      <div>
        <div>
          <button
            onClick={handleLogin}
            className={`
              rounded-[10px] px-[3vw] py-[0.5vh]
              border-t-[2px] border-l-[2px] border-b-[4px] border-r-[4px] border-color5
              font-cabin text-l
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
              font-cabin text-l
              transition-colors duration-200 transition-transform duration-100 active:scale-95 
              ${mode === "signup" ? "bg-accent1" : "bg-accent2"}
            `}
          >
            S'inscrire
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email :</label>
            <input
              type="mail"
              name="email"
              id="email"
              required
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <input type="submit" value="Valider" />
        </form>
        <button onClick={handleDisconnect}>Déconnexion</button>
      </div>
      <Menu />
    </>
  );
}

export default Login;
