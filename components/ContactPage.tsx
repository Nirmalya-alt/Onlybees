
import React, { useState } from 'react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-40 px-6 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <button onClick={onBack} className="text-zinc-500 hover:text-white p-3 bg-card rounded-2xl border border-zinc-800 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </button>
          <h2 className="text-5xl sm:text-7xl font-black text-brand italic uppercase tracking-tighter">Support</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side: Contact Form */}
          <div className="space-y-8">
            <div className="bg-card p-10 rounded-[3rem] border border-zinc-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand"></div>
              
              {submitted ? (
                <div className="py-20 text-center animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-brand rounded-full flex items-center justify-center text-black mx-auto mb-6">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-2xl font-black text-white italic uppercase mb-2">Message Sent!</h3>
                  <p className="text-zinc-500">Our hive will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Enter your name"
                      className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="you@example.com"
                      className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Message</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="How can we help you today?"
                      className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand transition-all resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-brand text-black py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(0,255,56,0.2)]"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Side: Quick Contact Info */}
          <div className="space-y-8 pt-4">
            <h4 className="text-white text-3xl font-black italic uppercase tracking-tight">Direct Contact</h4>
            
            <div className="grid grid-cols-1 gap-6">
              <a href="tel:8787740538" className="group flex items-center gap-6 p-8 bg-card border border-zinc-800 rounded-[2.5rem] transition-all hover:border-brand/40">
                <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-black transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Call Support</p>
                  <p className="text-xl font-bold text-white group-hover:text-brand transition-colors">+91 8787740538</p>
                </div>
              </a>

              <a href="mailto:info@onlybees.in" className="group flex items-center gap-6 p-8 bg-card border border-zinc-800 rounded-[2.5rem] transition-all hover:border-brand/40">
                <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-black transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Email Support</p>
                  <p className="text-xl font-bold text-white group-hover:text-brand transition-colors">info@onlybees.in</p>
                </div>
              </a>

              <div className="group flex items-center gap-6 p-8 bg-card border border-zinc-800 rounded-[2.5rem] transition-all">
                <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-brand">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Office Location</p>
                  <p className="text-xl font-bold text-white leading-tight">Lariti, Mawkasiang<br/>Shillong, Meghalaya</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
