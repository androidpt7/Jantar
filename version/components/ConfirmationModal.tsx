import React from 'react';

interface ConfirmationModalProps {
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h2 className="text-3xl font-bold text-green-400 mb-3">
        Obrigado por responder!
      </h2>
      <p className="text-gray-300 mb-8">
        Sua resposta foi registrada com sucesso.
      </p>
      <button
        onClick={onClose}
        className="w-full max-w-xs bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
      >
        Adicionar ou Alterar Resposta
      </button>
    </div>
  );
};

export default ConfirmationModal;
