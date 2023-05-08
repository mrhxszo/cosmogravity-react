import React, { useState, useEffect, useContext, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
// importing all the necessary components
import UniversNav from "./UniversNav";
import LangueNav from "./LangueNav";
import TutorielNav from "./TutorielNav";
import TrajectoireNav from "./TrajectoireNav";

//importing all the CSS
import "../../Css/Resp-Menu/normalize.min.css";
import "../../Css/Resp-Menu/defaults.min.css";
import "../../Css/Resp-Menu/nav-core.min.css";
import "../../Css/Resp-Menu/nav-layout.min.css";

//importing link context for passing info about where user clicked
import LinkContext from "./LinkContext";

//importing language using i18next
import { useTranslation } from "react-i18next";

export default function Header(){


	//state for the @nediaquery nav-button css class
	const [navButton, setNavButton] = useState<boolean>(true);
	
	//language hook
	const { t } = useTranslation();
	
	
	////The purpose of these lines is to get the setContext function and pass it to the children components to track which component user clicked
	const { setLinkClicked } = useContext(LinkContext);

	const handleClick = (event:SyntheticEvent) => {
		setLinkClicked(event.currentTarget.id)
	}
	////The purpose of these lines is to get the setContext function and pass it to the children components to track which component user clicked


	//function and to change the @mediaquery nav-button css display property
	const [width, setWidth] = useState<number>(window.innerWidth);

	function handleResize():null|void{
		setWidth(window.innerWidth);
		return null;
	}
	  
  	useEffect(() => {
    // update the window width when the browser is resized
    window.addEventListener('resize', handleResize);
	if(width > 960){
		setNavButton(true);
	}
	else{
		setNavButton(false);
	}	
  }, [width]);
	
 	 const changeNavButton = () => {

		setNavButton(!navButton);
		
	}


    return (

        <div>

<header>
		<h1>Cosmogravity</h1>
	</header>

	<a href="#" className="nav-button" onClick={changeNavButton}>Menu</a>


	<nav className="nav" style={navButton ? {display: "block"} : {display: "none"} } >
		<ul>
		<li>
			{/*Link to the home page */}
        	<Link to="/" id="Accueil">{t("page_menu.accueil") }</Link>

		</li>
			{/* link to navigational pages */}
			<UniversNav changeContext={handleClick}/>
			<TrajectoireNav/>
			<LangueNav/>
			<TutorielNav/>

			{/* other links */}
			<li><Link to="/" id="Apropos">
				{t("page_menu.apropos")}
				</Link></li>
			<li><a href= "https://www.lupm.in2p3.fr/fr/enseignement/cosmogravity/" target="blank">LUPM</a></li>			
		</ul>
	</nav>


        </div>


    );
}