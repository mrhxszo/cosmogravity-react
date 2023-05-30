import CosmologicalConstant from './CosmologicalConstant';
import DarkEnergy from './DarkEnergy';
import LinkContext from '../Header/LinkContext';
import { useState, useContext, useEffect, useRef } from 'react';
import { Simulation_universe } from "../../ts/class/simulation/simulation_universe";
import Warning from '../Warning/Warning';

//importing language using i18next
import { useTranslation } from 'react-i18next';
import AdjunctButton from './AdjunctComputations/AdjuctButton';

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
		omegaDE0: Universe.dark_energy.parameter_value,
		omega0: Universe.dark_energy.w_0,
		omega1:Universe.dark_energy.w_1
		 });
	
	//useState for select options for matter, lambda, radiation and dark energy and for isFlat
	const [selectValue, setSelectValue] = useState({value:"Matière, Lambda, RFC et Neutrinos", isFlat: false});
	

	//useEffect for updating the class Simulation_universe
	useEffect(() => {
		Universe.temperature = params.T0;
		Universe.hubble_cst = params.H0;
		Universe.matter_parameter = params.omegam0;
		Universe.dark_energy.parameter_value = params.omegaDE0;
		Universe.dark_energy.w_0 = params.omega0;
		Universe.dark_energy.w_1 = params.omega1;
		console.log("w_0= ", Universe.dark_energy.w_0);
		console.log("w_1= ", Universe.dark_energy.w_1);
	}, [params,selectValue]);
	
    
	//assign the user's input to the class Simulation_universe
	function handleChange(event?: any) {
		if(event){
			const { id, value } = event.target;
			setParams(prevState => ({
				...prevState,
				[id]: value
			}));
		}
		else{
			setParams(prevState => ({
				...prevState,
				omegam0: Universe.matter_parameter,
				omegaDE0: Universe.dark_energy.parameter_value,
			}));
		}

	}

	//handle the select options for matter, lambda, radiation and dark energy
	function handleSelect(event: any) {

		const { id, value } = event.target;
		if(id === "liste" && Universe){

			setSelectValue((prevState)=>{return {...prevState, value: value}});
			switch (value) {
				case "Matière et Lambda":
					Universe.has_neutrino = false;
					Universe.has_cmb = false;
					break;
				case "Matière, Lambda et RFC":
					Universe.has_neutrino = false;
					Universe.has_cmb = true;
					break;
				default:
					Universe.has_neutrino = true;
					Universe.has_cmb = true;
					break;
			}
		}

		if(id === "univ_plat" && Universe){
			setSelectValue((prevState)=>{
				return {...prevState, isFlat: !selectValue.isFlat};
			});
			Universe.is_flat = !selectValue.isFlat;
		}
		
	}

	return (
		<>
		  {/* Boutons Calculs annexes et params */}
		  <div id="Boutons_top_right">
			<input className="myButton" id="para" type="button" onClick={() => param()} value={t("page_univers_general.bouton_constantes")||""} />
			{/* change the calculs Annexe based on which link is clicked */}
			<AdjunctButton UniverseRef={UniverseRef} params={params} handleSelect={handleSelect}/>
			<p id="txt_titre" style={{ fontSize: '20px', fontWeight: "bold", textAlign: "center" }}></p>
		  </div><br />

		  <Warning header={t("page_univers_general.simuavertissement")} text={t("page_univers_general.avertissement")} />
	  
		  {(() => {
			switch (linkClicked) {
			  case "Standard":
				return (
					<>
					
				{/* <!-- Titre  --> */}
					<p id="txt_titre" style={{ fontSize: '20px' , fontWeight:'bold' , textAlign:'center'}} dangerouslySetInnerHTML={{ __html: t("page_univers.titre") || '' }}></p>

				  <CosmologicalConstant
					UniverseRef={UniverseRef}
					handleChange={handleChange}
					params={params}
					handleSelect={handleSelect}
					selectValue = {selectValue}
					setParams={setParams}
				  />
				  </>
				);
			  case "Energie_Sombre":
				return (

					<>
					{/* <!-- Titre  --> */}
					<p id="txt_titre" style={{ fontSize: '20px' , fontWeight:'bold' , textAlign:'center'}} dangerouslySetInnerHTML={{ __html: t("page_univers_noire.titre") || '' }}></p>

					<DarkEnergy
					UniverseRef={UniverseRef}
					handleChange={handleChange}
					params={params}
					handleSelect={handleSelect}
					selectValue = {selectValue}
				  />
				  </>

				);
			  default:
				return(
					<>
					
				{/* <!-- Titre  --> */}
					<p id="txt_titre" style={{ fontSize: '20px' , fontWeight:'bold' , textAlign:'center'}} dangerouslySetInnerHTML={{ __html: t("page_univers.titre") || '' }}></p>

				
				  <CosmologicalConstant
					UniverseRef={UniverseRef}
					handleChange={handleChange}
					params={params}
					handleSelect={handleSelect}
					selectValue = {selectValue}
					setParams={setParams}
				  />
				  </>
				);
			}
		  })()}
		</>
	  );	  
		  }	  