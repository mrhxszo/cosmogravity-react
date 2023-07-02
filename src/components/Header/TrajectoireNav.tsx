import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import theorytEN from "../../theory/theorie_trajectoires_EN.pdf";
import theorytFR from "../../theory/theorie_trajectoires_FR.pdf";

//importing language using i18next
import { useTranslation } from 'react-i18next';






export default function TrajectoireNav() {

  //language hook
  const { t } = useTranslation();
  
  //check if the mouse is hovering over the element and change display according to the isHovered state the corresponding element
  const [isHovered, setIsHovered] = useState({ Trajectoire: false, Schwarzschild: false, Kerr: false });

  const handleMouseEnter = (key:string) => {
    setIsHovered((prevState) => ({ ...prevState, [key]: true }));
  };

  const handleMouseLeave = (key:string) => {
    setIsHovered((prevState) => ({ ...prevState, [key]: false }));
  };
  /////////////////////////////////////////////////////////////////


  return (
    <>
      <li onMouseEnter={() => handleMouseEnter('Trajectoire')}
          onMouseLeave={() => handleMouseLeave('Trajectoire')}
          className="nav-submenu">
        <Link to="/underconstruction" id="Trajectoire">
          {t('page_menu.trajectoire')}
        </Link>
        <ul style={{ display: isHovered.Trajectoire ? 'block' : 'none' }}>
           {/* above line is to display the links depending on if mouse is hovering or not */}
          <li>
            <a href={t("page_menu.theorie") === "theorie" ? theorytFR : theorytEN} target="_blank" rel="noopener noreferrer">
              {t('page_menu.theorie')}
            </a>
          </li>
          <li  onMouseEnter={() => handleMouseEnter('Schwarzschild')}
              onMouseLeave={() => handleMouseLeave('Schwarzschild')}
              className="nav-submenu">
            <Link to="/Schwarzschild" id="Schwarzschild">
              {t('page_menu.schwarzschild')}
            </Link>
            <ul style={{ display: isHovered.Schwarzschild ? 'block' : 'none' }}>
               {/* above line is to display the links depending on if mouse is hovering or not */}
              <li>
                <Link to="/Simulation_trajectoire" id="Metmbaryonique">
                  {t('page_menu.metmbaryonique')}
                </Link>
              </li>
              <li>
                <Link to="/Simulation_trajectoire_photons" id="Metpbaryonique">
                  {t('page_menu.metpbaryonique')}
                </Link>
              </li>
              <li>
                <Link to="/Simulation_trajectoire_inter" id="Metmnonbaryonique">
                  {t('page_menu.metmnonbaryonique')}
                </Link>
              </li>
              <li>
                <Link to="/Simulation_trajectoire_inter_photons" id="Metpnonbaryonique">
                  {t('page_menu.metpnonbaryonique')}
                </Link>
              </li>
            </ul>
          </li>
          <li onMouseEnter={() => handleMouseEnter('Kerr')}
              onMouseLeave={() => handleMouseLeave('Kerr')} className="nav-submenu">
            <Link to="/underconstruction" id="Kerr">
              {t('page_menu.kerr')}
            </Link>
            <ul style={{ display: isHovered.Kerr ? 'block' : 'none' }}>
              <li>
                <Link to="/Simulation_trajectoire_kerr" id="Particule_massive_kerr">
                  {t('page_menu.part_massive')}
                </Link>
              </li>
              <li>
                <Link to="Simulation_trajectoire_kerr_photons" id="Photon_kerr">
                  {t('page_menu.part_photon')}
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </>
  );
}
