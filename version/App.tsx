
import React, { useState, useEffect } from 'react';
import { supabase, configError } from './services/supabaseClient';
import Header from './components/Header';
import ChristmasForm from './components/ChristmasForm';
import SubmissionsList from './components/SubmissionsList';
import SnowflakeIcon from './components/icons/SnowflakeIcon';
import ShareButton from './components/ShareButton';
import ExportButton from './components/ExportButton';
import { Submission } from './types';

const App = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [showForm, setShowForm] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await supabase.from('rsvps').select('*');

    if (error) {
      console.error("Erro ao buscar respostas:", error);
      setError("Não foi possível carregar as respostas. Tente recarregar a página.");
    } else {
      setSubmissions(data as Submission[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!configError) fetchSubmissions();
  }, []);

  const handleSubmission = async (submission: Omit<Submission, 'id' | 'created_at'>) => {
    const trimmedName = submission.name.trim();
    const existingSubmission = submissions.find(s => s.name.toLowerCase() === trimmedName.toLowerCase());
    
    let dbError;

    if (existingSubmission) {
      const { error } = await supabase
        .from('rsvps')
        .update({ isAttending: submission.isAttending, selectedDate: submission.selectedDate })
        .eq('id', existingSubmission.id);
      dbError = error;
    } else {
      const { error } = await supabase
        .from('rsvps')
        .insert([{ name: trimmedName, isAttending: submission.isAttending, selectedDate: submission.selectedDate }]);
      dbError = error;
    }

    if (dbError) {
      console.error("Erro na base de dados:", dbError);
      alert("Ocorreu um erro ao enviar sua resposta. Tente novamente.");
    } else {
      await fetchSubmissions();
      setShowForm(false);
    }
  };

  if (configError) {
    return (
      <div className="bg-red-900 text-white p-8 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="text-3xl font-bold">Erro de Configuração</h1>
          <p className="mt-4">{configError}</p>
          <p className="mt-6 text-sm text-gray-300">Por favor, verifique as suas variáveis de ambiente (.env localmente ou nas configurações do Netlify).</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => <SnowflakeIcon key={i} />)}
      </div>
      <div className="relative z-10 flex flex-col items-center p-4 sm:p-6 md:p-8">
        <Header />
        <div className="w-full max-w-4xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
            {showForm ? (
              <ChristmasForm onSubmit={handleSubmission} submissions={submissions} />
            ) : (
              <div className="text-center flex flex-col items-center justify-center h-full">
                <h2 className="text-2xl font-bold text-green-300">Obrigado por responder!</h2>
                <p className="mt-2 text-gray-300">Sua resposta foi registrada com sucesso.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Adicionar ou Alterar Resposta
                </button>
              </div>
            )}
          </div>
          <div className="space-y-8">
            <SubmissionsList submissions={submissions} isLoading={isLoading} error={error}/>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
              <h2 className="text-2xl font-bold text-center text-green-300 mb-4">Ações do Painel</h2>
              <div className="text-gray-300 text-center space-y-2">
                  <p>Partilhe o link da página ou exporte a lista de confirmados.</p>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ShareButton />
                  <ExportButton submissions={submissions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
