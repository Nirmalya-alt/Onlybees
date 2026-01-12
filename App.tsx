
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import TicketCard from './components/TicketCard';
import VenueLayout from './components/VenueLayout';
import BottomCheckoutBar from './components/BottomCheckoutBar';
import CheckoutPage from './components/CheckoutPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import { TICKET_DATA, EVENT_DETAILS, LANDING_CONTENT } from './constants';
import { SelectedTickets } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'tickets' | 'checkout' | 'contact'>('landing');
  const [selectedTickets, setSelectedTickets] = useState<SelectedTickets>(
    TICKET_DATA.reduce((acc, ticket) => ({ ...acc, [ticket.id]: 0 }), {})
  );
  const [activeTab, setActiveTab] = useState('About');

  // Derived State (Mandatory requirement)
  const totalQuantity = useMemo(() => 
    (Object.values(selectedTickets) as number[]).reduce((sum, q) => sum + q, 0),
  [selectedTickets]);

  const totalPrice = useMemo(() => 
    TICKET_DATA.reduce((sum, ticket) => sum + (ticket.price * (selectedTickets[ticket.id] || 0)), 0),
  [selectedTickets]);

  const lowestPrice = useMemo(() => {
    const available = TICKET_DATA.filter(t => t.availableQuantity > 0);
    return available.length > 0 ? Math.min(...available.map(t => t.price)) : 0;
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    const ticket = TICKET_DATA.find(t => t.id === id);
    if (!ticket) return;

    setSelectedTickets(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next > ticket.availableQuantity && ticket.availableQuantity > 0) return prev;
      return { ...prev, [id]: next };
    });
  };

  const handleProceedToCheckout = () => {
    console.log({
      selectedTickets,
      totalQuantity,
      totalPrice
    });
    setView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmCheckout = () => {
    setSelectedTickets(TICKET_DATA.reduce((acc, ticket) => ({ ...acc, [ticket.id]: 0 }), {}));
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSupportClick = () => {
    setView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    setView('landing');
    setActiveTab('About');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'About':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <p className="text-zinc-300 leading-relaxed text-lg">{LANDING_CONTENT.about.text}</p>
            <ul className="space-y-3">
              {LANDING_CONTENT.about.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                  <span className="text-brand font-black">•</span> {h}
                </li>
              ))}
            </ul>
            <p className="pt-4 text-zinc-500 italic text-sm border-t border-zinc-900">{LANDING_CONTENT.about.footer}</p>
          </div>
        );
      case 'Venue Layout':
        return <div className="animate-in zoom-in duration-700"><VenueLayout /></div>;
      case 'Terms and Conditions':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            {LANDING_CONTENT.terms.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <h4 className="font-bold text-white text-sm uppercase tracking-wider">{section.title}</h4>
                <ul className="space-y-1 pl-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-xs text-zinc-500 list-disc">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case 'FAQ':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            {LANDING_CONTENT.faq.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <p className="font-bold text-white text-sm">Q: {item.q}</p>
                <p className="text-xs text-zinc-500 italic">A: {item.a}</p>
              </div>
            ))}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand selection:text-black font-sans">
      <Header onHomeClick={handleHomeClick} onSupportClick={handleSupportClick} />
      
      {view === 'landing' && (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-20 animate-in fade-in duration-1000">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 pt-8">
              <div className="flex items-center gap-2 text-zinc-500 mb-6 tracking-[0.2em] uppercase text-[10px] font-black">
                <svg className="w-4 h-4 text-brand" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                {EVENT_DETAILS.location}
              </div>
              <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-6xl sm:text-8xl font-black text-white leading-[0.85] mb-6 tracking-tighter italic uppercase">
                    Mohombi<br />Live in<br /><span className="text-brand">Shillong</span>
                  </h2>
                  <p className="text-white text-2xl font-black italic">{EVENT_DETAILS.date}</p>
                  <p className="text-brand text-lg font-bold tracking-[0.2em] uppercase">{EVENT_DETAILS.time}</p>
                </div>
                <div className="w-full max-w-[380px] aspect-[4/5] relative group">
                  <div className="absolute inset-0 bg-brand/10 rounded-[2.5rem] blur-[60px] opacity-30 group-hover:opacity-60 transition-opacity" />
                  <img 
                    src={EVENT_DETAILS.posterUrl} 
                    className="relative w-full h-full object-cover rounded-[2.5rem] border border-zinc-800 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]" 
                    alt="Event Flyer"
                  />
                </div>
              </div>
              <div className="flex gap-8 border-b border-zinc-900 mb-8 overflow-x-auto no-scrollbar">
                {['About', 'Venue Layout', 'Terms and Conditions', 'FAQ'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === tab ? 'text-brand' : 'text-zinc-600 hover:text-zinc-400'}`}
                  >
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-brand shadow-[0_0_10px_#00FF38]" />}
                  </button>
                ))}
              </div>
              <div className="bg-card rounded-[2.5rem] p-8 sm:p-12 border border-zinc-900 h-[500px] overflow-y-auto custom-scrollbar shadow-2xl">
                {renderTabContent()}
              </div>
            </div>
            <div className="lg:col-span-4 lg:pt-32 space-y-10">
              <div className="bg-card rounded-[2.5rem] p-10 border border-zinc-800 text-center shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand" />
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-4">Tickets Now Live</p>
                <h4 className="text-7xl font-black text-white mb-8 tracking-tighter">₹{lowestPrice}</h4>
                <button 
                  onClick={() => setView('tickets')}
                  className="w-full bg-brand text-black py-6 rounded-full font-black text-xl hover:scale-[1.03] active:scale-95 transition-all shadow-[0_20px_50px_rgba(0,255,56,0.3)]"
                >
                  Get Tickets
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-6 rounded-[2rem] border border-zinc-800 text-center">
                  <p className="text-brand font-black text-2xl italic">14+</p>
                  <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">Min Age</p>
                </div>
                <div className="bg-card p-6 rounded-[2rem] border border-zinc-800 text-center">
                  <p className="text-white font-black text-xl italic leading-none">Live<br/>Band</p>
                  <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mt-1">Show</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'tickets' && (
        <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-48 animate-in slide-in-from-right duration-500">
          <div className="flex items-center gap-6 mb-12">
            <button onClick={() => setView('landing')} className="p-4 bg-card rounded-2xl border border-zinc-800 hover:text-brand transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-brand italic uppercase">Select Tickets</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
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
            <div className="lg:col-span-5 sticky top-32">
              <VenueLayout />
            </div>
          </div>
          <BottomCheckoutBar 
            totalPrice={totalPrice}
            totalQuantity={totalQuantity}
            onProceed={handleProceedToCheckout}
          />
        </main>
      )}

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

      {view === 'contact' && (
        <ContactPage onBack={handleHomeClick} />
      )}

      {(view === 'landing' || view === 'tickets') && (
        <Footer onNavigate={(v, t) => { setView(v); if(t) setActiveTab(t); }} />
      )}
    </div>
  );
};

export default App;
