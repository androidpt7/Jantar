import React from 'react';

interface VoteCounterProps {
  dateCounts: { [date: string]: number };
  menuCounts: { [menu: string]: number };
}

const VoteCounter: React.FC<VoteCounterProps> = ({ dateCounts, menuCounts }) => {
  const dates = Object.keys(dateCounts);
  const menus = Object.keys(menuCounts);

  return (
    <div className="fixed top-6 right-6 z-50 bg-[#1f2937]/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700 shadow-lg text-white w-52 space-y-3">
      <div>
        <h3 className="text-md font-bold text-green-400 mb-2 border-b border-gray-600 pb-2">
          Votos por Dia
        </h3>
        <ul className="space-y-1 pt-1">
          {dates.map(date => (
            <li key={date} className="flex justify-between items-center text-sm">
              <span className="text-gray-300">{date}:</span>
              <span className="font-semibold text-yellow-400 ml-4 bg-gray-700/50 px-2 py-0.5 rounded">
                {dateCounts[date]}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-md font-bold text-green-400 mb-2 border-b border-gray-600 pb-2">
          Votos por Ementa
        </h3>
        <ul className="space-y-1 pt-1">
          {menus.map(menu => (
            <li key={menu} className="flex justify-between items-center text-sm">
              <span className="text-gray-300">{menu}:</span>
              <span className="font-semibold text-yellow-400 ml-4 bg-gray-700/50 px-2 py-0.5 rounded">
                {menuCounts[menu]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VoteCounter;