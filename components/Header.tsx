
import React from 'react';

interface HeaderProps {
  onHomeClick: () => void;
  onSupportClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick, onSupportClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-5 flex items-center justify-between">
        <button 
          onClick={onHomeClick}
          className="flex items-center group focus:outline-none"
        >
          <img 
            src="https://concerts.onlybees.in/_next/static/media/OnlyBees_light.3cfb6be4.svg" 
            alt="ONLYBEES" 
            className="h-6 w-auto transition-opacity group-hover:opacity-80"
          />
        </button>
        
        <div className="hidden sm:flex items-center gap-6">
          <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">Live in Shillong</span>
          <div className="h-4 w-px bg-zinc-800"></div>
          <button 
            onClick={onSupportClick}
            className="text-[10px] font-black tracking-widest text-zinc-300 hover:text-brand transition-colors uppercase focus:outline-none"
          >
            Support
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
