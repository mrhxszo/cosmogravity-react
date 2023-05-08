import React, { useState, useEffect} from 'react';

//importing images in french
import image0_fr from '../Images/Slide/image0.png';
import image1_fr from '../Images/Slide/image1_fr.png';
import image2_fr from '../Images/Slide/image2_fr.png';
import image3_fr from '../Images/Slide/image3_fr.png';
import image4_fr from '../Images/Slide/image4_fr.png';

//importing images in english
import image0_en from '../Images/Slide/image0.png';
import image1_en from '../Images/Slide/image1_en.png';
import image2_en from '../Images/Slide/image2_en.png';
import image3_en from '../Images/Slide/image3_en.png';
import image4_en from '../Images/Slide/image4_en.png';

//imoorting components
import cosmog from '../Images/Cosmogravity.png';
import logos from '../Images/logo.png';

//importing css
import '../Css/index.css';


//importing language using i18next
import { useTranslation } from "react-i18next";

function App(): JSX.Element {


  //language hook
  const { t,i18n } = useTranslation<string>();
  const currentLanguage = i18n.language;

  //image slider
  const [currentImage, setCurrentImage] = useState<number>(0);
  const ImageList: string[] = currentLanguage === 'en' ? [image0_en, image1_en, image2_en, image3_en, image4_en] : [image0_fr, image1_fr, image2_fr, image3_fr, image4_fr];


  //useEffect for image slider
  useEffect(() => {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % ImageList.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [currentImage, ImageList.length]);

  return (
    <div>
      <div id="nav-ici"></div>
      {/* Image Titre */}
      <h1 id="Cosmog">
        <img src={cosmog} alt="Cosmogravity" />
      </h1>
      <div id="txt_version" dangerouslySetInnerHTML={{ __html: t('page_index.version') || '' }}>
      </div>

      <div id="Bloc_Texte">
        <b>
          <p id="txt_composition">
            {t('page_index.composition')}
          </p>
        </b>
        <div id="univers">
          <span id="txt_univers">
            {t('page_index.univers')}
          </span>
        </div>
        <div id="trajectoire">
          <span id="txt_trajectoire" dangerouslySetInnerHTML={{ __html: t('page_index.trajectoire') || '' }}>
          </span>
        </div>
      </div>
      {/* Slides */}
      <div id="image_defile">
        <img id={`image${currentImage}`} src={ImageList[currentImage]} alt={`image${currentImage}`} />
      </div>
      {/* Logos */}
      <div id="log">
        <img id="logos" src={logos} alt="logo" />
      </div>
    </div>
  );
}

export default App;
