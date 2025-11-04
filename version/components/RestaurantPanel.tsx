import React from 'react';
import MenuIcon from './icons/MenuIcon';

const RestaurantPanel: React.FC = () => {
  // No futuro, estes valores podem vir de props ou de um estado
  const restaurantName = "A ser anunciado";
  const restaurantDescription = "Estamos a finalizar os detalhes do local perfeito para a nossa celebração. Fique atento!";
  const menuLink = "#"; // Link provisório

  return (
    <div className="bg-[#1f2937] p-6 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Local do Jantar</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">{restaurantName}</h3>
        <p className="text-gray-400 text-sm">
          {restaurantDescription}
        </p>
      </div>
      <div className="flex">
        <a
          href={menuLink}
          target="_blank"
          rel="noopener noreferrer"
          // O botão está desativado porque o local ainda não foi decidido.
          // No futuro, a classe de opacidade e o cursor podem ser removidos quando o link estiver disponível.
          className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-200 opacity-50 cursor-not-allowed"
          aria-disabled="true"
          onClick={(e) => e.preventDefault()} // Impede a navegação
        >
          <MenuIcon />
          Ver Menu
        </a>
      </div>
    </div>
  );
};

export default RestaurantPanel;
