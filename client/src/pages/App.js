import React from "react";
import Tasks from "./Tasks";
import TasksList from "./TasksList";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import "../css/App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/taskview" element={<TasksList />} />
          <Route path="/createTask" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
