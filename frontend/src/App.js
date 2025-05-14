import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import Chronometer from "./pages/Chronometer.js";
import SessionsPage from "./pages/SessionsPage.js";

function App() {
  const [refreshCount, setRefreshCount] = useState(0);

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Home
                refreshCount={refreshCount}
                onSessionAdded={() => setRefreshCount((c) => c + 1)}
              />
            }
          />
          sessions
          <Route path="/chrono" element={<Chronometer />} />s
          <Route
            path="/sessions"
            element={
              <SessionsPage
                refreshCount={refreshCount}
                onSessionAdded={() => setRefreshCount((c) => c + 1)}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
