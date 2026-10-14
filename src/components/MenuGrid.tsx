import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, Flame, Leaf, Utensils } from 'lucide-react';
import { MENU_ITEMS, CATEGORIES, MenuItem } from '../data/menuItems';
import { useCart } from '../context/CartContext';
import { ItemModal } from './ItemModal';

interface MenuGridProps {
  initialCategory?: string;
}

export const MenuGrid: React.FC<MenuGridProps> = ({ initialCategory = 'all' }) => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'favorite' | 'spicy' | 'vegetarian'>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter items based on category, search, and dietary badges
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      // Dietary filter match
      let matchesDietary = true;
      if (dietaryFilter === 'favorite') matchesDietary = Boolean(item.isFavorite);
      if (dietaryFilter === 'spicy') matchesDietary = Boolean(item.isSpicy);
      if (dietaryFilter === 'vegetarian') matchesDietary = Boolean(item.isVegetarian);

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [activeCategory, searchQuery, dietaryFilter]);

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
    <div className="space-y-8">
      {/* Category Pills and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Category Horizontal Scrolling Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === 'all'
                ? MENU_ITEMS.length
                : MENU_ITEMS.filter((i) => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 shadow-xs ${
                  isActive
                    ? 'bg-savory-orange text-white shadow-orange-sm scale-[1.02]'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search burgers, fries, shakes..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-2xl text-xs sm:text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-savory-orange/40 focus:border-savory-orange shadow-xs"
          />
        </div>
      </div>

      {/* Dietary Sub-Filters */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
        <span className="text-savory-muted font-semibold mr-1">Filter:</span>
        <button
          onClick={() => setDietaryFilter('all')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
            dietaryFilter === 'all'
              ? 'bg-savory-charcoal text-white'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setDietaryFilter('favorite')}
          className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition-colors ${
            dietaryFilter === 'favorite'
              ? 'bg-savory-orange text-white'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Popular
        </button>
        <button
          onClick={() => setDietaryFilter('spicy')}
          className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition-colors ${
            dietaryFilter === 'spicy'
              ? 'bg-red-500 text-white'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-current" />
          Spicy
        </button>
        <button
          onClick={() => setDietaryFilter('vegetarian')}
          className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition-colors ${
            dietaryFilter === 'vegetarian'
              ? 'bg-savory-green text-white'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
          }`}
        >
          <Leaf className="w-3.5 h-3.5 text-current" />
          Vegetarian
        </button>
      </div>

      {/* Grid of Dishes */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-savory-border shadow-soft max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
            <Utensils className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg text-savory-charcoal">No items found</h3>
          <p className="text-xs text-stone-500 mt-1 mb-4">
            We couldn't find any dishes matching "{searchQuery}". Try selecting another category or clearing filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              setDietaryFilter('all');
            }}
            className="px-4 py-2 bg-savory-orange text-white text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenModal(item)}
              className="group bg-white rounded-3xl overflow-hidden border border-savory-border/80 shadow-soft hover:shadow-soft-lg hover:border-savory-orange/40 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Dish Photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Dietary / Feature Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {item.isFavorite && (
                    <span className="bg-savory-orange text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Fav
                    </span>
                  )}
                  {item.isSpicy && (
                    <span className="bg-red-500 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <Flame className="w-3 h-3" /> Spicy
                    </span>
                  )}
                  {item.isVegetarian && (
                    <span className="bg-savory-green text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <Leaf className="w-3 h-3" /> Veg
                    </span>
                  )}
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-3 right-3 bg-savory-charcoal/90 backdrop-blur-sm text-white text-xs font-black px-2.5 py-1 rounded-xl border border-white/10">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              {/* Dish Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-savory-charcoal group-hover:text-savory-orange transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-400">
                    {item.calories} cal
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(e, item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-savory-orange hover:bg-savory-orange-hover text-white text-xs font-bold shadow-orange-sm transition-all active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Item Customization Modal */}
      <ItemModal
        item={selectedItem}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
