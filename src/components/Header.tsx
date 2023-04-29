import React from "react";
import "../Css/Resp-Menu/normalize.min.css";
import "../Css/Resp-Menu/defaults.min.css";
import "../Css/Resp-Menu/nav-core.min.css";
import "../Css/Resp-Menu/nav-layout.min.css";


export default function Header(){
    return (

        <div>

<header>
		<h1>Cosmogravity</h1>
	</header>

	<a href="#" className="nav-button">Menu</a>

	<nav className="nav">
		<ul>
			<li><a href="index.html" id="Accueil">Accueil</a></li>
			<li className="nav-submenu"><a href="#" id="Univers">Univers</a>
				<ul>
					<li><a href="#" onClick="langageTheorieUnivers()" id="Univers_theorie">Théorie</a></li>
					<li className="nav-submenu"><a href="#" id="Simulation_univers">Simulation</a>
						<ul>
							<li><a href="Simulation_univers.html" id="Standard">Constante cosmologique</a></li>
							<li><a href="Simulation_univers_noire.html" id="Energie_Sombre">Energie Sombre</a></li>
						</ul>
					</li>
				</ul>
			</li>
			<li className="nav-submenu"><a href="#" id="Trajectoire">Trajectoires</a>
				<ul>
					<li><a href="#" onClick="langageTheorieTrajectoire()" id="Trajectoire_theorie">Théorie</a></li>
					<li className="nav-submenu"><a href="#" id="Schwarzschild">Schwarshild</a>
						<ul>
							<li><a href="Simulation_trajectoire.html" id="Metmbaryonique">Masse et mobile baryonique</a></li>
							<li><a href="Simulation_trajectoire_photons.html" id="Metpbaryonique" >Masse baryonique et photon</a></li>
							<li><a href="Simulation_trajectoire_inter.html" id="Metmnonbaryonique">Masse et/ou mobile non baryonique</a></li>  
							<li><a href="Simulation_trajectoire_inter_photons.html" id="Metpnonbaryonique">Masse non baryonique et photon</a></li>
							
						</ul>
					</li>
					<li className="nav-submenu"><a href="#" id="Kerr">Kerr</a>
						<ul>
							<li><a href="Simulation_trajectoire_kerr.html" id="Particule_massive_kerr">Mobile massif</a></li>
							<li><a href="Simulation_trajectoire_kerr_photons.html" id="Photon_kerr">Photon</a></li>
						</ul>
					</li>
					
				</ul>
			</li>
			<li className="nav-submenu"><a href="#" id="langue">Langues</a>
				<ul>
					<li><a href="#" id="langue_fr" onclick="choixLangueFr();rafraichirPage();">Français</a></li>
					<li><a href="#" id="langue_en" onclick="choixLangueEn();rafraichirPage();">Anglais</a></li>
				</ul>
			</li>
			
			<li className="nav-submenu"><a href="#" id="Tuto">Tutoriel</a>
			<ul>
				<li><a href="#" onclick="langageTutorielUnivers()" id="Univers_Tuto">Univers</a></li>
				<li><a href="#" onclick="langageTutorielTrajectoires()" id="Trajectoires_Tuto">Trajectoires</a></li>
			</ul>
			</li>
			{/* <!-- Ligne à mettre à commentaire ci-dessous si volonté d'afficher la partie MAJ, ne pas oublier la fonction dans gestion de langues -->
			<!-- <li><a href="MAJ.html" id="Maj">MAJ</a></li>  --> */}
			<li><a href="Apropos.html" id="Apropos">A propos</a></li>
			
					

			<li><a href= "https://www.lupm.in2p3.fr/fr/enseignement/cosmogravity/" target=" blank">LUPM</a></li>
			
		</ul>
	</nav>


        </div>


    );
}