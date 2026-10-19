import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame } from 'lucide-react';
import { Hero } from '../components/Hero';
import { TrustBadges } from '../components/TrustBadges';
import { FeaturedDishes } from '../components/FeaturedDishes';
import { HowItWorks } from '../components/HowItWorks';
import { StickyOrderButton } from '../components/StickyOrderButton';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF6EE]">
      {/* Hero Section */}
      <Hero />

      {/* Trust Badges Bar */}
      <TrustBadges />

      {/* Fan Favorites Section */}
      <FeaturedDishes />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Quality Promise High-Voltage Banner */}
      <section className="py-20 bg-[#FAF6EE] border-b-3 border-[#141414] bg-retro-dots">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-[#141414] text-white border-4 border-[#141414] shadow-brutal-xl">
            {/* Background texture */}
            <div className="absolute inset-0 opacity-25 pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80"
                alt="Burger kitchen"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10 p-8 sm:p-14 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5722] text-white border-2 border-white text-xs font-black uppercase tracking-wider shadow-sm">
                  <Flame className="w-4 h-4 fill-white" />
                  <span>The Savory Flat-Top Standard</span>
                </div>
                <h3 className="font-display text-3xl sm:text-5xl tracking-tight uppercase leading-tight">
                  Never Frozen. Smashed To Order.
                </h3>
                <p className="text-stone-300 text-sm sm:text-base font-medium leading-relaxed">
                  We start with high-heat flat tops, 100% pasture-raised certified Angus beef, and butter-toasted potato brioche. It’s the crunch, the caramelization, and the melted cheese you’ll remember.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <Link
                  to="/menu"
                  className="px-8 py-4 rounded-2xl bg-[#FFB300] hover:bg-[#FFA000] text-[#141414] font-display text-base uppercase tracking-wider border-3 border-white shadow-brutal flex items-center justify-center gap-3 transition-all btn-tactile"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Explore Full Menu</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Sticky Button */}
      <StickyOrderButton />
    </div>
  );
};
