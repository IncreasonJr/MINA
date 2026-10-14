import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Clock, MapPin, Phone, Mail, Heart, Send, Check } from 'lucide-react';

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
    <footer className="bg-savory-charcoal text-white pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-savory-orange text-white flex items-center justify-center">
                <Utensils className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-black text-2xl tracking-tight">Savory</span>
            </Link>
            <p className="text-stone-400 text-sm max-w-sm leading-relaxed">
              Serving up the crispiest, juiciest smash burgers, seasoned sides, and velvety thick shakes. Made fresh to order, always.
            </p>
            <div className="space-y-2 text-xs text-stone-300 pt-2">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-savory-orange" />
                <span>Mon – Sun: 11:00 AM – 11:00 PM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-savory-orange" />
                <span>142 Gourmet Ave, Downtown Culinary District</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-savory-orange" />
                <span>(555) 234-BURGER</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-200">
              Menu & Ordering
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/menu" className="hover:text-savory-orange transition-colors">
                  Smash Burgers
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-savory-orange transition-colors">
                  Loaded Crispy Sides
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-savory-orange transition-colors">
                  Hand-Spun Shakes
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-savory-orange transition-colors">
                  Dessert Treats
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-savory-orange transition-colors">
                  Delivery Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Trust */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-200">
              About Savory
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <span className="hover:text-savory-orange cursor-pointer transition-colors">
                  Our Quality Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-savory-orange cursor-pointer transition-colors">
                  100% Angus Beef Sourcing
                </span>
              </li>
              <li>
                <span className="hover:text-savory-orange cursor-pointer transition-colors">
                  Allergen & Nutrition Guide
                </span>
              </li>
              <li>
                <span className="hover:text-savory-orange cursor-pointer transition-colors">
                  Catering & Events
                </span>
              </li>
              <li>
                <span className="hover:text-savory-orange cursor-pointer transition-colors">
                  Careers (We're Hiring!)
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Promo signup */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-200">
              Join The Crave Club
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Get secret menu drops, free delivery promos, and 15% off your next order.
            </p>
            {subscribed ? (
              <div className="p-3 bg-savory-green/20 border border-savory-green text-savory-green text-xs font-bold rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4" />
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
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-savory-orange"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-savory-orange hover:bg-savory-orange-hover text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Savory Burgers & Shakes Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-savory-orange fill-savory-orange" />
            <span>for genuine burger lovers everywhere.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
