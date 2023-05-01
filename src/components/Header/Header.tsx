import React, { useState } from "react";
// importing all the necessary components
import Univers from "./Univers";
import Langue from "./Langue";
import Tutoriel from "./Tutoriel";
import Trajectoire from "./Trajectoire";

//importing all the CSS
import "../../Css/Resp-Menu/normalize.min.css";
import "../../Css/Resp-Menu/defaults.min.css";
import "../../Css/Resp-Menu/nav-core.min.css";
import "../../Css/Resp-Menu/nav-layout.min.css";




export default function Header(){

    return (

        <div>

<header>
		<h1>Cosmogravity</h1>
	</header>

	<a href="#" className="nav-button">Menu</a>

	<nav className="nav">
		<ul>
		<li>
        <a href="index.html" id="Accueil">Accueil</a>
		
		</li>
			<Univers></Univers>
			<Trajectoire></Trajectoire>
			<Langue></Langue>
			<Tutoriel></Tutoriel>
			<li><a href="Apropos.html" id="Apropos">A propos</a></li>
			<li><a href= "https://www.lupm.in2p3.fr/fr/enseignement/cosmogravity/" target=" blank">LUPM</a></li>
			
		</ul>
	</nav>


        </div>


    );
}