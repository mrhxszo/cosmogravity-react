import React, { useState, SyntheticEvent } from "react";
import { Link } from "react-router-dom";


//importing language using i18next
import { useTranslation } from "react-i18next";

interface Props {
  changeContext: (event:SyntheticEvent)=>void;
}

export default function UniversNav(props:Props) {
  
  //language hook
  const { t } = useTranslation();

  //check if the mouse is hovering over the element and change display according to the isHovered state the corresponding element
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


  /* above line is to display the links depending on if mouse is hovering or not */
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
          {t("page_menu.univers")}
        </a>
        <ul style={universStyle}>
          <li>
            <a id="Univers_theorie">
              {t("page_menu.theorie")}
            </a>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("simulation")}
            onMouseLeave={() => handleMouseLeave("simulation")}
            className="nav-submenu"
          >
            <a id="Simulation_univers">
              {t("page_menu.simulation")}
            </a>
            <ul style={simulationStyle}>
              <li>
                <Link to="/Univers" id="Standard" onClick={(event:SyntheticEvent)=>props.changeContext(event)}>
                  {t("page_menu.standard")}
                </Link>
              </li>
              <li>
                <Link to="/Univers" id="Energie_Sombre" onClick={(event:SyntheticEvent)=>props.changeContext(event)}>
                  {t("page_menu.energiesombre")}
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </>
  );
}
