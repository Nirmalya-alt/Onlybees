
import React from 'react';

interface FooterProps {
  onNavigate: (view: 'landing' | 'tickets', tab?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleLinkClick = (view: 'landing' | 'tickets', tab?: string) => {
    onNavigate(view, tab);
    scrollToTop();
  };

  const socials = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      name: 'X',
      href: 'https://x.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z"/>
        </svg>
      )
    },
    {
      name: 'Mail',
      href: 'mailto:info@onlybees.in',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-[#050505] border-t border-zinc-900 pt-20 pb-10 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tighter text-white">
              ONLYBEES<span className="text-[#00FF38]">.</span>
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Your premium gateway to the most exclusive live events, concerts, and nightlife experiences in the heart of Shillong.
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 text-zinc-500 hover:border-[#00FF38] hover:text-[#00FF38] hover:bg-[#00FF38]/5 transition-all duration-300"
                  title={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore Column */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase text-xs tracking-[0.2em]">Explore</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => handleLinkClick('landing', 'About')} className="text-zinc-500 hover:text-[#00FF38] text-sm font-medium transition-colors">Home & About</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('tickets')} className="text-zinc-500 hover:text-[#00FF38] text-sm font-medium transition-colors">Book Tickets</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('landing', 'Venue Layout')} className="text-zinc-500 hover:text-[#00FF38] text-sm font-medium transition-colors">Venue Map</button>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase text-xs tracking-[0.2em]">Support</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => handleLinkClick('landing', 'FAQ')} className="text-zinc-500 hover:text-[#00FF38] text-sm font-medium transition-colors">FAQs</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('landing', 'Terms and Conditions')} className="text-zinc-500 hover:text-[#00FF38] text-sm font-medium transition-colors">Terms of Service</button>
              </li>
              <li>
                <a href="mailto:info@onlybees.in" className="text-zinc-500 hover:text-[#00FF38] text-sm font-medium transition-colors">Contact Support</a>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA Column */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase text-xs tracking-[0.2em]">Stay Updated</h4>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter email"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00FF38] transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#00FF38] text-black px-4 rounded-lg font-bold text-xs hover:brightness-90 transition-all">
                Join
              </button>
            </div>
            <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">
              Join 5,000+ fans for early access
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-zinc-600 text-xs font-medium">
            © 2025 OnlyBees Ticketing Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Powered by</span>
            <span className="text-white font-black italic tracking-tighter">ONLYBEES TECH</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
