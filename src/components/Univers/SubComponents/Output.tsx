import React, { useState, useEffect } from 'react';
//language hook
import {t} from 'i18next'
import { Simulation_universe } from "@/ts/class/simulation/simulation_universe";
interface Props{
    Universe: React.RefObject<Simulation_universe>,
    params: {
		T0: number,
		H0: number,
		omegam0: number,
		omegaDE0: number
	},
    selectValue: {
        value: string,
        isFlat: boolean,
    },
}


export default function Output(props:Props){
    let Universe = props.Universe.current;
	//define 1 gigaYear in seconds
	const gigaYear = 1e9;

    //usestate for handling outputs
    const [output, setOutput] = useState({
        // default values
        omegaR0: Universe?.calcul_omega_r() ?? 0,
        omegaK0: Universe?.calcul_omega_k() ?? 0,
        ageUniverse: Universe?.universe_age() ?? 0,
        checkSingularity: Universe?.check_singularity() ??{ 
            bigBang: {isBigBang:false},
            bigCrunch: {isBigCrunch:false, time: 0},
            bigRip: {isBigRip:false, time: 0}
        },
      });
      

    //useEffect for handling outputs
    useEffect(() => {

        //update the universe object when params are changed otherwise we are stuck with previous state values
        if(Universe){
            Universe.temperature = props.params.T0;
            Universe.hubble_cst = props.params.H0;
            Universe.matter_parameter = props.params.omegam0;
            Universe.dark_energy.parameter_value = props.params.omegaDE0;
            Universe.is_flat = props.selectValue.isFlat;

            switch (props.selectValue.value) {
				case "Matière et Lambda":
					Universe.has_neutrino = false;
					Universe.has_cmb = false;
					break;
				case "Matière, Lambda et RFC":
					Universe.has_neutrino = false;
					Universe.has_cmb = true;
					break;
				default:
					Universe.has_neutrino = true;
					Universe.has_cmb = true;
					break;
			}

            setOutput((prevOutput) => ({
                // use functional form to update based on previous state
                ...prevOutput,
                omegaR0: Universe?.calcul_omega_r() ?? 0,
                omegaK0: Universe?.calcul_omega_k() ?? 0,
                ageUniverse: Universe?.universe_age() ?? 0,
                checkSingularity: Universe?.check_singularity() ??{ 
                    bigBang: {isBigBang:false, time: 0},
                    bigCrunch: {isBigCrunch:false, time: 0},
                    bigRip: {isBigRip:false, time: 0}
                },
              }));
            
        }
        
      }, [props.Universe, props.params, props.selectValue]);

    return(
        <>
        	{/* <!-- INFORMATIONS --> */}
            <div id="tg_contains">
            <p id="txt_sorties" style={{fontSize:'16px', textAlign :'center'}}></p>
            <div>
                &Omega;<sub>r0</sub> = <output id="resultat_omegar0">{output.omegaR0.toExponential(4)}</output>
                <br/>
                &Omega;<sub>k0</sub> = <output id="resultat_omegak0"  >{output.omegaK0.toExponential(4)}</output>
                <br/>   
                <span id="txt_tempsBB" style={{textDecoration: "underline"}}>{t('page_univers_general.tempsBigBang')}</span>
                <br/>
                <output id="resultat_ageunivers_ga">{output.checkSingularity.bigBang.time ?((output.checkSingularity.bigBang.time/gigaYear).toExponential(4)): t('calculs_univers.pasBB')}</output>
                (Ga)&nbsp;= <span id="resultat_ageunivers_s">{output.checkSingularity.bigBang.time ? (output.checkSingularity.bigBang.time*3.154*1e7).toExponential(4): t('calculs_univers.pasBB')}</span>(s)
                <br/>
                <span id="txt_tempsBB" style={{textDecoration: "underline"}}>{t('calculs_univers.tempsavtBC')}</span><br/>
                <i><output id="resultat_bigcrunch">{output.checkSingularity.bigCrunch.isBigCrunch ? (output.ageUniverse).toExponential(4): t('calculs_univers.pasBC')}</output></i>
                (Ga)&nbsp;= <span id="resultat_ageunivers_s">{output.checkSingularity.bigCrunch.time ? (output.checkSingularity.bigCrunch.time*3.154*1e7).toExponential(4): t('calculs_univers.pasBC')}</span>(s)
                <br/>
                <span id="txt_dureeeUniv" style={{textDecoration: 'underline'}}>{t('page_univers_general.dureeUnivers')}</span><br/>
                <i><output id="resultat_dureeUnivers">{output.checkSingularity.bigCrunch.isBigCrunch || output.checkSingularity.bigRip.isBigRip ? (output.ageUniverse/gigaYear).toExponential(4): <span>&infin;</span>}</output></i>
                (Ga)&nbsp;= <span id="resultat_ageunivers_s">{output.checkSingularity.bigCrunch.time ? (output.ageUniverse*3.154*1e7).toExponential(4): <span>&infin;</span>}</span>(s)
                <br/>
            </div>
            <table className="tg" style={{display:'none'}}>
                <tr>
                    <td className="tg-m3ec" style={{borderRight: '1px solid black'}} id="resultat_omegam0">Resultat</td>
                    <td className="tg-m3ec" id="resultat_omegar0">Resultat</td>
                </tr>
                <tr>
                    <td className="tg-cgnp" style={{borderRight: '1px solid black'}}>&Omega;<sub>&Lambda;0</sub></td>
                    <td className="tg-cgnp">&Omega;<sub>k0</sub></td>
                </tr>
                <tr>
                    <td className="tg-m3ec" style={{borderRight: '1px solid black'}} id="resultat_omegarlambda0" onChange="document.getElementById('Orcalc').value = this.value">Resultat</td>
                    <td className="tg-rkjz" id="resultat_omegak0" onChange="document.getElementById('Okcalc').value = this.value">t</td>
                </tr>
                <tr>
                    <td className="tg-cgnp" colSpan={2}>Temps depuis le Big Bang</td>
                </tr>
            </table>
        </div>
</>
    )
}