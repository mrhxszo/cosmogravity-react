//language hook
import {t} from 'i18next'

interface Props{
    output:{
        omegaR0:number,
        omegaK0:number,
        ageUniverse:number,
    }
}


export default function Output(props:Props){
    
	//define 1 gigaYear in seconds
	const gigaYear = 3.1557 * 1e16;

    return(
        <>
        	{/* <!-- INFORMATIONS --> */}
            <div id="tg_contains">
            <p id="txt_sorties" style={{fontSize:'16px', textAlign :'center'}}></p>
            <div>
                &Omega;<sub>r0</sub> = <output id="resultat_omegar0">{props.output.omegaR0.toExponential(4)}</output>
                <br/>
                &Omega;<sub>k0</sub> = <output id="resultat_omegak0"  >{props.output.omegaK0.toExponential(4)}</output>
                <br/>   
                <span id="txt_tempsBB" style={{textDecoration: "underline"}}>{t('page_univers_general.tempsBigBang')}</span>
                <br/>
                <output id="resultat_ageunivers_ga">{(props.output.ageUniverse/gigaYear).toExponential(4)}</output>
                (Ga)&nbsp;= <span id="resultat_ageunivers_s">{props.output.ageUniverse.toExponential(4)}</span>(s)
                <br/>
                <i><span id="resultat_bigcrunch">Pas</span></i>
                <br/>
                <span id="txt_dureeeUniv" style={{textDecoration: 'underline'}}></span>
                <br/>
                <span id="resultat_dureeuniv">res</span>
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