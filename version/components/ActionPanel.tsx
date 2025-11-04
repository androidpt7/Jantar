
import React, { useState } from 'react';
import ShareIcon from './icons/ShareIcon';
import DownloadIcon from './icons/DownloadIcon';

interface ActionPanelProps {
  confirmedGuests: string[];
}

const ActionPanel: React.FC<ActionPanelProps> = ({ confirmedGuests }) => {
  const [shareText, setShareText] = useState('Partilhar Link');

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareText('Link Copiado!');
      setTimeout(() => setShareText('Partilhar Link'), 2000);
    });
  };

  const handleExport = () => {
    if (confirmedGuests.length === 0) return;
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Nome dos Confirmados\n" 
      + confirmedGuests.join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lista_confirmados_jantar_natal.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#1f2937] p-6 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-teal-400 mb-4">Ações do Painel</h2>
      <p className="text-gray-400 mb-6 text-sm">
        Partilhe o link para que outros respondam ou exporte a lista de confirmados.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
        >
          <ShareIcon />
          {shareText}
        </button>
        <button
          onClick={handleExport}
          disabled={confirmedGuests.length === 0}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          <DownloadIcon />
          Exportar Lista
        </button>
      </div>
    </div>
  );
};

export default ActionPanel;
