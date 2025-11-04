
import React from 'react';

const Header = () => (
    <header className="text-center w-full max-w-3xl mx-auto">
      <h1 className="font-christmas text-5xl sm:text-6xl md:text-7xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
        <span className="text-red-500">Jantar</span> de <span className="text-green-400">Natal</span>
      </h1>
      <p className="mt-2 text-lg text-gray-300">
        Vamos organizar nossa celebração! Por favor, preencha o formulário abaixo.
      </p>
    </header>
);

export default Header;
