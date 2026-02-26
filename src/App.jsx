import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./things/homePage.jsx";
import MentalAge from "./things/mentalAge.jsx";
import About from "./things/about.jsx";
import Response1 from "./things/response1.jsx";
import MentalSubmit from "./things/mentalsubmit.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mentalage" element={<MentalAge />}/>
      <Route path="/response" element={<Response1 />} />
      <Route path="/mentalsubmit" element={<MentalSubmit />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default App;