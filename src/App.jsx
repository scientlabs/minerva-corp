import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Inquiry from "./components/Inquiry";
import Products from "./components/Products";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="font-sans">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<Products />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
