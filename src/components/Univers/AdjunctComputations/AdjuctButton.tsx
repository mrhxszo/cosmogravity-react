import React from "react";
import {useState, useEffect, useContext} from "react";
import LinkContext from "../../Header/LinkContext"
import ConstantAdjunct from "./ConstantAdjunct";
import {t} from "i18next";
import './adjunct.css';

export default function ConstantsAdjunct(){

    //use context to know which link is clicked and to know if the button is clicked then open the calculator for one or the other
    const { linkClicked } = useContext(LinkContext);

    //useState for the button
    const [buttonClicked, setButtonClicked] = useState(false);


    return(
        <>
        <input className="myButton" id="calc" type="button" onClick={() => setButtonClicked(!buttonClicked)} value={t("page_univers_general.bouton_calculsAnnexes") || "" } />

        {linkClicked === "Standard" && buttonClicked ? <ConstantAdjunct/> : null}
        </>
    )
}