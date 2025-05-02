import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.js";
import Home from "./pages/Home.js";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
