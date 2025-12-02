
import React, { useState } from 'react';
import DownloadIcon from './icons/DownloadIcon';

interface PhotoGalleryModalProps {
  show: boolean;
  onClose: () => void;
}

// MOCK DATA: Replace these URLs with your actual high-quality photo URLs
// For example, from Supabase Storage or Google Photos direct links.
const PHOTOS = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1576692131267-cfb74d46c347?q=80&w=2000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1576692131267-cfb74d46c347?q=80&w=400&auto=format&fit=crop',
    caption: 'Mesa de Jantar'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=400&auto=format&fit=crop',
    caption: 'Brindes'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=400&auto=format&fit=crop',
    caption: 'Decoração'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=2000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=400&auto=format&fit=crop',
    caption: 'Árvore de Natal'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1575416209503-4c9197e884e9?q=80&w=2000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1575416209503-4c9197e884e9?q=80&w=400&auto=format&fit=crop',
    caption: 'Convivío'
  },
   {
    id: 6,
    url: 'https://images.unsplash.com/photo-1482686119632-1b60628e881e?q=80&w=2000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1482686119632-1b60628e881e?q=80&w=400&auto=format&fit=crop',
    caption: 'Comida'
  },
];

const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({ show, onClose }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof PHOTOS[0] | null>(null);

  if (!show) {
    return null;
  }

  const handleDownload = async (photoUrl: string, photoId: number) => {
    try {
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `jantar-natal-foto-${photoId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed, opening in new tab', error);
      window.open(photoUrl, '_blank');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#1f2937] p-6 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-6xl h-[90vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-green-400 font-christmas tracking-wider">Galeria de Fotos</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors p-2"
            aria-label="Fechar Galeria"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {PHOTOS.map((photo) => (
              <div 
                key={photo.id} 
                className="group relative aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-yellow-500 transition-all duration-300"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img 
                  src={photo.thumbnail} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold">Ver Foto</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          Todas as fotos estão disponíveis em alta resolução para download.
        </p>
      </div>

      {/* Lightbox / Full Screen View */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[110] bg-black/95 flex flex-col items-center justify-center p-4 animate-in zoom-in-95 duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="absolute top-4 right-4 flex gap-4">
             <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(selectedPhoto.url, selectedPhoto.id);
              }}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg font-bold transition-transform hover:scale-105"
            >
              <DownloadIcon />
              Download HD
            </button>
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <img 
            src={selectedPhoto.url} 
            alt={selectedPhoto.caption} 
            className="max-h-[85vh] max-w-full rounded shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoGalleryModal;
