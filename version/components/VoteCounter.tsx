import React from 'react';

interface VoteCounterProps {
  menuCounts: { [menu: string]: number };
}

const VoteCounter: React.FC<VoteCounterProps> = ({ menuCounts }) => {
  const findWinner = (counts: { [key: string]: number }): string | null => {
    const entries = Object.entries(counts);
    if (entries.length === 0) return null;

    const maxVotes = Math.max(...entries.map(([, votes]) => votes));
    if (maxVotes === 0) return null; // Ainda sem votos

    const winners = entries.filter(([, votes]) => votes === maxVotes);
    if (winners.length > 1) return null; // Empate

    return winners[0][0];
  };

  const mostVotedMenu = findWinner(menuCounts);
  const menus = Object.keys(menuCounts);

  return (
    <div className="fixed top-3 right-3 sm:top-6 sm:right-6 z-50 bg-[#1f2937]/90 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-gray-700 shadow-lg text-white w-60 sm:w-72">
      <h3 className="text-md font-bold text-green-400 mb-2 border-b border-gray-600 pb-2">
        Votos por Ementa
      </h3>
      <ul className="space-y-1 pt-1">
        {menus.map(menu => (
          <li key={menu} className="flex justify-between items-center text-sm gap-2">
            <span className="text-gray-300">{menu}:</span>
            <div className="flex items-center gap-2">
              {menu === mostVotedMenu && (
                <span className="text-xs text-green-400 font-semibold animate-pulse">Mais votada</span>
              )}
              <span className="font-semibold text-yellow-400 w-6 text-center bg-gray-700/50 px-2 py-0.5 rounded">
                {menuCounts[menu]}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-xs text-yellow-400 mt-3 text-center bg-yellow-900/40 p-2 rounded-lg border border-yellow-800/60">
        <p>A ementa mais votada é a que será considerada.</p>
      </div>
    </div>
  );
};

export default VoteCounter;
