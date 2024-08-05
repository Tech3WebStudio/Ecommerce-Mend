// /src/componentes/Support/ButtonWhatsapp.jsx

import React from 'react';

const ButtonWhatsapp = ({ whatsappLink, logo, name }) => {
  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
      <img src={logo} alt={`${name} WhatsApp`} style={{ width: 50, height: 50, borderRadius: '50%', margin: 10 }} />
    </a>
  );
};

export default ButtonWhatsapp;
