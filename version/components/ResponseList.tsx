import React from 'react';
import { RsvpResponse } from '../types';

interface ResponseListProps {
  responses: RsvpResponse[];
  loading: boolean;
}

const ResponseList: React.FC<ResponseListProps> = ({ responses, loading }) => {
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-400 text-center">A carregar respostas...</p>
        </div>
      );
    }

    if (responses.length === 0) {
      return (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-400 text-center">Ainda ninguém respondeu. Seja o primeiro!</p>
        </div>
      );
    }
    
    return (
      <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-3" style={{maxHeight: '280px'}}>
        {responses.map((response) => (
          <div 
            key={response.id || response.name} 
            className={`p-4 rounded-xl flex items-center justify-between shadow-lg ${
              response.attending ? 'bg-[#103c2b]' : 'bg-[#442426]'
            }`}
          >
            {response.attending ? (
              <>
                <div>
                  <p className="text-lg font-bold text-white">{response.name}</p>
                  <p className="text-sm text-gray-300">
                    Votou em: <strong>{response.preferred_date?.replace('Nov', 'de Novembro').replace('Dez', 'de Dezembro')}</strong>
                  </p>
                </div>
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                  CONFIRMADO
                </span>
              </>
            ) : (
              <>
                <p className="text-lg font-bold text-white">{response.name}</p>
                <span className="bg-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                  NÃO VAI
                </span>
              </>
            )}
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