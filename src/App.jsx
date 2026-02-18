import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

// --- EDITABLE CONFIGURATION ---
const UI_TEXT = {
  university: "SHIVAJI UNIVERSITY, KOLHAPUR",
  examName: "Online Statement of Marks for : BA. LLB Part 3 Semester 7 (Semester-7)",
  examSession: "Examination : Dec - 2025",
  footerText: "© 2025 Shivaji University, Kolhapur. All rights reserved."
};

const ASSETS = {
  logo: "/assets/uni_logo.png",
  resultCard: "/assets/result.jpeg"
};

// --- LANDING PAGE COMPONENT ---
const LandingPage = () => {
  const [prn, setPrn] = useState("");
  const navigate = useNavigate();

  const handleViewResult = (e) => {
    e.preventDefault();
    if (prn.length === 10 && /^\d+$/.test(prn)) {
      navigate('/view-result');
    } else {
      alert("Please enter a valid 10-digit University PRN.");
    }
  };

  return (
    <div className="portal-container">
      <header className="portal-header">
        <img src={ASSETS.logo} className="header-logo" alt="University Logo" />
      </header>

      <main className="portal-main">
        <h1 className="portal-title">ONLINE RESULT</h1>

        <div className="form-card">
          <label className="form-label">
            University PRN <span className="required">*</span>
          </label>
          <form className="input-group" onSubmit={handleViewResult}>
            <input
              type="text"
              className="id-input"
              placeholder="Enter PRN (10 digit)"
              maxLength="10"
              value={prn}
              onChange={(e) => setPrn(e.target.value)}
            />
            <button type="submit" className="portal-btn">View Result</button>
          </form>
        </div>
      </main>

      <footer className="portal-footer">
        {UI_TEXT.footerText}
      </footer>
    </div>
  );
};

// --- RESULT PAGE COMPONENT ---
const ResultPage = () => {
  const navigate = useNavigate();

  return (
    <div className="result-page-container">
      <div className="result-content">
        <div className="result-info">
          <h1>{UI_TEXT.university}</h1>
          <h2>{UI_TEXT.examName}</h2>
          <h3>{UI_TEXT.examSession}</h3>
        </div>

        <div className="result-display">
          <img src={ASSETS.resultCard} className="marksheet-img" alt="Statement of Marks" />
        </div>

        <div className="action-btns">
          <button onClick={() => window.print()} className="print-btn">Print Statement</button>
          <button onClick={() => navigate('/')} className="back-btn">Back to Search</button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/view-result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}