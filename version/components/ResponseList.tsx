import React from 'react';
import { RsvpResponse } from '../types';

interface ResponseListProps {
  confirmedResponses: RsvpResponse[];
  loading: boolean;
}

const ResponseList: React.FC<ResponseListProps> = ({ confirmedResponses, loading }) => {
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-400 text-center">A carregar respostas...</p>
        </div>
      );
    }

    if (confirmedResponses.length === 0) {
      return (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-400 text-center">Ainda ninguém confirmou. Seja o primeiro!</p>
        </div>
      );
    }
    
    return (
      <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-3" style={{maxHeight: '200px'}}>
        {confirmedResponses.map((response) => (
          <div key={response.id || response.name} className="bg-[#2a3a4b] p-3 rounded-lg flex items-center justify-between shadow-md">
            <div>
              <p className="font-semibold text-white">{response.name}</p>
              <p className="text-sm text-gray-400">Votou em: {response.preferred_date?.replace('Nov', 'de Novembro').replace('Dez', 'de Dezembro')}</p>
            </div>
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
              CONFIRMADO
            </span>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-[#1f2937] p-6 rounded-2xl shadow-lg border border-gray-700 flex-grow flex flex-col">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Lista de Respostas</h2>
      {renderContent()}
    </div>
  );
};

export default ResponseList;
