
import React from 'react';

const VenueLayout: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-[#1E1E1E] rounded-[2.5rem] p-6 sm:p-8 border border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col items-center">
        
        {/* Header Section */}
        <div className="w-full flex items-center justify-between mb-8">
          <div className="flex flex-col">
            <h4 className="text-[#00FF38] text-[10px] font-black uppercase tracking-[0.3em] mb-1 italic">Venue Configuration</h4>
            <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">Live Seating Blueprint</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-zinc-800 rounded-full">
             <div className="w-1.5 h-1.5 rounded-full bg-[#00FF38] animate-pulse"></div>
             <span className="text-[9px] text-zinc-300 font-black uppercase tracking-widest italic">Live View</span>
          </div>
        </div>

        {/* Venue Image Container */}
        <div className="relative w-full aspect-video bg-black rounded-[1.5rem] border border-zinc-900 flex flex-col items-center justify-center shadow-inner overflow-hidden group">
          <img 
            src="https://concerts.onlybees.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FStage.a5e7e11c.png&w=1920&q=75"
            alt="Venue Stage Layout"
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Subtle Grid Scanning Effect Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,255,56,0.06),rgba(0,255,56,0.02),rgba(0,255,56,0.06))] z-10 bg-[length:100%_4px,4px_100%]" />
        </div>

        {/* Legend / Status Info */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-zinc-900">
          {[
            { label: 'Available', color: 'bg-[#00FF38]' },
            { label: 'Fast Filling', color: 'bg-orange-500' },
            { label: 'Sold Out', color: 'bg-red-500' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-black/20 border border-transparent hover:border-zinc-800 hover:bg-black/40 transition-all cursor-default group">
              <div className={`w-3 h-3 rounded-full ${item.color} shadow-[0_0_10px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform`} />
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest group-hover:text-[#00FF38] transition-colors">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueLayout;
