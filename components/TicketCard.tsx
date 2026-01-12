
import React from 'react';
import { TicketType } from '../types';

interface TicketCardProps {
  ticket: TicketType;
  quantity: number;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, quantity, onUpdateQuantity }) => {
  const isSoldOut = ticket.availableQuantity <= 0;

  return (
    <div className={`bg-[#1E1E1E] rounded-2xl p-6 border transition-all duration-300 shadow-xl group cursor-default relative overflow-hidden ${
      isSoldOut ? 'opacity-60 border-zinc-800' : 'hover:border-[#00FF38] hover:scale-[1.01] border-zinc-800'
    }`}>
      
      {isSoldOut && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-red-500/20 text-red-500 border border-red-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            Sold Out
          </span>
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-xl font-bold mb-1 transition-colors ${
            isSoldOut ? 'text-zinc-500' : 'text-white group-hover:text-[#00FF38]'
          }`}>
            {ticket.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${isSoldOut ? 'text-zinc-600' : 'text-[#00FF38]'}`}>
              ₹{ticket.price}
            </span>
            <span className="text-xs text-zinc-500 font-medium">Excl. taxes</span>
          </div>
        </div>
        
        {!isSoldOut && (
          <div className="flex items-center bg-black/40 rounded-xl p-1 border border-zinc-800">
            <button 
              onClick={() => onUpdateQuantity(ticket.id, -1)}
              disabled={quantity === 0}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                quantity > 0 ? 'text-white hover:bg-zinc-800' : 'text-zinc-700 cursor-not-allowed'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            
            <span className="w-12 text-center font-bold text-lg text-white">
              {quantity}
            </span>
            
            <button 
              onClick={() => onUpdateQuantity(ticket.id, 1)}
              disabled={quantity >= ticket.availableQuantity}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-white transition-colors ${
                quantity >= ticket.availableQuantity ? 'text-zinc-700 cursor-not-allowed' : 'hover:bg-zinc-800'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <ul className="space-y-2 mt-4">
        {ticket.benefits.map((benefit, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
            <span className={`mt-1 font-bold ${isSoldOut ? 'text-zinc-600' : 'text-[#00FF38]'}`}>•</span>
            {benefit}
          </li>
        ))}
      </ul>

      {quantity >= ticket.availableQuantity && !isSoldOut && (
        <p className="mt-4 text-[10px] text-orange-400 font-bold uppercase tracking-widest">
          Max availability reached
        </p>
      )}
    </div>
  );
};

export default TicketCard;
