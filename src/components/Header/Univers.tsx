import React, { useState } from "react";

export default function Univers() {
  const [isHovered, setIsHovered] = useState({
    univers: false,
    simulation: false,
  });

  const handleMouseEnter = (key: string) => {
    setIsHovered((prevState) => ({ ...prevState, [key]: true }));
  };

  const handleMouseLeave = (key: string) => {
    setIsHovered((prevState) => ({ ...prevState, [key]: false }));
  };

  const universStyle = {
    display: isHovered.univers ? "block" : "none",
  };

  const simulationStyle = {
    display: isHovered.simulation ? "block" : "none",
  };

  return (
    <>
      <li
        onMouseEnter={() => handleMouseEnter("univers")}
        onMouseLeave={() => handleMouseLeave("univers")}
        className="nav-submenu"
      >
        <a href="#" id="Univers">
          Univers
        </a>
        <ul style={universStyle}>
          <li>
            <a href="#" onClick={"langageTheorieUnivers()"} id="Univers_theorie">
              Théorie
            </a>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("simulation")}
            onMouseLeave={() => handleMouseLeave("simulation")}
            className="nav-submenu"
          >
            <a href="#" id="Simulation_univers">
              Simulation
            </a>
            <ul style={simulationStyle}>
              <li>
                <a href="Simulation_univers.html" id="Standard">
                  Constante cosmologique
                </a>
              </li>
              <li>
                <a href="Simulation_univers_noire.html" id="Energie_Sombre">
                  Energie Sombre
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </>
  );
}
