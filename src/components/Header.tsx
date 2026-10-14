import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Utensils, ShoppingBag, Menu as MenuIcon, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const { itemCount, setIsCartOpen, cartBounce } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-savory-cream/90 backdrop-blur-md border-b border-savory-border/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-11 h-11 rounded-2xl bg-savory-orange text-white flex items-center justify-center shadow-orange-sm group-hover:scale-105 transition-transform duration-200">
              <Utensils className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight text-savory-charcoal flex items-center gap-1">
                Savory
                <span className="w-2 h-2 rounded-full bg-savory-orange inline-block"></span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-savory-muted -mt-1">
                Crafted to Crave
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-semibold tracking-wide transition-colors ${
                isActive('/')
                  ? 'text-savory-orange font-bold'
                  : 'text-savory-charcoal hover:text-savory-orange'
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`text-sm font-semibold tracking-wide transition-colors flex items-center gap-1.5 ${
                isActive('/menu')
                  ? 'text-savory-orange font-bold'
                  : 'text-savory-charcoal hover:text-savory-orange'
              }`}
            >
              Menu
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-savory-orange-light text-savory-orange">
                Fresh
              </span>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Menu Order Link for Desktop */}
            <Link
              to="/menu"
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-savory-orange bg-savory-orange-light hover:bg-savory-orange hover:text-white px-3.5 py-2 rounded-xl transition-all duration-200"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hot & Fast</span>
            </Link>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-savory-charcoal text-white hover:bg-black transition-all duration-200 shadow-soft active:scale-95 ${
                cartBounce ? 'animate-cart-bounce ring-4 ring-savory-orange/30' : ''
              }`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-savory-orange" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-savory-orange text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-savory-charcoal animate-in fade-in zoom-in">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                Cart
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-savory-charcoal hover:bg-stone-200/60 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-savory-border/70 py-4 px-2 space-y-2 bg-savory-cream/95 backdrop-blur-lg animate-in slide-in-from-top-4 duration-200">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                isActive('/')
                  ? 'bg-savory-orange text-white font-bold'
                  : 'text-savory-charcoal hover:bg-savory-orange-light hover:text-savory-orange'
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                isActive('/menu')
                  ? 'bg-savory-orange text-white font-bold'
                  : 'text-savory-charcoal hover:bg-savory-orange-light hover:text-savory-orange'
              }`}
            >
              Full Menu
            </Link>
            <div className="pt-2 px-2">
              <Link
                to="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-savory-orange text-white text-center font-bold rounded-xl flex items-center justify-center gap-2 shadow-orange-sm"
              >
                Order Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
