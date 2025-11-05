import React from 'react';
import MenuIcon from './icons/MenuIcon';
import LocationIcon from './icons/LocationIcon';

interface RestaurantPanelProps {
  onOpenMenu: () => void;
}

const RestaurantPanel: React.FC<RestaurantPanelProps> = ({ onOpenMenu }) => {
  const restaurantName = "O Mercado";
  const restaurantDescription = "Um espaço acolhedor com sabores autênticos, escolhido para a nossa celebração de Natal.";
  const addressLink = "https://www.google.com/maps/search/?api=1&query=R.+Leão+de+Oliveira+-+Mercado+Rosa+Agulhas,+Loja+19+-+1300-350+Lisboa";

  return (
    <div className="bg-[#1f2937] p-6 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Local do Jantar</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">{restaurantName}</h3>
        <p className="text-gray-400 text-sm">
          {restaurantDescription}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={onOpenMenu}
          className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-200"
        >
          <MenuIcon />
          Ver Menus
        </button>
        <a
          href={addressLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
        >
          <LocationIcon />
          Ver Morada
        </a>
      </div>
    </div>
  );
};

export default RestaurantPanel;