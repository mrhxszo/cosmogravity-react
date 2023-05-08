import { useState } from "react"

//importing language using i18next
import { useTranslation } from "react-i18next";

export default function Tutoriel(){

    //language hook
    const { t } = useTranslation();


    const [isHovered, setIsHovered] = useState<boolean>(false)

    const handleOnMouseEnter = () => {
        setIsHovered(true)
    }
    const handleOnMouseLeave = ()=> {
        setIsHovered(false)
    }
    return(
        <li onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} className="nav-submenu"><a href="#" id="Tuto">Tutoriel</a>
        <ul style={{ display: isHovered ? 'block' : 'none' }}>
            <li><a href="#" onclick="langageTutorielUnivers()" id="Univers_Tuto">
                {t("page_menu.Ututo")}
                </a></li>
            <li><a href="#" onclick="langageTutorielTrajectoires()" id="Trajectoires_Tuto"> 
                {t("page_menu.Ttuto")}
            </a></li>
        </ul>
        </li>
    );
}