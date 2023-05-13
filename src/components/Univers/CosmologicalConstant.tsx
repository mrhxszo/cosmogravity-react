import { useState, useEffect } from "react";
import "../../Css/Simu-univers.css"
import "../../Css/Simu_avertissement.css"
import { Simulation_universe } from "@/ts/class/simulation/simulation_universe";
import PlotlyComponent from "../Graphics/PlotlyComponent";
import YRange from "./SubComponents/YRange";
import Warning from "../Warning/Warning";
//importing language using i18next
import { useTranslation } from 'react-i18next';


interface Props {
	Universe: Simulation_universe,
	handleChange: Function
	params: {
		T0: number,
		H0: number,
		omegam0: number,
		omegaDE0: number
	}
}

export default function CosmologicalConstant(props: Props){

	//language hook
	const { t } = useTranslation();

	//useState for universe simulation calculation
	const [aTau, setATau] = useState({ x: [0], y: [0] });

	//useState for y axis range
	const [aRange, setYRange] = useState({ aMin: 0.1, aMax: 10 });

	//useState for select options for matter, lambda, radiation and dark energy
	const [selectValue, setSelectValue] = useState("Matière, Lambda, RFC et Neutrinos");

	//useState for isFlat
	const [isFlat, setIsFlat] = useState(false);

	//useState for handling outputs
	const [output, setOutput] = useState({
		//default values
		omegaR0 : props.Universe.calcul_omega_r(),
		omegaK0 : props.Universe.calcul_omega_k(),
		ageUniverse : props.Universe.universe_age(),
	});

	
	//useEffect to run the universe simulation calculation in the first render and every time useState is updated
	useEffect(() => {
		const { aMin, aMax } = aRange; // extract aMin and aMax values
		setATau(props.Universe.compute_scale_factor(0.0001, [aMin, aMax]))
		props.Universe.is_flat = isFlat;

		//every time the universe simulation calculation is updated, the output is updated
		setOutput({
			omegaR0 : props.Universe.calcul_omega_r(),
			omegaK0 : props.Universe.calcul_omega_k(),
			ageUniverse : props.Universe.universe_age(),
		});
	},[aRange, props.Universe, selectValue, isFlat]);


	//handClick to do the universe calculation
	function handleClick() {
		setATau(props.Universe.compute_scale_factor(0.001, [aRange.aMin, aRange.aMax]))
	}
	
	
	// to handle y axis range obtained from YRange.tsx

	const handleChild = (aminChild: number , amaxChild: number) =>{
		setYRange({aMin: aminChild, aMax: amaxChild});
	}


	//handle the select options for matter, lambda, radiation and dark energy
	function handleSelect(event: any) {

		const { id, value } = event.target;
		if(id === "liste"){

			setSelectValue(value);
			switch (value) {
				case "Matière et Lambda":
					props.Universe.has_neutrino = false;
					props.Universe.has_cmb = false;
					break;
				case "Matière, Lambda et RFC":
					props.Universe.has_neutrino = false;
					props.Universe.has_cmb = true;
					break;
				default:
					props.Universe.has_neutrino = true;
					props.Universe.has_cmb = true;
					break;
			}
		}

		if(id === "univ_plat"){
			setIsFlat(!isFlat);
			props.Universe.is_flat = !isFlat;
		}
		
	}
	
	//update the output Values and update the display for the parameters
	function updateOutput(event: any){
		//update the display for the parameters
		props.handleChange(event);

		//update the output Values
		setOutput({
			omegaR0 : props.Universe.calcul_omega_r(),
			omegaK0 : props.Universe.calcul_omega_k(),
			ageUniverse : props.Universe.universe_age(),
		});
	}

    return(

    <>

	{/* <!-- Paramètres  --> */}
	<div id="params">
		<p id="txt_entrees" style={{fontSize: "16px", fontWeight: "bold", textAlign: "center"}}>{t("page_univers_general.entrees")}</p>
			<div>
				<div className="inp">
				<label>T<sub>0</sub> = </label>
				{/* <!-- Onchange pour actuliser les paramètre envoyés par le formulaire a chaque changement --> */}
				<input id="T0" type="text" onChange={(event)=> updateOutput(event)} value={props.params.T0}></input>
				<label> K</label>
			</div>
			<div id="balise_H0" className="inp">
				<label>&nbsp; &nbsp; H<sub>0</sub> = </label>
				<input id="H0" type="text" size={10} onChange={(event)=> updateOutput(event)} value={props.params.H0}></input>
				<label> km.s<sup>-1</sup>.Mpc<sup>-1</sup></label>
			</div>
			<div className="inp">
				<label>Ω<sub>m0</sub> = </label>
				<input id="omegam0" type="text" onChange={(event)=> updateOutput(event)} value={props.params.omegam0}></input>
			</div>
			<div className="inp">
				<label>Ω<sub>Λ0</sub> = </label>
				<input id="omegaDE0" type="text" onChange={(event)=> updateOutput(event)} value={props.params.omegaDE0}></input>
			</div>
		</div>
		<div id="coche_sim">
			<span id="txt_univplat" dangerouslySetInnerHTML={{ __html: t("page_univers.univers_plat") || '' }}></span><input id="univ_plat" type="checkbox" name="univ_plat" onChange={handleSelect}></input>
		</div>
		<div id="type_sim">
			<select id="liste" onChange={handleSelect} value={selectValue}>
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
	<div id="tg_contains">
		<p id="txt_sorties" style={{fontSize:'16px', textAlign :'center'}}></p>
		<div>
			&Omega;<sub>r0</sub> = <output id="resultat_omegar0">{output.omegaR0.toExponential(4)}</output>
			<br/>
			&Omega;<sub>k0</sub> = <output id="resultat_omegak0"  >{output.omegaK0.toExponential(4)}</output>
			<br/>   
			<span id="txt_tempsBB" style={{textDecoration: "underline"}}>{t('page_univers_general.tempsBigBang')}</span>
			<br/>
			<output id="resultat_ageunivers_ga">{output.ageUniverse.toExponential(4)}</output>
			(Ga)&nbsp;= <span id="resultat_ageunivers_s">1.09884e+3</span>(s)
			<br/>
			<i><span id="resultat_bigcrunch">Pas</span></i>
			<br/>
			<span id="txt_dureeeUniv" style={{textDecoration: 'underline'}}></span>
			<br/>
			<span id="resultat_dureeuniv">res</span>
		</div>
		<table className="tg" style={{display:'none'}}>
			<tr>
				<td className="tg-m3ec" style={{borderRight: '1px solid black'}} id="resultat_omegam0">Resultat</td>
				<td className="tg-m3ec" id="resultat_omegar0">Resultat</td>
			</tr>
			<tr>
				<td className="tg-cgnp" style={{borderRight: '1px solid black'}}>&Omega;<sub>&Lambda;0</sub></td>
				<td className="tg-cgnp">&Omega;<sub>k0</sub></td>
			</tr>
			<tr>
				<td className="tg-m3ec" style={{borderRight: '1px solid black'}} id="resultat_omegarlambda0" onChange="document.getElementById('Orcalc').value = this.value">Resultat</td>
				<td className="tg-rkjz" id="resultat_omegak0" onChange="document.getElementById('Okcalc').value = this.value">t</td>
			</tr>
			<tr>
				<td className="tg-cgnp" colspan="2">Temps depuis le Big Bang</td>
			</tr>
		</table>
	</div>
	<div id="test">
		{/* <!-- GRAPHIQUE--> */}
		<div id="graphique">
			<PlotlyComponent 
			x = {{xData:aTau.x, xName:"t(Ga)"}} 
			y = {{yData:aTau.y,yName:"a(t)"}} 
			title={t("calculs_univers.titre")}
			/>
		</div>
		<div style={{display:'none'}} id="graphique_enr"></div>
		{/* <!-- Canvas --> */}
		<div id="modele">
			<canvas id="canvas" width="298" height="400"></canvas>
		</div>
	</div>
	<div id="enregistrer">
		<YRange handleChild={handleChild}></YRange>
		<span id="txt_enregistrerEn"></span>
	"
		<select id="format_enr">
			<option selected>png</option>
			<option>jpg</option>
			<option>svg</option>
		</select>&nbsp;
		<input className="myButton" id="button_enregistrer" type="button" OnClick="enre()" value="Enregistrer"></input>
	</div>
	<a id="png" download="Graphique.png" style={{display:"none"}}></a>
	<a id="jpg" download="Graphique.jpg" style={{display:"none"}}></a>
	<a id="svg-1" download="Graphique.svg" style={{display:"none"}}></a>
	<a id="ret" href="#nav" style={{display:"none"}}></a>





    </>
    );
}