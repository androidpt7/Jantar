import React from 'react';

interface MenuModalProps {
  show: boolean;
  onClose: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#1f2937] p-6 rounded-2xl shadow-2xl border border-gray-700 max-w-4xl w-full relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal o feche
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Fechar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">Menus de Natal</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">Menu I</h3>
            <img src="/menu1.jpg" alt="Menu de Natal 1" className="rounded-lg shadow-md w-full" />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">Menu II</h3>
            <img src="/menu2.jpg" alt="Menu de Natal 2" className="rounded-lg shadow-md w-full" />
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-6">
          * Para fechar, clique no 'X' ou em qualquer área fora desta janela.
        </p>
      </div>
    </div>
  );
};

export default MenuModal;