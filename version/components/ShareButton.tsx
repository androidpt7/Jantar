
import React, { useState } from 'react';
import ShareIcon from './icons/ShareIcon';

const ShareButton = () => {
  const [buttonText, setButtonText] = useState('Partilhar Link');

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setButtonText('Link Copiado!');
      setTimeout(() => setButtonText('Partilhar Link'), 2000);
    }).catch(err => {
      console.error('Failed to copy link: ', err);
      setButtonText('Erro ao copiar');
      setTimeout(() => setButtonText('Partilhar Link'), 2000);
    });
  };

  return (
    <button
      onClick={handleShare}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
    >
      <ShareIcon />
      <span className="ml-2">{buttonText}</span>
    </button>
  );
};

export default ShareButton;
