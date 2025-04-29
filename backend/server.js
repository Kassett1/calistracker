// 📦 Import des modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

// 🌐 Configuration de la connexion MySQL
const connection = mysql.createConnection({
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

// 🔌 Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error("\n❌ Erreur de connexion à la base de données:", err);
  } else {
    console.log("\n✅ Connecté à la base de données !");
  }
});

// 🌍 Routes
app.listen(port, () => {
  console.log(`\n🚀 Serveur lancé sur http://localhost:${port}`);
});

app.post("/add-session", (req, res) => {
  console.log("\n----------------------------------------");
  console.log("\nDate de séance : " + req.body.date);

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
    "SELECT * FROM calendrier WHERE DATE(date) = ?",
    [formattedDate],
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
        "INSERT INTO calendrier (date, etat) VALUES (?, ?)",
        [formattedDate, etat],
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

  res.send("Séance reçue !");
});
