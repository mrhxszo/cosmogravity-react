import { Simulation_universe } from "@/ts/class/simulation/simulation_universe";
import { use } from "i18next";
import Plotly from "react-plotly.js";
import { useState, useEffect } from "react";

interface Props {
    x: {
        xData:number[],
        xName:string,},
    y: {
        yData:number[],
        yName:string,
    }
    title: string,
}

export default function PlotlyComponent(props : Props): JSX.Element {

    return (
        <div>
        <Plotly
            data={[
            {
                x: props.x.xData,
                y: props.y.yData,
                mode: 'lines'
            },
            ]}
            layout={{
                xaxis: {
                    title: props.x.xName,
                    autorange: true,
                    titlefont:{family:"Time New Roman, sans-serif",size:16,color:"#111111"},
                },
                yaxis: {
                    rangemode: 'tozero',
                    title: props.y.yName,
                    autorange: true,
                    titlefont:{family:"Time New Roman, sans-serif",size:16,color:"#111111"},
                    showline: true,
                },
                title: props.title,
                width: 700 ,
                height:500 ,
            }}
        />
        </div>
    );
}