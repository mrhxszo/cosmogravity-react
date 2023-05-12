import React, { useState } from "react";
import warnImage from "../../Images/warning.png";

export default function Warning(props: { header: string; text: string }): JSX.Element {
  const [state, setState] = useState({ clicked: false, style: { display: "none" } });

  function handleClick() {
    setState((prevState) => ({
      clicked: !prevState.clicked,
      style: { display: prevState.clicked ? "none" : "block" },
    }));
  }

  return (
    <div id="Bloc_Textee">
      <div id="univers" onClick={handleClick}>
        <img src={warnImage} className="bouton_avertissement" />
        <span id="txt_avertissementuniv">{props.header}</span>
        <br />
        <span id="txt_avertissement_univers" style={state.style}>
          {props.text}
        </span>
      </div>
    </div>
  );
}

        