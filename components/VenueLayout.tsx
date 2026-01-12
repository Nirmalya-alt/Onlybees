
import React from 'react';

const VenueLayout: React.FC = () => {
  // Helper to render a structured seat group with aisles like a bus or plane
  const renderSeatGroup = (rows: number, cols: number, colorClass: string, aisleAfterCol?: number) => {
    return (
      <div 
        className="grid gap-[3px] w-full" 
        style={{ 
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const colIndex = i % cols;
          const isAisle = aisleAfterCol !== undefined && colIndex === aisleAfterCol;
          
          return (
            <div 
              key={i} 
              className={`h-3 rounded-[2px] transition-all duration-300 ${isAisle ? 'mr-2' : ''} ${colorClass} ring-1 ring-white/5 hover:ring-[#00FF38]/50 hover:scale-110 cursor-pointer`}
              title={`Section seat ${i + 1}`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-[#0a0a0a] rounded-[2.5rem] p-6 sm:p-8 border border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col items-center">
        
        {/* Header Section */}
        <div className="w-full flex items-center justify-between mb-8">
          <div className="flex flex-col">
            <h4 className="text-[#00FF38] text-[10px] font-black uppercase tracking-[0.3em] mb-1 italic">Venue Configuration</h4>
            <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">Digital Seating Blueprint</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 border border-zinc-800 rounded-full">
             <div className="w-1.5 h-1.5 rounded-full bg-[#00FF38] animate-pulse"></div>
             <span className="text-[9px] text-zinc-300 font-black uppercase tracking-widest italic">Live View</span>
          </div>
        </div>

        {/* The Main Blueprint Container - Scrollable if needed, but optimized for height */}
        <div className="relative w-full bg-black rounded-[1.5rem] p-6 sm:p-8 border border-zinc-900 flex flex-col items-center gap-8 shadow-inner overflow-hidden">
          
          {/* 1. STAGE - Topmost Section */}
          <div className="w-full">
            <div className="w-full h-20 bg-gradient-to-b from-zinc-700 to-zinc-950 rounded-xl flex flex-col items-center justify-center border-2 border-zinc-600 shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative overflow-hidden group/stage">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(0,255,56,0.2),_transparent)] pointer-events-none" />
              <div className="w-full h-[2px] bg-[#00FF38] absolute top-0 shadow-[0_0_15px_#00FF38]" />
              <span className="text-lg font-black text-white uppercase tracking-[1em] italic ml-[1em] drop-shadow-lg">STAGE</span>
              <div className="flex gap-6 mt-2 opacity-30">
                <div className="w-16 h-1.5 bg-[#00FF38] rounded-full" />
                <div className="w-16 h-1.5 bg-[#00FF38] rounded-full" />
              </div>
            </div>
          </div>

          {/* 2. GA VIP SECTION - Immediately under stage */}
          <div className="w-full flex flex-col items-center gap-3">
            <div className="flex items-center gap-4 w-full">
              <div className="h-[1px] flex-1 bg-zinc-800" />
              <span className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] whitespace-nowrap px-4 py-1 bg-orange-400/10 rounded-full border border-orange-400/20">GA VIP SECTION</span>
              <div className="h-[1px] flex-1 bg-zinc-800" />
            </div>
            <div className="w-full sm:w-[85%] bg-orange-400/5 p-4 rounded-xl border border-orange-400/20 shadow-[0_0_30px_rgba(251,146,60,0.05)]">
              {renderSeatGroup(4, 20, 'bg-orange-500', 9)}
            </div>
          </div>

          {/* 3. CONSOLE - Central technical hub */}
          <div className="relative">
            <div className="w-28 h-12 bg-[#111] rounded-xl flex flex-col items-center justify-center border border-zinc-700 shadow-2xl relative group/console">
              <div className="w-14 h-1 bg-orange-600 rounded-full mb-1 shadow-[0_0_10px_rgba(234,88,12,0.6)]" />
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-tighter italic">CONSOLE HUB</span>
              <div className="absolute -inset-2 bg-orange-600/10 rounded-full blur-xl opacity-0 group-hover/console:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* 4. GA SECTION - Large Main Floor */}
          <div className="w-full flex flex-col items-center gap-3">
             <div className="flex items-center gap-4 w-full">
              <div className="h-[1px] flex-1 bg-zinc-900" />
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] whitespace-nowrap px-4 py-1 bg-zinc-900 rounded-full border border-zinc-800">GENERAL ACCESS</span>
              <div className="h-[1px] flex-1 bg-zinc-900" />
            </div>
            <div className="w-full p-2">
              {renderSeatGroup(8, 28, 'bg-zinc-700', 13)}
            </div>
          </div>

          {/* 5. BOTTOM BLOCK: STALLS | VVIP | STALLS */}
          <div className="w-full grid grid-cols-12 gap-4 items-end mt-4">
            
            {/* Left Stalls */}
            <div className="col-span-3 flex flex-col items-center gap-2">
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">STALLS L</span>
              <div className="w-full bg-zinc-900/40 p-2 rounded-lg border border-zinc-800">
                {renderSeatGroup(6, 6, 'bg-zinc-800')}
              </div>
            </div>

            {/* VVIP Lounge Center */}
            <div className="col-span-6 flex flex-col items-center gap-0">
              <div className="w-full bg-blue-600/5 border-x-2 border-t-2 border-blue-500/30 rounded-t-[2.5rem] p-6 pb-4 flex flex-col items-center shadow-[0_-25px_50px_rgba(37,99,235,0.15)]">
                <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.5em] mb-4 italic">VVIP LOUNGE</span>
                <div className="w-full">
                  {renderSeatGroup(4, 14, 'bg-blue-600', 6)}
                </div>
              </div>
              
              {/* Connected Bar footer for VVIP */}
              <div className="w-full h-12 bg-zinc-900 border-x border-b border-zinc-700 rounded-b-2xl flex items-center justify-center relative shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[1em] ml-[1em]">BAR</span>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                </div>
              </div>
            </div>

            {/* Right Stalls */}
            <div className="col-span-3 flex flex-col items-center gap-2">
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">STALLS R</span>
              <div className="w-full bg-zinc-900/40 p-2 rounded-lg border border-zinc-800">
                {renderSeatGroup(6, 6, 'bg-zinc-800')}
              </div>
            </div>
          </div>
          
          {/* Subtle Grid Scanning Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,255,56,0.06),rgba(0,255,56,0.02),rgba(0,255,56,0.06))] z-10 bg-[length:100%_4px,4px_100%]" />
        </div>

        {/* Legend */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-zinc-900">
          {[
            { label: 'Live Stage', color: 'bg-zinc-600 ring-1 ring-[#00FF38]' },
            { label: 'GA VIP Area', color: 'bg-orange-500' },
            { label: 'General Access', color: 'bg-zinc-700' },
            { label: 'VVIP Premium', color: 'bg-blue-600' },
            { label: 'Side Stalls', color: 'bg-zinc-800' },
            { label: 'Bar / Services', color: 'bg-zinc-900' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/30 border border-transparent hover:border-zinc-800 hover:bg-zinc-800/50 transition-all cursor-default group">
              <div className={`w-4 h-4 rounded-sm ${item.color} shadow-[0_0_10px_rgba(255,255,255,0.05)] group-hover:scale-125 transition-transform`} />
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-tight group-hover:text-[#00FF38] transition-colors">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueLayout;
