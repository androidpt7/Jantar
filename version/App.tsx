import React, { useState, useEffect, useCallback } from 'react';
import { RsvpResponse } from './types';
import RsvpForm from './components/RsvpForm';
import ResponseList from './components/ResponseList';
import ActionPanel from './components/ActionPanel';
import ConfirmationModal from './components/ConfirmationModal';
import RestaurantPanel from './components/RestaurantPanel';
import AudioPlayer from './components/AudioPlayer';
import VoteCounter from './components/VoteCounter';
import MenuModal from './components/MenuModal';
import { supabase } from './supabaseClient';

const Snowflakes: React.FC = () => {
  const flakes = Array.from({ length: 50 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}vw`,
      opacity: Math.random() * 0.7 + 0.3,
      fontSize: `${Math.random() * 10 + 10}px`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      animationDelay: `${Math.random() * 5}s`,
    };
    return <div key={i} className="snowflake" style={style}>❄</div>;
  });
  return <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">{flakes}</div>;
};


const App: React.FC = () => {
  const [responses, setResponses] = useState<RsvpResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);

  const fetchResponses = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('rsvps')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) {
      console.error("Error fetching responses:", error);
      setError("Não foi possível carregar as respostas. Tente recarregar a página.");
    } else {
      setResponses(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchResponses();
  }, [fetchResponses]);

  const handleRsvpSubmit = useCallback(async (name: string, attending: boolean, preferredDate: string | null, preferredMenu: string | null) => {
    const payload = { 
      name: name.trim(), 
      attending, 
      preferred_date: attending ? preferredDate : null,
      preferred_menu: attending ? preferredMenu : null,
    };

    const { error } = await supabase
      .from('rsvps')
      .upsert(payload, { onConflict: 'name' });
    
    if (error) {
      console.error("Error submitting response:", error);
      setError("Ocorreu um erro ao enviar sua resposta. Por favor, tente novamente.");
      throw error; // Propagate error to form
    } else {
      setError(null); // Clear previous errors on success
      await fetchResponses(); // Refresh list after successful submission
      setShowConfirmation(true); // Show confirmation modal
    }
  }, [fetchResponses]);

  const findResponseByName = useCallback((name: string): RsvpResponse | undefined => {
    return responses.find(res => res.name.toLowerCase() === name.toLowerCase());
  }, [responses]);

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const confirmedResponses = responses.filter(res => res.attending);

  // Calcula a contagem de votos para cada data
  const dateVoteCounts = confirmedResponses.reduce((acc, response) => {
    if (response.preferred_date) {
      acc[response.preferred_date] = (acc[response.preferred_date] || 0) + 1;
    }
    return acc;
  }, {} as { [date: string]: number });

  // Calcula a contagem de votos para cada menu
  const menuVoteCounts = confirmedResponses.reduce((acc, response) => {
    if (response.preferred_menu) {
      acc[response.preferred_menu] = (acc[response.preferred_menu] || 0) + 1;
    }
    return acc;
  }, {} as { [menu: string]: number });

  // Garante que todas as datas e menus possíveis são exibidos, mesmo com 0 votos
  const DATES = ['28 Nov', '5 Dez'];
  const MENUS = ['Menu I - Prato 1', 'Menu I - Prato 2', 'Menu II - Prato 1', 'Menu II - Prato 2'];
  const initialDateCounts = DATES.reduce((acc, date) => ({ ...acc, [date]: 0 }), {} as { [date: string]: number });
  const initialMenuCounts = MENUS.reduce((acc, menu) => ({ ...acc, [menu]: 0 }), {} as { [menu: string]: number });
  
  const finalDateVoteCounts = { ...initialDateCounts, ...dateVoteCounts };
  const finalMenuVoteCounts = { ...initialMenuCounts, ...menuVoteCounts };


  return (
    <>
      <Snowflakes />
      <VoteCounter dateCounts={finalDateVoteCounts} menuCounts={finalMenuVoteCounts} />
      <MenuModal show={showMenuModal} onClose={() => setShowMenuModal(false)} />
      
      <div className="relative z-10 min-h-screen bg-transparent text-gray-200 flex flex-col items-center p-4 sm:p-6 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-christmas">
            <span className="text-red-500">Jantar</span>
            <span className="text-white mx-2"> de </span>
            <span className="text-green-500">Natal</span>
          </h1>
          <p className="text-gray-400 mt-2 text-md sm:text-lg">
            Vamos organizar nossa celebração! Por favor, preencha o formulário abaixo.
          </p>
        </header>

        <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1f2937] p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col md:self-start">
            {showConfirmation ? (
              <ConfirmationModal onClose={handleCloseConfirmation} />
            ) : (
              <RsvpForm onSubmit={handleRsvpSubmit} findResponse={findResponseByName} />
            )}
          </div>

          <div className="flex flex-col gap-8">
            {error && <p className="text-red-400 text-center bg-[#1f2937] p-3 rounded-lg">{error}</p>}
            <ResponseList responses={responses} loading={loading} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <RestaurantPanel onOpenMenu={() => setShowMenuModal(true)} />
              <ActionPanel confirmedResponses={confirmedResponses} />
            </div>
          </div>
        </main>
        <AudioPlayer />
      </div>
    </>
  );
};

export default App;