import React, { useState } from 'react';
import { Plus, Flame, Sparkles } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menuItems';
import { useCart } from '../context/CartContext';
import { ItemModal } from './ItemModal';

export const FeaturedDishes: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Pick 4 fan favorite items
  const favorites = MENU_ITEMS.filter((item) => item.isFavorite).slice(0, 4);

  const handleOpenModal = (item: MenuItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    addToCart(item, {
      size: item.options?.sizes?.[0]?.name,
      sizePriceDelta: item.options?.sizes?.[0]?.priceDelta || 0,
    });
  };

  return (
    <section className="py-16 sm:py-24 bg-savory-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-savory-orange-light text-savory-orange font-bold text-xs uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>Most Loved Dishes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-savory-charcoal tracking-tight">
            Fan Favorites
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            The dishes our guests keep coming back for. Smashed hot, seasoned to perfection, and delivered fresh.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {favorites.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenModal(item)}
              className="group bg-white rounded-3xl overflow-hidden border border-savory-border shadow-soft hover:shadow-soft-lg hover:border-savory-orange/40 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-savory-orange text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Popular
                </div>
                <div className="absolute bottom-3 right-3 bg-savory-charcoal/90 backdrop-blur-sm text-white text-xs font-black px-2.5 py-1 rounded-xl">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-savory-charcoal group-hover:text-savory-orange transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-stone-500 line-clamp-2 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-savory-muted">
                    {item.calories} cal
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(e, item)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-savory-orange hover:bg-savory-orange-hover text-white text-xs font-bold shadow-orange-sm transition-all active:scale-95"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
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
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};
