import React, { useState } from "react";

const BubbleWp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    const phoneNumber = "123456789"; // Reemplaza con tu número de WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappLink, "_blank");
    setMessage(""); // Limpia el mensaje después de enviarlo
  };

  return (
    <div>
      <div className="joinchat__button" onClick={toggleChat}>
        <svg
          className="joinchat__button__send"
          viewBox="0 0 400 400"
          strokeLinecap="round"
          strokeWidth="33"
        >
          <path
            className="joinchat_svg__plain"
            d="M168.83 200.504H79.218L33.04 44.284a1 1 0 0 1 1.386-1.188L365.083 199.04a1 1 0 0 1 .003 1.808L34.432 357.903a1 1 0 0 1-1.388-1.187l29.42-99.427"
          ></path>
          <path
            className="joinchat_svg__chat"
            d="M318.087 318.087c-52.982 52.982-132.708 62.922-195.725 29.82l-80.449 10.18 10.358-80.112C18.956 214.905 28.836 134.99 81.913 81.913c65.218-65.217 170.956-65.217 236.174 0 42.661 42.661 57.416 102.661 44.265 157.316"
          ></path>
        </svg>
        <div className="joinchat__badge">1</div>
      </div>

      {isOpen && (
        <div className="chatbox">
          <textarea
            className="chatbox__textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
          />
          <button className="chatbox__send-button" onClick={sendMessage}>
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default BubbleWp;
