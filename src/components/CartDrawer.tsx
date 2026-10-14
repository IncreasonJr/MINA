import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Bike } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CouponInput } from './CouponInput';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    items,
    updateQuantity,
    removeItem,
    subtotal,
    deliveryFee,
    discount,
    total,
    appliedCoupon,
    standardDeliveryFee,
  } = useCart();

  const navigate = useNavigate();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const isFreeDelivery = appliedCoupon?.type === 'free_delivery';

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-stone-200/80 flex items-center justify-between bg-savory-cream/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-savory-orange/15 text-savory-orange flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-savory-charcoal">
                      Your Savory Bag
                    </h2>
                    <p className="text-xs text-savory-muted">
                      {items.length === 0
                        ? 'Bag is empty'
                        : `${items.reduce((s, i) => s + i.quantity, 0)} items added`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List / Empty State */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-3xl bg-savory-cream flex items-center justify-center text-stone-400 border border-savory-border">
                      <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg text-savory-charcoal">
                        Your bag is empty
                      </h3>
                      <p className="text-xs text-stone-500 max-w-xs">
                        Hungry? Discover our handcrafted smash burgers, sides, and thick shakes.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/menu');
                      }}
                      className="mt-2 px-6 py-3 rounded-2xl bg-savory-orange text-white text-xs font-bold uppercase tracking-wider shadow-orange-sm hover:bg-savory-orange-hover transition-colors"
                    >
                      Explore Menu
                    </button>
                  </div>
                ) : (
                  items.map((cartItem) => (
                    <div
                      key={cartItem.cartId}
                      className="p-3.5 rounded-2xl border border-stone-100 bg-white hover:border-savory-border shadow-soft flex gap-3 transition-colors"
                    >
                      {/* Item Thumbnail */}
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0"
                      />

                      {/* Item Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-sm text-savory-charcoal truncate">
                              {cartItem.item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(cartItem.cartId)}
                              className="text-stone-300 hover:text-red-500 p-0.5 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Customization Details */}
                          {cartItem.selectedSize && (
                            <p className="text-[11px] text-stone-500 mt-0.5">
                              Size: <span className="font-medium text-stone-700">{cartItem.selectedSize}</span>
                            </p>
                          )}
                          {cartItem.selectedExtras.length > 0 && (
                            <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                              Extras:{' '}
                              <span className="font-medium text-stone-700">
                                {cartItem.selectedExtras.map((e) => e.name).join(', ')}
                              </span>
                            </p>
                          )}
                          {cartItem.specialInstructions && (
                            <p className="text-[10px] italic text-stone-400 line-clamp-1 mt-0.5">
                              "{cartItem.specialInstructions}"
                            </p>
                          )}
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between pt-2 mt-1 border-t border-stone-100">
                          <div className="flex items-center bg-stone-50 border border-stone-200 rounded-xl p-0.5">
                            <button
                              onClick={() => updateQuantity(cartItem.cartId, -1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-bold text-xs text-savory-charcoal">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(cartItem.cartId, 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-extrabold text-sm text-savory-charcoal">
                            ${cartItem.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom Checkout & Summary Footer (When items exist) */}
              {items.length > 0 && (
                <div className="p-5 border-t border-stone-200 bg-stone-50/80 space-y-4">
                  {/* Coupon section */}
                  <CouponInput />

                  {/* Calculations */}
                  <div className="space-y-2 pt-2 text-xs sm:text-sm text-stone-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-savory-charcoal">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Delivery Fee */}
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5">
                        <Bike className="w-3.5 h-3.5 text-stone-400" />
                        <span>Delivery Fee</span>
                      </span>
                      {isFreeDelivery ? (
                        <div className="flex items-center gap-1.5">
                          <span className="line-through text-stone-400">
                            ${standardDeliveryFee.toFixed(2)}
                          </span>
                          <span className="font-bold text-savory-green">
                            FREE
                          </span>
                        </div>
                      ) : (
                        <span className="font-semibold text-savory-charcoal">
                          ${deliveryFee.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Discount (if applicable) */}
                    {discount > 0 && (
                      <div className="flex justify-between items-center text-savory-green font-bold">
                        <span>Discount ({appliedCoupon?.code})</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-stone-200 flex justify-between items-center">
                      <span className="text-base font-extrabold text-savory-charcoal">
                        Total
                      </span>
                      <span className="text-xl font-black text-savory-orange">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 px-6 rounded-2xl bg-savory-orange hover:bg-savory-orange-hover text-white font-extrabold text-sm sm:text-base shadow-orange flex items-center justify-between transition-all transform active:scale-[0.98]"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
