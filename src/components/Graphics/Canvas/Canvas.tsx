import React from "react";
import { useEffect, useRef } from "react";
import drawCanvas from "./drawCanvas";



//a component to render the canvas element
export default function Canvas(){
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          drawCanvas(canvas);
        }
      }, []);

    return(
        <canvas id="canvas" width={300} height={400} ref={canvasRef}></canvas>
    )}