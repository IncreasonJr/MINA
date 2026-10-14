import React, { useState } from 'react';
import { Tag, Check, X, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CouponInput: React.FC = () => {
  const { appliedCoupon, couponError, applyCoupon, removeCoupon } = useCart();
  const [inputCode, setInputCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(inputCode)) {
      setInputCode('');
    }
  };

  const handleQuickApply = (code: string) => {
    applyCoupon(code);
    setInputCode('');
  };

  return (
    <div className="space-y-2.5">
      {/* If coupon is already applied */}
      {appliedCoupon ? (
        <div className="flex items-center justify-between p-3 rounded-2xl bg-savory-green-light border border-savory-green/30 text-stone-900 animate-in fade-in zoom-in-95">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-savory-green text-white flex items-center justify-center">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs uppercase tracking-wider bg-savory-green/20 text-savory-green-dark px-2 py-0.5 rounded-md">
                  {appliedCoupon.code}
                </span>
                <span className="text-xs font-bold text-savory-green-dark">
                  {appliedCoupon.type === 'free_delivery'
                    ? 'Free Delivery Applied'
                    : '10% Off Applied'}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5">{appliedCoupon.label}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={removeCoupon}
            className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg hover:bg-stone-100 transition-colors"
            title="Remove coupon"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Coupon form */
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="Enter promo code (e.g. FREEDEL)"
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold uppercase placeholder:normal-case placeholder:font-normal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-savory-orange/40 focus:border-savory-orange"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-savory-charcoal hover:bg-black text-white text-xs font-bold rounded-xl transition-colors shadow-sm active:scale-95"
            >
              Apply
            </button>
          </div>

          {/* Quick promo code suggestions pills */}
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 pt-0.5">
            <span>Try:</span>
            <button
              type="button"
              onClick={() => handleQuickApply('FREEDEL')}
              className="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-savory-orange-light hover:text-savory-orange font-bold text-stone-700 transition-colors border border-stone-200"
            >
              FREEDEL
            </button>
            <button
              type="button"
              onClick={() => handleQuickApply('SAVE10')}
              className="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-savory-orange-light hover:text-savory-orange font-bold text-stone-700 transition-colors border border-stone-200"
            >
              SAVE10
            </button>
          </div>
        </form>
      )}

      {/* Error message */}
      {couponError && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded-xl border border-red-200 animate-in fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{couponError}</span>
        </div>
      )}
    </div>
  );
};
