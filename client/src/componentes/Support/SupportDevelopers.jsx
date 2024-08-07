// /src/componentes/Support/SupportDevelopers.jsx

import React from 'react';
import ButtonWhatsapp from './ButtonWhatsapp';
import matiLogo from '../../assets/matiLogo.jpg'
import juliLogo from '../../assets/juliLogo.jpg'
import nahuelLogo from '../../assets/nahuelLogo.jpg'
const developers = [
  {
    name: 'Julian',
    whatsappLink: 'https://wa.me/+549377243-0213', // Reemplaza con el número de Julian
    logo: juliLogo// Reemplaza con la ruta del logo de Julian
  },
  {
    name: 'Matias',
    whatsappLink: 'https://wa.me/+543424093379', // Reemplaza con el número de Matias
    logo: matiLogo // Reemplaza con la ruta del logo de Matias
  },
  {
    name: 'Nahuel',
    whatsappLink: 'https://wa.me/+5492616124150', // Reemplaza con el número de Nahuel
    logo: nahuelLogo // Reemplaza con la ruta del logo de Nahuel
  }
];

const SupportDevelopers = () => {
  return (
    <div>
      {developers.map((developer, index) => (
        <ButtonWhatsapp
          key={index}
          whatsappLink={developer.whatsappLink}
          logo={developer.logo}
          name={developer.name}
        />
      ))}
    </div>
  );
};

export default SupportDevelopers;
