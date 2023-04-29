import React, { useState, useEffect } from 'react';
import image0_fr from '../Images/Slide/image0.png';
import image1_fr from '../Images/Slide/image1_fr.png';
import image2_fr from '../Images/Slide/image2_fr.png';
import image3_fr from '../Images/Slide/image3_fr.png';
import image4_fr from '../Images/Slide/image4_fr.png';
import cosmog from '../Images/Cosmogravity.png';
import logos from '../Images/logo.png';
import '../Css/index.css';

function App(): JSX.Element {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const ImageList: string[] = [image0_fr, image1_fr, image2_fr, image3_fr, image4_fr];

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
      <div id="txt_version"></div>
      <div id="Bloc_Texte">
        <b>
          <p id="txt_composition"></p>
        </b>
        <div id="univers">
          <span id="txt_univers"></span>
        </div>
        <div id="trajectoire">
          <span id="txt_trajectoire"></span>
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
