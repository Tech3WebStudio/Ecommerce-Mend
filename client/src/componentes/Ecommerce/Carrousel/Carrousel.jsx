import React, { useState, useEffect } from "react";

const gradientBackgrounds = [
  "from-pink-500 via-pink-400 to-fuchsia-500",
  "from-fuchsia-500 via-pink-300 to-pink-500",
  "from-rose-500 via-pink-400 to-pink-600"
];

const Carrousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % gradientBackgrounds.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[500px] overflow-hidden">
      <div
        className={`
          w-full h-full 
          bg-gradient-to-r 
          ${gradientBackgrounds[currentIndex]} 
          flex justify-center items-center 
          transition-all duration-1000 ease-in-out
        `}
      >
        <img
  src="/logoNina.png"
  alt="Nina Showroom"
  className="w-[300px] md:w-[400px] h-auto object-contain animate-fade-in drop-shadow-[0_5px_15px_rgba(255,0,150,0.4)] rounded-lg"
/>

      </div>
    </div>
  );
};

export default Carrousel;
