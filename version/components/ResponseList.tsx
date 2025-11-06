import React, { useState } from 'react';
import { RsvpResponse } from '../types';
import SearchIcon from './icons/SearchIcon';

interface ResponseListProps {
  responses: RsvpResponse[];
  loading: boolean;
}

const ResponseList: React.FC<ResponseListProps> = ({ responses, loading }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResponses = responses.filter(response =>
    response.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

    if (searchQuery && filteredResponses.length === 0) {
      return (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-400 text-center">Nenhum nome encontrado.</p>
        </div>
      );
    }
    
    return (
      <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-3" style={{maxHeight: '280px'}}>
        {filteredResponses.map((response) => (
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
                  <p className="text-sm text-gray-300 leading-snug">
                    Data: <strong>{response.preferred_date?.replace('Nov', 'de Nov.').replace('Dez', 'de Dez.')}</strong>
                    <br />
                    Opção: <strong>{response.preferred_menu}</strong>
                  </p>
                </div>
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap self-center">
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-400">Respostas</h2>
        <button 
          onClick={() => setIsSearchVisible(!isSearchVisible)}
          className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          aria-label="Pesquisar nome"
        >
          <SearchIcon />
        </button>
      </div>

      {isSearchVisible && (
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar nome..."
            className="w-full bg-[#374151] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            autoFocus
          />
        </div>
      )}

      {renderContent()}
    </div>
  );
};

export default ResponseList;