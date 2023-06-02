import React from "react";
import {useState, useEffect, useContext} from "react";
import LinkContext from "../../Header/LinkContext"
import ConstantAdjunct from "./ConstantAdjunct";
import {t} from "i18next";
import './adjunct.css';
import { Simulation_universe } from "@/ts/class/simulation/simulation_universe";

interface Props {
    UniverseRef: React.RefObject<Simulation_universe>,
    params: {
          T0: number,
          H0: number,
          omegam0: number,
          omegaDE0: number
      },
    handleSelect: Function,
    selectValue: {
            value: string,
            isFlat: boolean,
    }
  }

export default function AdjunctButton(props: Props){

    //use context to know which link is clicked and to know if the button is clicked then open the calculator for one or the other
    const { linkClicked } = useContext(LinkContext);

    //useState for the button
    const [buttonClicked, setButtonClicked] = useState(false);

    function handleClick(){
        setButtonClicked(!buttonClicked);
    }


    return(
        <>
        <input className="myButton" id="calc" type="button" onClick={handleClick} value={t("page_univers_general.bouton_calculsAnnexes") || "" } />

        {linkClicked === "Standard" && buttonClicked ? <ConstantAdjunct handleClick={handleClick} UniverseRef={props.UniverseRef} params={props.params} handleSelect={props.handleSelect} selectValue={props.selectValue}/> : null}
        </>
    )
}