import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Dices, Plus, ArrowRight } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menuItems';
import { useCart } from '../context/CartContext';

interface CraveSpinnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDish: (item: MenuItem) => void;
}

export const CraveSpinnerModal: React.FC<CraveSpinnerModalProps> = ({
  isOpen,
  onClose,
  onSelectDish,
}) => {
  const { addToCart } = useCart();
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem>(MENU_ITEMS[0]);

  const spinTheWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    let counter = 0;
    const maxSpins = 18;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * MENU_ITEMS.length);
      setSelectedItem(MENU_ITEMS[randomIndex]);
      counter++;

      if (counter >= maxSpins) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 70);
  };

  useEffect(() => {
    if (isOpen) {
      spinTheWheel();
    }
  }, [isOpen]);

  const handleQuickAdd = () => {
    addToCart(selectedItem);
    onClose();
  };

  const handleCustomize = () => {
    onClose();
    onSelectDish(selectedItem);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#141414]/75 backdrop-blur-sm"
          />

          <div className="min-h-full flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotate: -3 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.85, opacity: 0, rotate: 3 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#FAF6EE] border-4 border-[#141414] rounded-3xl p-6 sm:p-8 shadow-brutal-xl overflow-hidden"
            >
              {/* Halftone / Diner decorative background */}
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#FFB300] rounded-full border-4 border-[#141414] pointer-events-none -z-0 opacity-40"></div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-2xl bg-white border-2 border-[#141414] shadow-brutal-sm flex items-center justify-center hover:bg-[#FF5722] hover:text-white transition-colors btn-tactile"
                aria-label="Close spinner"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div className="relative z-10 text-center space-y-4">
                {/* Header Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5722] text-white border-2 border-[#141414] text-xs font-black uppercase tracking-wider shadow-brutal-sm">
                  <Dices className="w-4 h-4 animate-spin" style={{ animationDuration: isSpinning ? '0.4s' : '4s' }} />
                  <span>The Crave Roulette</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-[#141414] tracking-tight uppercase">
                  Can't Decide? Let Fate Feed You!
                </h3>

                {/* Rotating Item Card Display */}
                <div className={`p-4 bg-white border-3 border-[#141414] rounded-2xl shadow-brutal transition-all ${
                  isSpinning ? 'scale-95 blur-[0.5px]' : 'scale-100'
                }`}>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#141414] mb-3 bg-stone-100">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-lg bg-[#FFB300] border-2 border-[#141414] text-[11px] font-black uppercase shadow-brutal-sm">
                      {selectedItem.category}
                    </div>
                    <div className="absolute bottom-2 right-2 px-3 py-1 rounded-lg bg-[#141414] text-white font-display text-sm">
                      ${selectedItem.price.toFixed(2)}
                    </div>
                  </div>

                  <h4 className="font-display text-xl text-[#141414]">
                    {selectedItem.name}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-1 font-medium">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={spinTheWheel}
                      disabled={isSpinning}
                      className="py-3 px-4 rounded-2xl bg-white border-3 border-[#141414] font-bold text-xs sm:text-sm text-[#141414] shadow-brutal flex items-center justify-center gap-1.5 hover:bg-[#FFB300] transition-colors btn-tactile disabled:opacity-60"
                    >
                      <Dices className="w-4 h-4" />
                      <span>{isSpinning ? 'Spinning...' : 'Spin Again!'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleQuickAdd}
                      disabled={isSpinning}
                      className="py-3 px-4 rounded-2xl bg-[#00C853] text-white border-3 border-[#141414] font-black text-xs sm:text-sm shadow-brutal flex items-center justify-center gap-1.5 hover:bg-[#009624] transition-colors btn-tactile disabled:opacity-60"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Order This!</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleCustomize}
                    disabled={isSpinning}
                    className="w-full py-2.5 text-xs font-bold text-stone-600 hover:text-[#FF5722] flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Customize portion & extras instead</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
