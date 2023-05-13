import CosmologicalConstant from './CosmologicalConstant';
import DarkEnergy from './DarkEnergy';
import LinkContext from '../Header/LinkContext';
import { useState, useContext, useEffect, useRef } from 'react';
import { Simulation_universe } from "../../ts/class/simulation/simulation_universe";
import Warning from '../Warning/Warning';

//importing language using i18next
import { useTranslation } from 'react-i18next';

export default function Univers(){

	//language hook
	const { t } = useTranslation();


    //useContext for knowing which link is clicked
    const { linkClicked } = useContext(LinkContext);

    //instance of the class Simulation_universe
	const UniverseRef = useRef(new Simulation_universe("universe"));
	const Universe = UniverseRef.current;

    //useState for input tag in id="params"
	const [params, setParams] = useState({ 
		//default values
		T0: 2.7255, 
		H0: 67.74, 
		omegam0: Universe.matter_parameter, 
		omegaDE0: Universe.dark_energy.parameter_value
		 });

	//useEffect for updating the class Simulation_universe
	useEffect(() => {
		Universe.temperature = params.T0;
		Universe.hubble_cst = params.H0;
		Universe.matter_parameter = params.omegam0;
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
		  {/* Boutons Calculs annexes et params */}
		  <div id="Boutons_top_right">
			<input className="myButton" id="para" type="button" onClick={() => param()} value="Constantes" />
			{/* paramètre tracer */}
			<input type="hidden" id="T0calc" name="T0_calc" value="2.7255" />
			<input type="hidden" id="H0calc" name="H0_calc" value="67.74" />
			<input type="hidden" id="Omcalc" name="Om_calc" value="0.3089" />
			<input type="hidden" id="Olcalc" name="Ol_calc" value="0.6911" />
			<input type="hidden" id="Orcalc" name="Or_calc" value="0" />
			<input type="hidden" id="Okcalc" name="Ok_calc" value="0" />
			{/* Paramètres pour le tracer */}
			<input type="hidden" id="k_p" name="k_p" value="1.38064852e-23" />
			<input type="hidden" id="h_p" name="h_p" value="6.62607004e-34" />
			<input type="hidden" id="G_p" name="G_p" value="6.67385e-11" />
			<input type="hidden" id="c_p" name="c_p" value="299792458" />
			<input type="hidden" id="lambda_cosmo_const" value="1.1056e-52" />
			<input type="hidden" id="typeannee" name="typeannee" value="Grégorienne" />
			{/* change the calculs Annexe based on which link is clicked */}
			<input className="myButton" id="calc" type="button" onClick={() => ouvre_calc_Noire()} value="Calculs Annexes" />
			<p id="txt_titre" style={{ fontSize: '20px', fontWeight: "bold", textAlign: "center" }}></p>
		  </div><br />

	  
		  {(() => {
			switch (linkClicked) {
			  case "Standard":
				return (
					<>
					
				{/* <!-- Titre  --> */}
					<p id="txt_titre" style={{ fontSize: '20px' , fontWeight:'bold' , textAlign:'center'}} dangerouslySetInnerHTML={{ __html: t("page_univers.titre") || '' }}></p>

					<Warning header={t("page_univers_general.simuavertissement")} text={t("page_univers_general.avertissement")} />

				  <CosmologicalConstant
					Universe={Universe}
					handleChange={handleChange}
					params={params}
				  />
				  </>
				);
			  case "Energie_Sombre":
				return (

					<>
					{/* <!-- Titre  --> */}
					<p id="txt_titre" style={{ fontSize: '20px' , fontWeight:'bold' , textAlign:'center'}} dangerouslySetInnerHTML={{ __html: t("page_univers_noire.titre") || '' }}></p>

					<Warning header={t("page_univers_general.simuavertissement")} text={t("page_univers_general.avertissement")} />
				  <DarkEnergy
					Universe={Universe}
					handleChange={handleChange}
					params={params}
				  />
				  </>

				);
			  default:
				return(
					<>
					
				{/* <!-- Titre  --> */}
					<p id="txt_titre" style={{ fontSize: '20px' , fontWeight:'bold' , textAlign:'center'}} dangerouslySetInnerHTML={{ __html: t("page_univers.titre") || '' }}></p>

					<Warning header={t("page_univers_general.simuavertissement")} text={t("page_univers_general.avertissement")} />

				  <CosmologicalConstant
					Universe={Universe}
					handleChange={handleChange}
					params={params}
				  />
				  </>
				);
			}
		  })()}
		</>
	  );	  
		  }	  