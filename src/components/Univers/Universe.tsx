import CosmologicalConstant from './CosmologicalConstant';
import DarkEnergy from './DarkEnergy';
import LinkContext from '../Header/LinkContext';
import { useState, useContext, useEffect } from 'react';
import { Simulation_universe } from "../../ts/class/simulation/simulation_universe";

export default function Univers(){
    //useContext for knowing which link is clicked
    const { linkClicked } = useContext(LinkContext);

    //instance of the class Simulation_universe
	const Universe = new Simulation_universe("universe");

    //useState for input tag in id="params"
	const [params, setParams] = useState({ 
		T0: 2.7255, 
		H0: 67.74, 
		Omegam0: 0.3089, 
		omegaDE0: 0.6911
		 });

	//useEffect for updating the class Simulation_universe
	useEffect(() => {
		Universe.temperature = params.T0;
		Universe.hubble_cst = params.H0;
		Universe.matter_parameter = params.Omegam0;
		Universe.dark_energy.parameter_value = params.omegaDE0;
	}, [params]);

    
	//assign the user's input to the class Simulation_universe
	function handleChange(event: any) {
		const { id, value } = event.target;
		setParams(prevState => ({
			...prevState,
			[id]: value
		}));

	}

	return (
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
		{/* <!-- change the calculs Annexe based on which link is clicked --> */}
		<input className="myButton" id="calc" type="button" onclick="ouvre_calc_Noire()" value="Calculs Annexes"></input>
			<p id="txt_titre" style={{fontSize:'20px', fontWeight:"bold", textAlign: "center"}}></p>
	</div><br/>

	
		  {linkClicked === "Standard" && (
			<CosmologicalConstant
			  Universe={Universe}
			  handleChange={handleChange}
			  params={params}
			/>
		  )}
		  {linkClicked === "Energie_Sombre" && (
			<DarkEnergy
			  Universe={Universe}
			  handleChange={handleChange}
			  params={params}
			/>
		  )}
		</>
	  );
		  }	  