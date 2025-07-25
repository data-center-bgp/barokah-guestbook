import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecentEntries from "./pages/RecentEntries";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recent-entries" element={<RecentEntries />} />
      </Routes>
    </Router>
  );
};

export default App;
