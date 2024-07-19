import React from "react";
import Login from "./Login";
import Organize from "./Organize";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Orghome from "./pages/Orghome";
// import Temp from "./Temp";

function App() {
  return (
    <div className="App">
      {/* <Temp /> */}
      {/* <Orghome /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Org" element={<Organize />} />
          <Route path="/myposts" element={<Orghome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
