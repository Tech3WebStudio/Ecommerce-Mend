import React from "react";
import imgWhatsapp from "../../assets/icons8-whatsapp.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ButtonWhatsapp = ({ childen, celular }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div>
        <h2>Quieres hablar con {childen}?</h2>
        <a href={`https://wa.me/${celular}`} target="_blank">
          <LazyLoadImage src={imgWhatsapp} />
        </a>
      </div>
    </div>
  );
};

export default ButtonWhatsapp;
