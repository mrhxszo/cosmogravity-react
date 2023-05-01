import { useState } from "react"

export default function Tutoriel(){
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
            <li><a href="#" onclick="langageTutorielUnivers()" id="Univers_Tuto">Univers</a></li>
            <li><a href="#" onclick="langageTutorielTrajectoires()" id="Trajectoires_Tuto">Trajectoires</a></li>
        </ul>
        </li>
    );
}