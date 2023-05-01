import React, { useState } from 'react';

export default function Trajectoire() {
  const [isHovered, setIsHovered] = useState({ Trajectoire: false, Schwarzschild: false, Kerr: false });

  const handleMouseEnter = (key:string) => {
    setIsHovered((prevState) => ({ ...prevState, [key]: true }));
  };

  const handleMouseLeave = (key:string) => {
    setIsHovered((prevState) => ({ ...prevState, [key]: false }));
  };

  return (
    <>
      <li onMouseEnter={() => handleMouseEnter('Trajectoire')}
          onMouseLeave={() => handleMouseLeave('Trajectoire')}
          className="nav-submenu">
        <a
          href="#"
          id="Trajectoire"
        >
          Trajectoires
        </a>
        <ul style={{ display: isHovered.Trajectoire ? 'block' : 'none' }}>
          <li>
            <a href="#" onClick="langageTheorieTrajectoire()" id="Trajectoire_theorie">
              Théorie
            </a>
          </li>
          <li  onMouseEnter={() => handleMouseEnter('Schwarzschild')}
              onMouseLeave={() => handleMouseLeave('Schwarzschild')}
              className="nav-submenu">
            <a href="#" id="Schwarzschild">Schwarzschild</a>
            <ul style={{ display: isHovered.Schwarzschild ? 'block' : 'none' }}>
              <li>
                <a href="Simulation_trajectoire.html" id="Metmbaryonique">
                  Masse et mobile baryonique
                </a>
              </li>
              <li>
                <a href="Simulation_trajectoire_photons.html" id="Metpbaryonique">
                  Masse baryonique et photon
                </a>
              </li>
              <li>
                <a href="Simulation_trajectoire_inter.html" id="Metmnonbaryonique">
                  Masse et/ou mobile non baryonique
                </a>
              </li>
              <li>
                <a href="Simulation_trajectoire_inter_photons.html" id="Metpnonbaryonique">
                  Masse non baryonique et photon
                </a>
              </li>
            </ul>
          </li>
          <li onMouseEnter={() => handleMouseEnter('Kerr')}
              onMouseLeave={() => handleMouseLeave('Kerr')} className="nav-submenu">
            <a href="#" id="Kerr">
              Kerr
            </a>
            <ul style={{ display: isHovered.Kerr ? 'block' : 'none' }}>
              <li>
                <a href="Simulation_trajectoire_kerr.html" id="Particule_massive_kerr">
                  Particule massif
                </a>
              </li>
              <li>
                <a href="Simulation_trajectoire_kerr_photons.html" id="Photon_kerr">
                  Photon
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </>
  );
}
