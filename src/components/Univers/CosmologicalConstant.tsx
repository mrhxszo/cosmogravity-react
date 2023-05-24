import { useState, useEffect } from "react";
//importing css
import "../../Css/Simu-univers.css"
import "../../Css/Simu_avertissement.css"
//importing class
import { Simulation_universe } from "@/ts/class/simulation/simulation_universe";
//importing components
import PlotlyComponent from "../Graphics/PlotlyComponent";
import YRange from "./SubComponents/YRange";
import Canvas from "../Graphics/Canvas/Canvas";
import Output from "./SubComponents/Output";
//importing language using i18next
import { useTranslation } from 'react-i18next';



interface Props {
	UniverseRef: React.RefObject<Simulation_universe>,
	handleChange: Function,
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
	},
}

enum TypesImages {
	png = "png",
	jpeg = "jpeg",
	webp = "webp",
	svg = "svg"
}

export default function CosmologicalConstant(props: Props){
	const Universe = props.UniverseRef.current;

	//language hook
	const { t } = useTranslation();

	//useState for universe simulation calculation
	const [aTau, setATau] = useState({ x: [0], y: [0] });

	//useState for y axis range
	const [aRange, setYRange] = useState({ aMin: 0.1, aMax: 10 });


	//useState for download button
	const [downloadStatus, setDownload] = useState({download: false, type: TypesImages.png});
	
	//useEffect to run the universe simulation calculation in the first render and every time useState is updated
	useEffect(() => {
		const { aMin, aMax } = aRange; // extract aMin and aMax values
		if(Universe){
			setATau(Universe.compute_scale_factor(0.001, [aMin, aMax]))
		}
		
	},[aRange, Universe]);


	//handClick to do the universe calculation
	function handleClick() {
		if(Universe){
		setATau(Universe.compute_scale_factor(0.001, [aRange.aMin, aRange.aMax]));}
	}
	
	
	// to handle y axis range obtained from YRange.tsx

	const handleChild = (aminChild: number , amaxChild: number) =>{
		setYRange({aMin: aminChild, aMax: amaxChild});
	}
	

	//handle the download button
	function handleDownload(event: any){
		const [id, value] = [event.target.id, event.target.value]

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

    return(

    <>

	{/* <!-- Paramètres  --> */}
	<div id="params">
		<p id="txt_entrees" style={{fontSize: "16px", fontWeight: "bold", textAlign: "center"}}>{t("page_univers_general.entrees")}</p>
			<div>
				<div className="inp">
				<label>T<sub>0</sub> = </label>
				{/* <!-- Onchange pour actuliser les paramètre envoyés par le formulaire a chaque changement --> */}
				<input id="T0" type="text" onChange={(event)=>props.handleChange(event)} value={props.params.T0}></input>
				<label> K</label>
			</div>
			<div id="balise_H0" className="inp">
				<label>&nbsp; &nbsp; H<sub>0</sub> = </label>
				<input id="H0" type="text" size={10} onChange={(event)=>props.handleChange(event)} value={props.params.H0}></input>
				<label> km.s<sup>-1</sup>.Mpc<sup>-1</sup></label>
			</div>
			<div className="inp">
				<label>Ω<sub>m0</sub> = </label>
				<input id="omegam0" type="text" onChange={(event)=>props.handleChange(event)} value={props.params.omegam0}></input>
			</div>
			<div className="inp">
				<label>Ω<sub>Λ0</sub> = </label>
				<input id="omegaDE0" type="text" onChange={(event)=>props.handleChange(event)} value={props.params.omegaDE0}></input>
			</div>
		</div>
		<div id="coche_sim">
			<span id="txt_univplat" dangerouslySetInnerHTML={{ __html: t("page_univers.univers_plat") || '' }}></span><input id="univ_plat" type="checkbox" name="univ_plat" onChange={(event)=>props.handleSelect(event)}></input>
		</div>
		<div id="type_sim">
			<select id="liste" onChange={(event)=>props.handleSelect(event)} value={props.selectValue.value}>
				<option id="txt_MLRFCN" value="Matière, Lambda, RFC et Neutrinos">{t('page_univers.matierelambdaRFCNeu')}</option>
				<option id="txt_MLRFC" value="Matière, Lambda et RFC">{t('page_univers.matierelambdaRFC')}</option>
				<option id="txt_ML" value="Matière et Lambda">{t('page_univers.matierelambda')}</option>
			</select>
		</div>


		{/* <!-- Bouton Tracer --> */}
		<div id="trace_box">
			{/* <!-- Valeurs par defaut --> */}
			{/* <!-- <input className="myButton" id="valeurs_types" type="button" OnClick="valeurs_types()" value="Modèles Monofluide"></input> --> */}
			<input className="myButton" id="monofluide" type="button" OnClick="monofluide()" value="Modèles Monofluides"></input>
			<input id="trace" className="myButton" type="button" value="Tracer" onClick={handleClick}></input>
			<div id="gif" style={{ position:"relative", display: "inline-block", marginLeft: "13px"}}></div>
		</div>
	</div>


	{/* <!-- INFORMATIONS --> */}
	<Output Universe={props.UniverseRef} params={props.params} selectValue={props.selectValue}/>

	<div id="test" style={{display:"flex",justifyContent:"space-evenly"}}>
		{/* <!-- GRAPHIQUE--> */}
		<div id="graphique">
			<PlotlyComponent 
			x = {{xData:[aTau.x.map(element => element/(1e9))], xName:"t(Ga)"}} //divide by 1e16 to convert in Gyears
			y = {{yData:[aTau.y],yName:"a(t)"}} 
			title={t("calculs_univers.titre").toString()}
			downloadButton={
				{changeDownload: setDownload,
				isDownload: downloadStatus.download,
				whatType: downloadStatus.type,					
			}
			}
			/>
			
		</div>
		<div style={{display:'none'}} id="graphique_enr"></div>
		{/* <!-- Canvas --> */}
		<div id="modele">
			{Universe? <Canvas universe={Universe} /> : null}
			
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
		<input className="myButton" id="button_enregistrer" type="button" onClick={handleDownload} value="Enregistrer"></input>
	</div>
    </>
    );
}