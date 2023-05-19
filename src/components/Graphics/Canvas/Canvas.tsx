import { useState, useEffect, useRef } from "react";
import drawCanvas from "./drawCanvas";
//language hook
import { useTranslation } from 'react-i18next';
import { Simulation_universe } from "@/ts/class/simulation/simulation_universe";



//a component to render the canvas element
export default function Canvas(props: {universe:Simulation_universe}){
    const canvasRef = useRef<HTMLCanvasElement>(null);

    //useState for rerender when language changes
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

    //useEffect to draw the canvas each time langauge is changed
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          drawCanvas(canvas);
        }
        setLanguageChanged(false);
      }, [languageChanged]);

      function handleClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>){
        const canvas = canvasRef.current;
        if (canvas) {
          //drawCanvas(canvas, props.universe.matter_parameter, props.universe.dark_energy.parameter_value, event);
          console.log(event)
        }
      }

    return(
        <canvas id="canvas" width={300} height={400} ref={canvasRef} onClick={handleClick}></canvas>
    )}