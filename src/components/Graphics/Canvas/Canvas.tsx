import { useState, useEffect, useRef } from "react";
import {drawCanvas, transformDistance, updatePoint} from "./drawCanvas";
//language hook
import { useTranslation } from 'react-i18next';
import { Simulation_universe } from "@/ts/class/simulation/simulation_universe";
import { update } from "plotly.js";

// a component to render the canvas element
export default function Canvas(props: { universe: Simulation_universe }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useState for rerender when language changes
  const [languageChanged, setLanguageChanged] = useState(false);

  const { i18n } = useTranslation();
  useEffect(() => {
    const handleLanguageChange = () => {
      // Language has changed
      setLanguageChanged(true);
    };

    // Subscribe to language change event
    i18n.on("languageChanged", handleLanguageChange);

    // Clean up the subscription when the component unmounts
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  // useEffect to draw the canvas each time language is changed
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      drawCanvas(canvas);
    }
    setLanguageChanged(false);
  }, [languageChanged]);

  function handleClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      //plot the point
      updatePoint(canvas, offsetX, offsetY);
      //transform the distance to the canvas coordinate system
      const{x , y} = transformDistance.CanvasToOmega(offsetX, offsetY);



    }


  }

  return (
    <canvas id="canvas" width={300} height={400} ref={canvasRef} onClick={handleClick}></canvas>
  );
}
