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
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Confirmation: React.FC = () => {
  const { lastOrder } = useCart();

  // Trigger celebratory confetti on page mount
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B35', '#2ECC71', '#FFA94D', '#1A1A1A'],
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Fallback if accessed without an active order
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
    <div className="min-h-screen bg-savory-cream py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-savory-border shadow-soft-lg space-y-6"
        >
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
              className="w-24 h-24 rounded-full bg-savory-green/15 text-savory-green flex items-center justify-center ring-8 ring-savory-green/10"
            >
              <Check className="w-12 h-12 stroke-[3]" />
            </motion.div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-savory-green-light text-savory-green-dark text-xs font-black uppercase tracking-wider">
              <span>Order Confirmed & Sent to Kitchen</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-savory-charcoal tracking-tight">
              Thank You For Your Order!
            </h1>
            <p className="text-sm sm:text-base text-stone-600 max-w-lg mx-auto">
              Your patties are being pressed fresh on the hot flat-top right now.
            </p>
          </div>

          {/* Key Order Meta Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
            {/* Order Number */}
            <div className="p-4 rounded-2xl bg-savory-cream/80 border border-savory-border flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-savory-charcoal text-white flex items-center justify-center font-black">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-savory-muted">
                  Order Number
                </p>
                <p className="text-lg font-black text-savory-charcoal">
                  {order.orderNumber}
                </p>
              </div>
            </div>

            {/* Estimated Time */}
            <div className="p-4 rounded-2xl bg-savory-orange-light border border-savory-orange/20 flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-savory-orange text-white flex items-center justify-center">
                <Clock className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-savory-orange">
                  Estimated {isDelivery ? 'Delivery' : 'Pickup'} Time
                </p>
                <p className="text-lg font-black text-savory-charcoal">
                  {order.estimatedMinutes} Minutes
                </p>
              </div>
            </div>
          </div>

          {/* Live Kitchen Status Progress Bar */}
          <div className="pt-6 pb-2 text-left space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-savory-charcoal">
              <span className="flex items-center gap-1.5 text-savory-orange">
                <Flame className="w-4 h-4 fill-savory-orange animate-pulse" />
                Step 2 of 3: Searing on the Grill
              </span>
              <span className="text-stone-400">Placed at {order.placedAt}</span>
            </div>

            <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden flex">
              <div className="bg-savory-green w-1/3 h-full" />
              <div className="bg-savory-orange w-1/3 h-full animate-pulse" />
              <div className="bg-stone-200 w-1/3 h-full" />
            </div>

            <div className="grid grid-cols-3 text-[11px] font-semibold text-stone-500 pt-1">
              <span className="text-savory-green-dark">✓ 1. Received</span>
              <span className="text-center text-savory-orange font-bold">2. On The Grill</span>
              <span className="text-right">{isDelivery ? '3. At Doorstep' : '3. Ready at Counter'}</span>
            </div>
          </div>

          {/* Fulfillment Details Card */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-left space-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-bold text-savory-charcoal text-sm">
              {isDelivery ? (
                <>
                  <Bike className="w-4 h-4 text-savory-orange" />
                  <span>Delivery Destination</span>
                </>
              ) : (
                <>
                  <Store className="w-4 h-4 text-savory-orange" />
                  <span>Pickup Location</span>
                </>
              )}
            </div>

            <div className="flex items-start gap-2.5 text-stone-600">
              <MapPin className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-savory-charcoal">
                  {order.customer.address}
                </p>
                <p className="text-stone-500 text-xs mt-0.5">
                  Recipient: {order.customer.fullName} • {order.customer.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Recap */}
          <div className="text-left pt-4 border-t border-stone-100 space-y-4">
            <h3 className="font-bold text-base text-savory-charcoal">
              Order Summary Recap
            </h3>

            <div className="divide-y divide-stone-100">
              {order.items.map((lineItem) => (
                <div
                  key={lineItem.cartId}
                  className="py-3 flex items-center justify-between text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={lineItem.item.image}
                      alt={lineItem.item.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-savory-charcoal">
                        {lineItem.quantity}x {lineItem.item.name}
                      </h4>
                      {lineItem.selectedSize && (
                        <p className="text-[11px] text-stone-500">
                          {lineItem.selectedSize}
                        </p>
                      )}
                      {lineItem.selectedExtras.length > 0 && (
                        <p className="text-[11px] text-stone-500">
                          +{lineItem.selectedExtras.map((e) => e.name).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-extrabold text-stone-800">
                    ${lineItem.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs sm:text-sm text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>
                  {order.deliveryFee === 0 ? (
                    <span className="text-savory-green font-bold">FREE</span>
                  ) : (
                    `$${order.deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-savory-green font-bold">
                  <span>Discount Applied</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-stone-200 flex justify-between items-center">
                <span className="font-black text-savory-charcoal text-base">
                  Total Paid (Mock)
                </span>
                <span className="font-black text-savory-orange text-xl">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions: Back to Menu */}
          <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/menu"
              className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-savory-orange hover:bg-savory-orange-hover text-white font-black text-sm sm:text-base shadow-orange flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <Utensils className="w-5 h-5" />
              <span>Back to Menu</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="tel:5552342874"
              className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-stone-500" />
              <span>Call Restaurant</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
