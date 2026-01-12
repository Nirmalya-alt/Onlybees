
import React from 'react';
import { TicketType } from '../types';

interface TicketCardProps {
  ticket: TicketType;
  quantity: number;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, quantity, onUpdateQuantity }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-zinc-800 transition-all duration-300 hover:border-[#00FF38] hover:scale-[1.02] shadow-xl group cursor-default">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#00FF38] transition-colors">{ticket.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#00FF38]">₹{ticket.price}</span>
            <span className="text-xs text-zinc-500 font-medium">Excl. taxes</span>
          </div>
        </div>
        
        <div className="flex items-center bg-zinc-900 rounded-xl p-1 border border-zinc-700">
          <button 
            onClick={() => onUpdateQuantity(ticket.id, -1)}
            disabled={quantity === 0}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              quantity > 0 ? 'text-white hover:bg-zinc-800' : 'text-zinc-600 cursor-not-allowed'
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
            className="w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-zinc-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <ul className="space-y-2 mt-4">
        {ticket.benefits.map((benefit, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
            <span className="text-[#00FF38] mt-1">•</span>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketCard;
