import React from "react";
import Background from "../img/cover2.jpg";
import "../css/HomePage.css";

export default function HomePage() {
  return (
    <div className="container">
      <div
        className="cover"
        style={{ background: "url(" + Background + ") no-repeat center/cover" }}
      >
        <div>
          <h3>Task App</h3>
          <p className="texto">
            Es una app que te simplifica la vida, ayudandote a que organices
            todas las tareas que tienes por hacer en el dia. Es un aplicación
            fácil e intuitiva creada con la técnologia MERN (Mongo + Express +
            React + NodeJS).
          </p>
          <p className="firma">.-Alan G.</p>
        </div>
      </div>
    </div>
  );
}
