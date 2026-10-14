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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <div className="min-h-full flex items-center justify-center p-4 text-center sm:p-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform w-full max-w-lg my-8 border border-savory-border"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-savory-charcoal flex items-center justify-center shadow-md backdrop-blur-md transition-all duration-150"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Item Image Banner */}
              <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {item.isFavorite && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-savory-orange text-white flex items-center gap-1 shadow-sm">
                          <Sparkles className="w-3 h-3" /> Fan Favorite
                        </span>
                      )}
                      {item.isSpicy && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500 text-white flex items-center gap-1 shadow-sm">
                          <Flame className="w-3 h-3" /> Spicy
                        </span>
                      )}
                      {item.isVegetarian && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-savory-green text-white flex items-center gap-1 shadow-sm">
                          <Leaf className="w-3 h-3" /> Vegetarian
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-extrabold tracking-tight drop-shadow-sm">
                      {item.name}
                    </h3>
                  </div>
                  <div className="text-xl font-black bg-savory-charcoal/90 px-3 py-1 rounded-xl backdrop-blur-sm border border-white/20">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Description & Calories */}
                <div>
                  <p className="text-sm text-stone-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                  <div className="mt-2 text-xs text-savory-muted font-semibold flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-savory-cream text-stone-700">
                      {item.calories} Calories
                    </span>
                    <span>•</span>
                    <span>Freshly prepared</span>
                  </div>
                </div>

                {/* Sizes Selection (if available) */}
                {item.options?.sizes && item.options.sizes.length > 0 && (
                  <div className="space-y-3 pt-3 border-t border-stone-100">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-savory-charcoal">
                        Choose Size / Portion
                      </label>
                      <span className="text-[11px] uppercase tracking-wider font-bold text-savory-orange bg-savory-orange-light px-2 py-0.5 rounded">
                        Required
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {item.options.sizes.map((sz, idx) => {
                        const isSelected = selectedSize === sz.name;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSizeChange(sz.name, sz.priceDelta || 0)}
                            className={`flex items-center justify-between px-4 py-3 rounded-2xl border text-sm font-semibold transition-all ${
                              isSelected
                                ? 'border-savory-orange bg-savory-orange-light/50 text-savory-orange shadow-sm'
                                : 'border-stone-200 hover:border-stone-300 text-stone-700'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isSelected ? 'border-savory-orange bg-savory-orange' : 'border-stone-300'
                                }`}
                              >
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <span>{sz.name}</span>
                            </div>
                            <span className="text-xs font-bold text-stone-600">
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
                  <div className="space-y-3 pt-3 border-t border-stone-100">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-savory-charcoal">
                        Add Tasty Extras
                      </label>
                      <span className="text-[11px] font-medium text-savory-muted">
                        Optional
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {item.options.extras.map((extra, idx) => {
                        const isChecked = selectedExtras.some((e) => e.name === extra.name);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => toggleExtra(extra)}
                            className={`flex items-center justify-between px-4 py-3 rounded-2xl border text-sm font-semibold transition-all ${
                              isChecked
                                ? 'border-savory-green bg-savory-green-light text-stone-900 shadow-sm'
                                : 'border-stone-200 hover:border-stone-300 text-stone-700'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                                  isChecked
                                    ? 'bg-savory-green border-savory-green text-white'
                                    : 'border-stone-300 bg-white'
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <span>{extra.name}</span>
                            </div>
                            <span className="text-xs font-bold text-stone-600">
                              +${(extra.price || 0).toFixed(2)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Special Instructions */}
                <div className="space-y-2 pt-3 border-t border-stone-100">
                  <label className="text-sm font-bold text-savory-charcoal">
                    Special Requests
                  </label>
                  <textarea
                    rows={2}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Extra napkins, sauce on side, allergy notes..."
                    className="w-full text-sm p-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-savory-orange/40 focus:border-savory-orange resize-none placeholder:text-stone-400"
                  />
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200/80 flex items-center gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center bg-white border border-stone-200 rounded-2xl p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-stone-700 hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-extrabold text-base text-savory-charcoal">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Submit Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-savory-orange hover:bg-savory-orange-hover text-white font-extrabold text-sm sm:text-base shadow-orange flex items-center justify-between transition-all transform active:scale-[0.98]"
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
