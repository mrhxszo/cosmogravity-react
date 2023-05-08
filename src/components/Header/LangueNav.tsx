import { useState, SyntheticEvent } from "react";

//import language using i18next
import { useTranslation } from "react-i18next";



export default function LangueNav(){

    //language hook
    const {t , i18n} = useTranslation();

    //check if the mouse is hovering over the element and change display according to the isHovered state the corresponding element
    const [isHovered, setIsHovered] = useState<boolean>(false)

    const handleOnMouseEnter = () => {
        setIsHovered(true)
    }
    const handleOnMouseLeave = ()=> {
        setIsHovered(false)
    }


    return(
        <li onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} className="nav-submenu"><a href="#" id="langue">
        {t("page_menu.langue")}
        </a>
        <ul style={{ display: isHovered ? 'block' : 'none' }}> 
            {/* above line is to display the links depending on if mouse is hovering or not */}
            <li><a  id="langue_fr" className="fr" onClick={(event:SyntheticEvent)=> (i18n.changeLanguage(event.currentTarget.className))}>
                    {t("page_menu.langue_fr")}
                </a></li>
            <li><a  id="langue_en" className="en" onClick={(event:SyntheticEvent)=> (i18n.changeLanguage(event.currentTarget.className))}>
                    {t("page_menu.langue_en")}
                </a></li>
        </ul>
    </li>
    );
}