import Output from "../SubComponents/Output";
import { Simulation_universe } from "@/ts/class/simulation/simulation_universe";
import YRange from "../SubComponents/YRange";
import PlotlyComponent from "../../Graphics/PlotlyComponent";
import { useState } from "react";

interface Props {
    params: {
      T0: number,
      H0: number,
      omegam0: number,
      omegaDE0: number,
      omega0: number,
      omega1: number,
    },
  UniverseRef: React.RefObject<Simulation_universe>,
  changeEvent: Function,
}

export default function Monofluide(props: Props) {
  
  //getting the universe_simulation object from the parent component
  const Universe = props.UniverseRef.current;

  //usestate for parametres
  const [aTau, setATau] = useState({ x: [0], y: [0] });
  const [model, setModel] = useState("Select");

  const handleChange = (event: any) => {
    setModel(event.target.value);
    
  }

  const handleClick = (event: any) => {
    let array = Universe?.Monofluid([0 , 5], model);
    if(array) setATau({x: array[0], y: array[1]});
  }

  return (
    <>
      
      <div>
        <p id="txt_titre" style={{fontSize: '20px', fontWeight: 'bold', textAlign: 'center'}} />
        <div id="Bloc_Textee">
        </div>  
        {/* Paramètres  */}
        <div id="params">
          <p id="txt_entrees" style={{fontSize: '16px', fontWeight: 'bold', textAlign: 'center'}} />
          <div>
            <div className="inp">
              <select id="type_valeurs" onChange={handleChange}>
                <option id="txt_courbure" value="Select" selected >Choissez un modèle:</option>
                <option id="txt_choix" value="Matter" >Matière</option>
                <option id="txt_einstein" value="Radiation" >Rayonnement</option>
                <option id="txt_weinberg" value="Cosmological_constant" >Constante Cosmologique</option>
                <option id="txt_sitter" value="Curvature" >Courbure</option>
              </select>
              <label>&nbsp;&nbsp; H<sub>0</sub> = </label>
              <input id="H0" type="text" size={10} onChange={(event)=>props.changeEvent(event)} value={props.params.H0}></input>
              km.s<sup>-1</sup>.Mpc<sup>-1</sup>
            </div>
          </div>
          {/* Bouton Tracer */}
          <div id="trace_box">
            <input id="trace" className="myButton" type="button" onClick={handleClick} defaultValue="Tracer" />
            <input id="retour" className="myButton" type="button" onclick="retourSimulation();" defaultValue="Retour" />
            <div id="gif" style={{position: 'relative', display: 'inline-block', marginLeft: '13px'}} />
          </div>
        </div>
        <canvas id="canvas_1" width="750px" style={{display: 'none'}} />
        {/* INFORMATIONS */}
        <Output Universe={props.UniverseRef} params={props.params}/>
        <div id="test">
          {/* GRAPHIQUE*/}
          <div id="graphique">
					<PlotlyComponent 
					x = {{xData: aTau.x, xName:"t(Ga)"}} //divide by 1e9 to convert in Gyears
					y = {{yData: [aTau.y],yName:"a(t)"}} 
					title={"Monofluide"}
					/>
					
				</div>
          {/* Canvas */}
          <div id="modele">
            <img id="modele_monofl" />
          </div>
        </div>
        <div id="enregistrer">

            <YRange handleChild={()=>console.log("check amin and amax")}/>


          <span id="txt_enregistrerEn" style={{fontWeight: 'bold'}} />
          <select id="format_enr">
            <option selected>png</option>
            <option>jpg</option>
            <option>svg</option>
          </select>&nbsp;
          <input className="myButton" id="button_enregistrer" type="button" onclick="enre()" defaultValue="Enregistrer" />
          <a id="png" download="Graphique.png" style={{display: 'none'}} />
          <a id="jpg" download="Graphique.jpg" style={{display: 'none'}} />
          <a id="svg-1" download="Graphique.svg" style={{display: 'none'}} />
          <a id="ret" href="#nav" style={{display: 'none'}} />
        </div></div>




    </>
  );
}