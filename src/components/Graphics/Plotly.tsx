import { Simulation_universe } from "@/ts/class/simulation/simulation_universe";
import { use } from "i18next";
import * as plotly from "react-plotly.js";
import { useState, useEffect } from "react";

interface Props {
    x: number[],
    y: number[],
}

export default function Plotly(props : Props): JSX.Element {

    return (
        <div>
        <plotly.default
            data={[
            {
                x: props.x,
                y: props.y,
                mode: 'lines'
            },
            ]}
            layout={{}}
        />
        </div>
    );
}