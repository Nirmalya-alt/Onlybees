
import React, { useState, useEffect } from 'react';
import { TicketType, SelectedTickets, EventDetails } from '../types';

interface CheckoutPageProps {
  event: EventDetails;
  selectedTickets: SelectedTickets;
  ticketsData: TicketType[];
  totalPrice: number;
  onBack: () => void;
  onConfirm: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ event, selectedTickets, ticketsData, totalPrice, onBack, onConfirm }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'methods' | 'upi' | 'card' | 'success'>('methods');

  // Countdown Timer Effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const selectedList = ticketsData.filter(t => selectedTickets[t.id] > 0);
  const gst = Math.round(totalPrice * 0.18);
  const bookingFees = 73 * (Object.values(selectedTickets) as number[]).reduce((a, b) => a + b, 0);
  const grandTotal = totalPrice + gst + bookingFees;

  const handleStartPayment = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in your contact details first.");
      return;
    }
    setShowPaymentOptions(true);
  };

  const simulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep('success');
      setTimeout(() => {
        onConfirm();
      }, 2000);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-40 px-6 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left: User Details */}
        <div className="space-y-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <button onClick={onBack} className="text-zinc-500 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              </button>
              <h2 className="text-5xl font-black text-[#00FF38]">CHECKOUT</h2>
            </div>
            <div className="flex items-center gap-2 text-[#00FF38] font-bold bg-[#00FF38]/10 w-fit px-4 py-2 rounded-full border border-[#00FF38]/20">
              <span className="text-sm">TICKETS RESERVED FOR:</span>
              <span className="text-2xl font-mono tracking-tighter">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-zinc-400 uppercase tracking-widest">Name :</label>
              <input 
                type="text" 
                placeholder="Your full name"
                className="w-full bg-transparent border-b border-zinc-800 py-3 text-xl text-white focus:outline-none focus:border-[#00FF38] transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-zinc-400 uppercase tracking-widest">Email :</label>
              <input 
                type="email" 
                placeholder="you@example.com"
                className="w-full bg-transparent border-b border-zinc-800 py-3 text-xl text-white focus:outline-none focus:border-[#00FF38] transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <p className="text-[#00FF38] text-xs font-medium">Note: You'll receive a copy of the tickets here</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-zinc-400 uppercase tracking-widest">Phone :</label>
              <div className="flex items-center gap-4 border-b border-zinc-800 py-3">
                <span className="text-xl text-white">🇮🇳 +91</span>
                <input 
                  type="tel" 
                  placeholder="Mobile number"
                  className="w-full bg-transparent text-xl text-white focus:outline-none"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          </div>

          <p className="text-zinc-600 text-[10px] leading-relaxed">
            By purchasing you'll receive an account, and agree to our general <span className="text-[#00FF38] underline">Terms of use</span>, <span className="text-[#00FF38] underline">Privacy Policy</span> and the <span className="text-[#00FF38] underline">Ticket Purchase Terms</span>.
          </p>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-[#121212] rounded-[2rem] p-10 border border-zinc-800 h-fit sticky top-32">
          <div className="flex gap-6 mb-10 pb-10 border-b border-zinc-800">
            <img src={event.posterUrl} className="w-24 h-24 object-cover rounded-2xl shadow-2xl" alt="Event Poster" />
            <div>
              <h3 className="text-2xl font-black text-white leading-tight mb-1">{event.title}</h3>
              <p className="text-zinc-500 text-sm mb-1">{event.location}</p>
              <p className="text-[#00FF38] text-sm font-bold">{event.date}</p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[#00FF38] text-2xl font-black italic tracking-tight underline decoration-2 underline-offset-8 mb-8">Order Summary</h4>
            <div className="space-y-4">
              {selectedList.map(ticket => (
                <div key={ticket.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium">{ticket.name}</span>
                    <span className="bg-zinc-800 text-[#00FF38] px-3 py-1 rounded-full text-[10px] font-bold border border-[#00FF38]/20">x{selectedTickets[ticket.id]}</span>
                  </div>
                  <span className="text-white font-medium">₹{(ticket.price * selectedTickets[ticket.id]).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between items-center text-sm text-zinc-400">
                <span>GST (18%)</span>
                <span>₹{gst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-zinc-400">
                <span>Booking Fees</span>
                <span>₹{bookingFees.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex justify-between items-end">
              <span className="text-2xl font-black text-white">Total</span>
              <span className="text-4xl font-black text-white tracking-tighter">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-zinc-800 p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Amount to Pay:</span>
            <span className="text-4xl font-black text-white tracking-tighter">₹{grandTotal.toLocaleString()}</span>
          </div>
          <button 
            onClick={handleStartPayment}
            className="bg-[#00FF38] text-black px-16 py-5 rounded-[2rem] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(0,255,56,0.3)] group"
          >
            Checkout <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
          </button>
        </div>
      </div>

      {/* RAZORPAY-STYLE MODAL OVERLAY */}
      {showPaymentOptions && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-6 animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-[#ffffff] rounded-t-[2rem] sm:rounded-[1.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-full duration-500">
            
            {/* Modal Header */}
            <div className="bg-[#2a2a2e] p-6 text-white relative">
              <button 
                onClick={() => setShowPaymentOptions(false)}
                className="absolute right-6 top-6 text-zinc-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 bg-[#00FF38] rounded-lg flex items-center justify-center text-black font-black text-xs">OB</div>
                <h5 className="font-bold text-sm tracking-tight uppercase">OnlyBees Ticketing</h5>
              </div>
              <p className="text-zinc-400 text-xs">Event: {event.title}</p>
              <div className="mt-4 flex justify-between items-end">
                <span className="text-2xl font-bold">₹{grandTotal.toLocaleString()}</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Secured by Razorpay</span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 bg-white min-h-[400px] flex flex-col">
              {isProcessing ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 border-4 border-zinc-100 border-t-[#00FF38] rounded-full animate-spin"></div>
                  <p className="text-zinc-500 font-bold text-sm animate-pulse">Processing your payment...</p>
                </div>
              ) : paymentStep === 'success' ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-4 animate-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-[#00FF38] rounded-full flex items-center justify-center text-black">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-xl font-black text-black uppercase italic">Payment Success!</h3>
                  <p className="text-zinc-500 text-sm">Your tickets are being generated.</p>
                </div>
              ) : paymentStep === 'methods' ? (
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Select Payment Method</p>
                  
                  {[
                    { id: 'upi', name: 'UPI', desc: 'Google Pay, PhonePe, Paytm', icon: '⚡' },
                    { id: 'card', name: 'Card', desc: 'Visa, Mastercard, RuPay, Maestro', icon: '💳' },
                    { id: 'net', name: 'Netbanking', desc: 'All Indian Banks', icon: '🏛️' },
                    { id: 'wallet', name: 'Wallet', desc: 'Mobikwik, Freecharge', icon: '👛' }
                  ].map(method => (
                    <button 
                      key={method.id}
                      onClick={() => setPaymentStep(method.id as any)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl border border-zinc-100 hover:bg-zinc-50 transition-colors text-left group"
                    >
                      <span className="text-2xl">{method.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-black group-hover:text-[#00FF38] transition-colors">{method.name}</p>
                        <p className="text-[10px] text-zinc-400">{method.desc}</p>
                      </div>
                      <svg className="w-4 h-4 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                  ))}
                </div>
              ) : paymentStep === 'upi' ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <button onClick={() => setPaymentStep('methods')} className="text-zinc-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <p className="text-sm font-bold text-black uppercase italic">UPI Options</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {['Google Pay', 'PhonePe', 'Paytm'].map(app => (
                      <button key={app} onClick={simulatePayment} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-zinc-100 hover:border-[#00FF38] transition-all">
                        <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-xs font-bold text-zinc-600 italic">
                          {app[0]}
                        </div>
                        <span className="text-[10px] font-bold text-black">{app}</span>
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100"></div></div>
                    <div className="relative flex justify-center text-xs"><span className="px-2 bg-white text-zinc-300 uppercase font-bold text-[8px]">or pay via VPA</span></div>
                  </div>

                  <div className="flex gap-2">
                    <input type="text" placeholder="Enter UPI ID (e.g. user@okaxis)" className="flex-1 border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00FF38]" />
                    <button onClick={simulatePayment} className="bg-black text-white px-6 py-3 rounded-lg font-bold text-sm">Pay</button>
                  </div>
                </div>
              ) : paymentStep === 'card' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <button onClick={() => setPaymentStep('methods')} className="text-zinc-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <p className="text-sm font-bold text-black uppercase italic">Card Details</p>
                  </div>
                  
                  <input type="text" placeholder="Card Number" className="w-full border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00FF38]" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM / YY" className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00FF38]" />
                    <input type="password" placeholder="CVV" className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00FF38]" />
                  </div>
                  <input type="text" placeholder="Card Holder Name" className="w-full border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#00FF38]" />
                  
                  <div className="flex items-center gap-2 py-2">
                    <input type="checkbox" id="saveCard" />
                    <label htmlFor="saveCard" className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">Remember this card for future payments</label>
                  </div>

                  <button 
                    onClick={simulatePayment}
                    className="w-full bg-[#00FF38] text-black py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:brightness-95 transition-all"
                  >
                    Pay ₹{grandTotal.toLocaleString()}
                  </button>
                </div>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="bg-zinc-50 p-4 border-t border-zinc-100 flex items-center justify-center gap-4">
              <img src="https://img.icons8.com/color/48/visa.png" className="h-4 grayscale opacity-50" alt="Visa" />
              <img src="https://img.icons8.com/color/48/mastercard.png" className="h-4 grayscale opacity-50" alt="MC" />
              <img src="https://img.icons8.com/color/48/upi.png" className="h-4 grayscale opacity-50" alt="UPI" />
              <div className="h-4 w-px bg-zinc-200"></div>
              <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">PCI-DSS Compliant</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
