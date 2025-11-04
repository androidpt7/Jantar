
import React, { useMemo } from 'react';
import { Submission } from '../types';

interface SubmissionsListProps {
  submissions: Submission[];
  isLoading: boolean;
  error: string | null;
}

const SubmissionsList: React.FC<SubmissionsListProps> = ({ submissions, isLoading, error }) => {
  const sortedSubmissions = useMemo(() => {
    if (!submissions) return [];
    return [...submissions].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }, [submissions]);

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
      <h2 className="text-2xl font-bold text-center text-green-300 mb-4">Lista de Respostas</h2>
      <div className="max-h-96 overflow-y-auto pr-2">
        {isLoading ? (
           <p className="text-gray-400 text-center">A carregar respostas...</p>
        ) : error ? (
           <p className="text-red-400 text-center">{error}</p>
        ) : sortedSubmissions.length === 0 ? (
          <p className="text-gray-400 text-center">Ainda ninguém respondeu. Seja o primeiro!</p>
        ) : (
          <ul className="space-y-3">
            {sortedSubmissions.map((sub) => (
              <li key={sub.id} className={`p-3 rounded-lg flex items-center ${sub.isAttending ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
                <div className="flex-grow">
                  <p className="font-semibold text-white">{sub.name}</p>
                  {sub.isAttending && sub.selectedDate && (
                     <p className="text-xs text-gray-300 mt-1">Votou em: <strong>{sub.selectedDate}</strong></p>
                  )}
                </div>
                {sub.isAttending ? (
                  <span className="text-xs font-bold bg-green-500 text-white py-1 px-2 rounded-full flex-shrink-0">CONFIRMADO</span>
                ) : (
                  <span className="text-xs font-bold bg-red-500 text-white py-1 px-2 rounded-full flex-shrink-0">NÃO VAI</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SubmissionsList;
