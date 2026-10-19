import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bike,
  Store,
  CreditCard,
  ShieldCheck,
  ArrowLeft,
  ShoppingBag,
  AlertCircle,
  Clock,
  MapPin,
  Lock,
  Receipt,
} from 'lucide-react';
import { useCart, CustomerDetails } from '../context/CartContext';
import { CouponInput } from '../components/CouponInput';

export const Checkout: React.FC = () => {
  const {
    items,
    subtotal,
    deliveryFee,
    discount,
    total,
    appliedCoupon,
    deliveryMode,
    setDeliveryMode,
    standardDeliveryFee,
    placeOrder,
  } = useCart();

  const navigate = useNavigate();

  // Contact & Delivery State
  const [fullName, setFullName] = useState('Alex Morgan');
  const [phone, setPhone] = useState('(555) 782-9901');
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [address, setAddress] = useState('742 Evergreen Terrace, Apt 4B');
  const [cityZip, setCityZip] = useState('Springfield, OR 97477');
  const [deliveryNotes, setDeliveryNotes] = useState('Leave on doorstep, buzz 4B');

  // Mock Payment State
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [cardName, setCardName] = useState('Alex Morgan');

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFreeDelivery = appliedCoupon?.type === 'free_delivery' || deliveryMode === 'pickup';

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (items.length === 0) {
      setFormError('Your cart is empty. Please add items before placing an order.');
      return;
    }

    if (!fullName.trim() || !phone.trim()) {
      setFormError('Please enter your full name and phone number.');
      return;
    }

    if (deliveryMode === 'delivery' && !address.trim()) {
      setFormError('Please enter your delivery address.');
      return;
    }

    setIsSubmitting(true);

    const customerDetails: CustomerDetails = {
      fullName,
      phone,
      email,
      address: deliveryMode === 'delivery' ? `${address}, ${cityZip}` : 'Savory Flagship - 142 Gourmet Ave',
      instructions: deliveryNotes,
      paymentMethod: 'Credit Card (Mock)',
      cardNumberLast4: '4242',
    };

    setTimeout(() => {
      placeOrder(customerDetails);
      setIsSubmitting(false);
      navigate('/confirmation');
    }, 800);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 text-center border-4 border-[#141414] shadow-brutal-xl space-y-5">
          <div className="w-20 h-20 rounded-3xl bg-[#FFF8E1] border-3 border-[#141414] text-[#141414] flex items-center justify-center mx-auto shadow-brutal">
            <ShoppingBag className="w-10 h-10 stroke-[2]" />
          </div>
          <div>
            <h2 className="font-display text-3xl uppercase text-[#141414]">Your bag is empty</h2>
            <p className="text-xs text-stone-600 font-bold mt-2">
              Add some of our delicious smash burgers and shakes before proceeding to checkout!
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl bg-[#FF5722] text-white font-display uppercase tracking-wider text-sm shadow-brutal hover:bg-[#E64A19] transition-all btn-tactile border-2 border-[#141414]"
          >
            <span>Browse Full Menu</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation & Title */}
        <div className="mb-8">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#141414] hover:text-[#FF5722] mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>Back to Menu</span>
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl text-[#141414] tracking-tight uppercase">
            Order Checkout
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-bold mt-1">
            Complete your order with mock payment. Hot & ready in minutes.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Form Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Delivery / Pickup Toggle Switch */}
              <div className="bg-white rounded-3xl p-6 border-3 border-[#141414] shadow-brutal">
                <label className="block font-display text-sm uppercase tracking-wider text-[#141414] mb-3">
                  1. How Are You Feasting?
                </label>
                <div className="grid grid-cols-2 gap-3 bg-[#FAF6EE] p-2 rounded-2xl border-2 border-[#141414]">
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('delivery')}
                    className={`py-3.5 px-4 rounded-xl font-display text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all btn-tactile ${
                      deliveryMode === 'delivery'
                        ? 'bg-[#FF5722] text-white border-2 border-[#141414] shadow-brutal-sm'
                        : 'text-stone-700 hover:text-black'
                    }`}
                  >
                    <Bike className="w-4 h-4 stroke-[2.5]" />
                    <span>Delivery (35m)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('pickup')}
                    className={`py-3.5 px-4 rounded-xl font-display text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all btn-tactile ${
                      deliveryMode === 'pickup'
                        ? 'bg-[#FFB300] text-[#141414] border-2 border-[#141414] shadow-brutal-sm'
                        : 'text-stone-700 hover:text-black'
                    }`}
                  >
                    <Store className="w-4 h-4 stroke-[2.5]" />
                    <span>Pickup (15m)</span>
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-stone-600">
                  <Clock className="w-4 h-4 text-[#FF5722]" />
                  {deliveryMode === 'delivery' ? (
                    <span>Delivered hot to your door in ~35 minutes</span>
                  ) : (
                    <span>Ready for pickup at 142 Gourmet Ave in ~15 minutes (Free)</span>
                  )}
                </div>
              </div>

              {/* Customer Contact Info */}
              <div className="bg-white rounded-3xl p-6 border-3 border-[#141414] shadow-brutal space-y-4">
                <h3 className="font-display text-lg uppercase tracking-wide text-[#141414]">
                  2. Contact Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 bg-[#FAF6EE] border-2 border-[#141414] rounded-xl text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:bg-white shadow-brutal-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-stone-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full px-4 py-3 bg-[#FAF6EE] border-2 border-[#141414] rounded-xl text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:bg-white shadow-brutal-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-stone-700 mb-1">
                    Email Receipt (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 bg-[#FAF6EE] border-2 border-[#141414] rounded-xl text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:bg-white shadow-brutal-sm"
                  />
                </div>
              </div>

              {/* Delivery Address (Hidden smoothly when Pickup selected) */}
              <AnimatePresence>
                {deliveryMode === 'delivery' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-3xl p-6 border-3 border-[#141414] shadow-brutal space-y-4 overflow-hidden"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#FF5722]" />
                      <h3 className="font-display text-lg uppercase tracking-wide text-[#141414]">
                        3. Delivery Destination
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-black uppercase text-stone-700 mb-1">
                          Street Address & Apt / Suite *
                        </label>
                        <input
                          type="text"
                          required={deliveryMode === 'delivery'}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                          className="w-full px-4 py-3 bg-[#FAF6EE] border-2 border-[#141414] rounded-xl text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:bg-white shadow-brutal-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black uppercase text-stone-700 mb-1">
                            City & Zip Code
                          </label>
                          <input
                            type="text"
                            value={cityZip}
                            onChange={(e) => setCityZip(e.target.value)}
                            placeholder="Springfield, OR 97477"
                            className="w-full px-4 py-3 bg-[#FAF6EE] border-2 border-[#141414] rounded-xl text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:bg-white shadow-brutal-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black uppercase text-stone-700 mb-1">
                            Driver Instructions
                          </label>
                          <input
                            type="text"
                            value={deliveryNotes}
                            onChange={(e) => setDeliveryNotes(e.target.value)}
                            placeholder="e.g. Buzz 4B, leave at front door"
                            className="w-full px-4 py-3 bg-[#FAF6EE] border-2 border-[#141414] rounded-xl text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:bg-white shadow-brutal-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mock Payment Card Section */}
              <div className="bg-white rounded-3xl p-6 border-3 border-[#141414] shadow-brutal space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#FF5722]" />
                    <h3 className="font-display text-lg uppercase tracking-wide text-[#141414]">
                      {deliveryMode === 'delivery' ? '4.' : '3.'} Payment Details
                    </h3>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#009624] bg-[#E8F5E9] px-2.5 py-1 rounded-lg border border-[#00C853] flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Sandbox Mode
                  </span>
                </div>

                {/* Retro Graphic Card Mockup */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#141414] to-stone-900 border-2 border-[#141414] text-white shadow-brutal-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="w-9 h-7 rounded-md bg-[#FFB300] border border-amber-300"></div>
                    <span className="font-display text-sm tracking-widest text-[#FF5722]">SAVORY CARD</span>
                  </div>
                  <div className="font-mono text-base tracking-widest text-stone-200">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono uppercase text-stone-400">
                    <span>{cardName || 'CARDHOLDER'}</span>
                    <span>EXP {cardExpiry || 'MM/YY'}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-black uppercase text-stone-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-4 py-3 bg-[#FAF6EE] border-2 border-[#141414] rounded-xl text-xs sm:text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:bg-white shadow-brutal-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-black uppercase text-stone-700 mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-3 bg-[#FAF6EE] border-2 border-[#141414] rounded-xl text-xs sm:text-sm font-mono text-center font-bold focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:bg-white shadow-brutal-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase text-stone-700 mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full px-3 py-3 bg-[#FAF6EE] border-2 border-[#141414] rounded-xl text-xs sm:text-sm font-mono text-center font-bold focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:bg-white shadow-brutal-sm"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-black uppercase text-stone-700 mb-1">
                        Card Name
                      </label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full px-3 py-3 bg-[#FAF6EE] border-2 border-[#141414] rounded-xl text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:bg-white shadow-brutal-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Guest Check (5 cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div className="bg-[#FAF6EE] rounded-3xl p-6 border-4 border-[#141414] shadow-brutal-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b-3 border-[#141414]">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-[#FF5722]" />
                    <h3 className="font-display text-xl uppercase tracking-wider text-[#141414]">
                      Guest Check
                    </h3>
                  </div>
                  <span className="text-[11px] font-black uppercase bg-[#FFB300] border-2 border-[#141414] px-2 py-0.5 rounded-lg shadow-brutal-sm">
                    {items.reduce((s, i) => s + i.quantity, 0)} Items
                  </span>
                </div>

                {/* Line Items List */}
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {items.map((cartItem) => (
                    <div
                      key={cartItem.cartId}
                      className="flex items-center justify-between text-xs sm:text-sm p-2 rounded-xl bg-white border-2 border-[#141414] shadow-brutal-sm"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-11 h-11 rounded-lg object-cover border border-[#141414] flex-shrink-0"
                        />
                        <div className="truncate">
                          <p className="font-display uppercase text-xs sm:text-sm text-[#141414] truncate">
                            {cartItem.quantity}x {cartItem.item.name}
                          </p>
                          {cartItem.selectedSize && (
                            <p className="text-[10px] text-stone-500 font-bold">
                              {cartItem.selectedSize}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="font-display text-sm text-[#141414] ml-2">
                        ${cartItem.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Coupon Form */}
                <div className="pt-2">
                  <CouponInput />
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2 pt-3 border-t-3 border-[#141414] text-xs sm:text-sm font-bold text-stone-700">
                  <div className="flex justify-between">
                    <span className="uppercase">Subtotal</span>
                    <span className="font-display text-base text-[#141414]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="uppercase">Delivery ({deliveryMode === 'pickup' ? 'Pickup' : 'Standard'})</span>
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

                  {discount > 0 && (
                    <div className="flex justify-between items-center text-[#00C853] font-black">
                      <span>PROMO DISCOUNT ({appliedCoupon?.code})</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t-3 border-[#141414] flex justify-between items-center">
                    <span className="font-display text-xl uppercase tracking-wider text-[#141414]">
                      Total Due
                    </span>
                    <span className="font-display text-3xl text-[#FF5722]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Error Banner */}
                {formError && (
                  <div className="p-3 bg-red-50 text-red-600 border-2 border-red-300 rounded-xl text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Submit Place Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-display text-lg tracking-wider uppercase border-3 border-[#141414] shadow-brutal flex items-center justify-center gap-3 transition-all btn-tactile disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Searing Your Order...</span>
                  ) : (
                    <>
                      <span>Place Order</span>
                      <span>•</span>
                      <span>${total.toFixed(2)}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-stone-500 pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#00C853]" />
                  <span>30-minute delivery guarantee applies to all orders</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
