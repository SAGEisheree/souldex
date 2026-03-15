import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./things/homePage.jsx";
import About from "./things/about.jsx";

import MentalAge from "./things/mentalage/mentalAge.jsx";
import MentalSubmit from "./things/mentalage/mentalsubmit.jsx";

import Friend from "./things/friend/friend.jsx";
import friendSubmit from "./things/friend/friendSubmit.jsx";

const App = () => {
  return (
    <>


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mentalage" element={<MentalAge />} />
        <Route path="/mentalsubmit" element={<MentalSubmit />} />
        <Route path="/about" element={<About />} />

        <Route path="/friend" element={<Friend />} />
        <Route path="/friendsubmit" element={<friendSubmit />} />
      </Routes>
    </>
  );
};

export default App;