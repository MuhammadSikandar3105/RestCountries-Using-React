import React from "react";
import Header from "./components/Header";
import "./index.css";
import Maincontent from "./components/Maincontent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpecificCountry from "./components/SpecificCountry";

const App = () => {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Maincontent />} />
        <Route path="/:country" element={<SpecificCountry />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
