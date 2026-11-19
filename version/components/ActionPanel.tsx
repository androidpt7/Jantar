
import React, { useState } from 'react';
import ShareIcon from './icons/ShareIcon';
import DownloadIcon from './icons/DownloadIcon';
import CameraIcon from './icons/CameraIcon';
import { RsvpResponse } from '../types';

interface ActionPanelProps {
  confirmedResponses: RsvpResponse[];
  onOpenGallery?: () => void;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ confirmedResponses, onOpenGallery }) => {
  const [shareText, setShareText] = useState('Partilhar Link');

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareText('Link Copiado!');
      setTimeout(() => setShareText('Partilhar Link'), 2000);
    });
  };

  const handleExport = () => {
    if (confirmedResponses.length === 0) return;
    const escape = (value: string | null | undefined) => `"${(value ?? '').replace(/"/g, '""')}"`;
    const rows = confirmedResponses.map(r =>
      [r.name, r.preferred_date, r.preferred_menu, r.preferred_dish].map(escape).join(',')
    );
    const csvContent = '\uFEFF' + ['Nome,Data,Menu,Prato', ...rows].join('\n');

    const url = URL.createObjectURL(new Blob([csvContent], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lista_confirmados_jantar_natal.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#1f2937] p-6 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Ações do Painel</h2>
      <p className="text-gray-400 mb-6 text-sm">
        Partilhe o link, veja as fotos do evento ou exporte a lista.
      </p>
      <div className="flex flex-col gap-4">
        {onOpenGallery && (
          <button
            onClick={onOpenGallery}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 border border-purple-500 hover:border-purple-400 shadow-lg shadow-purple-900/20"
          >
            <CameraIcon />
            Ver Fotos do Jantar
          </button>
        )}
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
        >
          <ShareIcon />
          {shareText}
        </button>
        <button
          onClick={handleExport}
          disabled={confirmedResponses.length === 0}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          <DownloadIcon />
          Exportar Lista
        </button>
      </div>
    </div>
  );
};

export default ActionPanel;
