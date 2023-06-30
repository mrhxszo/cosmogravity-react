import { useState } from "react";
import TutoTrajFr from "../../theory/Tuto-Traj-FR.pdf";
import TutoTrajEn from "../../theory/Tuto-Traj-EN.pdf";
import TutoUnivFr from "../../theory/Tuto-Univ-FR.pdf";
import TutoUnivEn from "../../theory/Tuto-Univ-EN.pdf";

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
            <li><a id="Univers_Tuto" href={t("page_menu.Ttuto") === "Trajectories" ?  TutoTrajFr: TutoTrajEn} target="_blank">
                {t("page_menu.Ttuto")}
                </a></li>
            <li><a id="Trajectoires_Tuto" href={t("page_menu.Ututo") === "Univers" ?  TutoUnivFr: TutoUnivEn} target="_blank"> 
                {t("page_menu.Ututo")}
            </a></li>
        </ul>
        </li>
    );
}