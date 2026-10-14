import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Utensils, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const StickyOrderButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { itemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      // Show button once scrolled past 250px
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Do not show sticky button on checkout or confirmation pages
  if (location.pathname === '/checkout' || location.pathname === '/confirmation') {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 260 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-1.5 bg-savory-charcoal/95 backdrop-blur-md rounded-full shadow-2xl border border-stone-800"
        >
          {location.pathname !== '/menu' ? (
            <Link
              to="/menu"
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-savory-orange text-white font-extrabold text-sm shadow-orange hover:bg-savory-orange-hover transition-colors"
            >
              <Utensils className="w-4 h-4" />
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          ) : (
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-savory-orange text-white font-extrabold text-sm shadow-orange hover:bg-savory-orange-hover transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Bag ({itemCount})</span>
            </button>
          )}

          {itemCount > 0 && location.pathname !== '/menu' && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-3 rounded-full bg-stone-800 hover:bg-stone-700 text-white transition-colors relative"
              aria-label="View bag"
            >
              <ShoppingBag className="w-4 h-4 text-savory-orange" />
              <span className="absolute -top-1 -right-1 bg-savory-orange text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
