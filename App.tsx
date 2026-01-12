
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import TicketCard from './components/TicketCard';
import VenueLayout from './components/VenueLayout';
import BottomCheckoutBar from './components/BottomCheckoutBar';
import CheckoutPage from './components/CheckoutPage';
import Footer from './components/Footer';
import { TICKET_DATA, EVENT_DETAILS, LANDING_CONTENT } from './constants';
import { SelectedTickets } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'tickets' | 'checkout'>('landing');
  const [selectedTickets, setSelectedTickets] = useState<SelectedTickets>(
    TICKET_DATA.reduce((acc, ticket) => ({ ...acc, [ticket.id]: 0 }), {})
  );
  const [activeTab, setActiveTab] = useState('About');

  const totalQuantity = useMemo(() => 
    (Object.values(selectedTickets) as number[]).reduce((sum, q) => sum + q, 0),
  [selectedTickets]);

  const totalPrice = useMemo(() => 
    TICKET_DATA.reduce((sum, ticket) => sum + (ticket.price * (selectedTickets[ticket.id] || 0)), 0),
  [selectedTickets]);

  const updateQuantity = (id: string, delta: number) => {
    setSelectedTickets(prev => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta)
    }));
  };

  const handleProceedToCheckout = () => {
    setView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmCheckout = () => {
    setSelectedTickets(TICKET_DATA.reduce((acc, ticket) => ({ ...acc, [ticket.id]: 0 }), {}));
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    alert("Tickets booked successfully! Check your email.");
  };

  const handleFooterNavigation = (newView: 'landing' | 'tickets', tab?: string) => {
    setView(newView);
    if (tab) {
      setActiveTab(tab);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'About':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <p className="text-zinc-300 leading-relaxed">
              {LANDING_CONTENT.about.text}
            </p>
            <div className="space-y-4">
              <h4 className="font-bold text-white uppercase text-xs tracking-widest">Highlights:</h4>
              <ul className="space-y-2">
                {LANDING_CONTENT.about.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                    <span className="text-[#00FF38]">•</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <p className="pt-4 text-zinc-400 italic text-sm">
              {LANDING_CONTENT.about.footer}
            </p>
          </div>
        );
      case 'Venue Layout':
        return (
          <div className="w-full h-full animate-in zoom-in-95 duration-700">
            <VenueLayout />
          </div>
        );
      case 'Terms and Conditions':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            {LANDING_CONTENT.terms.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-bold text-white text-sm">{section.title}</h4>
                <ul className="space-y-1">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-xs text-zinc-400 leading-relaxed flex items-start gap-2">
                      <span className="text-[#00FF38] mt-1.5 w-1 h-1 rounded-full bg-[#00FF38] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case 'FAQ':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            {LANDING_CONTENT.faq.map((item, idx) => (
              <div key={idx} className="space-y-2 group">
                <h4 className="font-bold text-white text-sm group-hover:text-[#00FF38] transition-colors flex items-start gap-2">
                   <span className="text-zinc-600">Q:</span> {item.q}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed pl-6 italic">
                   <span className="text-zinc-600 font-bold mr-1">A:</span> {item.a}
                </p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const LandingView = () => (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Event Info */}
        <div className="lg:col-span-8 flex flex-col pt-8">
          <div className="flex items-center gap-2 text-zinc-400 mb-6 group cursor-default">
            <svg className="w-5 h-5 text-[#00FF38] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium tracking-tight text-sm">{EVENT_DETAILS.location}</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
            <div className="flex-1 w-full text-center md:text-left">
              <h2 className="text-6xl sm:text-8xl font-black text-white leading-[0.9] mb-6 tracking-tighter italic uppercase">
                Mohombi<br />Live in<br /><span className="text-[#00FF38]">Shillong</span>
              </h2>
              <div className="space-y-1">
                <div className="text-white text-2xl font-black italic tracking-tight">
                  {EVENT_DETAILS.date}
                </div>
                <div className="text-[#00FF38] text-lg font-bold tracking-[0.2em] uppercase">
                  {EVENT_DETAILS.time}
                </div>
                <div className="text-zinc-500 text-sm font-bold tracking-widest uppercase mt-4">
                  Venue: {EVENT_DETAILS.location}
                </div>
              </div>
            </div>

            {/* Poster Image Hero - Beside Title */}
            <div className="w-full max-w-[450px] aspect-[4/5] relative group flex-shrink-0">
              <div className="absolute inset-0 bg-[#00FF38]/20 rounded-[2.5rem] blur-[80px] opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-zinc-800 bg-zinc-900 shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
                <img 
                  src={EVENT_DETAILS.posterUrl} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 block" 
                  alt="Mohombi Official Poster" 
                  onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                  style={{ opacity: 0, transition: 'opacity 0.5s ease-in-out' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                   <div className="flex items-center gap-3 px-5 py-3 bg-[#00FF38] text-black rounded-full font-black text-xs italic tracking-widest shadow-2xl">
                      <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                      OFFICIAL POSTER
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-10 border-b border-zinc-900 mb-8 overflow-x-auto no-scrollbar scroll-smooth">
            {['About', 'Venue Layout', 'Terms and Conditions', 'FAQ'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-5 text-sm font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
                  activeTab === tab ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
                }`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-[-1px] left-0 right-0 h-[4px] bg-[#00FF38] shadow-[0_0_20px_rgba(0,255,56,0.6)]" />}
              </button>
            ))}
          </div>

          {/* Scrolling Content Box */}
          <div className="bg-[#080808] rounded-[3rem] p-6 sm:p-12 border border-zinc-900 shadow-2xl h-[580px] overflow-y-auto custom-scrollbar">
            {renderTabContent()}
          </div>
        </div>

        {/* Right Column: CTA & Stickers */}
        <div className="lg:col-span-4 flex flex-col gap-10 pt-24">
          <div className="bg-[#121212] rounded-[3rem] p-12 border border-zinc-800 flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#00FF38]" />
            <p className="text-zinc-500 text-xs uppercase font-black tracking-[0.3em] mb-4">Phase 1 Tickets</p>
            <h4 className="text-8xl font-black text-white tracking-tighter mb-2">₹799</h4>
            <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest mb-12">Starting From</p>
            
            <button 
              onClick={() => setView('tickets')}
              className="w-full bg-[#00FF38] text-black py-7 rounded-full font-black text-2xl hover:scale-[1.03] active:scale-95 transition-all shadow-[0_25px_70px_rgba(0,255,56,0.4)] flex items-center justify-center gap-4 group/btn"
            >
              Secure Tickets
              <svg className="w-8 h-8 transition-transform group-hover/btn:translate-x-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-zinc-900/40 rounded-[2.5rem] p-8 border border-zinc-800 flex flex-col items-center justify-center text-center group hover:border-[#00FF38]/30 transition-all">
               <span className="text-[#00FF38] font-black text-3xl italic mb-1">14+</span>
               <span className="text-zinc-600 text-[10px] uppercase font-black tracking-widest">Age Limit</span>
            </div>
            <div className="bg-zinc-900/40 rounded-[2.5rem] p-8 border border-zinc-800 flex flex-col items-center justify-center text-center group hover:border-[#00FF38]/30 transition-all">
               <span className="text-white font-black text-xl uppercase italic mb-1 leading-none">Live<br/>Band</span>
               <span className="text-zinc-600 text-[10px] uppercase font-black tracking-widest mt-2">Experience</span>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-8 opacity-40 grayscale contrast-125">
             <span className="text-white font-black text-xs italic tracking-tighter uppercase">Meghalaya Tourism</span>
             <span className="text-white font-black text-xs italic tracking-tighter uppercase">Courtyard</span>
             <span className="text-white font-black text-xs italic tracking-tighter uppercase">OnlyBees.</span>
          </div>
        </div>
      </div>
    </div>
  );

  const TicketSelectionView = () => (
    <main className="max-w-7xl mx-auto px-6 pt-32 pb-48 animate-in slide-in-from-right duration-500">
      <div className="flex flex-col gap-12">
        <div className="flex items-center gap-6">
          <button onClick={() => setView('landing')} className="text-zinc-600 hover:text-[#00FF38] p-4 bg-zinc-900 rounded-3xl transition-all hover:scale-110 active:scale-90">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <h2 className="text-5xl sm:text-8xl font-black tracking-tighter text-[#00FF38] italic uppercase">Tickets</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-6">
            {TICKET_DATA.map(ticket => (
              <TicketCard 
                key={ticket.id}
                ticket={ticket}
                quantity={selectedTickets[ticket.id]}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>
          <div className="lg:col-span-5 hidden lg:block">
            <div className="sticky top-32">
              <VenueLayout />
            </div>
          </div>
        </div>
      </div>
      <BottomCheckoutBar 
        totalPrice={totalPrice}
        totalQuantity={totalQuantity}
        onProceed={handleProceedToCheckout}
      />
    </main>
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#00FF38] selection:text-black overflow-x-hidden">
      <Header />
      
      <div className="animate-in fade-in duration-1000">
        {view === 'landing' && <LandingView />}
        {view === 'tickets' && <TicketSelectionView />}
        {view === 'checkout' && (
          <CheckoutPage 
            event={EVENT_DETAILS}
            selectedTickets={selectedTickets}
            ticketsData={TICKET_DATA}
            totalPrice={totalPrice}
            onBack={() => setView('tickets')}
            onConfirm={handleConfirmCheckout}
          />
        )}
      </div>

      {(view === 'landing' || view === 'tickets') && (
        <Footer onNavigate={handleFooterNavigation} />
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00FF38; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-in { animation: fade-in 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
