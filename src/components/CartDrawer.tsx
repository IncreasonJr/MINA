import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Bike, Receipt } from 'lucide-react';
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
            className="fixed inset-0 bg-[#141414]/70 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel Styled as Diner Guest Check Ticket */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#FAF6EE] border-l-4 border-[#141414] shadow-brutal-xl flex flex-col overflow-hidden"
            >
              {/* Header: Vintage Diner Guest Check Header */}
              <div className="p-5 border-b-3 border-[#141414] bg-[#FFB300] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white border-2 border-[#141414] shadow-brutal-sm text-[#141414] flex items-center justify-center">
                    <Receipt className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl tracking-wider text-[#141414] uppercase">
                      Savory Guest Check
                    </h2>
                    <p className="text-[11px] font-black uppercase tracking-widest text-[#141414]/80">
                      {items.length === 0
                        ? 'Ticket #0000 • Empty'
                        : `Ticket #0042 • ${items.reduce((s, i) => s + i.quantity, 0)} Items`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-9 h-9 rounded-xl bg-white border-2 border-[#141414] shadow-brutal-sm text-[#141414] hover:bg-[#FF5722] hover:text-white flex items-center justify-center transition-colors btn-tactile"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Items List / Empty State */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-3xl bg-white border-3 border-[#141414] shadow-brutal flex items-center justify-center text-stone-400">
                      <ShoppingBag className="w-10 h-10 stroke-[2]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-display text-2xl text-[#141414] uppercase">
                        Ticket is Empty!
                      </h3>
                      <p className="text-xs text-stone-600 font-bold max-w-xs">
                        No burgers on the flat-top yet. Tap into our menu and satisfy your craving.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/menu');
                      }}
                      className="mt-2 px-6 py-3 rounded-2xl bg-[#FF5722] text-white font-display text-xs uppercase tracking-wider border-2 border-[#141414] shadow-brutal hover:bg-[#E64A19] transition-all btn-tactile"
                    >
                      Explore Menu
                    </button>
                  </div>
                ) : (
                  items.map((cartItem) => (
                    <div
                      key={cartItem.cartId}
                      className="p-4 rounded-2xl border-2 border-[#141414] bg-white shadow-brutal flex gap-3.5 transition-all"
                    >
                      {/* Item Thumbnail */}
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-20 h-20 rounded-xl object-cover border-2 border-[#141414] flex-shrink-0"
                      />

                      {/* Item Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-display text-base text-[#141414] uppercase truncate tracking-wide">
                              {cartItem.item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(cartItem.cartId)}
                              className="text-stone-400 hover:text-red-600 p-0.5 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Customization Details */}
                          {cartItem.selectedSize && (
                            <p className="text-[11px] font-bold text-stone-600 mt-0.5">
                              Size: <span className="text-[#FF5722]">{cartItem.selectedSize}</span>
                            </p>
                          )}
                          {cartItem.selectedExtras.length > 0 && (
                            <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5 font-medium">
                              +{cartItem.selectedExtras.map((e) => e.name).join(', ')}
                            </p>
                          )}
                          {cartItem.specialInstructions && (
                            <p className="text-[10px] italic text-stone-500 line-clamp-1 mt-0.5">
                              "{cartItem.specialInstructions}"
                            </p>
                          )}
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between pt-2 mt-1 border-t-2 border-dashed border-stone-200">
                          <div className="flex items-center bg-[#FAF6EE] border-2 border-[#141414] rounded-xl p-0.5 shadow-brutal-sm">
                            <button
                              onClick={() => updateQuantity(cartItem.cartId, -1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#141414] hover:bg-[#FFB300] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3 stroke-[3]" />
                            </button>
                            <span className="w-7 text-center font-display text-xs text-[#141414]">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(cartItem.cartId, 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#141414] hover:bg-[#FFB300] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3 stroke-[3]" />
                            </button>
                          </div>

                          <span className="font-display text-base text-[#141414]">
                            ${cartItem.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom Diner Ticket Calculations & Checkout */}
              {items.length > 0 && (
                <div className="p-5 border-t-3 border-[#141414] bg-white space-y-4">
                  {/* Coupon section */}
                  <CouponInput />

                  {/* Calculations */}
                  <div className="space-y-2 pt-2 text-xs sm:text-sm font-bold text-stone-700">
                    <div className="flex justify-between">
                      <span className="uppercase tracking-wide">Subtotal</span>
                      <span className="font-display text-base text-[#141414]">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Delivery Fee */}
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5 uppercase tracking-wide">
                        <Bike className="w-4 h-4 text-[#FF5722]" />
                        <span>Delivery Fee</span>
                      </span>
                      {isFreeDelivery ? (
                        <div className="flex items-center gap-1.5">
                          <span className="line-through text-stone-400">
                            ${standardDeliveryFee.toFixed(2)}
                          </span>
                          <span className="font-black text-[#00C853] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#00C853]">
                            FREE
                          </span>
                        </div>
                      ) : (
                        <span className="font-display text-base text-[#141414]">
                          ${deliveryFee.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Discount (if applicable) */}
                    {discount > 0 && (
                      <div className="flex justify-between items-center text-[#00C853] font-black">
                        <span>PROMO DISCOUNT ({appliedCoupon?.code})</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="pt-3 border-t-3 border-[#141414] flex justify-between items-center">
                      <span className="font-display text-lg uppercase tracking-wider text-[#141414]">
                        Total Due
                      </span>
                      <span className="font-display text-2xl text-[#FF5722]">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 px-6 rounded-2xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-display text-base tracking-wider uppercase border-3 border-[#141414] shadow-brutal flex items-center justify-between transition-all btn-tactile"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-5 h-5 stroke-[3]" />
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
