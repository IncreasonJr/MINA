import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Star, Dices, Sparkles } from 'lucide-react';
import { CraveSpinnerModal } from './CraveSpinnerModal';
import { ItemModal } from './ItemModal';
import { MenuItem, MENU_ITEMS } from '../data/menuItems';

export const Hero: React.FC = () => {
  const [spinnerOpen, setSpinnerOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  const heroFeaturedDish = MENU_ITEMS[0]; // Classic Smash

  return (
    <section className="relative overflow-hidden bg-[#FAF6EE] text-[#141414] py-16 lg:py-24 border-b-3 border-[#141414] bg-retro-dots">
      {/* Decorative Floating Sticker Elements */}
      <div className="absolute top-8 left-[6%] hidden xl:block -rotate-6 z-0 pointer-events-none">
        <div className="px-4 py-2 bg-[#FFB300] border-3 border-[#141414] rounded-2xl shadow-brutal font-display text-sm tracking-wider uppercase text-[#141414]">
          ⭐ PASTURE ANGUS BEEF
        </div>
      </div>

      <div className="absolute bottom-10 left-[45%] hidden xl:block rotate-6 z-0 pointer-events-none">
        <div className="px-4 py-2 bg-[#00C853] text-white border-3 border-[#141414] rounded-2xl shadow-brutal font-display text-sm tracking-wider uppercase">
          🚀 30 MIN FLIGHT TIME
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Live Grill Status Stamp */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#141414] shadow-brutal-sm text-xs font-black uppercase tracking-wider">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5722] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF5722]"></span>
              </span>
              <Flame className="w-4 h-4 text-[#FF5722] fill-[#FF5722] animate-sizzle" />
              <span>Hot & fresh in 30 min</span>
              <span className="text-stone-300">•</span>
              <span className="text-[#FF5722]">Griddle Searing Now</span>
            </div>

            {/* Giant High-Voltage Headline */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-[#141414] uppercase">
              CRAVE IT.
              <br />
              TAP IT.{' '}
              <span className="inline-block relative -rotate-2 bg-[#FF5722] text-white px-3 py-0.5 rounded-2xl border-3 border-[#141414] shadow-brutal">
                TASTE IT.
              </span>
            </h1>

            {/* Subheadline with character */}
            <p className="text-base sm:text-xl text-stone-700 max-w-xl font-bold leading-relaxed">
              Smash burgers, crispy sides and thick shakes — made to order and delivered hot.
            </p>

            {/* CTA Buttons Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-display text-lg tracking-wider uppercase border-3 border-[#141414] shadow-brutal-lg transition-all btn-tactile hover:-translate-y-0.5"
              >
                <span>Order Now</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </Link>

              <button
                type="button"
                onClick={() => setSpinnerOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#FFB300] hover:bg-[#FFA000] text-[#141414] font-display text-base tracking-wider uppercase border-3 border-[#141414] shadow-brutal transition-all btn-tactile"
              >
                <Dices className="w-5 h-5 stroke-[2.5]" />
                <span>Spin for Craving 🎲</span>
              </button>
            </div>

            {/* Social Proof & Rating Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-bold text-stone-700">
              <div className="flex items-center gap-2 p-2 bg-white rounded-xl border-2 border-[#141414] shadow-brutal-sm">
                <div className="flex text-[#FFB300]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFB300] text-[#FFB300]" />
                  ))}
                </div>
                <span>4.9 / 5 Rating</span>
              </div>

              <div className="flex items-center gap-2 p-2 bg-white rounded-xl border-2 border-[#141414] shadow-brutal-sm">
                <Sparkles className="w-4 h-4 text-[#FF5722]" />
                <span>10,000+ Smashed Burgers Sizzled</span>
              </div>
            </div>
          </div>

          {/* Right Visual Collage Showcase (5 cols) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Background Pop Shapes */}
            <div className="absolute -top-6 -right-6 w-full h-full rounded-3xl bg-[#FFB300] border-3 border-[#141414] -z-0"></div>

            {/* Featured Showcase Card */}
            <div className="relative z-10 bg-white border-3 border-[#141414] rounded-3xl p-5 shadow-brutal-lg overflow-hidden space-y-4">
              {/* Image Frame with Badges */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#141414] bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
                  alt="Classic Smash Deluxe"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />

                {/* Sticker Badge top-left */}
                <div className="absolute top-3 left-3 bg-[#FF5722] text-white font-display text-xs uppercase px-3 py-1 rounded-xl border-2 border-[#141414] shadow-brutal-sm flex items-center gap-1 -rotate-3">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  #1 Smashed Icon
                </div>

                {/* Price tag bottom-right */}
                <div className="absolute bottom-3 right-3 bg-[#141414] text-white font-display text-base px-3 py-1 rounded-xl border-2 border-white shadow-md">
                  $8.50
                </div>
              </div>

              {/* Title & Flavor Tags */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl text-[#141414] uppercase tracking-wide">
                    Classic Smash
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#E8F5E9] text-[#009624] border border-[#141414] font-black text-xs uppercase">
                    Double Angus
                  </span>
                </div>
                <p className="text-xs text-stone-600 font-medium line-clamp-2">
                  Double smashed beef patties, gooey American cheese, house secret sauce, and dill pickles on toasted brioche.
                </p>
              </div>

              {/* Bottom Quick-Action */}
              <button
                type="button"
                onClick={() => setCustomizingItem(heroFeaturedDish)}
                className="w-full py-3 px-4 rounded-xl bg-[#FAF6EE] hover:bg-[#FFB300] text-[#141414] font-display text-sm tracking-wider uppercase border-2 border-[#141414] shadow-brutal-sm transition-all flex items-center justify-center gap-2 btn-tactile"
              >
                <span>Customize & Order Smashed</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Crave Spinner Roulette Modal */}
      <CraveSpinnerModal
        isOpen={spinnerOpen}
        onClose={() => setSpinnerOpen(false)}
        onSelectDish={(item) => setCustomizingItem(item)}
      />

      {/* Item Customizer Modal */}
      <ItemModal
        item={customizingItem}
        isOpen={Boolean(customizingItem)}
        onClose={() => setCustomizingItem(null)}
      />
    </section>
  );
};
