import Output from "../SubComponents/Output";
import { Simulation_universe } from "@/ts/class/simulation/simulation_universe";
import YRange from "../SubComponents/YRange";
import PlotlyComponent from "../../Graphics/PlotlyComponent";
import { useEffect, useState } from "react";
import { TypesImages } from "../CosmologicalConstant";
import { use } from "i18next";

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
  const [aRange, setaRange] = useState({ aMin: 0, aMax: 5 });
  	//useState for download button
	const [downloadStatus, setDownload] = useState({download: false, type: TypesImages.png});

  //useEffect for the graph
  useEffect(() => {
    if (Universe) {
      let array = Universe?.Monofluid([Number(aRange.aMin) , Number(aRange.aMax)], model);
      if(array) setATau({x: array[0], y: array[1]});
    }
  }, [aRange]);

  const handleChange = (event: any) => {
    setModel(event.target.value);
    
  }

  const handleClick = (event: any) => {
    let array = Universe?.Monofluid([Number(aRange.aMin) , Number(aRange.aMax)], model);
    if(array) setATau({x: array[0], y: array[1]});
  }

  const handleChild = (aminChild: number , amaxChild: number) => {
    setaRange({aMin: aminChild, aMax: amaxChild});
  }

  function handleDownload(event: any){
		const [id, value] = [event.target.id, event.target.value]
    console.log("download");
		if(id === "button_enregistrer"){
			
			setDownload((prevState) => ({download:true, type: prevState.type}));
		}
		else{
			//cases for the different types of images
			switch (value) {
				case "png":
					setDownload((prevState) => ({download: prevState.download, type: TypesImages.png}));
					break;
				case "jpeg":
					setDownload((prevState) => ({download: prevState.download, type: TypesImages.jpeg}));
					break;
				case "webp":
					setDownload((prevState) => ({download: prevState.download, type: TypesImages.webp}));
					break;
				case "svg":
					setDownload((prevState) => ({download: prevState.download, type: TypesImages.svg}));
					break;
				default:
					setDownload((prevState) => ({download: prevState.download, type: TypesImages.png}));
					break;
		}
			
	}};


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
					x = {{xData:aTau.x.map(element => element/(1e9)), xName:"t(Ga)"}} //divide by 1e9 to convert in Gyears
					y = {{yData:[aTau.y],yName:"a(t)"}} 
					title={"Monofluide"}
					downloadButton={
						{changeDownload: setDownload,
						isDownload: downloadStatus.download,
						whatType: downloadStatus.type,					
					}
					}
					/>
					
				</div>
          {/* Canvas */}
          <div id="modele">
            <img id="modele_monofl" />
          </div>
        </div>
        <div id="enregistrer">
				<YRange handleChild={handleChild}></YRange>
				<span id="txt_enregistrerEn"></span>
				<select id="format_enr" onChange={handleDownload} defaultValue={"png"}>
					<option >png</option>
					<option>jpg</option>
					<option>svg</option>
					<option>webp</option>
				</select>&nbsp;
				<input className="myButton" id="button_enregistrer" type="button" onChange={handleDownload} value="Enregistrer"></input>
			</div>
      </div>




    </>
  );
}