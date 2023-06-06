import Plotly from "react-plotly.js";
import { useState, useEffect, useRef } from "react";
import {AxisType, downloadImage, newPlot } from "plotly.js";
import { type } from "os";

enum TypesImages {
	png = "png",
	jpeg = "jpeg",
	webp = "webp",
	svg = "svg"
}

interface Props {
    x: {
        xData:number[],
        xName:string,
        type?:AxisType,
    },
    y: {
        yData:number[][],
        yName:string,
        name?:string[],
    }
    title: string | undefined,
    downloadButton?: {
        changeDownload: React.Dispatch<React.SetStateAction<{ download: boolean; type: TypesImages; }>>;
        isDownload:boolean,
        whatType:TypesImages,
    }
}



export default function PlotlyComponent(props : Props): JSX.Element {


//This part of code recieves data from props and based on how many data sets are there it creates data array for plotly
let data : any = [];

if(props.y.yData.length <= 1){
    data.push({
        x: props.x.xData,
        y: props.y.yData[0],
        mode: 'lines',
        type: 'scatter',
    });
}
else{
    props.y.yData.forEach(
    (value, index) => {
        data.push({
            x: props.x.xData,
            y: props.y.yData[index],
            mode: 'lines',
            type: 'scatter',
            name: props.y.name ? props.y.name[index] : undefined,
        });
    });
};

const layout = {
    xaxis: {
        title: props.x.xName,
        autorange: true,
        titlefont:{family:"Time New Roman, sans-serif",size:16,color:"#111111"},
        type: props.x.type,
    },
    yaxis: {
        rangemode:"tozero" as const,
        title: props.y.yName,
        autorange: true,    
        titlefont:{family:"Time New Roman, sans-serif",size:16,color:"#111111"},
        showline: true,
    },
    title: props.title,
    width: 900 ,
    height:600 ,
};


/////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {

        if(props.downloadButton?.isDownload){

           
            //This part of code is responsible for downloading image
            newPlot('save',data,layout)
            .then (async (gd) => {
                await downloadImage(gd, {
                    format: props.downloadButton?.whatType || TypesImages.png,
                    width: 800,
                    height: 600,
                    filename: "download"
                });
            })
            //important: set the download button to false so there is no infinite download loop
            props.downloadButton.changeDownload((prevState)=>({download:false, type:prevState.type}));
      
    };
},[props.downloadButton]);

    return (
        <div>
        <Plotly
            data={data}
            layout={layout}
        />
        <div id="save" style={{display:"none"}}></div>
        </div>
    );
}