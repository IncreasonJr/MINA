import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Check,
  Clock,
  MapPin,
  Utensils,
  Bike,
  Store,
  ArrowRight,
  Receipt,
  Flame,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Confirmation: React.FC = () => {
  const { lastOrder } = useCart();

  // Trigger celebratory confetti on page mount
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF5722', '#00C853', '#FFB300', '#141414'],
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Fallback if accessed directly
  const order = lastOrder || {
    orderNumber: '#SV-7429',
    deliveryMode: 'delivery' as const,
    estimatedMinutes: 35,
    placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    subtotal: 24.50,
    deliveryFee: 0,
    discount: 2.45,
    total: 22.05,
    customer: {
      fullName: 'Alex Morgan',
      phone: '(555) 782-9901',
      address: '742 Evergreen Terrace, Apt 4B, Springfield, OR',
      paymentMethod: 'Credit Card (Mock)',
    },
    items: [
      {
        cartId: 'demo-1',
        item: {
          id: 'classic-smash',
          name: 'Classic Smash',
          category: 'burgers' as const,
          price: 8.50,
          description: 'Double patty, American cheese, house sauce',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
          calories: 680,
        },
        quantity: 2,
        sizePriceDelta: 0,
        selectedExtras: [{ name: 'Extra American Cheese', price: 1.00 }],
        unitPrice: 9.50,
        totalPrice: 19.00,
      },
      {
        cartId: 'demo-2',
        item: {
          id: 'loaded-fries',
          name: 'Savory Loaded Fries',
          category: 'sides' as const,
          price: 5.50,
          description: 'Cheese sauce, bacon crumbles, scallions',
          image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
          calories: 590,
        },
        quantity: 1,
        sizePriceDelta: 0,
        selectedExtras: [],
        unitPrice: 5.50,
        totalPrice: 5.50,
      },
    ],
  };

  const isDelivery = order.deliveryMode === 'delivery';

  return (
    <div className="min-h-screen bg-[#FAF6EE] py-12 sm:py-20 bg-retro-dots">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Header Card with Retro Ticket Border */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white rounded-3xl p-8 sm:p-12 text-center border-4 border-[#141414] shadow-brutal-xl space-y-6 overflow-hidden"
        >
          {/* Stamped Paid Badge */}
          <div className="absolute top-6 right-6 -rotate-12 border-3 border-dashed border-[#00C853] text-[#00C853] px-3 py-1 rounded-xl font-display text-sm uppercase tracking-widest pointer-events-none">
            ★ SIZZLING & CONFIRMED ★
          </div>

          {/* Animated Green Checkmark Ring */}
          <div className="relative inline-flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
              className="w-24 h-24 rounded-full bg-[#E8F5E9] text-[#00C853] border-3 border-[#141414] shadow-brutal flex items-center justify-center"
            >
              <Check className="w-12 h-12 stroke-[3.5]" />
            </motion.div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FFB300] text-[#141414] border-2 border-[#141414] shadow-brutal-sm text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Ticket Sent to Grill Master</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl text-[#141414] tracking-tight uppercase">
              Order Confirmed!
            </h1>
            <p className="text-sm sm:text-base text-stone-700 font-bold max-w-lg mx-auto">
              Your patties are being pressed fresh on the hot flat-top right now.
            </p>
          </div>

          {/* Key Order Meta Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t-3 border-[#141414]">
            {/* Order Number */}
            <div className="p-4 rounded-2xl bg-[#FAF6EE] border-2 border-[#141414] shadow-brutal-sm flex items-center gap-3.5 text-left">
              <div className="w-12 h-12 rounded-xl bg-[#141414] text-white flex items-center justify-center font-black">
                <Receipt className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-stone-500">
                  Ticket Number
                </p>
                <p className="font-display text-xl text-[#141414]">
                  {order.orderNumber}
                </p>
              </div>
            </div>

            {/* Estimated Time */}
            <div className="p-4 rounded-2xl bg-[#FFECE5] border-2 border-[#141414] shadow-brutal-sm flex items-center gap-3.5 text-left">
              <div className="w-12 h-12 rounded-xl bg-[#FF5722] text-white flex items-center justify-center">
                <Clock className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-[#FF5722]">
                  Estimated {isDelivery ? 'Delivery' : 'Pickup'} Time
                </p>
                <p className="font-display text-xl text-[#141414]">
                  {order.estimatedMinutes} Minutes
                </p>
              </div>
            </div>
          </div>

          {/* Live Kitchen Status Progress Bar */}
          <div className="pt-6 pb-2 text-left space-y-3">
            <div className="flex items-center justify-between text-xs font-black uppercase text-[#141414]">
              <span className="flex items-center gap-1.5 text-[#FF5722]">
                <Flame className="w-4 h-4 fill-[#FF5722] animate-sizzle" />
                Step 2 of 3: Searing on Flat-Top (450°F)
              </span>
              <span className="text-stone-500">Placed {order.placedAt}</span>
            </div>

            <div className="w-full bg-[#FAF6EE] h-4 rounded-full border-2 border-[#141414] overflow-hidden flex shadow-inner">
              <div className="bg-[#00C853] w-1/3 h-full border-r border-[#141414]" />
              <div className="bg-[#FF5722] w-1/3 h-full animate-pulse border-r border-[#141414]" />
              <div className="bg-stone-200 w-1/3 h-full" />
            </div>

            <div className="grid grid-cols-3 text-[11px] font-black uppercase text-stone-600 pt-1">
              <span className="text-[#009624]">✓ 1. Ticket Received</span>
              <span className="text-center text-[#FF5722]">2. Searing Now</span>
              <span className="text-right">{isDelivery ? '3. At Doorstep' : '3. At Counter'}</span>
            </div>
          </div>

          {/* Destination Details */}
          <div className="p-5 rounded-2xl bg-[#FAF6EE] border-2 border-[#141414] shadow-brutal-sm text-left space-y-2 text-xs sm:text-sm font-bold">
            <div className="flex items-center gap-2 font-display text-base uppercase text-[#141414]">
              {isDelivery ? (
                <>
                  <Bike className="w-4 h-4 text-[#FF5722]" />
                  <span>Delivery Destination</span>
                </>
              ) : (
                <>
                  <Store className="w-4 h-4 text-[#FF5722]" />
                  <span>Pickup Location</span>
                </>
              )}
            </div>

            <div className="flex items-start gap-2.5 text-stone-700">
              <MapPin className="w-4 h-4 text-stone-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-black text-[#141414]">
                  {order.customer.address}
                </p>
                <p className="text-stone-500 text-xs mt-0.5">
                  Recipient: {order.customer.fullName} • {order.customer.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Recap */}
          <div className="text-left pt-4 border-t-3 border-[#141414] space-y-4">
            <h3 className="font-display text-xl uppercase tracking-wider text-[#141414]">
              Receipt Line Items
            </h3>

            <div className="divide-y-2 divide-dashed divide-stone-200">
              {order.items.map((lineItem) => (
                <div
                  key={lineItem.cartId}
                  className="py-3 flex items-center justify-between text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={lineItem.item.image}
                      alt={lineItem.item.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-[#141414]"
                    />
                    <div>
                      <h4 className="font-display uppercase text-sm text-[#141414]">
                        {lineItem.quantity}x {lineItem.item.name}
                      </h4>
                      {lineItem.selectedSize && (
                        <p className="text-[11px] text-stone-600 font-bold">
                          {lineItem.selectedSize}
                        </p>
                      )}
                      {lineItem.selectedExtras.length > 0 && (
                        <p className="text-[11px] text-stone-600 font-medium">
                          +{lineItem.selectedExtras.map((e) => e.name).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-display text-base text-[#141414]">
                    ${lineItem.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-3 border-t-3 border-[#141414] space-y-1.5 text-xs sm:text-sm font-bold text-stone-700">
              <div className="flex justify-between">
                <span className="uppercase">Subtotal</span>
                <span className="font-display text-base">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="uppercase">Delivery Fee</span>
                <span>
                  {order.deliveryFee === 0 ? (
                    <span className="text-[#00C853] font-black">FREE</span>
                  ) : (
                    `$${order.deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#00C853] font-black">
                  <span>DISCOUNT APPLIED</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t-2 border-[#141414] flex justify-between items-center">
                <span className="font-display text-lg uppercase text-[#141414]">
                  Total Paid (Mock)
                </span>
                <span className="font-display text-2xl text-[#FF5722]">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions: Back to Menu */}
          <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/menu"
              className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-display text-base uppercase tracking-wider border-3 border-[#141414] shadow-brutal flex items-center justify-center gap-2 transition-all btn-tactile"
            >
              <Utensils className="w-5 h-5 stroke-[2.5]" />
              <span>Back to Menu</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Link>

            <a
              href="tel:5552342874"
              className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-[#FAF6EE] hover:bg-[#FFB300] text-[#141414] font-display text-sm uppercase tracking-wider border-2 border-[#141414] shadow-brutal-sm flex items-center justify-center gap-2 transition-colors btn-tactile"
            >
              <PhoneCall className="w-4 h-4 stroke-[2.5]" />
              <span>Call Restaurant</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
