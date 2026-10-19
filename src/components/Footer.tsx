import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Clock, MapPin, Phone, Mail, Send, Check, Flame } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#141414] text-white pt-16 pb-12 border-t-4 border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b-2 border-stone-800">
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FF5722] border-2 border-white text-white flex items-center justify-center shadow-brutal-sm">
                <Utensils className="w-6 h-6 stroke-[3]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-3xl tracking-wide">SAVORY</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB300] -mt-1">
                  Smash & Sizzle Diner
                </span>
              </div>
            </Link>

            <p className="text-stone-300 text-xs sm:text-sm max-w-sm font-medium leading-relaxed">
              Serving up unapologetically crispy, seared smash burgers, seasoned loaded sides, and thick real dairy shakes. Smashed to order on a 450°F flat top.
            </p>

            <div className="space-y-2 text-xs font-bold text-stone-300 pt-2">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#FFB300]" />
                <span>Mon – Sun: 11:00 AM – 11:00 PM (Grill Stays Hot)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF5722]" />
                <span>142 Gourmet Ave, Downtown Culinary District</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00C853]" />
                <span>(555) 234-BURGER</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display text-base uppercase tracking-wider text-[#FFB300]">
              The Sizzle Menu
            </h4>
            <ul className="space-y-2 text-xs font-bold text-stone-400">
              <li>
                <Link to="/menu" className="hover:text-[#FF5722] transition-colors">
                  Double Smash Burgers
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#FF5722] transition-colors">
                  Loaded Crispy Sides
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#FF5722] transition-colors">
                  Hand-Spun Thick Malts
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#FF5722] transition-colors">
                  Warm Bakery Sweets
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-[#FF5722] transition-colors">
                  Fast Express Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Craft */}
          <div className="space-y-3">
            <h4 className="font-display text-base uppercase tracking-wider text-[#FFB300]">
              Our Craft
            </h4>
            <ul className="space-y-2 text-xs font-bold text-stone-400">
              <li>
                <span className="hover:text-[#FF5722] cursor-pointer transition-colors">
                  100% Pasture Angus Beef
                </span>
              </li>
              <li>
                <span className="hover:text-[#FF5722] cursor-pointer transition-colors">
                  Toasted Potato Brioche
                </span>
              </li>
              <li>
                <span className="hover:text-[#FF5722] cursor-pointer transition-colors">
                  The Secret Comeback Dip
                </span>
              </li>
              <li>
                <span className="hover:text-[#FF5722] cursor-pointer transition-colors">
                  Catering & Street Popups
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Crave Club */}
          <div className="space-y-3">
            <h4 className="font-display text-base uppercase tracking-wider text-[#FF5722]">
              Join The Crave Club
            </h4>
            <p className="text-xs text-stone-400 font-medium leading-relaxed">
              Drop your email for secret menu items and 15% off your next midnight craving.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#00C853]/20 border-2 border-[#00C853] text-[#00C853] text-xs font-black rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>You're in! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-900 border-2 border-stone-700 rounded-xl text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-[#FF5722] font-bold"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#FF5722] hover:bg-[#E64A19] text-white font-display text-xs uppercase tracking-wider rounded-xl border-2 border-white flex items-center justify-center gap-2 transition-colors shadow-brutal-sm btn-tactile"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Savory Burgers & Shakes Inc. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Smashed with</span>
            <Flame className="w-4 h-4 text-[#FF5722] fill-[#FF5722]" />
            <span>for genuine flavor seekers everywhere.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
