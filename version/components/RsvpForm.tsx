import React, { useState, useEffect } from 'react';
import { RsvpResponse } from '../types';

interface RsvpFormProps {
  onSubmit: (name: string, attending: boolean) => Promise<void>;
  findResponse: (name: string) => RsvpResponse | undefined;
}

const RsvpForm: React.FC<RsvpFormProps> = ({ onSubmit, findResponse }) => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const existingResponse = findResponse(name);
    if (existingResponse) {
      setAttending(existingResponse.attending);
    } else if (name) { // Only reset if name is being typed
      setAttending(null);
    }
  }, [name, findResponse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, digite seu nome.');
      return;
    }
    if (attending === null) {
      setError('Por favor, selecione se você vai participar.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    
    try {
      await onSubmit(name, attending);
      setName('');
      setAttending(null);
    } catch (err) {
      // The parent component now displays a global error message.
      console.error("Submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1f2937] p-6 rounded-2xl shadow-lg border border-gray-700 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-teal-400 mb-6">Confirme sua Presença</h2>
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Seu Nome
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome para responder ou alterar"
            className="w-full bg-[#374151] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-8">
          <span className="block text-sm font-medium text-gray-300 mb-2">Você vai participar?</span>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setAttending(true)}
              disabled={isSubmitting}
              className={`py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                attending === true
                  ? 'bg-teal-600 text-white ring-2 ring-teal-400'
                  : 'bg-[#374151] text-gray-300 hover:bg-gray-600'
              } disabled:opacity-50`}
            >
              Sim
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              disabled={isSubmitting}
              className={`py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                attending === false
                  ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                  : 'bg-[#374151] text-gray-300 hover:bg-gray-600'
              } disabled:opacity-50`}
            >
              Não
            </button>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
        
        <div className="mt-auto">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 disabled:bg-yellow-800 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isSubmitting ? 'A Enviar...' : 'Enviar Resposta'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RsvpForm;