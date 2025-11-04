import React from 'react';

interface VoteCounterProps {
  counts: { [date: string]: number };
}

const VoteCounter: React.FC<VoteCounterProps> = ({ counts }) => {
  const dates = Object.keys(counts);

  return (
    <div className="fixed top-6 right-6 z-50 bg-[#1f2937]/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700 shadow-lg text-white w-48">
      <h3 className="text-md font-bold text-green-400 mb-2 border-b border-gray-600 pb-2">
        Votos por Dia
      </h3>
      {dates.length > 0 ? (
        <ul className="space-y-1 pt-1">
          {dates.map(date => (
            <li key={date} className="flex justify-between items-center text-sm">
              <span className="text-gray-300">{date}:</span>
              <span className="font-semibold text-yellow-400 ml-4 bg-gray-700/50 px-2 py-0.5 rounded">
                {counts[date]}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400 pt-1">Aguardando votos...</p>
      )}
    </div>
  );
};

export default VoteCounter;