import React from 'react';
import { Zap, Star, Flame, ShieldCheck } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Zap,
      title: '30-Min Delivery',
      subtitle: 'Piping hot right to your doorstep',
      bgColor: 'bg-[#FFECE5]',
      accentColor: 'bg-[#FF5722] text-white',
      badge: 'SPEED',
    },
    {
      icon: Star,
      title: '4.9-Star Foodies',
      subtitle: 'Over 10,000+ cravings satisfied',
      bgColor: 'bg-[#FFF8E1]',
      accentColor: 'bg-[#FFB300] text-[#141414]',
      badge: 'RATED',
    },
    {
      icon: Flame,
      title: 'Smashed To Order',
      subtitle: '100% Angus seared on hot flat-tops',
      bgColor: 'bg-[#E8F5E9]',
      accentColor: 'bg-[#00C853] text-white',
      badge: 'FRESH',
    },
    {
      icon: ShieldCheck,
      title: 'Safe & Encrypted',
      subtitle: 'Seamless mock payment checkout',
      bgColor: 'bg-white',
      accentColor: 'bg-[#141414] text-white',
      badge: 'SECURE',
    },
  ];

  return (
    <section className="py-10 bg-[#FAF6EE] border-b-3 border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className={`${badge.bgColor} border-3 border-[#141414] rounded-2xl p-5 shadow-brutal flex items-start gap-4 transition-transform hover:-translate-y-1`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${badge.accentColor} border-2 border-[#141414] shadow-brutal-sm flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display text-base uppercase tracking-wide text-[#141414]">
                      {badge.title}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 font-bold mt-1 leading-snug">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
