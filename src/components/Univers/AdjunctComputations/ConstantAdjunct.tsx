import {t} from "i18next"

export default function ConstantsAdjunct() {
    return (
        <>
            <div style={{"position":"absolute",
            "width":"90%",
            "height":"fit-content",
            "backgroundColor":"antiquewhite",
            "boxShadow":"-4px -2px 16px 0px black",
            "top":"20%",
            "left":"2%",
            "zIndex":"1000",
            "borderRadius":"2%",
            }}>  
               

            <h2 id="txt_titre" style={{"textAlign":"center",
                                        "height":"5%",
                                        "backgroundColor":"#a73f2d",
                                        "position":"relative",
                                        "top":"1%",
                                        "marginTop":"0%",
                                        "padding":"1%",
                                        "color":"white",
                                        "borderRadius":"1%"}}>
            {t('page_univers_general.bouton_calculsAnnexes')}</h2>


    <div id="TOUT">
        {/* Parametres de Calcul */}
        <div id="box1and2" style={{display: 'flex', flexDirection: 'row'}}>
          <div id="box2">
            <div className="border">
              <span id="txt_valeursZ" style={{fontWeight: 'bold'}}>Valeurs des z (z&gt;-1) à définir pour obtenir les distances métriques et les temps d'émission/réception :</span>
              <br />
              <div className="desact_retour">
                <label htmlFor="z1">z<sub>1</sub> =</label>
                <input id="z1" defaultValue={0} maxLength={13} type="text" />
              </div>
              <div className="desact_retour">
                <label htmlFor="z2">z<sub>2</sub> =</label>
                <input id="z2" defaultValue={0} maxLength={13} type="text" />
              </div>
              <br />
              {/* Ie pour calculs de Eclairement */}
              <span id="txt_valeurs_Intensite" style={{fontWeight: 'bold'}}>Valeur de l'Intensite pour des resultats de photométrie (E<sub>e</sub>,L<sub>e</sub>):</span>
              <div>
                <label htmlFor="input_intensite">I<sub>e</sub> =</label>
                <input id="i_e" defaultValue={0} maxLength={13} type="text" />
                <span style={{fontSize: 'smaller'}}>W.sr<sup>-1
                  </sup></span></div>
              {/* Bouton calcul */}
              <div id="plus" style={{padding: '10px'}}>
                <input id="bcalc_ord" type="button" onclick="lance_calc(0);ga('send', 'event', 'button', 'click', 'Calcul Annexe normal');" defaultValue="Calcul" />
                <span style={{display: 'none', color: 'blue'}} id="resul_tps">Le calcul a duré : 53 millisecondes !</span>
                <div id="gif" style={{position: 'relative', display: 'inline-block', marginLeft: '13px'}} />
              </div>
            </div>
            {/* Calcul des Diametres */}
            <div id="Calcul_Diam" className="border">
              <p style={{fontSize: 'smaller'}} id="txt_infoCalculs">Les 2 entrées suivantes utilisent soit z<sub>1</sub> soit z<sub>2</sub> après calcul,</p>
              <div>
                <label htmlFor="z1">z<sub>1</sub></label>
                <input type="checkbox" name="z" id="z1_checkbox" onchange="onlyOne(this)" />
                <label htmlFor="z2">z<sub>2</sub></label>
                <input type="checkbox" name="z" id="z2_checkbox" onchange="onlyOne(this)" />
              </div>
              <br />
              <div className="desact_retour">
                <label htmlFor="diametre">D =</label>
                <input id="diametre" maxLength={17} type="text" /><span style={{fontSize: 'smaller'}}> (m)</span>
                <input style={{marginLeft: '15px'}} type="button" defaultValue="--> Φ" onclick="calcultheta();" />
              </div>
              <br />
              <div className="desact_retour">
                <label htmlFor="diametrekpc">D =</label>
                <input id="diametrekpc" maxLength={17} type="text" /><span style={{fontSize: 'smaller'}}> (kpc)</span>
                <input style={{marginLeft: '15px'}} type="button" defaultValue="--> Φ" onclick="calculthetakpc();" />
              </div>
              <br />
              <div className="desact_retour">
                <input style={{marginRight: '15px'}} type="button" defaultValue="D <--" onclick="calculD();calcul1Dkpc();" />
                <label htmlFor="theta"><span style={{fontSize: 'smaller'}}>Φ</span> =</label>
                <input id="theta" maxLength={17} type="text" /> <span id="secondeArc">(Seconde d'arc)</span>
              </div>
            </div>
            <br />
            {/* Calculs Inverses */}
            <div id="Calculs_Inverse" className="border">
              <div>
                <span id="calculInverse" style={{fontWeight: 'bold', fontSize: '18px'}}>Calculs inverses</span>
              </div>
              <br />
              <div className="desact_retour">
                <label htmlFor="dm_racine_dm">d<sub>m</sub> =</label>
                <input id="dm_racine_dm" defaultValue={0} maxLength={26} type="text" /><span style={{fontSize: 'smaller'}}> (m)</span>
                <label htmlFor="z_racine_dm">z =</label>
                <span id="z_racine_dm" style={{color: 'blue'}} />
                {/*= <span id="dm1_pc" style="color:blue"></span> pc*/}
              </div>
              <br />
              <div className="desact_retour">
                <span id="temission">t<sub>émission</sub> =</span>
                <label htmlFor="t_racine_em" />
                <input id="t_racine_em" defaultValue={0} maxLength={26} type="text" /> <span id="annee1" style={{fontSize: 'smaller'}}>(a)</span>
                <label htmlFor="z_racine_t_em"> z<sub>1</sub> =</label>
                <span id="z_racine_t_em" style={{color: 'blue'}} />
              </div>
              <br />
              <div className="desact_retour">
                <span id="treception">t<sub>réception</sub> =</span>
                <label htmlFor="t_racine_rec" />
                <input id="t_racine_rec" defaultValue={0} maxLength={26} type="text" /> <span id="annee2" style={{fontSize: 'smaller'}}>(a)</span>
                <label htmlFor="z_racine_t_rec"> z<sub>2</sub>=</label>
                <span id="z_racine_t_rec" style={{color: 'blue'}} />
              </div>
              <div style={{padding: '10px'}} id="plus">
                <input id="boutonCalculInverse" type="button" onclick="inverse();ga('send', 'event', 'button', 'click', 'Calcul Annexe Inverse');" defaultValue="Calcul" />
              </div>
            </div>
          </div>
          <div id="box1">
            {/* Paramètres généraux */}
            <div className="containstwofollowing border" style={{display: 'flex'}}>
              <div className="generalParameter">
                <span id="txt_parametres" style={{fontWeight: 'bold'}}>Les paramètres cosmologiques :</span>
                <div>
                  <label htmlFor="T0_annexes">T<sub>0</sub> =</label>
                  <output id="T0_annexes" style={{color: 'blue'}} onchange="update_omegar0_calc();" type="text">2.7255</output><span style={{fontSize: 'smaller'}}>  K</span>
                </div>
                <span id="txt_parametres" style={{fontWeight: 'bold'}} />
                <div>
                  <label htmlFor="T0_annexes">T<sub>0</sub> =</label>
                  <output id="T0_annexes" style={{color: 'blue'}} onchange="update_omegar0_calc();" type="text"> </output><span style={{fontSize: 'smaller'}}>  K</span>
                </div>
                <div>
                  <label htmlFor="H0_annexes">H<sub>0</sub> =</label>
                  <output id="H0_annexes" style={{color: 'blue'}} onchange="update_omegar0_calc();" type="text">67.74</output><span style={{fontSize: 'smaller'}}>  km.s<sup>-1</sup>.Mpc<sup>-1</sup></span>
                </div>
                <div>
                  <label htmlFor="H0_annexes">H<sub>0</sub> =</label>
                  <output id="H0_annexes" style={{color: 'blue'}} onchange="update_omegar0_calc();" type="text" /><span style={{fontSize: 'smaller'}}>  km.s<sup>-1</sup>.Mpc<sup>-1</sup></span>
                </div>
                <div>
                  <label htmlFor="omegam0_annexes">Ω<sub>m<sub>0</sub></sub> =</label>
                  <output id="omegam0_annexes" style={{color: 'blue'}} onchange="update_omegar0_calc();" value="0.6" type="text">3.0890e-1</output>
                </div>
                <div>
                  <label htmlFor="omegam0_annexes">Ω<sub>m<sub>0</sub></sub> =</label>
                  <output id="omegam0_annexes" style={{color: 'blue'}} onchange="update_omegar0_calc();" value="0.6" type="text" />
                </div>
                <div>
                  <label htmlFor="omegalambda0_annexes">Ω<sub>Λ0</sub> =</label>
                  <output id="omegalambda0_annexes" style={{color: 'blue'}} onchange="update_omegak0_calc();" value="0.5" type="text">6.9110e-1</output>
                </div>
                <div>
                  <label htmlFor="omegalambda0_annexes">Ω<sub>Λ0</sub> =</label>
                  <output id="omegalambda0_annexes" style={{color: 'blue'}} onchange="update_omegak0_calc();" value="0.5" type="text" />
                </div>
                <div>
                  <div>
                    <select id="resultat_omegar0_annexes" style={{color: 'blue'}} onchange="update_omegar0_calc();">
                      <option id="txt_MLRFCN" value="Matière, Lambda, RFC et Neutrinos" selected="selected">Matière, Lambda, RFC et Neutrinos</option>
                      <option id="txt_MLRFC" value="Matière, Lambda et RFC">Matière, Lambda et RFC</option>
                      <option id="txt_ML" value="Matière et Lambda">Matière et Lambda</option>
                    </select>
                  </div>
                  <div>
                    <span id="txt_univplat">Univers Plat (Ω<sub>k0</sub> = 0)</span>
                    <input id="univ_plat" type="checkbox" name="univ_plat" onchange="updateUnivPlat_calc();" />
                  </div>
                </div>
              </div>
              <br />
              <div className="toberight">
                <br />
                <div>
                  <label htmlFor="resultat_omegar0_annexes">Ω<sub>r0</sub> =</label>
                  <span id="Orr" style={{color: 'blue'}}>9.0534e-5</span>
                </div>
                <div>
                  <label htmlFor="resultat_omegak0_annexes">Ω<sub>k0</sub> =</label>
                  <span id="resultat_omegak0_annexes" style={{color: 'blue'}}>-9.0534e-5</span>
                </div>
                <br />
                <div>
                  <label htmlFor="rholambda">ρ<sub>Λ</sub> =</label>
                  <span id="rholambda" style={{color: 'blue'}}>5.9571e-27</span><span style={{fontSize: 'smaller'}}> Kg.m<sup>-3</sup></span>
                  <span />
                </div>
                <div>
                  <label htmlFor="rhom">ρ<sub>m</sub> =</label>
                  <span id="rhom" style={{color: 'blue'}}>2.6626e-27</span><span style={{fontSize: 'smaller'}}> Kg.m<sup>-3</sup></span>
                </div>
                <div>
                  <label htmlFor="rhor">ρ<sub>r</sub> =</label>
                  <span id="rhor" style={{color: 'blue'}}>4.6451e-31</span><span style={{fontSize: 'smaller'}}> Kg.m<sup>-3</sup></span>
                </div>
              </div>
            </div>
            <br />
            {/* Valeurs en Z1 */}
            <div id="box3" className="border">
              <span id="txt_valeursZ1" style={{fontWeight: 'bold'}}>Les paramètres cosmologiques à z<sub>1</sub> et z<sub>2</sub>:</span>
              <br />
              <div id="valeurs_en_Z">
                <div id="en_Z1">
                  <div>
                    <label htmlFor="Tz1">T<span style={{fontSize: 'smaller'}}>(z<sub>1</sub>)</span> =</label>
                    <span id="Tz1" style={{color: 'blue'}}>2.72e+0</span> <span id="Tz1_unit" style={{display: 'contents'}}><span style={{fontSize: 'smaller'}}> K </span></span>
                  </div>
                  <div>
                    <label htmlFor="Hz1">H<span style={{fontSize: 'smaller'}}>(z<sub>1</sub>)</span> =</label>
                    <span id="Hz1" style={{color: 'blue'}}>6.77e+1</span> <span id="Hz1_unit" style={{display: 'contents'}}> <span style={{fontSize: 'smaller'}}>km.s<sup>-1</sup>.Mpc<sup>-1</sup></span></span>
                  </div>
                  <div>
                    <label htmlFor="Omz1">Ω<sub>m</sub><span style={{fontSize: 'smaller'}}>(z<sub>1</sub>)</span> =</label>
                    <span id="Omz1" style={{color: 'blue'}}>3.08e-1</span>
                  </div>
                  <div>
                    <label htmlFor="Olz1">Ω<sub>Λ</sub><span style={{fontSize: 'smaller'}}>(z<sub>1</sub>)</span> =</label>
                    <span id="Olz1" style={{color: 'blue'}}>6.91e-1</span>
                  </div>
                  <div>
                    <label htmlFor="Orz1">Ω<sub>r</sub><span style={{fontSize: 'smaller'}}>(z<sub>1</sub>)</span> =</label>
                    <span id="Orz1" style={{color: 'blue'}}>9.05e-5</span>
                  </div>
                  <div>
                    <label htmlFor="Okz1">Ω<sub>k</sub><span style={{fontSize: 'smaller'}}>(z<sub>1</sub>)</span> =</label>
                    <span id="Okz1" style={{color: 'blue'}}>-9.05e-5</span>
                  </div>
                  <input style={{marginTop: '10px', marginLeft: '10px'}} type="button" onclick="transfert_simu(0);" id="ts-1" defaultValue="Tracer" />
                </div>
                <div id="en_Z2">
                  <div>
                    <label htmlFor="Tz2">T<span style={{fontSize: 'smaller'}}>(z<sub>2</sub>)</span> =</label>
                    <span id="Tz2" style={{color: 'blue'}}>2.72e+0</span> <span id="Tz2_unit" style={{display: 'contents'}}><span style={{fontSize: 'smaller'}}> K </span></span>
                  </div>
                  <div>
                    <label htmlFor="Hz2">H<span style={{fontSize: 'smaller'}}>(z<sub>2</sub>)</span> =</label>
                    <span id="Hz2" style={{color: 'blue'}}>6.70e+1</span> <span id="Hz2_unit" style={{display: 'contents'}}> <span style={{fontSize: 'smaller'}}>km.s<sup>-1</sup>.Mpc<sup>-1</sup></span></span>
                  </div>
                  <div>
                    <label htmlFor="Omz2">Ω<sub>m</sub><span style={{fontSize: 'smaller'}}>(z<sub>2</sub>)</span> =</label>
                    <span id="Omz2" style={{color: 'blue'}}>3.08e-1</span>
                  </div>
                  <div>
                    <label htmlFor="Olz2">Ω<sub>Λ</sub><span style={{fontSize: 'smaller'}}>(z<sub>2</sub>)</span> =</label>
                    <span id="Olz2" style={{color: 'blue'}}>6.91e-1</span>
                  </div>
                  <div>
                    <label htmlFor="Orz2">Ω<sub>r</sub><span style={{fontSize: 'smaller'}}>(z<sub>2</sub>)</span> =</label>
                    <span id="Orz2" style={{color: 'blue'}}>9.05e-5</span>
                  </div>
                  <div>
                    <label htmlFor="Okz2">Ω<sub>k</sub><span style={{fontSize: 'smaller'}}>(z<sub>2</sub>)</span> =</label>
                    <span id="Okz2" style={{color: 'blue'}}>-9.05e-5</span>
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
                      <span id="dm1" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> m </span> =
                      <span id="dm1_pc" style={{color: 'blue'}}>0</span>
                      <span style={{fontSize: 'smaller'}}> pc </span>=
                      <span id="dm1_lum" style={{color: 'blue'}}>0</span>
                      <span style={{fontSize: 'smaller'}}> al </span>
                    </span>
                  </div>
                  <div>
                    <label htmlFor="dm2">d<sub>m<sub>2</sub></sub> =</label>
                    <span id="show_dm2" style={{display: 'contents'}}>
                      <span id="dm2" style={{color: 'blue'}}>0</span> <span style={{fontSize: 'smaller'}}>m</span> =
                      <span id="dm2_pc" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> pc</span> =
                      <span id="dm2_lum" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> al</span>
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="dm">Δd<sub>m</sub> =</label>
                  <span id="show_dm" style={{display: 'contents'}}>
                    <span id="dm" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> m </span>=
                    <span id="dm_pc" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> pc </span>=
                    <span id="dm_diff_lum" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> al</span>
                  </span>
                </div>
                <div id="calcul_t">
                  <div>
                    <label htmlFor="tempsEmission">t<sub>1</sub>=</label>
                    <span id="show_temi" style={{display: 'contents'}}>
                      <span id="tempsEmission" style={{color: 'blue'}}>1.3798e+10</span><span style={{fontSize: 'smaller'}}> a</span> =
                      <span id="tempsEmission_sec" style={{color: 'blue'}}>4.3542e+17</span><span style={{fontSize: 'smaller'}}> s </span>
                    </span>
                    <span id="tempsEmission_alert" style={{color: 'red'}} />
                  </div>
                  <div>
                    <label htmlFor="tempsReception">t<sub>2</sub>=</label>
                    <span id="show_trecep" style={{display: 'contents'}}>
                      <span id="tempsReception" style={{color: 'blue'}}>1.3798e+10</span><span style={{fontSize: 'smaller'}}> a </span>=
                      <span id="tempsReception_sec" style={{color: 'blue'}}>4.3542e+17</span><span style={{fontSize: 'smaller'}}> s</span>
                    </span>
                    <span id="tempsReception_alert" style={{color: 'red'}} />
                  </div>
                </div>
                <div>
                  <label htmlFor="agebetween">Δt =</label>
                  <span id="show_dt" style={{display: 'contents'}}>
                    <span id="agebetween" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> a</span> =
                    <span id="agebetween_sec" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> s</span>
                  </span>
                </div>
                <div id="calcul_dz">
                  <div>
                    <label htmlFor="dz1">d<sub>z<sub>1</sub></sub>/dt<sub>0</sub> =</label>
                    <span id="show_dz1" style={{display: 'contents'}}>
                      <span id="dz1" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> a<sup>-1</sup></span>
                    </span>
                  </div>
                  <div>
                    <label htmlFor="dz2">d<sub>z<sub>2</sub></sub>/dt<sub>0</sub> =</label>
                    <span id="show_dz2" style={{display: 'contents'}}>
                      <span id="dz2" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> a<sup>-1</sup></span>
                    </span>
                  </div>
                </div>
              </div>
              <div id="photo_box" className="border">
                <span id="txt_photometrie" style={{fontWeight: 'bold'}}>Photométrie:</span>
                <div>
                  <label htmlFor="L_e">L<sub>e</sub> =</label>
                  <span id="show_L_e" style={{display: 'contents'}}>
                    <span id="L_e" style={{color: 'blue'}}>0</span>
                    <span style={{fontSize: 'smaller'}}> W.m<sup>-2</sup>.sr<sup>-1</sup></span>
                  </span>
                </div>
                <div id="calcul_dl">
                  <div>
                    <label htmlFor="dl">d<sub>L<sub>1</sub></sub> =</label>
                    <span id="show_dl" style={{display: 'contents'}}>
                      <span id="dl" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> m = </span>
                      <span id="dl_pc" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> pc = </span>
                      <span id="dl_lum" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> al </span>
                    </span>
                  </div>
                  <div>
                    <label htmlFor="dl2">d<sub>L<sub>2</sub></sub> =</label>
                    <span id="show_dl_2" style={{display: 'contents'}}>
                      <span id="dl_2" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> m = </span>
                      <span id="dl2_pc" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> pc = </span>
                      <span id="dl2_lum" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> al </span>
                    </span>
                  </div>
                </div>
                {/* Resultats Photometrie */}
                <div id="calcul_da">
                  <div>
                    <label htmlFor="dda">d<sub>a<sub>1</sub></sub> =</label>
                    <span id="show_da" style={{display: 'contents'}}>
                      <span id="dda" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> m = </span>
                      <span id="dda_pc" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> pc = </span>
                      <span id="dda_lum" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> al </span>
                    </span>
                  </div>
                  <div>
                    <label htmlFor="dda2">d<sub>a<sub>2</sub></sub> =</label>
                    <span id="show_da_2" style={{display: 'contents'}}>
                      <span id="dda_2" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> m = </span>
                      <span id="dda2_pc" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> pc = </span>
                      <span id="dda2_lum" style={{color: 'blue'}}>0</span><span style={{fontSize: 'smaller'}}> al </span>
                    </span>
                  </div>
                </div>
                <div id="calcul_E">
                  <div>
                    <label htmlFor="E_e">E<sub>e<sub>1</sub></sub> =</label>
                    <span id="show_E_e" style={{display: 'none'}}>
                      <span id="E_e" style={{color: 'blue'}} />
                      <span style={{fontSize: 'smaller'}}> W.m<sup>-2</sup></span>
                    </span>
                  </div>
                  <div>
                    <label htmlFor="E_e2">E<sub>e<sub>2</sub></sub> =</label>
                    <span id="show_E_e_2" style={{display: 'none'}}>
                      <span id="E_e_2" style={{color: 'blue'}} />
                      <span style={{fontSize: 'smaller'}}> W.m<sup>-2</sup></span>
                    </span>
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
        {/*Le bouton pour reset la page ... où part son nom?*/}
          <input type="button" id="refresh_button" style={{bottom: '5%', left: '10%', position: 'relative'}} onclick="window.location.reload(false)" defaultValue="Refresh" />
        
        {/* Bouton retour */}
        <span style={{bottom: '5%', left: '90%', position: 'relative'}}><input type="button" id="bouton_retour" defaultValue="Retour" onclick="retour_simu();" /></span>
        </div>

      

    </div>
        
        </>);
}