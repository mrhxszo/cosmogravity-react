import { useState } from "react";



export default function Langue(){
    const [isHovered, setIsHovered] = useState<boolean>(false)

    const handleOnMouseEnter = () => {
        setIsHovered(true)
    }
    const handleOnMouseLeave = ()=> {
        setIsHovered(false)
    }


    return(
        <li onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} className="nav-submenu"><a href="#" id="langue">Langues</a>
        <ul style={{ display: isHovered ? 'block' : 'none' }}>
            <li><a href="#" id="langue_fr" onclick="choixLangueFr();rafraichirPage();">Français</a></li>
            <li><a href="#" id="langue_en" onclick="choixLangueEn();rafraichirPage();">Anglais</a></li>
        </ul>
    </li>
    );
}