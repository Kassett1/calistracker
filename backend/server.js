// 📦 Import des modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
const jwtSecret = process.env.JWT_SECRET;
const saltRounds = 10;
const verifyToken = require("./authMiddleware");

// 🔐 Routes
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

app.post("/signup", (req, res) => {
  console.log("\n----------------------------------------");

  const email = req.body.email;
  const password = req.body.password;

  // 🔐 Générer le sel et hasher le mot de passe
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      console.error("❌ Erreur lors de la génération du sel :", err);
      return res
        .status(500)
        .json({ success: false, message: "Erreur serveur" });
    }

    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        console.error("❌ Erreur lors du hash du mot de passe :", err);
        return res
          .status(500)
          .json({ success: false, message: "Erreur serveur" });
      }

      // 🔍 Vérifier si un utilisateur avec le même email existe déjà
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, results) => {
          if (err) {
            console.error(
              "❌ Erreur lors de la vérification des utilisateurs :",
              err
            );
            return res
              .status(500)
              .json({ success: false, message: "Erreur serveur" });
          }

          if (results.length > 0) {
            console.log("⚠️   Utilisateur déjà existant, inscription refusée.");
            return res.json({ success: false, message: "Email déjà utilisé" });
          }

          // ✅ Insérer l'utilisateur avec le mot de passe hashé
          connection.query(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email, hash],
            (err) => {
              if (err) {
                console.error(
                  "❌ Erreur lors de l'insertion de l'utilisateur :",
                  err
                );
                return res
                  .status(500)
                  .json({ success: false, message: "Erreur serveur" });
              } else {
                console.log("👤 Utilisateur inscrit avec succès !");
                return res.json({
                  success: true,
                  message: "Utilisateur inscrit",
                });
              }
            }
          );
        }
      );
    });
  });
});

app.post("/login", (req, res) => {
  console.log("\n----------------------------------------");
  const email = req.body.email;
  const password = req.body.password;

  // 1️⃣ Recherche l'utilisateur par email
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("❌ Erreur lors de la requête SQL :", err);
        return res
          .status(500)
          .json({ success: false, message: "Erreur serveur" });
      }

      if (results.length === 0) {
        console.log("❌ Utilisateur non trouvé");
        return res.json({ success: false, message: "Utilisateur non trouvé" });
      }

      const user = results[0]; // contient user.password (le hash)

      // 2️⃣ Compare le mot de passe clair avec le hash
      bcrypt.compare(password, user.password, (errCompare, isMatch) => {
        if (errCompare) {
          console.error("❌ Erreur bcrypt :", errCompare);
          // Renvoie une 500 si bcrypt plante
          return res
            .status(500)
            .json({ success: false, message: "Erreur serveur" });
        }

        if (isMatch) {
          console.log("✅ Mot de passe correct, génération du token");
          // 3️⃣ Génération du token JWT
          const token = jwt.sign({ userId: user.id }, jwtSecret);
          return res.json({ success: true, token });
        } else {
          console.log("❌ Mot de passe incorrect");
          return res.json({
            success: false,
            message: "Mot de passe incorrect",
          });
        }
      });
    }
  );
});

app.post("/add-session", verifyToken, (req, res) => {
  console.log("\n----------------------------------------");

  // 1️⃣ Récupère la date envoyée par le client
  const rawDate = req.body.date;
  const date = new Date(rawDate);
  date.setHours(0, 0, 0, 0); // neutralise l’heure pour ne comparer que la date

  // 2️⃣ Calcule l’état selon si la séance est passée ou non
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const state = today <= date ? "faite" : "ratee";

  // 3️⃣ Formate la date en YYYY-MM-DD pour MySQL
  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  // 4️⃣ Récupère l'userId depuis le token
  const userId = req.userId;

  // 5️⃣ Vérifie si la date existe déjà pour cet utilisateur
  connection.query(
    "SELECT * FROM calendar WHERE DATE(date) = ? AND user_id = ?",
    [formattedDate, userId],
    (err, results) => {
      if (err) {
        console.error("❌ Erreur SQL lors de la vérification :", err);
        return res.status(500).json({ message: "Erreur serveur" });
      }

      if (results.length > 0) {
        // 6️⃣ Si déjà présent → renvoie un 409 (conflit) et on arrête
        console.log("⚠️  Séance déjà enregistrée pour cette date");
        return res.status(409).json({ message: "Séance déjà existante" });
      }

      // 7️⃣ Sinon, insère la nouvelle séance
      connection.query(
        "INSERT INTO calendar (date, state, user_id) VALUES (?, ?, ?)",
        [formattedDate, state, userId],
        (err2) => {
          if (err2) {
            console.error("❌ Erreur SQL lors de l'insertion :", err2);
            return res.status(500).json({ message: "Erreur d'insertion" });
          }
          console.log("📅 Séance insérée avec succès !");
          // 8️⃣ Tout s'est bien passé → renvoie un 201 Created
          return res.status(201).json({ message: "Séance ajoutée" });
        }
      );
    }
  );
});

app.get("/get-sessions", verifyToken, (req, res) => {
  console.log("\n➡️ Requête reçue pour /get-sessions");

  // 1. Récupération de l'userId depuis le middleware
  const userId = req.userId;

  // 2. Requête SQL filtrée sur user_id
  connection.query(
    "SELECT * FROM calendar WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("❌ Erreur SQL lors de l'obtention des dates :", err);
        return res.status(500).json({ error: "Erreur serveur" });
      }

      // 3. Construction des deux tableaux de dates
      const successDates = [];
      const failDates = [];

      results.forEach((session) => {
        const d = new Date(session.date);
        // Gère plus proprement le 0 devant les jours/mois < 10
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const formattedDate = `${yyyy}-${mm}-${dd}`;

        if (session.state === "faite") {
          successDates.push(formattedDate);
        } else {
          failDates.push(formattedDate);
        }
      });

      // 4. Envoi de la réponse JSON
      return res.json({ successDates, failDates });
    }
  );
});

app.post("/add-goal", verifyToken, (req, res) => {
  console.log("\n----------------------------------------");

  // Récupère l'objectif envoyée par le client
  const newGoal = req.body.goal;

  // Récupère l'userId depuis le token
  const userId = req.userId;

  // Vérifie si l'objectif existe déjà pour cet utilisateur
  connection.query(
    "SELECT * FROM goals WHERE goal = ? AND user_id = ?",
    [newGoal, userId],
    (err, results) => {
      if (err) {
        console.error("❌ Erreur SQL lors de la vérification :", err);
        return res.status(500).json({ message: "Erreur serveur" });
      }

      if (results.length > 0) {
        // Si déjà présent → renvoie un 409 (conflit) et on arrête
        console.log("⚠️  Objectif déjà enregistrée pour cette date");
        return res.status(409).json({ message: "Objectif déjà existant" });
      }

      // Sinon, insère le nouvel objectif
      connection.query(
        "INSERT INTO goals (goal, user_id) VALUES (?, ?)",
        [newGoal, userId],
        (err2) => {
          if (err2) {
            console.error("❌ Erreur SQL lors de l'insertion :", err2);
            return res.status(500).json({ message: "Erreur d'insertion" });
          }
          console.log("📅 Objectif inséré avec succès !");
          // Tout s'est bien passé → renvoie un 201 Created
          return res.status(201).json({ message: "Objectif ajouté" });
        }
      );
    }
  );
});

app.get("/get-goals", verifyToken, (req, res) => {
  console.log("\n➡️ Requête reçue pour /get-goals");

  // 1. Récupération de l'userId depuis le middleware
  const userId = req.userId;

  // 2. Requête SQL filtrée sur user_id
  connection.query(
    "SELECT * FROM goals WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("❌ Erreur SQL lors de l'obtention des objectifs :", err);
        return res.status(500).json({ error: "Erreur serveur" });
      }

      // 3. Construction du tableau des objectifs
      const goals = results.map((g) => ({
        id: g.id,
        goal: g.goal,
      }));

      // 4. Envoi de la réponse JSON
      return res.json({ goals });
    }
  );
});

app.delete("/delete-goal/:id", verifyToken, (req, res) => {
  console.log("\n----------------------------------------");
  console.log("\n➡️ DELETE /delete-goal/:id");
  const userId = req.userId;
  const goalId = req.params.id;

  connection.query(
    "DELETE FROM goals WHERE user_id = ? AND id = ?",
    [userId, goalId],
    (err, result) => {
      if (err) {
        console.error("❌ Erreur SQL lors de la suppression :", err);
        return res.status(500).json({ message: "Erreur serveur" });
      }
      if (result.affectedRows === 0) {
        // Aucun objectif supprimé = pas trouvé ou pas à cet utilisateur
        return res.status(404).json({ message: "Objectif non trouvé" });
      }
      console.log("✅ Objectif supprimé avec succès !");
      return res.status(200).json({ message: "Objectif supprimé" });
    }
  );
});
