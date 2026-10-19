import React from 'react';
import { Tag, Flame } from 'lucide-react';
import { MenuGrid } from '../components/MenuGrid';
import { StickyOrderButton } from '../components/StickyOrderButton';
import { useCart } from '../context/CartContext';

export const Menu: React.FC = () => {
  const { applyCoupon, appliedCoupon } = useCart();

  return (
    <div className="min-h-screen bg-[#FAF6EE] pb-24">
      {/* Page Title & Promo Bar */}
      <section className="bg-white border-b-3 border-[#141414] py-12 sm:py-16 bg-retro-dots">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FF5722] text-white border-2 border-[#141414] shadow-brutal-sm font-display text-xs uppercase tracking-widest mb-3">
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>Flat-Top Fresh Everyday</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl text-[#141414] tracking-tight uppercase">
              The Sizzle Menu
            </h1>
            <p className="mt-3 text-stone-700 text-sm sm:text-base font-bold leading-relaxed">
              Every burger is smashed with precision, sides fried crispy to golden perfection, and shakes spun thick. Choose your favorites and customize every bite.
            </p>
          </div>

          {/* Promotional Banner with Click-to-Apply */}
          <div className="mt-8 p-5 rounded-3xl bg-[#FAF6EE] border-3 border-[#141414] shadow-brutal flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FFB300] border-2 border-[#141414] text-[#141414] flex items-center justify-center flex-shrink-0 shadow-brutal-sm">
                <Tag className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="text-xs sm:text-sm text-stone-900 font-bold">
                <span className="font-display uppercase text-sm tracking-wide text-[#141414] block sm:inline mr-2">
                  Today's Promo Perks:
                </span>
                Use <strong className="text-[#FF5722] font-black underline">FREEDEL</strong> for Free Delivery or{' '}
                <strong className="text-[#FF5722] font-black underline">SAVE10</strong> for 10% off subtotal.
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0">
              <button
                onClick={() => applyCoupon('FREEDEL')}
                className={`text-xs font-display uppercase tracking-wider px-4 py-2.5 rounded-xl border-2 border-[#141414] transition-all btn-tactile ${
                  appliedCoupon?.code === 'FREEDEL'
                    ? 'bg-[#00C853] text-white shadow-brutal-sm'
                    : 'bg-white hover:bg-[#FFB300] text-[#141414] shadow-brutal-sm'
                }`}
              >
                {appliedCoupon?.code === 'FREEDEL' ? 'FREEDEL Applied ✓' : 'Apply FREEDEL'}
              </button>
              <button
                onClick={() => applyCoupon('SAVE10')}
                className={`text-xs font-display uppercase tracking-wider px-4 py-2.5 rounded-xl border-2 border-[#141414] transition-all btn-tactile ${
                  appliedCoupon?.code === 'SAVE10'
                    ? 'bg-[#00C853] text-white shadow-brutal-sm'
                    : 'bg-white hover:bg-[#FFB300] text-[#141414] shadow-brutal-sm'
                }`}
              >
                {appliedCoupon?.code === 'SAVE10' ? 'SAVE10 Applied ✓' : 'Apply SAVE10'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Menu Grid Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <MenuGrid initialCategory="all" />
      </main>

      {/* Floating Action Button */}
      <StickyOrderButton />
    </div>
  );
};
