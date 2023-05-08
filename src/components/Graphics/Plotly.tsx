import { Simulation_universe } from "@/ts/class/simulation/simulation_universe";
import { use } from "i18next";
import * as plotly from "react-plotly.js";
import { useState, useEffect } from "react";

interface Props {
    Simulation: Simulation_universe
}

export default function Plotly(props: Props): JSX.Element {

    const [aTau, setATau] = useState({ x: [0], y: [0] });

    useEffect(() => {
    
        setATau(props.Simulation.compute_scale_factor(0.0001, [0.01, 10]));
        console.log(props.Simulation);
    }, [props.Simulation]);


    return (
        <div>
        <plotly.default
            data={[
            {
                x: aTau.x,
                y: aTau.y,
                mode: 'lines'
            },
            ]}
            layout={{}}
        />
        </div>
    );
}