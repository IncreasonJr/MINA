import React from 'react';

// 12-point Jagged Retro Starburst SVG Badge
export const StarburstBadge: React.FC<{
  text: string;
  subtext?: string;
  className?: string;
  bg?: string;
  textColor?: string;
}> = ({ text, subtext, className = '', bg = '#FF5722', textColor = '#FFFFFF' }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[2px_2px_0px_#141414] animate-spin-slow"
        style={{ animationDuration: '24s' }}
      >
        <path
          d="M50 0 L58 17 L76 10 L77 29 L95 31 L87 48 L100 62 L84 72 L88 91 L69 88 L62 105 L47 95 L33 104 L30 85 L12 87 L18 69 L2 58 L16 46 L9 28 L27 28 L30 9 L47 18 Z"
          fill={bg}
          stroke="#141414"
          strokeWidth="3"
        />
      </svg>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 font-display uppercase tracking-wider select-none"
        style={{ color: textColor }}
      >
        <span className="text-[11px] font-black leading-none">{text}</span>
        {subtext && <span className="text-[8px] font-sans font-bold opacity-90 mt-0.5">{subtext}</span>}
      </div>
    </div>
  );
};

// Retro Vector Barcode
export const BarcodeSVG: React.FC<{ className?: string }> = ({ className = 'h-8' }) => {
  return (
    <svg
      viewBox="0 0 160 40"
      className={`${className} w-auto text-[#141414]`}
      fill="currentColor"
    >
      <rect x="0" y="0" width="3" height="40" />
      <rect x="6" y="0" width="2" height="40" />
      <rect x="11" y="0" width="4" height="40" />
      <rect x="18" y="0" width="1" height="40" />
      <rect x="22" y="0" width="5" height="40" />
      <rect x="30" y="0" width="2" height="40" />
      <rect x="35" y="0" width="6" height="40" />
      <rect x="44" y="0" width="2" height="40" />
      <rect x="49" y="0" width="3" height="40" />
      <rect x="55" y="0" width="5" height="40" />
      <rect x="63" y="0" width="2" height="40" />
      <rect x="68" y="0" width="4" height="40" />
      <rect x="75" y="0" width="2" height="40" />
      <rect x="80" y="0" width="6" height="40" />
      <rect x="89" y="0" width="1" height="40" />
      <rect x="93" y="0" width="4" height="40" />
      <rect x="100" y="0" width="2" height="40" />
      <rect x="105" y="0" width="5" height="40" />
      <rect x="113" y="0" width="3" height="40" />
      <rect x="119" y="0" width="2" height="40" />
      <rect x="124" y="0" width="6" height="40" />
      <rect x="133" y="0" width="2" height="40" />
      <rect x="138" y="0" width="4" height="40" />
      <rect x="145" y="0" width="2" height="40" />
      <rect x="150" y="0" width="5" height="40" />
      <rect x="158" y="0" width="2" height="40" />
    </svg>
  );
};

// Burger Icon SVG with clean bold lines
export const BurgerIconSVG: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 11a8 8 0 0 1 16 0H4Z" />
      <path d="M2 14h20" />
      <path d="M4 17a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3H4Z" />
      <line x1="7" y1="8" x2="7.01" y2="8" strokeWidth="3" />
      <line x1="12" y1="6" x2="12.01" y2="6" strokeWidth="3" />
      <line x1="17" y1="8" x2="17.01" y2="8" strokeWidth="3" />
    </svg>
  );
};
