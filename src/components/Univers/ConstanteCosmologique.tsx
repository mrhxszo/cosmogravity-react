import { useState, useEffect } from "react";
import "../../Css/Simu-univers.css"
import "../../Css/Simu_avertissement.css"
import { Simulation_universe } from "@/ts/class/simulation/simulation_universe";
import Plotly from "../Graphics/Plotly";
//importing language using i18next
import { useTranslation } from 'react-i18next';
import Univers from "./Univers";


interface Props {
	Universe: Simulation_universe,
	handleChange: Function
	params: {
		T0: number,
		H0: number,
		Omegam0: number,
		omegaDE0: number
	}
}

export default function ConstanteCosmologique(props: Props){

	//language hook
	const { t } = useTranslation();



    return(

    <>
	{/* <!-- Boutons Calculs annexes et params --> */}
	<div id="Boutons_top_right">
		<input className="myButton" id="para" type="button" OnClick="param()" value="Constantes"></input>
		{/* <!-- paramètre tracer --> */}
		<input type="hidden" id="T0calc" name="T0_calc" value="2.7255" />
		<input type="hidden" id="H0calc" name="H0_calc" value="67.74" />
		<input type="hidden" id="Omcalc" name="Om_calc" value="0.3089" />
		<input type="hidden" id="Olcalc" name="Ol_calc" value="0.6911" />
		<input type="hidden" id="Orcalc" name="Or_calc" value="0" />
		<input type="hidden" id="Okcalc" name="Ok_calc" value="0" />
		{/* <!-- Paramètres pour le tracer --> */}
		<input type="hidden" id="k_p" name="k_p" value="1.38064852e-23"></input>
		<input type="hidden" id="h_p" name="h_p" value="6.62607004e-34"></input>
		<input type="hidden" id="G_p" name="G_p" value="6.67385e-11"></input>
		<input type="hidden" id="c_p" name="c_p" value="299792458"></input>
		<input type="hidden" id="lambda_cosmo_const" value="1.1056e-52"></input>
		<input type="hidden" id="typeannee" name="typeannee" value="Grégorienne" />
		{/* <!-- Envoi --> */}
		<input className="myButton" id="calc" type="button" onClick="updateValeursCanvas();update_omegar0_simu();ouvre_calc();" value="Calculs Annexes"></input>
	</div><br/>
	<p id="txt_titre" style={{ fontSize: '20px' , fontWeight:'bold' , textAlign:'center'}}></p>
	<div id="Bloc_Textee">	  
		<div id="univers">
		<img onClick="avertissement_univers();" src="Images/warning.png" className="bouton_avertissement"/>
		<span id="txt_avertissementuniv"></span>
		<br/>
		<span id="txt_avertissement_univers"></span>
		</div>
	</div>
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
				<input id="omegam0" type="text" onChange={(event)=>props.handleChange(event)} value={props.params.Omegam0}></input>
			</div>
			<div className="inp">
				<label>Ω<sub>Λ0</sub> = </label>
				<input id="omegaDE0" type="text" onChange={(event)=>props.handleChange(event)} value={props.params.omegaDE0}></input>
			</div>
		</div>
		<div id="coche_sim">
			<span id="txt_univplat" dangerouslySetInnerHTML={{ __html: t("page_univers.univers_plat") || '' }}></span><input id="univ_plat" type="checkbox" name="univ_plat" onChange="updateUnivPlat();"></input>
		</div>
		<div id="type_sim">
			<select id="liste" onchange="update_omegar0_simu();">
				<option id="txt_MLRFCN" value="Matière, Lambda, RFC et Neutrinos">{t('page_univers.matierelambdaRFCNeu')}</option>
				<option id="txt_MLRFC" value="Matière, Lambda et RFC">{t('page_univers.matierelambdaRFC')}</option>
				<option id="txt_ML" value="Matière et Lambda">{t('texte.page_univers.matierelambda')}</option>
			</select>
		</div>
		{/* <!-- Bouton Tracer --> */}
		<div id="trace_box">
			{/* <!-- Valeurs par defaut --> */}
			{/* <!-- <input className="myButton" id="valeurs_types" type="button" OnClick="valeurs_types()" value="Modèles Monofluide"></input> --> */}
			<input className="myButton" id="monofluide" type="button" OnClick="monofluide()" value="Modèles Monofluides"></input>
			<input id="trace" className="myButton" type="button" value="Tracer"></input>
			<div id="gif" style={{ position:"relative", display: "inline-block", marginLeft: "13px"}}></div>
		</div>
	</div>


	{/* <!-- INFORMATIONS --> */}
	<div id="tg_contains">
		<p id="txt_sorties" style={{fontSize:'16px', textAlign :'center'}}></p>
		<div>
			&Omega;<sub>r0</sub> = <span id="resultat_omegar0"></span>
			<br/>
			&Omega;<sub>k0</sub> = <span id="resultat_omegak0"  onChange="document.getElementById('Okcalc').value = this.value"></span>
			<br/>   
			<span id="txt_tempsBB" style={{textDecoration: "underline"}}></span>
			<br/>
			<span id="resultat_ageunivers_ga"></span>
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
		<div id="graphique"><Plotly Simulation={props.Universe}></Plotly></div>
		<div style={{display:'none'}} id="graphique_enr"></div>
		{/* <!-- Canvas --> */}
		<div id="modele">
			<canvas id="canvas" width="298" height="400"></canvas>
		</div>
	</div>
	<div id="enregistrer">
		<div>
			<label> a<sub>min</sub> =  </label>
			<input id="ami" type="text" value="0" onfocus="this.oldvalue = this.value;" onchange="
				if ( this.value < 0 || this.value > Number(document.getElementById('ama').value)) {
					this.value = this.oldvalue;
				}
			"></input>&nbsp;&nbsp;
			<label> a<sub>max</sub> = </label>
			<input id="ama" type="text" value="5" onfocus="this.oldvalue = this.value;" onchange="
				if ( this.value < 0 || this.value < Number(document.getElementById('ami').value)) {
					this.value = this.oldvalue;
				}
			"></input>&nbsp;&nbsp;
		</div>
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