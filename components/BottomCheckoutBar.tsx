
import React from 'react';

interface BottomCheckoutBarProps {
  totalPrice: number;
  totalQuantity: number;
  onProceed: () => void;
}

const BottomCheckoutBar: React.FC<BottomCheckoutBarProps> = ({ totalPrice, totalQuantity, onProceed }) => {
  const isDisabled = totalQuantity === 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-zinc-800 p-6 sm:px-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Total</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">₹{totalPrice.toLocaleString()}</span>
            <span className="text-zinc-500 text-xs font-medium">({totalQuantity} tickets)</span>
          </div>
        </div>
        
        <button
          onClick={onProceed}
          disabled={isDisabled}
          className={`w-full sm:w-auto px-12 py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-95 ${
            isDisabled 
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
              : 'bg-[#00FF38] text-black hover:bg-[#00e633] shadow-[0_0_30px_rgba(0,255,56,0.3)]'
          }`}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default BottomCheckoutBar;
