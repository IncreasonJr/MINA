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
    <div className="space-y-3">
      {/* If coupon is already applied: Rubber-stamp badge effect */}
      {appliedCoupon ? (
        <div className="relative p-3.5 rounded-2xl bg-[#E8F5E9] border-2 border-[#141414] shadow-brutal-sm text-[#141414] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#00C853] text-white border-2 border-[#141414] flex items-center justify-center font-black">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-sm tracking-wider uppercase text-[#009624]">
                  {appliedCoupon.code}
                </span>
                <span className="text-[10px] font-black uppercase bg-[#00C853] text-white px-2 py-0.5 rounded-md border border-[#141414]">
                  {appliedCoupon.type === 'free_delivery'
                    ? 'Free Delivery'
                    : '10% Discount'}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 font-bold mt-0.5">{appliedCoupon.label}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={removeCoupon}
            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-stone-100 rounded-lg transition-colors"
            title="Remove coupon"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      ) : (
        /* Coupon input form */
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="PROMO CODE (e.g. FREEDEL)"
                className="w-full pl-9 pr-3 py-2.5 bg-white border-2 border-[#141414] rounded-xl text-xs sm:text-sm font-display uppercase tracking-wider placeholder:normal-case placeholder:font-sans placeholder:font-medium placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#FF5722] shadow-brutal-sm"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#FF5722] hover:bg-[#E64A19] text-white font-display text-xs uppercase tracking-wider rounded-xl border-2 border-[#141414] shadow-brutal-sm btn-tactile"
            >
              Apply
            </button>
          </div>

          {/* Quick coupon buttons */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-600 pt-0.5">
            <span>Tap to apply:</span>
            <button
              type="button"
              onClick={() => handleQuickApply('FREEDEL')}
              className="px-2 py-0.5 rounded-md bg-[#FAF6EE] hover:bg-[#FFB300] font-black text-[#141414] border border-[#141414] shadow-xs transition-colors"
            >
              FREEDEL
            </button>
            <button
              type="button"
              onClick={() => handleQuickApply('SAVE10')}
              className="px-2 py-0.5 rounded-md bg-[#FAF6EE] hover:bg-[#FFB300] font-black text-[#141414] border border-[#141414] shadow-xs transition-colors"
            >
              SAVE10
            </button>
          </div>
        </form>
      )}

      {/* Error message */}
      {couponError && (
        <div className="flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border-2 border-red-300">
          <AlertCircle className="w-4 h-4 flex-shrink-0 stroke-[2.5]" />
          <span>{couponError}</span>
        </div>
      )}
    </div>
  );
};
