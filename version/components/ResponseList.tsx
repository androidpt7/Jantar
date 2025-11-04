import React from 'react';

interface ResponseListProps {
  confirmedGuests: string[];
  loading: boolean;
}

const ResponseList: React.FC<ResponseListProps> = ({ confirmedGuests, loading }) => {
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-400 text-center">A carregar respostas...</p>
        </div>
      );
    }

    if (confirmedGuests.length === 0) {
      return (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-400 text-center">Ainda ninguém confirmou. Seja o primeiro!</p>
        </div>
      );
    }
    
    return (
      <div className="flex-grow overflow-y-auto pr-2 -mr-2" style={{maxHeight: '200px'}}>
        <ul className="space-y-2">
          {confirmedGuests.map((name) => (
            <li key={name} className="bg-[#374151] p-3 rounded-lg text-gray-200">
              {name}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  return (
    <div className="bg-[#1f2937] p-6 rounded-2xl shadow-lg border border-gray-700 flex-grow flex flex-col">
      <h2 className="text-2xl font-bold text-teal-400 mb-4">Lista de Confirmados</h2>
      {renderContent()}
    </div>
  );
};

export default ResponseList;
