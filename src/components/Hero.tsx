import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Clock, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-savory-charcoal text-white py-20 lg:py-28">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1920&q=80"
          alt="Gourmet smash burgers background"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transform hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-savory-charcoal via-savory-charcoal/85 to-savory-charcoal/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-savory-charcoal via-transparent to-savory-charcoal/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Delivery Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-savory-orange text-xs sm:text-sm font-bold tracking-wide shadow-sm">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-savory-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-savory-orange"></span>
              </span>
              <Flame className="w-4 h-4 text-savory-orange fill-savory-orange" />
              <span className="text-white">Hot & fresh in 30 min</span>
              <span className="text-white/40">•</span>
              <span className="text-savory-orange">Made to order</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
              Crave It. Tap It.{' '}
              <span className="text-savory-orange underline decoration-savory-orange/30 decoration-wavy decoration-2">
                Taste It.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-stone-300 max-w-2xl font-normal leading-relaxed">
              Smash burgers, crispy sides and thick shakes — made to order and delivered hot.
            </p>

            {/* CTA Buttons & Social Proof */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-savory-orange text-white font-bold text-base hover:bg-savory-orange-hover shadow-orange transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Order Now</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>

              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-savory-charcoal object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Customer avatar"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-savory-charcoal object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Customer avatar"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-savory-charcoal object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                    alt="Customer avatar"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-white ml-1">4.9/5</span>
                  </div>
                  <p className="text-[11px] text-stone-400">10,000+ happy foodies</p>
                </div>
              </div>
            </div>

            {/* Quick highlight micro-perks */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-medium text-stone-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-savory-orange" />
                <span>30-Min Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-savory-green" />
                <span>100% Angus Beef</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-savory-green/20 text-savory-green font-bold text-[10px]">
                  FREEDEL
                </span>
                <span>Free Delivery Code</span>
              </div>
            </div>
          </motion.div>

          {/* Right Floating Visual Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative">
              {/* Glow background */}
              <div className="absolute -inset-4 bg-savory-orange/20 rounded-3xl blur-2xl"></div>

              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-stone-800 to-stone-900 border border-stone-700 p-4 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
                    alt="Featured Classic Smash Burger"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-savory-orange text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    #1 Best Seller
                  </div>
                  <div className="absolute bottom-3 right-3 bg-savory-charcoal/90 backdrop-blur-md text-white text-sm font-extrabold px-3 py-1.5 rounded-xl border border-white/10">
                    $8.50
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-white">Classic Smash Deluxe</h3>
                    <span className="text-xs text-savory-green font-semibold bg-savory-green/10 px-2 py-0.5 rounded-full">
                      Double Angus
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 line-clamp-2">
                    Double smashed patties with seared caramelized edges, creamy American cheese, and house secret sauce on buttered brioche.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/menu"
                      className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-savory-orange text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Customize & Order</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
