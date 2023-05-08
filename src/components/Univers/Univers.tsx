import ConstanteCosmologique from './ConstanteCosmologique';
import EnergieSombre from './EnergieSombre';
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

    return(
        <>
        
        {linkClicked === "Standard" && <ConstanteCosmologique Universe={Universe} handleChange={handleChange} params={params}></ConstanteCosmologique>}
        {linkClicked === "Energie_Sombre" && <EnergieSombre Universe={Universe} handleChange={handleChange} params={params}></EnergieSombre>}
        </>
        
    );
}