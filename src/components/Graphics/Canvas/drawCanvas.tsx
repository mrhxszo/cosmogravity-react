//language hook
import {t} from "i18next"

/*@ this function creates the canvas for interactive graph on bottom right corner of cosmological constant page*/
export function drawCanvas(canvas: HTMLCanvasElement, omegam0?: number, omegaDE0?:number, event?: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    let context = canvas.getContext("2d");
    if (!context) return;

    //draw a rectangle
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(298, 0);
    context.lineTo(298, 400);
    context.lineTo(0, 400);
    context.closePath();
    context.fillStyle = "white";//set background colour of rectangle to white
    context.fill();

    //draw another inner rectangle (for graduation)
    context.beginPath();
    context.moveTo(53, 29);
    context.lineTo(283, 29);
    context.lineTo(283, 354);
    context.lineTo(53, 354);
    context.closePath();
    context.stroke();

    //add first graduation x axis
    context.beginPath();
    context.moveTo(131, 354);
    context.lineTo(131, 344);
    context.closePath();
    context.stroke();

    //number for above graduation: 1 and 0
    context.font = "12pt Verdana";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = "black";
    context.fillText("1", 125, 362);

    //add second graduation x axis
    context.beginPath();
    context.moveTo(207, 354);
    context.lineTo(207, 344);
    context.closePath();
    context.stroke();

    //number for graduation x: 2  and 0
    context.font = "12pt Verdana";
    context.fillText("2", 204, 362);
    context.font = "12pt Verdana";
    context.fillText("0", 47, 362);

    //graduation y axis
    context.beginPath();
    context.moveTo(53, 247);
    context.lineTo(63, 247);
    context.closePath();
    context.stroke();

    //number 0 for graduation y
    context.font = "12pt Verdana";
    context.fillText("0", 40, 240);

    //graduation mark on -1 for graduation y
    context.beginPath();
    context.moveTo(53, 318);
    context.lineTo(63, 318);
    context.closePath();
    context.stroke();
    
    //number -1 for graduation y
    context.font = "12pt Verdana";
    context.fillText("-1", 35, 312);

    //number 1 for graduation y
    context.beginPath();
    context.moveTo(53, 174);
    context.lineTo(63, 174);
    context.closePath();
    context.stroke();
    context.font = "12pt Verdana";
    context.fillText("1", 40, 168);

    //number 2 for graduation y
    context.beginPath();
    context.moveTo(53, 101);
    context.lineTo(63, 101);
    context.closePath();
    context.stroke();
    context.font = "12pt Verdana";
    context.fillText("2",40, 95);

    //Write omegas as labels
    context.font = "23pt Verdana";
    context.fillText("\u03a9", 140, 362);
    context.font = "16pt Verdana";
    context.fillText("m", 164, 375);
	  context.font = "14pt Verdana";
    context.fillText("0", 185, 378);	
    context.font = "23pt Verdana";
    context.fillText("\u03a9", 0, 172);
    context.font = "16pt Verdana";
    context.fillText("\u039b", 24, 185);
	  context.font = "16pt Verdana";
    context.fillText("0", 38, 185);
    context.save();

    //This portion of the code writes the necessary text on the canvas

    //context.save() and context.restore() 
    //provide a convenient way to temporarily change the context state without having to manually reset all the settings afterward.

    //Write nor big bang nor big crunch
    context.font = "8pt Verdana";
    context.fillStyle = "blue";
    context.rotate(-.8);
    context.translate(-80, 60);
    context.fillText(t("canvas_univers.niBB"), 55, 45);

    context.fillText(t("canvas_univers.niBC"), 65, 60);
    context.restore();
    context.save();

    //write "close" on right bottom corner
    context.font ="8pt Verdana";
    context.fillStyle = "red";
    context.rotate(.7);
    context.translate(160, -180);
    context.fillText(t("canvas_univers.ferme"), 210, 270);
    context.restore();
    context.save();

    //write "open" on right bottom corner
    context.font = "8pt Verdana";
    context.fillStyle = "red";
    context.rotate(.7);
    context.translate(160, -180);
    context.fillText(t('canvas_univers.ouvert'), 110, 300);
    context.restore();
    context.save();

    //write "flat" on botom
    context.font = "8pt Verdana";
    context.fillStyle = "red";
    context.rotate(.7);
    context.translate(160, -180);
    context.fillText(t("canvas_univers.plat"), 170, 290);
    context.restore();
    context.save();
    
    // write "Big Bang" on top
    context.font = "8pt Verdana";
    context.fillStyle = "red";
    context.rotate(-.8);
    context.translate(-100, 80);
    context.fillText(t("canvas_univers.BB"), 115, 80);
    context.restore();
    context.save();

    //write "No Big Crunch"
    context.font = "8pt Verdana";
    context.fillStyle = "green";
    context.fillText(t("canvas_univers.noBC"), 140, 220);
    context.restore();
    context.save();

    //write "Big Crunch"
    context.font = "8pt Verdana";
    context.fillStyle = "green";
    context.fillText(t("canvas_univers.BC"), 170, 260);
    context.restore();
    context.save();

    //draw the red line going from (1,0) to (0,~2.5)
    let Omo = 53;
    let dtx = 78;
    let dty = 72;
    let Olo = 247;
    let Om = 0;
    context.save();
    context.beginPath();
    context.moveTo(53, 177);
    context.strokeStyle = "red";

    for (Om = 0; 3 > Om; Om += .5) {
      let OlCO = -Om + 1
      let x = Omo + Om * dtx
      let y = Olo - OlCO * dty 
      context.lineTo(x, y);
    }

    context.stroke();
    context.restore();
    context.save();
    context.closePath();


    //draw the green line going from  (1,0) to (1.3,~3)
    context.beginPath();
    context.strokeStyle = "green";
    let OlER = Om;
    let y = Olo;
    let x = Omo;
    context.lineTo(x, y);
    Om = 1;
    let u = 0;
    for (let liste_valeur = []; 2.95 >= Om;){
      u = 1 / 3 * Math.acos(1 / Om - 1)
      OlER = 4 * Om * Math.cos(u + 4 / 3 * Math.PI) * Math.cos(u + 4 / 3 * Math.PI) * Math.cos(u + 4 / 3 * Math.PI)
      x = Omo + Om * dtx
      y = Olo - OlER * dty
      context.lineTo(x,y)
      Om += .01;
    }  
    context.stroke();
    context.restore();
    context.save();
    context.closePath();

    //draw the blue line
    context.beginPath();
    context.strokeStyle = "blue";
    x = Omo;
    y = Olo - dty;
    context.lineTo(x, y);
    Om = .01;
    for (let w = 0; .5 >= Om;){
      w = 1 / 3 * Math.log(1 / Om - 1 + Math.sqrt((1 / Om - 1) * (1 / Om - 1) - 1))
      OlER = 4 * Om * Math.cosh(w) * Math.cosh(w) * Math.cosh(w)
      x = Omo + Om * dtx
      y = Olo - OlER * dty
      context.lineTo(x, y)
      Om += .01;

    } 
    Om = .5;

    for (let v = 0; 1.4 >= Om;){

      v = 1 / 3 * Math.acos(1 / Om - 1)
      OlER = 4 * Om * Math.cos(v) * Math.cos(v) * Math.cos(v)
      x = Omo + Om * dtx
      y = Olo - OlER * dty
      context.lineTo(x, y)
      Om += .01;
    } 

    context.stroke();
    context.restore();
    context.save();
    context.closePath();
}

/*transformDistance object
*CanvasToOmega
*This function takes the x and y coordinates of the mouse and returns the corresponding transformed coordinates
@param x: x coordinate of the mouse
@param y: y coordinate of the mouse
@return: the transformed x and y coordinates

* OmegaToCanvas
* This function takes the x and y coordinates of the transformed canvas and returns the corresponding coordinates of the mouse
* @param x: x coordinate of the transformed canvas
* @param y: y coordinate of the transformed canvas
* @return: the x and y coordinates of the mouse
*/

export const transformDistance = { 
  
      CanvasToOmega :(x:number , y: number) => {

        //this following distance is calculated by subtracting x and y coordinates of the extremes of canvas
      const xextreme1 = 53;
      const xextreme2 = 283;
      const distanceX = xextreme2 - xextreme1;

      const yextreme1 = 29;
      const yextreme2 = 354;
      const distanceY = yextreme2 - yextreme1;

      //transform the distance like the graduation marks in the figure
      let transformDistanceX = ((x- xextreme1) / distanceX) * 3;//3 because x axis is divided in 3 parts

      let transformDistanceY = (-(y- yextreme2) / distanceY) * 5 - 1.5;//9 because one graduation is divided to 2 parts and there are 5 parts, except the last one which is smaller and counts as only one part
    //minus because counting starts from top to bottom contrary to bottom to top in canvas

      return {x: transformDistanceX, y: transformDistanceY}
    },
    OmegaToCanvas: (OmegaM: number, OmegaLambda: number) => {
      
      //check if OmegaM and OmegaLambda are in the range of the figure
      if (!(OmegaM <= 0 || OmegaM >= 3 || OmegaLambda <= -1.5 || OmegaLambda >= 3.5)) {

        //this following distance is calculated by subtracting x and y coordinates of the extremes of canvas
        const xextreme1 = 53;
        const xextreme2 = 283;
        const distanceX = xextreme2 - xextreme1;

        const yextreme1 = 29;
        const yextreme2 = 354;
        const distanceY = yextreme2 - yextreme1;

        //transform the omegas from graduation marks in the figure to canvas coordinates
        let transformDistanceX = (OmegaM * distanceX) / 3 + xextreme1;

        let transformDistanceY = (-OmegaLambda * distanceY) / 5 - 1.5 * distanceY / 5 + yextreme2;

        return {x: transformDistanceX, y: transformDistanceY}
      }
    }


}


export function updatePoint(canvas: HTMLCanvasElement, x: number, y: number) {
  let ctx = canvas.getContext("2d");
  
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas in case it already contains the point
  drawCanvas(canvas); // Redraw the canvas

  // Draw the point
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, 2 * Math.PI);
  ctx.fillStyle = "red"; // Set the fill color to red
  ctx.fill(); // Fill the circle with red color
}