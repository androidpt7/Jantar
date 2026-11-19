import React from 'react';
import { RsvpResponse } from '../types';
import { MENUS } from '../constants';

interface DishCounterProps {
  confirmedResponses: RsvpResponse[];
}

const DishCounter: React.FC<DishCounterProps> = ({ confirmedResponses }) => {
  const withoutDish = confirmedResponses.filter(r => !r.preferred_dish).length;

  return (
    <div className="bg-[#1f2937] p-6 rounded-2xl shadow-lg border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-400">Pedidos por Prato</h2>
        <span className="text-sm text-gray-400">
          {confirmedResponses.length} confirmado{confirmedResponses.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="space-y-4">
        {MENUS.map(menu => {
          const menuTotal = confirmedResponses.filter(r => r.preferred_menu === menu.name).length;
          return (
            <div key={menu.name}>
              <div className="flex justify-between border-b border-gray-600 pb-1 mb-2">
                <h3 className="font-bold text-yellow-400 text-sm">{menu.name}</h3>
                <span className="text-xs text-gray-400">
                  {menuTotal} pessoa{menuTotal === 1 ? '' : 's'}
                </span>
              </div>
              <ul className="space-y-1">
                {menu.mains.map(dish => {
                  const count = confirmedResponses.filter(
                    r => r.preferred_menu === menu.name && r.preferred_dish === dish
                  ).length;
                  return (
                    <li key={dish} className="flex justify-between items-center text-sm gap-2">
                      <span className="text-gray-300">{dish}</span>
                      <span className="font-semibold text-yellow-400 w-8 text-center bg-gray-700/50 px-2 py-0.5 rounded">
                        {count}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {withoutDish > 0 && (
        <p className="text-xs text-gray-400 mt-4">
          {withoutDish} confirmado{withoutDish === 1 ? '' : 's'} ainda sem prato escolhido.
        </p>
      )}
    </div>
  );
};

export default DishCounter;
