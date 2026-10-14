import React from 'react';
import { Smartphone, ChefHat, Bike } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: Smartphone,
      title: 'Tap Your Cravings',
      description:
        'Browse our curated menu of double smash burgers, golden fries, and rich shakes with full customization.',
      badge: 'Easy Online Ordering',
    },
    {
      number: '02',
      icon: ChefHat,
      title: 'Crafted & Smashed Fresh',
      description:
        'Every single burger is seared on our hot chrome flat-top to achieve crisp caramelized edges and maximum juiciness.',
      badge: '100% Angus Beef',
    },
    {
      number: '03',
      icon: Bike,
      title: 'Hot To Your Door',
      description:
        'Packaged in thermal steam-vented bags so your fries stay crisp and your burgers arrive piping hot in 30 minutes.',
      badge: '30-Min Guarantee',
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-savory-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-savory-orange bg-savory-orange-light px-3 py-1 rounded-full">
            Simple 3-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-savory-charcoal mt-3 tracking-tight">
            How Savory Works
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            From the flat-top grill straight to your hands in minutes. Here's how we keep it hot and effortless.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-stone-200 -translate-y-8 z-0 pointer-events-none" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative z-10 bg-savory-cream rounded-3xl p-8 border border-savory-border text-center flex flex-col items-center hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Step badge */}
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-savory-orange text-savory-orange flex items-center justify-center font-black text-xl shadow-sm mb-6">
                  {step.number}
                </div>

                <div className="w-12 h-12 rounded-2xl bg-savory-orange-light text-savory-orange flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>

                <h3 className="text-xl font-bold text-savory-charcoal mb-2">
                  {step.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                  {step.description}
                </p>

                <span className="mt-auto inline-block text-[11px] font-bold text-savory-orange bg-white px-3 py-1 rounded-full border border-savory-border shadow-xs">
                  {step.badge}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
