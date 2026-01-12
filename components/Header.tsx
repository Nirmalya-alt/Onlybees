
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <h1 className="text-2xl font-black tracking-tighter text-white">
          ONLYBEES.
        </h1>
      </div>
    </header>
  );
};

export default Header;
