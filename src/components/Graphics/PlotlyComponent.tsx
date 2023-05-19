import Plotly from "react-plotly.js";
import { useState, useEffect, useRef } from "react";
import {downloadImage, newPlot } from "plotly.js";

enum TypesImages {
	png = "png",
	jpeg = "jpeg",
	webp = "webp",
	svg = "svg"
}

interface Props {
    x: {
        xData:number[][],
        xName:string,},
    y: {
        yData:number[][],
        yName:string,
    }
    title: string | undefined,
    downloadButton: {
        changeDownload: React.Dispatch<React.SetStateAction<{ download: boolean; type: TypesImages; }>>;
        isDownload:boolean,
        whatType:TypesImages,
    }
}



export default function PlotlyComponent(props : Props): JSX.Element {


//This part of code recieves data from props and based on how many data sets are there it creates data array for plotly
let data : any = [];

if(props.x.xData.length <= 1){
    data.push({
        x: props.x.xData[0],
        y: props.y.yData[0],
        mode: 'lines',
        type: 'scatter',
    });
}
else{
    props.x.xData.forEach(
    (value, index) => {
        data.push({
            x: props.x.xData[index],
            y: props.y.yData[index],
            mode: 'lines',
            type: 'scatter',

        });
    });
};

const layout = {
    xaxis: {
        title: props.x.xName,
        autorange: true,
        titlefont:{family:"Time New Roman, sans-serif",size:16,color:"#111111"},
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

        if(props.downloadButton.isDownload){

           
            //This part of code is responsible for downloading image
            newPlot('save',data,layout)
            .then (async (gd) => {
                await downloadImage(gd, {
                    format: props.downloadButton.whatType,
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