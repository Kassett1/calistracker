self.addEventListener("install", event => {
    console.log("Service worker installé.");
  });
  
  self.addEventListener("fetch", event => {
    // Tu peux intercepter les requêtes ici
  });
  