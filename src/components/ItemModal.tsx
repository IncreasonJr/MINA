import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Flame, Leaf, Sparkles, Check } from 'lucide-react';
import { MenuItem } from '../data/menuItems';
import { useCart } from '../context/CartContext';

interface ItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, isOpen, onClose }) => {
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [sizePriceDelta, setSizePriceDelta] = useState<number>(0);
  const [selectedExtras, setSelectedExtras] = useState<{ name: string; price: number }[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Reset state when opening a new item
  useEffect(() => {
    if (item) {
      if (item.options?.sizes && item.options.sizes.length > 0) {
        setSelectedSize(item.options.sizes[0].name);
        setSizePriceDelta(item.options.sizes[0].priceDelta || 0);
      } else {
        setSelectedSize('');
        setSizePriceDelta(0);
      }
      setSelectedExtras([]);
      setSpecialInstructions('');
      setQuantity(1);
    }
  }, [item]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!item) return null;

  const handleSizeChange = (sizeName: string, delta: number = 0) => {
    setSelectedSize(sizeName);
    setSizePriceDelta(delta);
  };

  const toggleExtra = (extra: { name: string; price?: number }) => {
    const safePrice = extra.price || 0;
    setSelectedExtras((prev) => {
      const exists = prev.some((e) => e.name === extra.name);
      if (exists) {
        return prev.filter((e) => e.name !== extra.name);
      } else {
        return [...prev, { name: extra.name, price: safePrice }];
      }
    });
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = item.price + sizePriceDelta + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(
      item,
      {
        size: selectedSize || undefined,
        sizePriceDelta,
        extras: selectedExtras,
        specialInstructions: specialInstructions.trim() || undefined,
      },
      quantity
    );
    onClose();
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
            className="fixed inset-0 bg-[#141414]/75 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <div className="min-h-full flex items-center justify-center p-4 text-center sm:p-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-[#FAF6EE] rounded-3xl text-left overflow-hidden border-4 border-[#141414] shadow-brutal-xl transform w-full max-w-lg my-8"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-2xl bg-white border-2 border-[#141414] shadow-brutal-sm text-[#141414] hover:bg-[#FF5722] hover:text-white flex items-center justify-center transition-all duration-150 btn-tactile"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Item Image Banner */}
              <div className="relative h-64 w-full overflow-hidden bg-stone-100 border-b-3 border-[#141414]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      {item.isFavorite && (
                        <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase bg-[#FF5722] text-white border-2 border-[#141414] shadow-brutal-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Fan Favorite
                        </span>
                      )}
                      {item.isSpicy && (
                        <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase bg-[#FF1744] text-white border-2 border-[#141414] shadow-brutal-sm flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-white" /> Spicy Sizzle
                        </span>
                      )}
                      {item.isVegetarian && (
                        <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase bg-[#00C853] text-white border-2 border-[#141414] shadow-brutal-sm flex items-center gap-1">
                          <Leaf className="w-3 h-3" /> Veg
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide">
                      {item.name}
                    </h3>
                  </div>

                  <div className="font-display text-xl bg-[#FFB300] text-[#141414] px-3 py-1 rounded-xl border-2 border-[#141414] shadow-brutal-sm">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Customization Station Body */}
              <div className="p-6 space-y-6 max-h-[55vh] overflow-y-auto">
                {/* Description & Calories */}
                <div className="bg-white p-4 rounded-2xl border-2 border-[#141414] shadow-brutal-sm space-y-2">
                  <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-black text-stone-600">
                    <span className="px-2 py-0.5 rounded bg-[#FAF6EE] border border-stone-300">
                      {item.calories} Calories
                    </span>
                    <span>•</span>
                    <span className="text-[#FF5722]">Made Fresh To Order</span>
                  </div>
                </div>

                {/* Sizes Selection (if available) */}
                {item.options?.sizes && item.options.sizes.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="font-display text-sm uppercase text-[#141414] tracking-wider">
                        1. Choose Portion Size
                      </label>
                      <span className="text-[10px] uppercase font-black text-[#FF5722] bg-[#FFECE5] px-2 py-0.5 rounded border border-[#FF5722]">
                        Required
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {item.options.sizes.map((sz, idx) => {
                        const isSelected = selectedSize === sz.name;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSizeChange(sz.name, sz.priceDelta || 0)}
                            className={`flex items-center justify-between px-4 py-3 rounded-2xl border-2 border-[#141414] text-xs sm:text-sm font-bold transition-all btn-tactile ${
                              isSelected
                                ? 'bg-[#FF5722] text-white shadow-brutal'
                                : 'bg-white hover:bg-stone-50 text-[#141414] shadow-brutal-sm'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-4 h-4 rounded-full border-2 border-[#141414] flex items-center justify-center ${
                                  isSelected ? 'bg-white' : 'bg-transparent'
                                }`}
                              >
                                {isSelected && <div className="w-2 h-2 rounded-full bg-[#141414]" />}
                              </div>
                              <span className="font-display uppercase tracking-wide">{sz.name}</span>
                            </div>
                            <span className="font-sans font-black">
                              {sz.priceDelta && sz.priceDelta !== 0
                                ? `${sz.priceDelta > 0 ? '+' : ''}$${sz.priceDelta.toFixed(2)}`
                                : 'Standard'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Extras Selection (if available) */}
                {item.options?.extras && item.options.extras.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="font-display text-sm uppercase text-[#141414] tracking-wider">
                        2. Add Tasty Extras
                      </label>
                      <span className="text-[10px] uppercase font-black text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-300">
                        Optional
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {item.options.extras.map((extra, idx) => {
                        const isChecked = selectedExtras.some((e) => e.name === extra.name);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => toggleExtra(extra)}
                            className={`flex items-center justify-between px-4 py-3 rounded-2xl border-2 border-[#141414] text-xs sm:text-sm font-bold transition-all btn-tactile ${
                              isChecked
                                ? 'bg-[#00C853] text-white shadow-brutal'
                                : 'bg-white hover:bg-stone-50 text-[#141414] shadow-brutal-sm'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-5 h-5 rounded-lg border-2 border-[#141414] flex items-center justify-center ${
                                  isChecked ? 'bg-white text-[#141414]' : 'bg-white'
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <span className="font-medium">{extra.name}</span>
                            </div>
                            <span className="font-sans font-black">
                              +${(extra.price || 0).toFixed(2)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Special Instructions */}
                <div className="space-y-2 pt-2">
                  <label className="font-display text-sm uppercase text-[#141414] tracking-wider">
                    3. Flat-Top Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Extra napkins, sauce on side, allergy notes..."
                    className="w-full text-xs sm:text-sm p-3.5 rounded-2xl border-2 border-[#141414] bg-white shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722] resize-none placeholder:text-stone-400 font-medium"
                  />
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="p-4 sm:p-6 bg-white border-t-3 border-[#141414] flex items-center gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center bg-[#FAF6EE] border-2 border-[#141414] rounded-2xl p-1 shadow-brutal-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[#141414] hover:bg-[#FFB300] disabled:opacity-30 transition-colors btn-tactile"
                  >
                    <Minus className="w-4 h-4 stroke-[3]" />
                  </button>
                  <span className="w-10 text-center font-display text-base text-[#141414]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[#141414] hover:bg-[#FFB300] transition-colors btn-tactile"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>

                {/* Add to Cart Submit Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 rounded-2xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-display text-sm sm:text-base tracking-wider uppercase border-3 border-[#141414] shadow-brutal flex items-center justify-between transition-all btn-tactile"
                >
                  <span>Add to Order</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
