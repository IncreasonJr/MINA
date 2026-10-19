import React from 'react';
import { Smartphone, ChefHat, Bike, Zap } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: Smartphone,
      title: 'Tap Your Cravings',
      description:
        'Browse our curated menu of double smash burgers, golden fries, and rich shakes with full customization.',
      badge: 'Easy Online Ordering',
      color: 'bg-[#FFECE5]',
      badgeColor: 'bg-[#FF5722] text-white',
    },
    {
      number: '02',
      icon: ChefHat,
      title: 'Crafted & Smashed Fresh',
      description:
        'Every single burger is seared on our hot chrome flat-top to achieve crisp caramelized edges and maximum juiciness.',
      badge: '100% Angus Beef',
      color: 'bg-[#FFF8E1]',
      badgeColor: 'bg-[#FFB300] text-[#141414]',
    },
    {
      number: '03',
      icon: Bike,
      title: 'Hot To Your Door',
      description:
        'Packaged in thermal steam-vented bags so your fries stay crisp and your burgers arrive piping hot in 30 minutes.',
      badge: '30-Min Guarantee',
      color: 'bg-[#E8F5E9]',
      badgeColor: 'bg-[#00C853] text-white',
    },
  ];

  return (
    <section className="py-20 bg-white border-b-3 border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FAF6EE] text-[#141414] border-2 border-[#141414] shadow-brutal-sm font-display text-xs uppercase tracking-widest mb-3">
            <Zap className="w-4 h-4 text-[#FF5722]" />
            <span>The Magic Behind The Crunch</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[#141414] tracking-tight uppercase">
            How Savory Works
          </h2>
          <p className="mt-3 text-stone-700 font-bold text-sm sm:text-base">
            From the flat-top grill straight to your hands in minutes. Here's how we keep it hot and effortless.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className={`${step.color} border-3 border-[#141414] rounded-3xl p-8 shadow-brutal flex flex-col items-center text-center relative transition-transform hover:-translate-y-1.5`}
              >
                {/* Step number badge */}
                <div className="w-14 h-14 rounded-2xl bg-white border-3 border-[#141414] shadow-brutal text-[#141414] font-display text-2xl flex items-center justify-center mb-6">
                  {step.number}
                </div>

                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#141414] text-[#FF5722] shadow-brutal-sm flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 stroke-[2.5]" />
                </div>

                <h3 className="font-display text-2xl text-[#141414] uppercase mb-2">
                  {step.title}
                </h3>
                
                <p className="text-stone-700 text-xs sm:text-sm font-medium leading-relaxed mb-6">
                  {step.description}
                </p>

                <div className="mt-auto">
                  <span className={`px-3 py-1 rounded-xl border-2 border-[#141414] shadow-brutal-sm text-xs font-black uppercase tracking-wider ${step.badgeColor}`}>
                    {step.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
