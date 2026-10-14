import React from 'react';
import { Tag } from 'lucide-react';
import { MenuGrid } from '../components/MenuGrid';
import { StickyOrderButton } from '../components/StickyOrderButton';
import { useCart } from '../context/CartContext';

export const Menu: React.FC = () => {
  const { applyCoupon, appliedCoupon } = useCart();

  return (
    <div className="min-h-screen bg-savory-cream pb-24">
      {/* Page Title & Promo Bar */}
      <section className="bg-white border-b border-savory-border/70 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-savory-orange bg-savory-orange-light px-3 py-1 rounded-full">
              Made Fresh Daily
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-savory-charcoal mt-3 tracking-tight">
              Our Crave-Worthy Menu
            </h1>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Every burger is smashed with precision, sides fried crispy to golden perfection, and shakes spun thick. Choose your favorites and customize every bite.
            </p>
          </div>

          {/* Promotional Banner with Click-to-Apply */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-savory-orange/10 via-amber-50 to-savory-orange/5 border border-savory-orange/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-savory-orange text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Tag className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm text-stone-800">
                <span className="font-extrabold text-savory-charcoal">
                  Today's Promo Codes:
                </span>{' '}
                Use <strong className="text-savory-orange font-bold">FREEDEL</strong> for Free Delivery or{' '}
                <strong className="text-savory-orange font-bold">SAVE10</strong> for 10% off subtotal.
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => applyCoupon('FREEDEL')}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                  appliedCoupon?.code === 'FREEDEL'
                    ? 'bg-savory-green text-white border-savory-green'
                    : 'bg-white hover:bg-savory-orange hover:text-white text-stone-700 border-stone-200'
                }`}
              >
                {appliedCoupon?.code === 'FREEDEL' ? 'FREEDEL Applied ✓' : 'Apply FREEDEL'}
              </button>
              <button
                onClick={() => applyCoupon('SAVE10')}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                  appliedCoupon?.code === 'SAVE10'
                    ? 'bg-savory-green text-white border-savory-green'
                    : 'bg-white hover:bg-savory-orange hover:text-white text-stone-700 border-stone-200'
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
