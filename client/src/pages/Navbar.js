import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
import logo from "../img/brandtodo.jpg";

export default function Navbar() {
  const [isActive, setIsActive] = useState(true);
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="nav-menu">
      <img className="nav-brand" src={logo} alt="brand" />
      <h2 className="brand-title">Tasks App</h2>
      <ul className={isActive ? "nav-list active" : "nav-list"}>
        <li>
          <NavLink className="link-menu" to={"/"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="link-menu" to={"/taskview"}>
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink className="link-menu" to={"/createTask"}>
            Create Tasks
          </NavLink>
        </li>
      </ul>
      <ul>
        <li className="btn-toggle">
          <i className="fas fa-bars" onClick={toggleMenu}></i>
        </li>
      </ul>
    </div>
  );
}
