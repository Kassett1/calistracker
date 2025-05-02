import React, { useEffect, useState } from "react";

function Login() {
  const [mode, setMode] = useState("login");

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(mode);
  }, [mode]);

  const handleSubmit = (e) => {
    e.preventDefault();

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
          localStorage.setItem("userId", data.userId);
          console.log("Utilisateur connecté !");
        } else {
          console.log("Erreur :", data.message);
        }
        
      });
  };

  const handleLogin = () => {
    setMode("login");
  };

  const handleSignup = () => {
    setMode("signup");
  };

  const handleDisconnect = () => {
    localStorage.removeItem("userId");
  }

  return (
    <div>
      <div>
        <button onClick={handleLogin}>Se connecter</button>
        <button onClick={handleSignup}>S'inscrire</button>
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
  );
}

export default Login;
