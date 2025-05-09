import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import Chronometer from "./pages/Chronometer.js";

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
          <Route path="/chrono" element={<Chronometer />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
