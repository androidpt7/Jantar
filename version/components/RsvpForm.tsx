import React, { useState, useEffect } from 'react';
import { RsvpResponse } from '../types';
import { MENUS, findMenu } from '../constants';

interface RsvpFormProps {
  onSubmit: (name: string, attending: boolean, preferredMenu: string | null, preferredDish: string | null) => Promise<void>;
  findResponse: (name: string) => RsvpResponse | undefined;
}

const choiceClass = (selected: boolean) =>
  `rounded-lg font-semibold transition duration-200 disabled:opacity-50 ${
    selected
      ? 'bg-yellow-500 text-gray-900 ring-2 ring-yellow-300'
      : 'bg-[#374151] text-gray-300 hover:bg-gray-600'
  }`;

const RsvpForm: React.FC<RsvpFormProps> = ({ onSubmit, findResponse }) => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [preferredMenu, setPreferredMenu] = useState<string | null>(null);
  const [preferredDish, setPreferredDish] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const selectedMenu = findMenu(preferredMenu);

  useEffect(() => {
    const existingResponse = findResponse(name);
    if (existingResponse) {
      const menu = findMenu(existingResponse.preferred_menu);
      setAttending(existingResponse.attending);
      setPreferredMenu(menu ? menu.name : null);
      setPreferredDish(menu && menu.mains.includes(existingResponse.preferred_dish || '') ? existingResponse.preferred_dish! : null);
      setIsEditing(true);
    } else {
      setIsEditing(false);
      if (name) {
        setAttending(null);
        setPreferredMenu(null);
        setPreferredDish(null);
      }
    }
  }, [name, findResponse]);

  const handleSelectMenu = (menuName: string) => {
    if (menuName !== preferredMenu) {
      setPreferredMenu(menuName);
      setPreferredDish(null); // o prato tem de pertencer ao menu escolhido
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, digite o seu nome.');
      return;
    }
    if (attending === null) {
      setError('Por favor, selecione se vai participar.');
      return;
    }
    if (attending && !preferredMenu) {
      setError('Por favor, escolha uma ementa.');
      return;
    }
    if (attending && !preferredDish) {
      setError('Por favor, escolha o prato principal.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit(name, attending, preferredMenu, preferredDish);
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-green-400 mb-6">Confirme a sua Presença</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            O seu Nome
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Escreva o nome para responder ou alterar"
            className="w-full bg-[#374151] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            disabled={isSubmitting}
          />
          {isEditing && (
            <p className="text-sm text-gray-400 mt-2 px-1">
              Olá! Sinta-se à vontade para atualizar a sua resposta.
            </p>
          )}
        </div>

        <div className="mb-6">
          <span className="block text-sm font-medium text-gray-300 mb-2">Vai participar?</span>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setAttending(true)}
              disabled={isSubmitting}
              className={`py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                attending === true
                  ? 'bg-green-600 text-white ring-2 ring-green-400'
                  : 'bg-[#374151] text-gray-300 hover:bg-gray-600'
              } disabled:opacity-50`}
            >
              Sim
            </button>
            <button
              type="button"
              onClick={() => {
                setAttending(false);
                setPreferredMenu(null);
                setPreferredDish(null);
              }}
              disabled={isSubmitting}
              className={`py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                attending === false
                  ? 'bg-red-600 text-white ring-2 ring-red-400'
                  : 'bg-[#374151] text-gray-300 hover:bg-gray-600'
              } disabled:opacity-50`}
            >
              Não
            </button>
          </div>
        </div>

        {attending && (
          <>
            <div className="mb-6">
              <span className="block text-sm font-medium text-gray-300 mb-2">Que ementa prefere?</span>
              <div className="grid grid-cols-1 gap-3">
                {MENUS.map(menu => (
                  <button
                    key={menu.name}
                    type="button"
                    onClick={() => handleSelectMenu(menu.name)}
                    disabled={isSubmitting}
                    className={`${choiceClass(preferredMenu === menu.name)} py-3 px-4 text-left`}
                  >
                    <span className="flex justify-between gap-2">
                      <strong>{menu.name}</strong>
                      <span className="text-sm">{menu.price}/pessoa</span>
                    </span>
                    <span className="block text-xs font-normal mt-1 opacity-90">
                      Prato principal: {menu.mains.join(' · ')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {selectedMenu && (
              <div className="mb-8">
                <span className="block text-sm font-medium text-gray-300 mb-2">Que prato principal prefere?</span>
                <div className="grid grid-cols-1 gap-2">
                  {selectedMenu.mains.map(dish => (
                    <button
                      key={dish}
                      type="button"
                      onClick={() => setPreferredDish(dish)}
                      disabled={isSubmitting}
                      className={`${choiceClass(preferredDish === dish)} py-3 px-4 text-sm`}
                    >
                      {dish}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <div className="mt-auto">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 disabled:bg-yellow-800 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isSubmitting
              ? (isEditing ? 'A Atualizar...' : 'A Enviar...')
              : (isEditing ? 'Atualizar Resposta' : 'Enviar Resposta')}
          </button>
        </div>
      </form>
    </>
  );
};

export default RsvpForm;
