
import React, { useState, useEffect } from 'react';
import { Submission } from '../types';

interface ChristmasFormProps {
  onSubmit: (submission: Omit<Submission, 'id' | 'created_at'>) => Promise<void>;
  submissions: Submission[];
}

const ChristmasForm: React.FC<ChristmasFormProps> = ({ onSubmit, submissions }) => {
  const [name, setName] = useState('');
  const [isAttending, setIsAttending] = useState<boolean | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
      const trimmedName = name.trim().toLowerCase();
      if (trimmedName === '') {
        setIsAttending(null);
        setSelectedDate(null);
        setIsEditing(false);
        return;
      }
      const existingSubmission = submissions.find(s => s.name.toLowerCase() === trimmedName);
      if (existingSubmission) {
        setIsAttending(existingSubmission.isAttending);
        setSelectedDate(existingSubmission.selectedDate);
        setIsEditing(true);
      } else {
        if(isEditing) {
          setIsAttending(null);
          setSelectedDate(null);
        }
        setIsEditing(false);
      }
  }, [name, submissions, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isAttending === null) {
      setError('Por favor, preencha seu nome e confirme sua presença.');
      return;
    }
    if (isAttending && !selectedDate) {
      setError('Se você vai, por favor, escolha uma data preferida.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    const submissionData = {
      name: name.trim(),
      isAttending,
      selectedDate: isAttending ? selectedDate : null,
    };
    await onSubmit(submissionData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-green-300 mb-4">{isEditing ? 'Alterar sua Resposta' : 'Confirme sua Presença'}</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Seu Nome</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          placeholder="Digite seu nome para responder ou alterar"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Você vai participar?</label>
        <div className="mt-2 flex items-center space-x-4">
          <button type="button" disabled={isSubmitting} onClick={() => setIsAttending(true)} className={`px-6 py-2 rounded-lg font-semibold transition-all ${isAttending === true ? 'bg-green-500 text-white ring-2 ring-white' : 'bg-gray-600 hover:bg-gray-500'}`}>Sim</button>
          <button type="button" disabled={isSubmitting} onClick={() => setIsAttending(false)} className={`px-6 py-2 rounded-lg font-semibold transition-all ${isAttending === false ? 'bg-red-500 text-white ring-2 ring-white' : 'bg-gray-600 hover:bg-gray-500'}`}>Não</button>
        </div>
      </div>
      {isAttending && (
          <div>
              <label className="block text-sm font-medium text-gray-300">Qual data prefere?</label>
              <div className="mt-2 flex items-center space-x-4">
                  <button type="button" disabled={isSubmitting} onClick={() => setSelectedDate('28 de Novembro')} className={`px-6 py-2 rounded-lg font-semibold transition-all ${selectedDate === '28 de Novembro' ? 'bg-yellow-500 text-gray-900 ring-2 ring-white' : 'bg-gray-600 hover:bg-gray-500'}`}>28 Nov</button>
                  <button type="button" disabled={isSubmitting} onClick={() => setSelectedDate('5 de Dezembro')} className={`px-6 py-2 rounded-lg font-semibold transition-all ${selectedDate === '5 de Dezembro' ? 'bg-yellow-500 text-gray-900 ring-2 ring-white' : 'bg-gray-600 hover:bg-gray-500'}`}>5 Dez</button>
              </div>
          </div>
      )}
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-800 disabled:cursor-wait text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg"
      >
        {isSubmitting ? 'A Enviar...' : (isEditing ? 'Atualizar Resposta' : 'Enviar Resposta')}
      </button>
    </form>
  );
};

export default ChristmasForm;
