import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Utensils, ShoppingBag, Menu as MenuIcon, X, Dices } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CraveSpinnerModal } from './CraveSpinnerModal';
import { ItemModal } from './ItemModal';
import { MenuItem } from '../data/menuItems';

export const Header: React.FC = () => {
  const { itemCount, setIsCartOpen, cartBounce } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [spinnerOpen, setSpinnerOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Infinite Live Griddle Marquee Ticker */}
      <div className="bg-[#141414] text-white border-b-2 border-[#141414] overflow-hidden py-1.5 text-xs font-black tracking-widest uppercase select-none">
        <div className="animate-marquee flex gap-8 whitespace-nowrap">
          <span>🔥 FLAT-TOP GRIDDLE SIZZLING AT 450°F</span>
          <span>•</span>
          <span className="text-[#FFB300]">⚡ KITCHEN IS CRUSHING IT: ORDERS FLYING IN 30 MIN</span>
          <span>•</span>
          <span>🍔 100% PASTURE ANGUS BEEF — SMASHED FRESH DAILY</span>
          <span>•</span>
          <span className="text-[#00C853]">🎟️ USE CODE 'FREEDEL' FOR FREE DELIVERY</span>
          <span>•</span>
          <span>🥤 THICK REAL DAIRY MALTS & HAND-SPUN SHAKES</span>
          <span>•</span>
          <span className="text-[#FF5722]">💥 PROMO: USE 'SAVE10' FOR 10% OFF SUBTOTAL</span>
          <span>•</span>
          {/* Duplicate for seamless infinite loop */}
          <span>🔥 FLAT-TOP GRIDDLE SIZZLING AT 450°F</span>
          <span>•</span>
          <span className="text-[#FFB300]">⚡ KITCHEN IS CRUSHING IT: ORDERS FLYING IN 30 MIN</span>
          <span>•</span>
          <span>🍔 100% PASTURE ANGUS BEEF — SMASHED FRESH DAILY</span>
          <span>•</span>
          <span className="text-[#00C853]">🎟️ USE CODE 'FREEDEL' FOR FREE DELIVERY</span>
          <span>•</span>
          <span>🥤 THICK REAL DAIRY MALTS & HAND-SPUN SHAKES</span>
          <span>•</span>
          <span className="text-[#FF5722]">💥 PROMO: USE 'SAVE10' FOR 10% OFF SUBTOTAL</span>
          <span>•</span>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FAF6EE] border-b-3 border-[#141414] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo: Retro Pop Diner Badge */}
            <Link
              to="/"
              className="flex items-center gap-3 group cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FF5722] border-3 border-[#141414] text-white flex items-center justify-center shadow-brutal group-hover:rotate-6 transition-transform duration-200">
                <Utensils className="w-6 h-6 stroke-[3]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-3xl tracking-wide text-[#141414]">
                    SAVORY
                  </span>
                  <span className="w-3 h-3 rounded-full bg-[#00C853] border-2 border-[#141414] animate-pulse" title="Grill is open & hot"></span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5722] -mt-1 font-sans">
                  SMASH & SIZZLE DINER
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-3">
              <Link
                to="/"
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-[#141414] transition-all btn-tactile ${
                  isActive('/')
                    ? 'bg-[#FF5722] text-white shadow-brutal'
                    : 'bg-white text-[#141414] shadow-brutal-sm hover:bg-[#FAF6EE]'
                }`}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-[#141414] transition-all btn-tactile flex items-center gap-1.5 ${
                  isActive('/menu')
                    ? 'bg-[#FF5722] text-white shadow-brutal'
                    : 'bg-white text-[#141414] shadow-brutal-sm hover:bg-[#FAF6EE]'
                }`}
              >
                <span>Full Menu</span>
                <span className="px-1.5 py-0.2 rounded-md bg-[#FFB300] text-[#141414] text-[10px] font-black border border-[#141414]">
                  HOT
                </span>
              </Link>

              {/* Surprise Me 🎲 button */}
              <button
                type="button"
                onClick={() => setSpinnerOpen(true)}
                className="px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-[#141414] bg-[#FFB300] hover:bg-[#FFA000] text-[#141414] shadow-brutal-sm transition-all btn-tactile flex items-center gap-1.5"
                title="Can't decide? Roll the food roulette!"
              >
                <Dices className="w-4 h-4 stroke-[2.5]" />
                <span>Surprise Me</span>
              </button>
            </nav>

            {/* Right Actions: Cart & Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Cart Trigger Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="View Shopping Cart"
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#141414] text-white border-3 border-[#141414] shadow-brutal hover:bg-black transition-all btn-tactile active:scale-95 ${
                  cartBounce ? 'ring-4 ring-[#FF5722] animate-bounce' : ''
                }`}
              >
                <ShoppingBag className="w-5 h-5 text-[#FFB300]" />
                <span className="hidden sm:inline font-display text-sm tracking-wider uppercase">
                  Order Bag
                </span>
                {itemCount > 0 && (
                  <span className="bg-[#FF5722] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-2xl bg-white border-2 border-[#141414] shadow-brutal-sm text-[#141414] btn-tactile"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 stroke-[2.5]" /> : <MenuIcon className="w-6 h-6 stroke-[2.5]" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t-3 border-[#141414] py-5 px-3 space-y-3 bg-[#FAF6EE] animate-in slide-in-from-top-4 duration-200">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-2xl font-black uppercase tracking-wider text-sm border-2 border-[#141414] shadow-brutal-sm ${
                  isActive('/')
                    ? 'bg-[#FF5722] text-white'
                    : 'bg-white text-[#141414]'
                }`}
              >
                Home
              </Link>
              <Link
                to="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-2xl font-black uppercase tracking-wider text-sm border-2 border-[#141414] shadow-brutal-sm ${
                  isActive('/menu')
                    ? 'bg-[#FF5722] text-white'
                    : 'bg-white text-[#141414]'
                }`}
              >
                Full Menu
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSpinnerOpen(true);
                }}
                className="w-full py-3 px-4 rounded-2xl font-black uppercase tracking-wider text-sm border-2 border-[#141414] bg-[#FFB300] text-[#141414] shadow-brutal-sm flex items-center justify-center gap-2"
              >
                <Dices className="w-4 h-4" />
                <span>Surprise Me 🎲 (Random Craving)</span>
              </button>
            </div>
          )}
        </div>
      </header>

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
    </>
  );
};
