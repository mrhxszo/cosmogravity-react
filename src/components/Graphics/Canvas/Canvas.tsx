import { useState, useEffect, useRef } from "react";
import { drawCanvas, transformDistance, updatePoint } from "./drawCanvas";
import { Simulation_universe } from "@/ts/class/simulation/simulation_universe";
import { useTranslation } from 'react-i18next';
import ConstantsAdjunct from "@/components/Univers/AdjunctComputations/AdjuctButton";

interface Props {
  UniverseRef: React.RefObject<Simulation_universe>,
  handleClick: Function,
  handleChange: Function,
  params: {
    T0: number,
    H0: number,
    omegam0: number,
    omegaDE0: number
  },
}

// Component to render the canvas element
export default function Canvas(props: Props) {

  const Universe = props.UniverseRef.current; // Get the current value from the UniverseRef ref

  const canvasRef = useRef<HTMLCanvasElement>(null); // Create a ref to the canvas element

  const [languageChanged, setLanguageChanged] = useState(false); // State to track language change

  const transformedCoords = transformDistance.OmegaToCanvas(Universe ? Universe.matter_parameter : 500, Universe ? Universe.dark_energy.parameter_value : 500);
  // Calculate transformed coordinates using OmegaToCanvas function, with default values if Universe is not available

  const [point, setPoint] = useState({ // State for coordinates of the point
    x: transformedCoords ? transformedCoords.x : 0,
    y: transformedCoords ? transformedCoords.y : 0,
  });

  const { i18n } = useTranslation(); // Initialize i18n for language translation

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
      drawCanvas(canvas); // Draw the canvas

      // Set point each time props.params is updated     
      const transformedCoords = transformDistance.OmegaToCanvas(Number(props.params.omegam0), Number(props.params.omegaDE0));

      if (transformedCoords) {
        setPoint({ x: transformedCoords.x, y: transformedCoords.y });
      }
    }
  
    setLanguageChanged(false); // Resetting languageChanged state
  }, [languageChanged, props.params]);

  // useEffect to update the canvas when point changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && point.x <= 281 && point.x >= 52 && point.y <= 354 && point.y >= 30) {
      updatePoint(canvas, point.x, point.y); // Update the canvas with the new point
    }
  }, [point]);

  // Function to handle canvas click event
  function handleClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      // Transform the distance to the canvas coordinate system
      const { x, y } = transformDistance.CanvasToOmega(offsetX, offsetY);

      // Update the universe instance and input
      if (Universe) {
        Universe.matter_parameter = Number(x.toFixed(4));
        Universe.dark_energy.parameter_value = Number(y.toFixed(4));
        props.handleChange();
        props.handleClick();
      }

      // Set the point, hence the useState is updated and the canvas is rerendered
      setPoint({ x: offsetX, y: offsetY });
    }
  }

  return (
    <canvas id="canvas" width={300} height={400} ref={canvasRef} onClick={handleClick}></canvas>
  );
}
