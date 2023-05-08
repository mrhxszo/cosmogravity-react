import { Simulation_universe } from "../../ts/class/simulation/simulation_universe";

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

export default function EnergieSombre (props: Props){
    return(
        <>
        <h1>hello from Energie sombre</h1>
        </>
    );
}