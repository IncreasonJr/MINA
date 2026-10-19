import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, Flame, Leaf, Utensils, X } from 'lucide-react';
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
      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Category Horizontal Scrolling Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
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
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-display tracking-wider uppercase whitespace-nowrap transition-all border-2 border-[#141414] flex items-center gap-2 btn-tactile ${
                  isActive
                    ? 'bg-[#FF5722] text-white shadow-brutal scale-[1.02]'
                    : 'bg-white hover:bg-[#FFF8E1] text-[#141414] shadow-brutal-sm'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md font-sans font-black ${
                    isActive
                      ? 'bg-black text-white'
                      : 'bg-stone-200 text-stone-800'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input with Brutalist Shadow */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search burgers, sides, shakes..."
            className="w-full pl-11 pr-4 py-3 bg-white border-3 border-[#141414] rounded-2xl text-xs sm:text-sm font-bold placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#FF5722] shadow-brutal-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Dietary Filter Buttons Row */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
        <span className="font-display uppercase text-xs tracking-wider text-stone-700 mr-1">
          Flavor Tag:
        </span>
        <button
          onClick={() => setDietaryFilter('all')}
          className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider border-2 border-[#141414] transition-all btn-tactile ${
            dietaryFilter === 'all'
              ? 'bg-[#141414] text-white shadow-brutal-sm'
              : 'bg-white text-stone-800 shadow-brutal-sm hover:bg-stone-100'
          }`}
        >
          All Flavors
        </button>
        <button
          onClick={() => setDietaryFilter('favorite')}
          className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider border-2 border-[#141414] flex items-center gap-1 transition-all btn-tactile ${
            dietaryFilter === 'favorite'
              ? 'bg-[#FFB300] text-[#141414] shadow-brutal-sm'
              : 'bg-white text-stone-800 shadow-brutal-sm hover:bg-[#FFF8E1]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Popular
        </button>
        <button
          onClick={() => setDietaryFilter('spicy')}
          className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider border-2 border-[#141414] flex items-center gap-1 transition-all btn-tactile ${
            dietaryFilter === 'spicy'
              ? 'bg-[#FF5722] text-white shadow-brutal-sm'
              : 'bg-white text-stone-800 shadow-brutal-sm hover:bg-[#FFECE5]'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-current fill-current" />
          Spicy
        </button>
        <button
          onClick={() => setDietaryFilter('vegetarian')}
          className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider border-2 border-[#141414] flex items-center gap-1 transition-all btn-tactile ${
            dietaryFilter === 'vegetarian'
              ? 'bg-[#00C853] text-white shadow-brutal-sm'
              : 'bg-white text-stone-800 shadow-brutal-sm hover:bg-[#E8F5E9]'
          }`}
        >
          <Leaf className="w-3.5 h-3.5 text-current" />
          Vegetarian
        </button>
      </div>

      {/* Grid of Dishes */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-3 border-[#141414] shadow-brutal max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FFF8E1] border-2 border-[#141414] text-[#141414] flex items-center justify-center mx-auto shadow-brutal-sm">
            <Utensils className="w-8 h-8" />
          </div>
          <h3 className="font-display text-2xl text-[#141414] uppercase">No cravings matched</h3>
          <p className="text-xs text-stone-600 font-medium">
            We couldn't find any dishes matching "{searchQuery}". Try selecting another category or resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              setDietaryFilter('all');
            }}
            className="px-5 py-2.5 bg-[#FF5722] text-white font-display uppercase tracking-wider text-xs rounded-xl border-2 border-[#141414] shadow-brutal-sm btn-tactile"
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
              className="group bg-white rounded-3xl border-3 border-[#141414] shadow-brutal hover:shadow-brutal-lg transition-all duration-200 flex flex-col cursor-pointer transform hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Dish Photo */}
              <div className="relative aspect-[4/3] overflow-hidden border-b-3 border-[#141414] bg-stone-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Dietary / Feature Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {item.isFavorite && (
                    <span className="bg-[#FF5722] text-white border-2 border-[#141414] text-[10px] font-black uppercase px-2 py-0.5 rounded-lg shadow-brutal-sm flex items-center gap-1 -rotate-2">
                      <Sparkles className="w-3 h-3" /> Fav
                    </span>
                  )}
                  {item.isSpicy && (
                    <span className="bg-[#FF1744] text-white border-2 border-[#141414] text-[10px] font-black uppercase px-2 py-0.5 rounded-lg shadow-brutal-sm flex items-center gap-1 rotate-2">
                      <Flame className="w-3 h-3 fill-white" /> Spicy
                    </span>
                  )}
                  {item.isVegetarian && (
                    <span className="bg-[#00C853] text-white border-2 border-[#141414] text-[10px] font-black uppercase px-2 py-0.5 rounded-lg shadow-brutal-sm flex items-center gap-1 -rotate-1">
                      <Leaf className="w-3 h-3" /> Veg
                    </span>
                  )}
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-3 right-3 bg-[#141414] text-white font-display text-sm px-3 py-1 rounded-xl border-2 border-white shadow-md">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              {/* Dish Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-display text-xl text-[#141414] uppercase tracking-wide group-hover:text-[#FF5722] transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="pt-3 border-t-2 border-dashed border-stone-200 flex items-center justify-between">
                  <span className="text-xs font-black text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-300">
                    {item.calories} CAL
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(e, item)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-display text-xs uppercase tracking-wider border-2 border-[#141414] shadow-brutal-sm transition-all btn-tactile"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
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
