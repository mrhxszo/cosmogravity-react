import { Simulation_universe } from "../../ts/class/simulation/simulation_universe";
import Warning from "../Warning/Warning";
import { useTranslation } from "react-i18next";


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

//to be done : 
//add asymptote when big rip
//make graph work
//make adjunct calculation work etc

export default function DarkEnergy (props: Props){


	//translation hook
	const { t } = useTranslation();


    return(
	<>

			{/* <!-- Paramètres --> */}
			<div id="params">
				<div className="text-center">
					<p id="txt_entrees" style={{fontSize:'16px',fontWeight:"bold", textAlign: "center"}}></p>
					<div className="inp">
						<label>T<sub>0</sub> = </label>
						{/* <!-- Onchange pour actuliser les paramètre envoyés par le formulaire a chaque changement --> */}
						<input id="T0" type="text" value="2.7255" onChange="update_omegar0_simu_noir();document.getElementById('T0calc').value = this.value;"></input>
						K
					</div>
					
					<div id="balise_H0" className="inp">
						<label>&nbsp;&nbsp; H<sub>0</sub> = </label>
						<input id="H0" type="text" value="67.74" size="10" onChange="update_omegar0_simu_noir();document.getElementById('H0calc').value = this.value;v"></input>
						<label>km.s<sup>-1</sup>.Mpc<sup>-1</sup></label>
					</div>

					<div className="inp">
						<label>Ω<sub>m0</sub> = </label>
						<input id="omegam0" type="text" value="0.3089" onChange="document.getElementById('Omcalc').value = this.value;
						update_omegak0_simu_noir();document.getElementById('resultat_omegam0').innerHTML=this.value;"></input>
					</div>

					<div className="inp">
						<label>Ω<sub>DE0</sub> = </label>
						<input id="omegaDE0" type="text" value="0.6911" onChange="document.getElementById('Olcalc').value = this.value;update_omegak0_simu_noir();"></input>
					</div>
					<div className="inp">
						<label>w<sub>0</sub> = </label>
						<input id="omega0" type="text" value="-1"></input>
						<div id="w-1">
							<label>w<sub>1</sub> = </label>
							<input id="omega1" type="text" value="0"></input>
						</div>
					</div>
				</div>
				<div id="coche_sim">
					<span id="txt_univplat"></span><input id="univ_plat" type="checkbox" name="univ_plat" onChange="updateUnivPlat_noir();"></input>
				</div>
				<div id="type_sim">
					<select id="liste" onChange="update_omegar0_simu_noir();">
						<option id="txt_MLRFCN" value="Matière, Lambda, RFC et Neutrinos"></option>
						<option id="txt_MLRFC" value="Matière, Lambda et RFC"></option>
						<option id="txt_ML" value="Matière et Lambda"></option>
					</select>
				</div>
				<div id="trace_box">
					<input className="myButton" id="monofluide" type="hidden" OnClick="monofluide_noire()" value="Modèles Monofluides"></input>
					<input id="trace" className="myButton" type="button" 
					// onClick="update_omegar0_simu_noir();update_omegak0_simu_noir();Lancer_calc();ga('send', 'event', 'button', 'click', 'Tracer graphique univers Sombre');" 
					value="Tracer"></input>
					<div id="gif" style={{position:'relative',display: 'inline-block',marginLeft: "13px"}}></div>
				</div>
			</div>



			<canvas id="canvas_1" style={{display : "none", width:"750px"}}></canvas>


			{/* <!-- INFORMATIONS --> */}
			<div id="tg-contains" style={{marginTop:"20px"}}>
				<p id="txt_sorties" style={{fontSize:"16px", fontWeight:"bold" ,textAlign:"center"}}></p>
				<center>
					&Omega;<sub>r0</sub> = <span id="resultat_omegar0">0</span> <br></br>
					&Omega;<sub>k0</sub> = <span id="resultat_omegak0" onChange="document.getElementById('Ok_calc').value = this.value"></span><br></br>
					<span id="txt_tempsBB" style={{fontWeight:"bold", textDecoration: "underline"}}></span><br></br>
					<span id="resultat_ageunivers_ga"></span>(Ga)&nbsp;= <span id="resultat_ageunivers_s">1.09884e+3</span>(s) <br></br>
					<i><span id="resultat_bigcrunch">Pas</span></i> <br></br>
					<span id="txt_dureeeUniv" style={{fontWeight:"bold", textDecoration: "underline"}}></span><br></br>
					<span id="resultat_dureeuniv">res</span>
				</center>

					<table className="tg" style={{display:"none"}}>
						<tr>
							<th className="tg-cgnp" style={{borderRight: "1px solid black"}}>&Omega;<sub>m0</sub></th>
							<th className="tg-cgnp">&Omega;<sub>r0</sub></th>
						</tr>
						<tr>
							<td className="tg-m3ec" style={{borderRight: "1px solid black"}} id="resultat_omegam0">Resultat</td>
							<td className="tg-m3ec" id="resultat_omegar0">Resultat</td>
						</tr>
						<tr>
							<td className="tg-cgnp" style={{borderRight: "1px solid black"}}>&Omega;<sub>DE0</sub></td>
							<td className="tg-cgnp">&Omega;<sub>k0</sub></td>
						</tr>
						<tr>
							<td className="tg-m3ec" style={{borderRight: "1px solid black"}} id="resultat_omegarlambda0" onChange="document.getElementById('Or_calc').value = this.value">Resultat</td>
							<td className="tg-rkjz" id="resultat_omegak0" onChange="document.getElementById('Ok_calc').value = this.value">t</td>
						</tr>
						<tr>
							<td className="tg-cgnp" colspan="2">Temps depuis le Big Bang</td>
						</tr>
						<tr>
							<td className="tg-zfe1">(Ga)</td>
							<td className="tg-i8gg">(s)</td>
						</tr>
						<tr style={{borderBottom:"1px solid black"}}>
							<td className="tg-rkjz" style={{borderRight:"1px solid black"}} id="resultat_ageunivers_ga">res1</td>
							<td className="tg-gzvi" id="resultat_ageunivers_s">res2</td>
						</tr>
						<tr>
							<td className="tg-zkmu" colspan="2" id="resultat_bigcrunch">Big bang</td>
						</tr>
						<tr>
							<td className="tg-btvk" colspan="2" id="titre_dureeuniv">Durée de l'univers</td>
						</tr>
						<tr>
							<td className="tg-rkjz" colspan="2" id="resultat_dureeuniv">Res</td>
						</tr>
					</table>
			</div>

			{/* <!-- GRAPHIQUE--> */}
			<div style={{marginTop: '100px'}}>
				<div id="graphique_sombre">
				</div>
			</div>
			<div style={{display:"none"}} id="graphique_enr"></div>
			{/* <!-- Sauvegarde graphique --> */}
			<div id="enregistrer_sbr">
		<div>
			<label> a<sub>min</sub> =  </label>
			<input id="ami" type="text" value="0" onfocus="this.oldvalue = this.value;" 
			// onchange="if ( this.value < 0 || this.value > Number(document.getElementById('ama').value)) {
			// 		this.value = this.oldvalue;
			// 	}"
				></input>&nbsp;&nbsp;
			<label> a<sub>max</sub> = </label>
			<input id="ama" type="text" value="5" onfocus="this.oldvalue = this.value;" 
			// onchange="if ( this.value < 0 || this.value < Number(document.getElementById('ami').value)) {
			// 		this.value = this.oldvalue;
			// 	}"
				></input>&nbsp;&nbsp;
		</div>
		<span id="txt_enregistrerEn" style={{fontWeight:"bold"}} ></span>
		<select id="format_enr">
		<option selected>png</option>
		<option>jpg</option>
		<option>svg</option>
		</select>&nbsp;
		<input className="myButton" id="button_enregistrer" type="button" OnClick="enre()" value="Enregistrer"></input>
		<a id="png" download="Graphique.png" style={{display:"none"}}></a>
		<a id="jpg" download="Graphique.jpg" style={{display:"none"}}></a>
		<a id="svg-1" download="Graphique.svg" style={{display:"none"}}></a>

		<canvas id="Canv_enr" width="760px" height="500px" style={{display:"none"}}></canvas>
		{/* <!-- Canvas --> */}
		<div id="modele" style={{display:"none"}}>
			<canvas id="canvas" width="298" height="400"></canvas>
		</div>
	</div>
	</>
    );
}