//importing class
import PlotlyComponent from "../../Graphics/PlotlyComponent";
import { Simulation_universe } from "@/ts/class/simulation/simulation_universe";
import { useState } from "react";

interface Props {
    Universe : Simulation_universe
}

export default function GraphGenerator(props: Props){

    //useState for z axis range
    const [z , setZ] = useState({zmin: 0, zmax: 25, zstep: 300});

    //useState for graphs
    const [ graphs, setGraphs] =  useState<React.ReactNode[]>([]);
    
    function handleClickZ(event: React.MouseEvent<HTMLInputElement>){
        let zGraph = Array<number>();
        let step = (Number(z.zmax) - Number(z.zmin))/Number(z.zstep);
        for(let i = z.zmin; i <= z.zmax; i += step){
            zGraph.push(i);
        }

        if(event.currentTarget.id === "distances"){
          let dm = zGraph.map((element) => props.Universe.metric_distance(element));
          let test : number[] = [10, 20, 30, 40, 50, 60 ]

          setGraphs((prevState) =>[...prevState, <PlotlyComponent 
            x = {{xData:zGraph, xName:"z"}}
            y = {{yData:[dm,test],yName:"dm"}} 
            title="dm, dLT etc fonction de z"
            />]);
        }

        else if(event.currentTarget.id === "omegas"){
          let omegas = props.Universe.compute_omegas(zGraph);
          let {omega_matter, omega_rad, omega_de, omega_courbure} = omegas
          setGraphs((prevState) =>[<PlotlyComponent 
            x = {{xData:zGraph, xName:"z"}}
            y = {{yData:[omega_matter, omega_rad, omega_de, omega_courbure],yName:"Ω"}} 
            title="Omegas en fonction de z"
            />, ...prevState]);
        }
        else if(event.currentTarget.id === "temps"){
          let time = zGraph.map((element) => props.Universe.emission_age(element));
          setGraphs((prevState) =>[<PlotlyComponent
            x = {{xData:zGraph, xName:"z"}}
            y = {{yData:[time],yName:"t"}} 
            title="temps en fonction de z"
            />, ...prevState], );

        }
        
        
    }

    function handleZChange(event: React.ChangeEvent<HTMLInputElement>){
        const {value, id} = event.target;
        setZ({...z, [id]: value});
    }

    return(
        <div className="border">
          {/* Generateur des graphiques */}
          <div>
            <span id="txt_generateur_graphiques" style={{fontWeight: 'bold'}}>Génerateur des Graphiques (z<sub>max</sub> et z<sub>min</sub> &gt;-1):</span>
          </div>
          <div id="graph_gen_box">
            <div>
              <div style={{padding: '10px 20px 10px 0'}}>
                <label htmlFor="zmin">
                  <span id="txt_zmin">z<sub>min</sub></span>
                </label>
                <input id="zmin" type="text" defaultValue={0} onChange={handleZChange}/>
              </div>
              <div style={{padding: '10px 20px 10px 0'}}>
                <label htmlFor="zmax">
                  <span id="txt_zmax">z<sub>max</sub></span>
                </label>
                <input id="zmax" type="text" defaultValue={25}  onChange={handleZChange}/>
              </div>
              <div style={{padding: '10px 20px 10px 0'}}>
                <label htmlFor="zstep">
                  <span id="txt_pas">Pas :</span>
                </label>
                <input id="zstep" type="text" defaultValue={300} onChange={handleZChange}/>
              </div>
            </div>
            {/* bouton pour tracer graphes en fonction de z */}
            <div>
              <div style={{padding: '10px'}}>
                <label htmlFor="distances">
                  <span id="txt_graphe_d">Tracer d<sub>i</sub>(z)</span>
                </label>
                <input id="distances" type="button" onClick={handleClickZ} defaultValue="Tracer" />
              </div>  				
              <div style={{padding: '10px'}}>
                <label htmlFor="omegas">
                  <span id="txt_graphe_omega">Tracer Ω<sub>i</sub>(z)</span>
                </label>
                <input id="omegas" type="button" onClick={handleClickZ} defaultValue="Tracer" />
              </div>
              <div style={{padding: '10px'}}>
                <label htmlFor="temps">
                  <span id="txt_graphe_t">Tracer t(z)</span>
                </label>
                <input id="temps" type="button" onClick={handleClickZ} defaultValue="Tracer" />
              </div>
            </div>
            {/* bouton pour tracer graphes en fonction de t */}
            <div>
              <div style={{padding: '10px'}}>
                <label htmlFor="boutonGraphe_distances_t">
                  <span id="txt_graphe_d_t">Tracer d<sub>i</sub>(t)</span>
                </label>
                <input id="boutonGraphe_distances_t" type="button" onClick="lance_calc(4);" defaultValue="Tracer" />
              </div>  
              <div style={{padding: '10px'}}>
                <label htmlFor="boutonGraphe_omega_t">
                  <span id="txt_graphe_omega_t">Tracer Ω<sub>i</sub>(t)</span>
                </label>
                <input id="boutonGraphe_omega_t" type="button" onclick="lance_calc(5);" defaultValue="Tracer" />
              </div>
              <div style={{padding: '10px'}}>
                <label htmlFor="boutonGraphe_z_t">
                  <span id="txt_graphe_z_t">Tracer z(t)</span> {/*S Ici pour mettre le string devant le button*/}
                </label>
                <input id="boutonGraphe_z_t" type="button" onclick="lance_calc(6);" defaultValue="Tracer" /> {/*La value des autres boutons est donc changer autre part? ... Pourquoi ne pas directement mettre le bon nom? :( )*/}
              </div>
            </div>
            {/* bouton forme checkbox pour tracer les graphes en echelle log de d et omega*/}
            <div>
              <div style={{padding: '10px 13px'}}>
                <label htmlFor="d_checkbox">
                  <span id="txt_echelle_log_d">Échelle log</span>
                </label>
                <input type="checkbox" name="d_checkbox" id="d_checkbox" defaultValue="Calcul" />
              </div>
              <div style={{padding: '15px'}}>
                <label htmlFor="omega_checkbox">
                  <span id="txt_echelle_log_omega">Échelle log</span>
                </label>
                <input type="checkbox" name="omega_checkbox" id="omega_checkbox" defaultValue="Calcul" />
              </div>
              {/* bouton forme checkbox pour tracer les graphes en echelle log de t*/}
              {/*S C'est le bouton en vis-à-vis de t(z) Tracer et z(t) Tracer*/}
              <div style={{padding: '12px 15px'}}>
                <label htmlFor="t_checkbox">
                  <span id="txt_echelle_log_t">Échelle log</span>
                </label>
                <input type="checkbox" name="t_checkbox" id="t_checkbox" defaultValue="Calcul" />
              </div>
            </div>
          </div>
            {/* Affichage des graphiques */}
            {graphs}
        </div>
    )
}