//language
import {t} from "i18next"
import { useState } from "react";

//icons and tools
import { AiFillCloseCircle } from "react-icons/ai";
import { IoRefreshCircleSharp } from "react-icons/io5";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

//importing class
import { Simulation_universe } from "@/ts/class/simulation/simulation_universe";
import { parsec, ly, k_parsec } from "../../../ts/constants";
interface Props {
  handleClick: Function,
  UniverseRef: React.RefObject<Simulation_universe>,
	params: {
		T0: number,
		H0: number,
		omegam0: number,
		omegaDE0: number
	},
  handleSelect: Function,
  selectValue: {
    value: string,
    isFlat: boolean,
  },
}

//if the values of constants recieved from params is to be changed then need to add a useState for that search "Les paramètres cosmologiques :" (26/05/2023)


export default function ConstantsAdjunct(props: Props) {

  let Universe = props.UniverseRef.current;
  
  const [z, setZ] = useState({ z1:{value:0, bool:false}, z2:{value:0, bool:false}, i_e: 0 }); //the bool is added for the check box while measuring diametre and apparent diametre

  //to store the value of the Inputs in inverse Boxes 
  const [inv, setInv ] = useState({dmInv:0, tRecpetionInv:0, tEmissionInv:0})

  //to store the result of the calculation when the button is clicked
  const [result, setResult] = useState({

                                        //Cosmological constants dependent on z1 and z2
                                        Tz1: 0, Tz2: 0, Hz1: 0, Hz2: 0, 
                                        omega_m_z1: 0, omega_m_z2: 0, omega_DE_z1: 0, omega_DE_z2: 0, 
                                        omega_r_z1 : 0, omega_r_z2 : 0,
                                        omega_k_z1 : 0, omega_k_z2 : 0,

                                        //Geometrytemission
                                        dm1: 0, dm2 : 0,//distance metric
                                        temission: 0, treception: 0,
                                        dz1: 0, dz2: 0,//redshift

 
                                        //photometry
                                        Le: 0, dl1: 0, dl2: 0,
                                        add1 : 0, add2 : 0,
                                        Ee1: 0, Ee2: 0,

                                        //diameter and apparent diameter
                                        dmetre:0 , dKpc:0, phi: 0,

                                        //inverse calculation
                                        zInv: 0, z1Inv:0, z2Inv:0, 
                                      });


  //to extract the value of z1 and z2
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    
    const { id, value } = e.target; // Extract the id and value from the event target

    //for z1 and z2
    if(e.target.type === "checkbox"){
      const { id, checked } = e.target;
      setZ((prevZ) => ({
        ...prevZ,
        [id as keyof typeof prevZ]: { ...prevZ[id as keyof typeof prevZ as "z1" | "z2"], bool: checked },
      }));
      return;
    }

    //for inverse calculation
    else if (e.currentTarget.parentNode) {
      const parentId = e.currentTarget.parentNode.id;
  
      if (parentId === "inverse") {
        setInv((prevInv) => ({
          ...prevInv,
          [id]: value,
        }));
      }
    }
    else {
        
      setZ((prevZ) => ({
        ...prevZ,
        [id as keyof typeof prevZ]: { ...prevZ[id as keyof typeof prevZ as "z1" | "z2"], value: Number(value) },
      }));    
    }

  }
                                      
                                      
                                      

  function handleClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    
    //Calculate phi for given diameter
    let phi: number = result.phi;

    if (event.currentTarget.id === "kpc-phi") {
      phi = z.z1.bool //see which checkbox user has clicked
        ? Universe?.apparent_diameter(Number(z.z1.value), (result.dKpc * k_parsec)) || 0
        : Universe?.apparent_diameter(Number(z.z2.value), (result.dKpc * k_parsec)) || 0;
    } else if (event.currentTarget.id === "metre-phi") {
      phi = z.z1.bool
        ? Universe?.apparent_diameter( Number(z.z1.value), result.dmetre) || 0
        : Universe?.apparent_diameter(Number(z.z2.value), result.dmetre) || 0;
    }

    //Calculate the two diameter for given phi
    let dmetre: number = result.dmetre;
    let dKpc: number = result.dKpc;
  
    if (event.currentTarget.id === "Diametres") {
      dmetre = z.z1.bool //see which checkbox user has clicked
        ? Universe?.apparent_diameter(Number(z.z1.value), 0, result.phi) || 0
        : Universe?.apparent_diameter(Number(z.z2.value), 0, result.phi) || 0;
      
      dKpc = dmetre / k_parsec;
      } 
    

    if (Universe) {
      setResult((prevState) => {
        if (Universe) {
          return {
            ...prevState,
            // constants dependent on z
            Tz1: Universe.compute_temp_and_hubble(Number(z.z1.value)).temparature,
            Tz2: Universe.compute_temp_and_hubble(Number(z.z2.value)).temparature,
            Hz1: Universe.compute_temp_and_hubble(Number(z.z1.value)).hubble_cst,
            Hz2: Universe.compute_temp_and_hubble(Number(z.z2.value)).hubble_cst,
            omega_m_z1: Universe.compute_omegas([Number(z.z1.value)]).omega_matter[0],
            omega_m_z2: Universe.compute_omegas([Number(z.z2.value)]).omega_matter[0],
            omega_DE_z1: Universe.compute_omegas([Number(z.z1.value)]).omega_de[0],
            omega_DE_z2: Universe.compute_omegas([Number(z.z2.value)]).omega_de[0],
            omega_r_z1: Universe.compute_omegas([Number(z.z1.value)]).omega_rad[0],
            omega_r_z2: Universe.compute_omegas([Number(z.z2.value)]).omega_rad[0],
            omega_k_z1: Universe.compute_omegas([Number(z.z1.value)]).omega_courbure[0],
            omega_k_z2: Universe.compute_omegas([Number(z.z2.value)]).omega_courbure[0],
  
            // Geometry
            dm1: Universe.metric_distance(Number(z.z1.value)),
            dm2: Universe.metric_distance(Number(z.z2.value)),
            temission: Universe.emission_age(Number(z.z1.value)),
            treception: Universe.emission_age(Number(z.z2.value)),
            dz1: Universe.dz(Number(z.z1.value)),
            dz2: Universe.dz(Number(z.z2.value)),
  
            // Photometry
            Le: Universe.luminosity(Number(z.i_e)),
            dl1: Universe.luminosity_distance(Number(z.z1.value)),
            dl2: Universe.luminosity_distance(Number(z.z2.value)),
            add1: Universe.angular_diameter_distance(Number(z.z1.value)),
            add2: Universe.angular_diameter_distance(Number(z.z2.value)),
            Ee1: Universe.brightness(Number(z.z1.value), result.Le),
            Ee2: Universe.brightness(Number(z.z2.value), result.Le),
  
            // Diameter and apparent diameter
            dmetre: dmetre,
            dKpc: dKpc,
            phi: phi,

            //Inverse Calculation
            zInv: Universe.metric_distance_inverse(Number(inv.dmInv)),
            z1Inv: Universe.emission_age_inverse(Number(inv.tEmissionInv)*365*24*60*60),//convert year to second
            z2Inv: Universe.emission_age_inverse(Number(inv.tRecpetionInv)*365*24*60*60),
          };
        }
        return prevState;
      });
    }
  };



    return (
        <>
            <div style={{"position":"absolute",
            "width":"95%",
            "height":"fit-content",
            "backgroundColor":"antiquewhite",
            "boxShadow":"-4px -2px 16px 0px black",
            "top":"12%",
            "left":"2%",
            "zIndex":"1000",
            "borderRadius":"2%",
            }}>  
               
            <div style={{"textAlign":"center",
                          "height":"5%",
                          "backgroundColor":"#a73f2d",
                          "position":"relative",
                          "top":"1%",
                          "marginTop":"0%",
                          "padding":"1%",
                          "color":"white",
                          "borderRadius":"1%",
                          "display":"flex",
                          "justifyContent":"space-between"}}>

                <h2 id="txt_titre">
                {t('page_univers_general.bouton_calculsAnnexes')}</h2>

              <div>
                  <IoRefreshCircleSharp className="icons" data-tooltip-id="refresh" data-tooltip-content={t("page_univers_calculs.bouton_rafraichir") || ""}/>
                  <AiFillCloseCircle className="icons"  onClick={() => props.handleClick()} data-tooltip-id="close" data-tooltip-content={t("page_univers_calculs.bouton_fermer") || ""}/>
                  
                  {/* add tootip to specify what above buttons do*/}
                  <ReactTooltip id="refresh" place="bottom" />
                  <ReactTooltip id="close" place="bottom" />
              </div>
              
            </div>
            

    <div id="TOUT">
        {/* Parametres de Calcul */}
        <div id="box1and2" style={{display: 'flex', flexDirection: 'row'}}>
          <div id="box2">
            <div className="border">
              <span id="txt_valeursZ" style={{fontWeight: 'bold'}}>Valeurs des z (z&gt;-1) à définir pour obtenir les distances métriques et les temps d'émission/réception :</span>
              <br />
              <div className="desact_retour">
                <label htmlFor="z1">z<sub>1</sub> =</label>
                <input id="z1" defaultValue={0} maxLength={13} type="text" onChange={handleChange} />
              </div>
              <div className="desact_retour">
                <label htmlFor="z2">z<sub>2</sub> =</label>
                <input id="z2" defaultValue={0} maxLength={13} type="text" onChange={handleChange}/>
              </div>
              <br />
              {/* Ie pour calculs de Eclairement */}
              <span id="txt_valeurs_Intensite" style={{fontWeight: 'bold'}}>Valeur de l'Intensite pour des resultats de photométrie (E<sub>e</sub>,L<sub>e</sub>):</span>
              <div>
                <label htmlFor="input_intensite">I<sub>e</sub> =</label>
                <input id="i_e" defaultValue={0} maxLength={13} type="text" onChange={handleChange} />
                <span style={{fontSize: 'smaller'}}>W.sr<sup>-1
                  </sup></span></div>
              {/* Bouton calcul */}
              <div id="plus" style={{padding: '10px'}}>
                <input id="bcalc_ord" type="button" onClick={(event)=>handleClick(event)} defaultValue="Calcul" />
                <span style={{display: 'none', color: 'blue'}} id="resul_tps">Le calcul a duré : 53 millisecondes !</span>
                <div id="gif" style={{position: 'relative', display: 'inline-block', marginLeft: '13px'}} />
              </div>
            </div>


            {/* Calcul des Diametres */}
            <div id="Calcul_Diam" className="border">
              <p style={{fontSize: 'smaller'}} id="txt_infoCalculs">Les 2 entrées suivantes utilisent soit z<sub>1</sub> soit z<sub>2</sub> après calcul,</p>
              <div>
                <label htmlFor="z1">z<sub>1</sub></label>
                <input type="checkbox" name="z" id="z1" onChange={handleChange} />
                <label htmlFor="z2">z<sub>2</sub></label>
                <input type="checkbox" name="z" id="z2" onChange={handleChange} />
              </div>
              <br />
              <div className="desact_retour">
                <label htmlFor="diametre">D =</label>
                <input id="diametre" maxLength={17} type="text" value={result.dmetre} onChange={(event) => setResult((prevState) => ({ ...prevState, dmetre: Number(event.target.value) }))} /><span style={{fontSize: 'smaller'}}> (m)</span>
                <input style={{marginLeft: '15px'}} type="button" defaultValue="&rarr; &Phi;" id="metre-phi" onClick={(event)=> handleClick(event)} />
              </div>
              <br />
              <div className="desact_retour">
                <label htmlFor="diametrekpc">D =</label>
                <input id="diametrekpc" maxLength={17} type="text" value={result.dKpc} onChange={(event) => setResult((prevState) => ({ ...prevState, dKpc: Number(event.target.value) }))}/><span style={{fontSize: 'smaller'}}> (kpc)</span>
                <input style={{marginLeft: '15px'}} type="button" defaultValue="&rarr; &Phi;" id="kpc-phi" onClick={(event)=>handleClick(event)} />
              </div>
              <br />
              <div className="desact_retour">
                <input style={{marginRight: '15px'}} type="button" defaultValue="D &larr;" id="Diametres" onClick={(event)=>handleClick(event)}/>
                <label htmlFor="theta"><span style={{fontSize: 'smaller'}}>Φ</span> =</label>
                <input id="theta" maxLength={17} type="text" value={result.phi} onChange={(event) => setResult((prevState) => ({ ...prevState, phi: Number(event.target.value) }))}/> <span id="secondeArc">(Seconde d'arc)</span>
              </div>
            </div>
            <br />


            {/* Calculs Inverses */}
            <div id="Calculs_Inverse" className="border">
              <div>
                <span id="calculInverse" style={{fontWeight: 'bold', fontSize: '18px'}}>Calculs inverses</span>
              </div>
              <br />
              <div className="desact_retour" id="inverse">
                <label htmlFor="dmInv">d<sub>m</sub> =</label>
                <input id="dmInv" defaultValue={0} value={inv.dmInv} maxLength={26} type="text" onChange={handleChange}/><span style={{fontSize: 'smaller'}}> (m)</span>
                <label htmlFor="z_racine_dm">z = </label>
                <span id="z_racine_dm" style={{color: 'blue'}} >{result.zInv.toExponential(4)}</span>
                {/*= <span id="dm1_pc" style="color:blue"></span> pc*/}
              </div>
              <br />
              <div className="desact_retour" id="inverse">
                <span id="temission">t<sub>émission</sub> =</span>
                <label htmlFor="tEmissionInv" />
                <input id="tEmissionInv" defaultValue={0} maxLength={26} type="text" onChange={handleChange}/> <span id="annee1" style={{fontSize: 'smaller'}}>(a)</span>
                <label htmlFor="z_racine_t_em"> z<sub>1</sub> =</label>
                <span id="z_racine_t_em" style={{color: 'blue'}} >{result.z1Inv.toExponential(4)}</span>
              </div>
              <br />
              <div className="desact_retour" id="inverse">
                <span id="treception">t<sub>réception</sub> =</span>
                <label htmlFor="tRecpetionInv" />
                <input id="tRecpetionInv" defaultValue={0} maxLength={26} type="text" onChange={handleChange}/> <span id="annee2" style={{fontSize: 'smaller'}}>(a)</span>
                <label htmlFor="z_racine_t_rec"> z<sub>2</sub>=</label>
                <span id="z_racine_t_rec" style={{color: 'blue'}}>{result.z2Inv.toExponential(4)}</span>
              </div>
              <div style={{padding: '10px'}} id="plus">
                <input id="boutonCalculInverse" type="button" onClick={handleClick} defaultValue="Calcul" />
              </div>
            </div>
          </div>
          <div id="box1">
            {/* Paramètres généraux */}
            <div className="containstwofollowing border" style={{display: 'flex', justifyContent: "space-evenly"}}>
              <div className="generalParameter">
                <span id="txt_parametres" style={{fontWeight: 'bold'}}>Les paramètres cosmologiques :</span>
                <div>
                  <label htmlFor="T0_annexes">T<sub>0</sub> =</label>
                  <output id="T0_annexes" style={{color: 'blue'}} onchange="update_omegar0_calc();" type="text">{props.params.T0}</output><span style={{fontSize: 'smaller'}}>  K</span>
                </div>
                <span id="txt_parametres" style={{fontWeight: 'bold'}} />
                <div>
                  <label htmlFor="H0_annexes">H<sub>0</sub> =</label>
                  <output id="H0_annexes" style={{color: 'blue'}} onchange="update_omegar0_calc();" type="text">{props.params.H0}</output><span style={{fontSize: 'smaller'}}>  km.s<sup>-1</sup>.Mpc<sup>-1</sup></span>
                </div>
                <div>
                  <label htmlFor="omegam0_annexes">Ω<sub>m<sub>0</sub></sub> =</label>
                  <output id="omegam0_annexes" style={{color: 'blue'}} onchange="update_omegar0_calc();" value="0.6" type="text">{props.params.omegam0}</output>
                </div>
                <div>
                  <label htmlFor="omegalambda0_annexes">Ω<sub>Λ0</sub> =</label>
                  <output id="omegalambda0_annexes" style={{color: 'blue'}} onchange="update_omegak0_calc();" value="0.5" type="text">{props.params.omegaDE0}</output>
                </div>
                <div>
                  <div>
                      <span>{t("page_univers_calculs.modele")}: {props.selectValue.value}</span>
                  </div>
                  <div>
                    <span id="txt_univplat" dangerouslySetInnerHTML={{ __html: t("page_univers.univers_plat") || '' }}></span>
                    <input id="univ_plat" type="checkbox" name="univ_plat" onchange="updateUnivPlat_calc();" checked={props.selectValue.isFlat} disabled/>
                  </div>
                </div>
              </div>
              <br />
              <div className="toberight">
                <br />
                <div>
                  <label htmlFor="resultat_omegar0_annexes">Ω<sub>r0</sub> =</label>
                  <span id="Orr" style={{color: 'blue'}}>{Number(Universe?.calcul_omega_r().toPrecision(4)).toExponential()}</span>
                </div>
                <div>
                  <label htmlFor="resultat_omegak0_annexes">Ω<sub>k0</sub> =</label>
                  <span id="resultat_omegak0_annexes" style={{color: 'blue'}}>{Number(Universe?.calcul_omega_k().toPrecision(4)).toExponential()}</span>
                </div>
                <br />
                <div>
                  <label htmlFor="rholambda">ρ<sub>Λ</sub> =</label>
                  <span id="rholambda" style={{color: 'blue'}}>{Universe?.calculate_energy_density().darkEnergy}</span><span style={{fontSize: 'smaller'}}> Kg.m<sup>-3</sup></span>
                  <span />
                </div>
                <div>
                  <label htmlFor="rhom">ρ<sub>m</sub> =</label>
                  <span id="rhom" style={{color: 'blue'}}>{Universe?.calculate_energy_density().matter}</span><span style={{fontSize: 'smaller'}}> Kg.m<sup>-3</sup></span>
                </div>
                <div>
                  <label htmlFor="rhor">ρ<sub>r</sub> =</label>
                  <span id="rhor" style={{color: 'blue'}}>{Universe?.calculate_energy_density().radiation}</span><span style={{fontSize: 'smaller'}}> Kg.m<sup>-3</sup></span>
                </div>
              </div>
            </div>
            <br />
            {/* Valeurs en Z1 */}
            <div id="box3" className="border">
              <span id="txt_valeursZ1" style={{fontWeight: 'bold'}}>Les paramètres cosmologiques à z<sub>1</sub> et z<sub>2</sub>:</span>
              <br />
              <div id="valeurs_en_Z" style={{display:"flex"}}>
                <div id="en_Z1">
                  <div>
                    <label htmlFor="Tz1">T<span style={{fontSize: 'smaller'}}>(z<sub>1</sub>)</span> =</label>
                    <span id="Tz1" style={{color: 'blue'}}>{result.Tz1.toExponential(4)}</span> <span id="Tz1_unit" style={{display: 'contents'}}><span style={{fontSize: 'smaller'}}> K </span></span>
                  </div>
                  <div>
                    <label htmlFor="Hz1">H<span style={{fontSize: 'smaller'}}>(z<sub>1</sub>)</span> =</label>
                    <span id="Hz1" style={{color: 'blue'}}>{result.Hz1.toExponential(4)}</span> <span id="Hz1_unit" style={{display: 'contents'}}> <span style={{fontSize: 'smaller'}}>km.s<sup>-1</sup>.Mpc<sup>-1</sup></span></span>
                  </div>
                  <div>
                    <label htmlFor="Omz1">Ω<sub>m</sub><span style={{fontSize: 'smaller'}}>(z<sub>1</sub>)</span> =</label>
                    <span id="Omz1" style={{color: 'blue'}}>{result.omega_m_z1.toExponential(4)}</span>
                  </div>
                  <div>
                    <label htmlFor="Olz1">Ω<sub>Λ</sub><span style={{fontSize: 'smaller'}}>(z<sub>1</sub>)</span> =</label>
                    <span id="Olz1" style={{color: 'blue'}}>{result.omega_DE_z1.toExponential(4)}</span>
                  </div>
                  <div>
                    <label htmlFor="Orz1">Ω<sub>r</sub><span style={{fontSize: 'smaller'}}>(z<sub>1</sub>)</span> =</label>
                    <span id="Orz1" style={{color: 'blue'}}>{result.omega_r_z1.toExponential(4)}</span>
                  </div>
                  <div>
                    <label htmlFor="Okz1">Ω<sub>k</sub><span style={{fontSize: 'smaller'}}>(z<sub>1</sub>)</span> =</label>
                    <span id="Okz1" style={{color: 'blue'}}>{result.omega_k_z1.toExponential(4)}</span>
                  </div>
                  <input style={{marginTop: '10px', marginLeft: '10px'}} type="button" onclick="transfert_simu(0);" id="ts-1" defaultValue="Tracer" />
                </div>
                <div id="en_Z2">
                  <div>
                    <label htmlFor="Tz2">T<span style={{fontSize: 'smaller'}}>(z<sub>2</sub>)</span> =</label>
                    <span id="Tz2" style={{color: 'blue'}}>{result.Tz2.toExponential(4)}</span> <span id="Tz2_unit" style={{display: 'contents'}}><span style={{fontSize: 'smaller'}}> K </span></span>
                  </div>
                  <div>
                    <label htmlFor="Hz2">H<span style={{fontSize: 'smaller'}}>(z<sub>2</sub>)</span> =</label>
                    <span id="Hz2" style={{color: 'blue'}}>{result.Hz2.toExponential(4)}</span> <span id="Hz2_unit" style={{display: 'contents'}}> <span style={{fontSize: 'smaller'}}>km.s<sup>-1</sup>.Mpc<sup>-1</sup></span></span>
                  </div>
                  <div>
                    <label htmlFor="Omz2">Ω<sub>m</sub><span style={{fontSize: 'smaller'}}>(z<sub>2</sub>)</span> =</label>
                    <span id="Omz2" style={{color: 'blue'}}>{result.omega_DE_z2.toExponential(4)}</span>
                  </div>
                  <div>
                    <label htmlFor="Olz2">Ω<sub>Λ</sub><span style={{fontSize: 'smaller'}}>(z<sub>2</sub>)</span> =</label>
                    <span id="Olz2" style={{color: 'blue'}}>{result.omega_m_z2.toExponential(4)}</span>
                  </div>
                  <div>
                    <label htmlFor="Orz2">Ω<sub>r</sub><span style={{fontSize: 'smaller'}}>(z<sub>2</sub>)</span> =</label>
                    <span id="Orz2" style={{color: 'blue'}}>{result.omega_r_z2.toExponential(4)}</span>
                  </div>
                  <div>
                    <label htmlFor="Okz2">Ω<sub>k</sub><span style={{fontSize: 'smaller'}}>(z<sub>2</sub>)</span> =</label>
                    <span id="Okz2" style={{color: 'blue'}}>{result.omega_k_z2.toExponential(4)}</span>
                  </div>
                  <input style={{marginTop: '10px', marginLeft: '10px'}} type="button" onclick="transfert_simu(1);" id="ts-2" defaultValue="Tracer" />
                </div>
              </div>
            </div>
            <br />
            <div className="geometricResults ">
              <div className="border">
                <span id="txt_geometrie" style={{fontWeight: 'bold'}}>Géometrie:</span>
                <div id="calcul_dm">
                  <div>
                    <label htmlFor="dm1">d<sub>m<sub>1</sub></sub> =</label>
                    <span id="show_dm1" style={{display: 'contents'}}>
                      <span id="dm1" style={{color: 'blue'}}>{result.dm1.toPrecision(4)}</span><span style={{fontSize: 'smaller'}}> m </span> =
                      <span id="dm1_pc" style={{color: 'blue'}}>{(result.dm1/parsec).toPrecision(4)}{/* Convert to parsec*/}</span>
                      <span style={{fontSize: 'smaller'}}> pc </span>=
                      <span id="dm1_lum" style={{color: 'blue'}}>{(result.dm1/ly).toPrecision(4)}{/* Convert to lightYears*/}</span>
                      <span style={{fontSize: 'smaller'}}> al </span>
                    </span>
                  </div>
                  <div>
                    <label htmlFor="dm2">d<sub>m<sub>2</sub></sub> =</label>
                    <span id="show_dm2" style={{display: 'contents'}}>
                      <span id="dm2" style={{color: 'blue'}}>{result.dm2.toPrecision(4)}</span> <span style={{fontSize: 'smaller'}}>m</span> =
                      <span id="dm2_pc" style={{color: 'blue'}}>{(result.dm2/parsec).toPrecision(4)}{/* Convert to parsec*/}</span><span style={{fontSize: 'smaller'}}> pc</span> =
                      <span id="dm2_lum" style={{color: 'blue'}}>{(result.dm2/ly).toPrecision(4)}{/* Convert to lightYears*/}</span><span style={{fontSize: 'smaller'}}> al</span>
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="dm">Δd<sub>m</sub> =</label>
                  <span id="show_dm" style={{display: 'contents'}}>
                    <span id="dm" style={{color: 'blue'}}>{(result.dm2-result.dm1).toPrecision(4)}</span><span style={{fontSize: 'smaller'}}> m </span>=
                    <span id="dm_pc" style={{color: 'blue'}}>{((result.dm2-result.dm1)/parsec).toPrecision(4)}</span><span style={{fontSize: 'smaller'}}> pc </span>=
                    <span id="dm_diff_lum" style={{color: 'blue'}}>{((result.dm2-result.dm1)/ly).toPrecision(4)}{/* Convert to lightYears*/}</span><span style={{fontSize: 'smaller'}}> al</span>
                  </span>
                </div>
                <div id="calcul_t">
                  <div>
                    <label htmlFor="tempsEmission">t<sub>1</sub>=</label>
                    <span id="show_temi" style={{display: 'contents'}}>
                      <span id="tempsEmission" style={{color: 'blue'}}>{(result.temission/3.17098e7).toExponential(4)}</span><span style={{fontSize: 'smaller'}}> a</span> ={/* Convert to year*/}
                      <span id="tempsEmission_sec" style={{color: 'blue'}}>{result.temission.toExponential(4)}</span><span style={{fontSize: 'smaller'}}> s </span>
                    </span>
                    <span id="tempsEmission_alert" style={{color: 'red'}} />
                  </div>
                  <div>
                    <label htmlFor="tempsReception">t<sub>2</sub>=</label>
                    <span id="show_trecep" style={{display: 'contents'}}>
                      <span id="tempsReception" style={{color: 'blue'}}>{(result.treception/3.17098e7).toExponential(4)}</span><span style={{fontSize: 'smaller'}}> a </span>=
                      <span id="tempsReception_sec" style={{color: 'blue'}}>{result.treception.toExponential(4)}</span><span style={{fontSize: 'smaller'}}> s</span>
                    </span>
                    <span id="tempsReception_alert" style={{color: 'red'}} />
                  </div>
                </div>
                <div>
                  <label htmlFor="agebetween">Δt =</label>
                  <span id="show_dt" style={{display: 'contents'}}>
                    <span id="agebetween" style={{color: 'blue'}}>{((result.treception-result.temission)/3.17098e8).toExponential(4)}</span><span style={{fontSize: 'smaller'}}> a</span> =
                    <span id="agebetween_sec" style={{color: 'blue'}}>{(result.treception-result.temission).toExponential(4)}</span><span style={{fontSize: 'smaller'}}> s</span>
                  </span>
                </div>
                <div id="calcul_dz">
                  <div>
                    {/* 348 calcu.js */}
                    <label htmlFor="dz1">d<sub>z<sub>1</sub></sub>/dt<sub>0</sub> =</label>
                    <span id="show_dz1" style={{display: 'contents'}}>
                      <span id="dz1" style={{color: 'blue'}}>{result.dz1.toExponential(4)}</span><span style={{fontSize: 'smaller'}}> a<sup>-1</sup></span>
                    </span>
                  </div>
                  <div>
                    <label htmlFor="dz2">d<sub>z<sub>2</sub></sub>/dt<sub>0</sub> =</label>
                    <span id="show_dz2" style={{display: 'contents'}}>
                      <span id="dz2" style={{color: 'blue'}}>{result.dz2.toExponential(4)}</span><span style={{fontSize: 'smaller'}}> a<sup>-1</sup></span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Resultats Photometrie */}
              <div id="photo_box" className="border">
                <span id="txt_photometrie" style={{fontWeight: 'bold'}}>Photométrie:</span>
                <div>
                  <label htmlFor="L_e">L<sub>e</sub> =</label>
                  <span id="show_L_e" style={{display: 'contents'}}>
                    <span id="L_e" style={{color: 'blue'}}>{result.Le.toExponential(4)}</span>
                    <span style={{fontSize: 'smaller'}}> W.m<sup>-2</sup>.sr<sup>-1</sup></span>
                  </span>
                </div>
                <div id="calcul_dl">
                  <div>
                    <label htmlFor="dl">d<sub>L<sub>1</sub></sub> =</label>
                    <span id="show_dl" style={{display: 'contents'}}>
                      <span id="dl" style={{color: 'blue'}}>{result.dl1.toExponential(4)}</span><span style={{fontSize: 'smaller'}}> m = </span>
                      <span id="dl_pc" style={{color: 'blue'}}>{(result.dl1/parsec).toExponential(4)}</span><span style={{fontSize: 'smaller'}}> pc = </span>
                      <span id="dl_lum" style={{color: 'blue'}}>{(result.dl1/ly).toExponential(4)}</span><span style={{fontSize: 'smaller'}}> al </span>
                    </span>
                  </div>
                  <div>
                    <label htmlFor="dl2">d<sub>L<sub>2</sub></sub> =</label>
                    <span id="show_dl_2" style={{display: 'contents'}}>
                      <span id="dl_2" style={{color: 'blue'}}>{result.dl2.toExponential(4)}</span><span style={{fontSize: 'smaller'}}> m = </span>
                      <span id="dl2_pc" style={{color: 'blue'}}>{(result.dl2/parsec).toExponential(4)}</span><span style={{fontSize: 'smaller'}}> pc = </span>
                      <span id="dl2_lum" style={{color: 'blue'}}>{(result.dl2/ly).toExponential(4)}</span><span style={{fontSize: 'smaller'}}> al </span>
                    </span>
                  </div>
                </div>
                <div id="calcul_da">
                  <div>
                    <label htmlFor="dda">d<sub>a<sub>1</sub></sub> =</label>
                    <span id="show_da" style={{display: 'contents'}}>
                      <span id="dda" style={{color: 'blue'}}>{result.add1.toExponential(4)}</span><span style={{fontSize: 'smaller'}}> m = </span>
                      <span id="dda_pc" style={{color: 'blue'}}>{(result.add1/parsec).toExponential(4)}</span><span style={{fontSize: 'smaller'}}> pc = </span>
                      <span id="dda_lum" style={{color: 'blue'}}>{(result.add1/ly).toExponential(4)}</span><span style={{fontSize: 'smaller'}}> al </span>
                    </span>
                  </div>
                  <div>
                    <label htmlFor="dda2">d<sub>a<sub>2</sub></sub> =</label>
                    <span id="show_da_2" style={{display: 'contents'}}>
                      <span id="dda_2" style={{color: 'blue'}}>{result.add2.toExponential(4)}</span><span style={{fontSize: 'smaller'}}> m = </span>
                      <span id="dda2_pc" style={{color: 'blue'}}>{(result.add2/parsec).toExponential(4)}</span><span style={{fontSize: 'smaller'}}> pc = </span>
                      <span id="dda2_lum" style={{color: 'blue'}}>{(result.add2/ly).toExponential(4)}</span><span style={{fontSize: 'smaller'}}> al </span>
                    </span>
                  </div>
                </div>
                <div id="calcul_E">
                  <div>
                    <label htmlFor="E_e">E<sub>e<sub>1</sub></sub> =</label>
                    <span id="show_E_e" style={{color: 'blue'}}>{result.Ee1.toExponential(4)}</span>
                      <span style={{fontSize: 'smaller'}}> W.m<sup>-2</sup></span>
                    
                  </div>
                  <div>
                    <label htmlFor="E_e2">E<sub>e<sub>2</sub></sub> =</label>
                    <span id="show_E_e_2" style={{color: 'blue'}}>{result.Ee1.toExponential(4)}</span>
                      <span style={{fontSize: 'smaller'}}>  W.m<sup>-2</sup></span>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
        {/* z1 et z2 pour le calcul de dm et t2,t1 */}
        <br />
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
                <input id="zmin" type="text" defaultValue={0} />
              </div>
              <div style={{padding: '10px 20px 10px 0'}}>
                <label htmlFor="zmax">
                  <span id="txt_zmax">z<sub>max</sub></span>
                </label>
                <input id="zmax" type="text" defaultValue={25} />
              </div>
              <div style={{padding: '10px 20px 10px 0'}}>
                <label htmlFor="pas_pour_z">
                  <span id="txt_pas">Pas :</span>
                </label>
                <input id="pas_pour_z" type="text" defaultValue={300} />
              </div>
            </div>
            {/* bouton pour tracer graphes en fonction de z */}
            <div>
              <div style={{padding: '10px'}}>
                <label htmlFor="boutonGraphe_distances">
                  <span id="txt_graphe_d">Tracer d<sub>i</sub>(z)</span>
                </label>
                <input id="boutonGraphe_distances" type="button" onclick="lance_calc(1);" defaultValue="Tracer" />
              </div>  				
              <div style={{padding: '10px'}}>
                <label htmlFor="boutonGraphe_omega">
                  <span id="txt_graphe_omega">Tracer Ω<sub>i</sub>(z)</span>
                </label>
                <input id="boutonGraphe_omega" type="button" onclick="lance_calc(2);" defaultValue="Tracer" />
              </div>
              <div style={{padding: '10px'}}>
                <label htmlFor="boutonGraphe_t">
                  <span id="txt_graphe_t">Tracer t(z)</span>
                </label>
                <input id="boutonGraphe_t" type="button" onclick="lance_calc(3);" defaultValue="Tracer" />
              </div>
            </div>
            {/* bouton pour tracer graphes en fonction de t */}
            <div>
              <div style={{padding: '10px'}}>
                <label htmlFor="boutonGraphe_distances_t">
                  <span id="txt_graphe_d_t">Tracer d<sub>i</sub>(t)</span>
                </label>
                <input id="boutonGraphe_distances_t" type="button" onclick="lance_calc(4);" defaultValue="Tracer" />
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
        </div>
        </div>
    </div>
        
        </>);
}