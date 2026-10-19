import React, { useState } from 'react';
import { Plus, Sparkles, Star } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menuItems';
import { useCart } from '../context/CartContext';
import { ItemModal } from './ItemModal';

export const FeaturedDishes: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Pick 4 fan favorite items
  const favorites = MENU_ITEMS.filter((item) => item.isFavorite).slice(0, 4);

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    addToCart(item, {
      size: item.options?.sizes?.[0]?.name,
      sizePriceDelta: item.options?.sizes?.[0]?.priceDelta || 0,
    });
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF6EE] border-b-3 border-[#141414] bg-retro-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFB300] text-[#141414] border-2 border-[#141414] shadow-brutal-sm font-display text-xs uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4" />
            <span>The Hall of Flame</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[#141414] tracking-tight uppercase">
            Fan Favorites
          </h2>
          <p className="mt-3 text-stone-700 font-bold text-sm sm:text-base">
            The dishes our guests keep coming back for. Smashed hot, seasoned to perfection, and delivered fresh.
          </p>
        </div>

        {/* 4 Cards Grid - Spread Out Generously */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {favorites.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-white rounded-3xl border-3 border-[#141414] shadow-brutal hover:shadow-brutal-lg transition-all duration-200 flex flex-col cursor-pointer transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden border-b-3 border-[#141414] bg-stone-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Tilted Sticker Tag with SVG star */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-xl border-2 border-[#141414] shadow-brutal-sm font-display text-[11px] uppercase tracking-wider text-white flex items-center gap-1.5 ${
                  idx % 2 === 0 ? 'bg-[#FF5722] -rotate-3' : 'bg-[#00C853] rotate-2'
                }`}>
                  <Star className="w-3.5 h-3.5 fill-white" />
                  <span>Fan Fav</span>
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-3 right-3 bg-[#141414] text-white font-display text-sm px-3.5 py-1 rounded-xl border-2 border-white shadow-md">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-display text-xl text-[#141414] uppercase tracking-wide group-hover:text-[#FF5722] transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="pt-4 border-t-2 border-dashed border-stone-200 flex items-center justify-between">
                  <span className="text-xs font-black text-stone-600 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-300">
                    {item.calories} CAL
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(e, item)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-display text-xs uppercase tracking-wider border-2 border-[#141414] shadow-brutal-sm transition-all btn-tactile"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item Customization Modal */}
      <ItemModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
};
