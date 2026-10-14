import React from 'react';
import { Zap, Star, ShieldCheck, HeartHandshake } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Zap,
      title: 'Fast Delivery',
      subtitle: 'Hot & fresh in 30 minutes or less',
      color: 'text-savory-orange',
      bgColor: 'bg-savory-orange-light',
    },
    {
      icon: Star,
      title: '4.9-Star Reviews',
      subtitle: 'Loved by 10,000+ burger fans',
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
    },
    {
      icon: HeartHandshake,
      title: 'Fresh to Order',
      subtitle: '100% Angus beef smashed fresh',
      color: 'text-savory-green',
      bgColor: 'bg-savory-green-light',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payment',
      subtitle: 'Safe, seamless 256-bit checkout',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <section className="py-10 bg-white border-y border-savory-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 p-3 rounded-2xl hover:bg-savory-cream/50 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${badge.bgColor} ${badge.color} flex items-center justify-center flex-shrink-0 shadow-sm`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-savory-charcoal">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-savory-muted mt-0.5 font-medium">
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
