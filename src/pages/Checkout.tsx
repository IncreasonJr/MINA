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
      <div className="min-h-screen bg-savory-cream py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 text-center border border-savory-border shadow-soft space-y-5">
          <div className="w-20 h-20 rounded-3xl bg-savory-cream text-stone-400 flex items-center justify-center mx-auto border border-savory-border">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-savory-charcoal">Your bag is empty</h2>
            <p className="text-sm text-stone-500 mt-1">
              Add some of our delicious smash burgers and shakes before proceeding to checkout!
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-savory-orange text-white font-bold text-sm shadow-orange hover:bg-savory-orange-hover transition-colors"
          >
            <span>Browse Full Menu</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-savory-cream py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation & Title */}
        <div className="mb-8">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-savory-orange mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Ordering</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-savory-charcoal tracking-tight">
            Checkout & Order
          </h1>
          <p className="text-xs sm:text-sm text-savory-muted mt-1">
            Complete your order with mock payment. Hot & ready in minutes.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Form Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Delivery / Pickup Toggle Switch */}
              <div className="bg-white rounded-3xl p-5 border border-savory-border shadow-soft">
                <label className="block text-xs font-bold uppercase tracking-wider text-savory-muted mb-3">
                  Fulfillment Method
                </label>
                <div className="grid grid-cols-2 gap-3 bg-stone-100 p-1.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('delivery')}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      deliveryMode === 'delivery'
                        ? 'bg-savory-orange text-white shadow-orange-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>Delivery (35 min)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('pickup')}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      deliveryMode === 'pickup'
                        ? 'bg-savory-orange text-white shadow-orange-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Pickup (15 min)</span>
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-stone-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-savory-orange" />
                  {deliveryMode === 'delivery' ? (
                    <span>Delivered hot to your door in ~35 minutes</span>
                  ) : (
                    <span>Ready for pickup at 142 Gourmet Ave in ~15 minutes (Free)</span>
                  )}
                </div>
              </div>

              {/* Customer Contact Info */}
              <div className="bg-white rounded-3xl p-6 border border-savory-border shadow-soft space-y-4">
                <h3 className="text-base font-bold text-savory-charcoal">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-savory-orange/40 focus:border-savory-orange focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-savory-orange/40 focus:border-savory-orange focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">
                    Email Receipt (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-savory-orange/40 focus:border-savory-orange focus:bg-white"
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
                    className="bg-white rounded-3xl p-6 border border-savory-border shadow-soft space-y-4 overflow-hidden"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-savory-orange" />
                      <h3 className="text-base font-bold text-savory-charcoal">
                        2. Delivery Address
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1">
                          Street Address & Apt / Suite *
                        </label>
                        <input
                          type="text"
                          required={deliveryMode === 'delivery'}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-savory-orange/40 focus:border-savory-orange focus:bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">
                            City & Zip Code
                          </label>
                          <input
                            type="text"
                            value={cityZip}
                            onChange={(e) => setCityZip(e.target.value)}
                            placeholder="Springfield, OR 97477"
                            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-savory-orange/40 focus:border-savory-orange focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">
                            Delivery Instructions
                          </label>
                          <input
                            type="text"
                            value={deliveryNotes}
                            onChange={(e) => setDeliveryNotes(e.target.value)}
                            placeholder="e.g. Leave by front door, buzz 4B"
                            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-savory-orange/40 focus:border-savory-orange focus:bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mock Payment Section */}
              <div className="bg-white rounded-3xl p-6 border border-savory-border shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-savory-orange" />
                    <h3 className="text-base font-bold text-savory-charcoal">
                      {deliveryMode === 'delivery' ? '3.' : '2.'} Payment Details
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-savory-green bg-savory-green-light px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Mock Mode (Sandbox)
                  </span>
                </div>

                <p className="text-xs text-stone-500">
                  This is a simulation. Any card number works (e.g. 4242 4242 4242 4242). No real charges will occur.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-mono font-medium focus:ring-2 focus:ring-savory-orange/40 focus:border-savory-orange focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-mono text-center font-medium focus:ring-2 focus:ring-savory-orange/40 focus:border-savory-orange focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-mono text-center font-medium focus:ring-2 focus:ring-savory-orange/40 focus:border-savory-orange focus:bg-white"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-semibold text-stone-600 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-savory-orange/40 focus:border-savory-orange focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Sidebar (5 cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div className="bg-white rounded-3xl p-6 border border-savory-border shadow-soft space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="text-lg font-extrabold text-savory-charcoal">
                    Order Summary
                  </h3>
                  <span className="text-xs font-bold bg-savory-cream px-2.5 py-1 rounded-full text-stone-600">
                    {items.reduce((s, i) => s + i.quantity, 0)} Items
                  </span>
                </div>

                {/* Line Items List */}
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {items.map((cartItem) => (
                    <div
                      key={cartItem.cartId}
                      className="flex items-center justify-between text-xs sm:text-sm"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="truncate">
                          <p className="font-bold text-savory-charcoal truncate">
                            {cartItem.quantity}x {cartItem.item.name}
                          </p>
                          {cartItem.selectedSize && (
                            <p className="text-[10px] text-stone-400">
                              {cartItem.selectedSize}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="font-extrabold text-stone-800 ml-2">
                        ${cartItem.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Coupon Form */}
                <div className="pt-3 border-t border-stone-100">
                  <CouponInput />
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2 pt-3 border-t border-stone-100 text-xs sm:text-sm text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-savory-charcoal">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Delivery Fee ({deliveryMode === 'pickup' ? 'Pickup' : 'Standard'})</span>
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

                  {discount > 0 && (
                    <div className="flex justify-between items-center text-savory-green font-bold">
                      <span>Promo Discount ({appliedCoupon?.code})</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-stone-200 flex justify-between items-center">
                    <span className="text-base font-black text-savory-charcoal">
                      Estimated Total
                    </span>
                    <span className="text-2xl font-black text-savory-orange">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Error Banner */}
                {formError && (
                  <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Submit Place Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-savory-orange hover:bg-savory-orange-hover text-white font-black text-base shadow-orange transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <span>Placing Your Order...</span>
                  ) : (
                    <>
                      <span>Place Order</span>
                      <span>•</span>
                      <span>${total.toFixed(2)}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-savory-green" />
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
