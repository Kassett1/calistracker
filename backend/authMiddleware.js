const jwt = require("jsonwebtoken");

// Middleware pour vérifier le JWT dans l'en-tête Authorization
function verifyToken(req, res, next) {
    // 1. Récupérer l'en-tête
    const authHeader = req.headers["authorization"];
  
    // 2. Vérifier qu'il existe et commence bien par "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token manquant" });
    }
  
    // 3. Extraire le token (tout ce qui suit "Bearer ")
    const token = authHeader.split(" ")[1];
  
    // 4. Vérifier le token et en extraire le payload
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        // 5a. Si le token est invalide ou expiré
        console.log("⚠️ Le token est invalide ou expiré");
        return res.status(403).json({ message: "Token invalide" });
      }
  
      // 5b. Si tout est OK, on stocke l'userId et on passe à la suite
      req.userId = payload.userId;
      next();
    });
  }

module.exports = verifyToken;