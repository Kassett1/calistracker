// 📦 Import des modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

// 🌐 Configuration de la connexion MySQL
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 🚀 Initialisation de l'app
const app = express();
const port = 3001;

// 🔐 Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// 🌍 Routes
app.listen(port, () => {
  console.log(`\n🚀 Serveur lancé sur http://localhost:${port}`);
});

app.post("/add-session", (req, res) => {
  console.log("\n----------------------------------------");
  // console.log("\nDate de séance : " + req.body.date);

  const date = new Date(req.body.date);
  date.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const etat = today <= date ? "faite" : "ratee";

  // Formatage manuel sans décalage UTC
  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  connection.query(
    "SELECT * FROM calendrier WHERE DATE(date) = ? and user_id = ?",
    [formattedDate, req.body.userId],
    (err, results) => {
      if (err) {
        console.error("❌ Erreur lors de la vérification de la date :", err);
        return;
      }

      if (results.length > 0) {
        console.log(
          "⚠️  Une séance existe déjà pour cette date, aucune insertion faite."
        );
        return;
      }

      connection.query(
        "INSERT INTO calendrier (date, etat, user_id) VALUES (?, ?, ?)",
        [formattedDate, etat, req.body.userId],
        (err) => {
          if (err) {
            console.error("❌ Erreur lors de l'insertion de la séance :", err);
          } else {
            console.log("📅 Séance insérée avec succès !");
          }
        }
      );
    }
  );
});

app.get("/get-sessions", (req, res) => {
  console.log("\n----------------------------------------");
  console.log("\n➡️ Requête reçue pour /get-sessions");
  connection.query("SELECT * FROM calendrier", (err, results) => {
    if (err) {
      console.error("❌ Erreur lors de l'obtention des dates :", err);
      res.status(500).json({ error: "Erreur serveur" });
      return;
    }

    const successDates = [];
    const failDates = [];

    results.forEach((session) => {
      const date = new Date(session.date);
      const year = date.getFullYear();
      const month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const formattedDate = `${year}-${month}-${day}`;

      if (session.etat === "faite") {
        successDates.push(formattedDate);
      } else {
        failDates.push(formattedDate);
      }
    });

    res.setHeader("Content-Type", "application/json");
    res.json({ successDates, failDates });
  });
});

app.post("/signup", (req, res) => {
  console.log("\n----------------------------------------");
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error(
          "❌ Erreur lors de la vérification des utilisateurs :",
          err
        );
        return;
      }

      if (results.length > 0) {
        console.log(
          "\n⚠️  Un utilisateur existe déjà pour cette adresse mail, aucune insertion faite."
        );
        return;
      }

      connection.query(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, password],
        (err) => {
          if (err) {
            console.error(
              "❌ Erreur lors de l'insertion de l'utilisateur ':",
              err
            );
          } else {
            console.log("\n👤 Utilisateur inséré avec succès !");
          }
        }
      );
    }
  );
});

app.post("/login", (req, res) => {
  console.log("\n----------------------------------------");
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("❌ Erreur lors de la requête :", err);
        return res
          .status(500)
          .json({ success: false, message: "Erreur serveur" });
      }

      if (results.length === 0) {
        // Aucun utilisateur trouvé
        console.log("\n❌ Utilisateur non trouvé")
        return res.json({ success: false, message: "Utilisateur non trouvé" });
      }

      const user = results[0];

      if (user.password === password) {
        // Mot de passe correct
        console.log("\n✅ Utilisateur trouvé")
        return res.json({ success: true, userId: user.id });
      } else {
        // Mauvais mot de passe
        console.log("\n❌ Mot de passe incorrect")
        return res.json({ success: false, message: "Mot de passe incorrect" });
      }
    }
  );
});
