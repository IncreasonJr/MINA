export interface MenuItemOption {
  name: string;
  priceDelta?: number;
  price?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'burgers' | 'sides' | 'drinks' | 'desserts';
  price: number;
  description: string;
  image: string;
  calories: number;
  isFavorite?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  options?: {
    sizes?: MenuItemOption[];
    extras?: MenuItemOption[];
  };
}

export const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'sides', label: 'Crispy Sides' },
  { id: 'drinks', label: 'Drinks & Shakes' },
  { id: 'desserts', label: 'Desserts' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // --- BURGERS ---
  {
    id: 'classic-smash',
    name: 'Classic Smash',
    category: 'burgers',
    price: 8.50,
    description: 'Double smashed beef patties, gooey American cheese, house secret sauce, and dill pickles on toasted brioche.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    calories: 680,
    isFavorite: true,
    options: {
      sizes: [
        { name: 'Double Patty (Standard)', priceDelta: 0 },
        { name: 'Triple Patty Beast', priceDelta: 2.75 },
        { name: 'Single Light Patty', priceDelta: -1.50 },
      ],
      extras: [
        { name: 'Extra American Cheese', price: 1.00 },
        { name: 'Crispy Bacon Strips', price: 1.75 },
        { name: 'Grilled Onions', price: 0.75 },
        { name: 'Extra Secret Sauce', price: 0.50 },
      ],
    },
  },
  {
    id: 'bacon-bbq',
    name: 'Bacon BBQ Smash',
    category: 'burgers',
    price: 10.50,
    description: 'Smoked applewood bacon, melted sharp cheddar, smoky sweet BBQ glaze, and crispy frizzled onions.',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80',
    calories: 780,
    isFavorite: true,
    options: {
      sizes: [
        { name: 'Regular Double', priceDelta: 0 },
        { name: 'Triple Stack', priceDelta: 2.75 },
      ],
      extras: [
        { name: 'Double Bacon Stack', price: 2.25 },
        { name: 'Pickled Jalapeños', price: 0.75 },
        { name: 'Extra BBQ Glaze', price: 0.50 },
      ],
    },
  },
  {
    id: 'mushroom-swiss',
    name: 'Mushroom Swiss',
    category: 'burgers',
    price: 9.50,
    description: 'Pan-sautéed garlic cremini mushrooms, melted Swiss cheese, caramelized leeks, and roasted garlic aioli.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    calories: 710,
    options: {
      sizes: [
        { name: 'Regular Double', priceDelta: 0 },
        { name: 'Triple Stack', priceDelta: 2.75 },
      ],
      extras: [
        { name: 'Extra Sautéed Mushrooms', price: 1.50 },
        { name: 'Truffle Mayo Upgrade', price: 1.25 },
        { name: 'Extra Melted Swiss', price: 1.00 },
      ],
    },
  },
  {
    id: 'spicy-jalapeno',
    name: 'Spicy Jalapeño Crunch',
    category: 'burgers',
    price: 9.00,
    description: 'Pepper jack cheese, fire-roasted jalapeños, crispy tortilla strips, and signature smoky chipotle crema.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    calories: 720,
    isSpicy: true,
    options: {
      sizes: [
        { name: 'Regular Double', priceDelta: 0 },
        { name: 'Triple Stack', priceDelta: 2.75 },
      ],
      extras: [
        { name: 'Ghost Pepper Hot Sauce Dip', price: 0.75 },
        { name: 'Extra Fire-Roasted Jalapeños', price: 0.85 },
        { name: 'Avocado Slices', price: 1.50 },
      ],
    },
  },
  {
    id: 'truffle-melt',
    name: 'Truffle Deluxe Melt',
    category: 'burgers',
    price: 11.50,
    description: 'Black truffle herb butter, aged white cheddar, sweet balsamic shallots, and peppery wild baby arugula.',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80',
    calories: 740,
    options: {
      sizes: [
        { name: 'Regular Double', priceDelta: 0 },
        { name: 'Triple Stack', priceDelta: 2.75 },
      ],
      extras: [
        { name: 'Extra Truffle Aioli', price: 1.50 },
        { name: 'Crispy Prosciutto', price: 2.00 },
      ],
    },
  },

  // --- SIDES ---
  {
    id: 'loaded-fries',
    name: 'Savory Loaded Fries',
    category: 'sides',
    price: 6.50,
    description: 'Golden skin-on russet fries loaded with melted cheese sauce, smoked bacon crumbles, scallions and ranch.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    calories: 590,
    isFavorite: true,
    options: {
      sizes: [
        { name: 'Regular Sharing Box', priceDelta: 0 },
        { name: 'Mega Party Size', priceDelta: 3.50 },
      ],
      extras: [
        { name: 'Extra Warm Cheese Sauce', price: 1.25 },
        { name: 'Diced Jalapeños', price: 0.75 },
        { name: 'Extra Bacon Crumbles', price: 1.50 },
      ],
    },
  },
  {
    id: 'onion-rings',
    name: 'Crispy Beer-Battered Rings',
    category: 'sides',
    price: 5.50,
    description: 'Thick cut sweet colossal onions in a crunchy IPA batter, served with tangy Savory comeback dip.',
    image: 'https://images.unsplash.com/photo-1639024471287-032f6640dc1f?auto=format&fit=crop&w=800&q=80',
    calories: 460,
    isVegetarian: true,
    options: {
      extras: [
        { name: 'Extra Comeback Sauce', price: 0.50 },
        { name: 'Ranch Dipping Sauce', price: 0.50 },
      ],
    },
  },
  {
    id: 'sweet-potato-fries',
    name: 'Sweet Potato Fries',
    category: 'sides',
    price: 6.00,
    description: 'Hand-cut sweet potato wedges seasoned with sea salt and smoked paprika, served with honey maple mustard.',
    image: 'https://images.unsplash.com/photo-1623238913973-21e45cced554?auto=format&fit=crop&w=800&q=80',
    calories: 420,
    isVegetarian: true,
    options: {
      extras: [
        { name: 'Honey Maple Dip', price: 0.75 },
        { name: 'Chipotle Mayo Dip', price: 0.75 },
      ],
    },
  },
  {
    id: 'side-salad',
    name: 'Garden Crunch Salad',
    category: 'sides',
    price: 4.50,
    description: 'Crisp romaine, garden cucumbers, heirloom cherry tomatoes, toasted sunflower seeds, and house herb vinaigrette.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    calories: 190,
    isVegetarian: true,
    options: {
      extras: [
        { name: 'Crumbled Goat Cheese', price: 1.25 },
        { name: 'Avocado Half', price: 1.50 },
      ],
    },
  },

  // --- DRINKS ---
  {
    id: 'vanilla-milkshake',
    name: 'Vanilla Bean Milkshake',
    category: 'drinks',
    price: 5.50,
    description: 'Thick hand-spun Madagascar bourbon vanilla custard topped with fluffy whipped cream and waffle crunch.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    calories: 520,
    isVegetarian: true,
    options: {
      sizes: [
        { name: 'Regular (16oz)', priceDelta: 0 },
        { name: 'Large (24oz)', priceDelta: 1.50 },
      ],
      extras: [
        { name: 'Caramel Drizzle', price: 0.50 },
        { name: 'Malted Milk Powder', price: 0.75 },
        { name: 'Extra Whipped Cream', price: 0.50 },
      ],
    },
  },
  {
    id: 'chocolate-shake',
    name: 'Belgian Chocolate Shake',
    category: 'drinks',
    price: 5.50,
    description: 'Deep Dutch cocoa and Belgian chocolate fudge spun rich and thick, finished with dark chocolate curls.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    calories: 580,
    isFavorite: true,
    isVegetarian: true,
    options: {
      sizes: [
        { name: 'Regular (16oz)', priceDelta: 0 },
        { name: 'Large (24oz)', priceDelta: 1.50 },
      ],
      extras: [
        { name: 'Chocolate Chip Cookie Crumble', price: 0.75 },
        { name: 'Hot Fudge Swirl', price: 0.75 },
      ],
    },
  },
  {
    id: 'fresh-lemonade',
    name: 'Fresh Meyer Lemonade',
    category: 'drinks',
    price: 3.50,
    description: 'Freshly squeezed sweet Meyer lemons infused with cold-pressed mint leaves and pure cane sugar over crushed ice.',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80',
    calories: 140,
    isVegetarian: true,
    options: {
      sizes: [
        { name: 'Regular (16oz)', priceDelta: 0 },
        { name: 'Large (24oz)', priceDelta: 1.00 },
      ],
      extras: [
        { name: 'Strawberry Puree Swirl', price: 0.75 },
        { name: 'Extra Fresh Mint', price: 0.25 },
      ],
    },
  },
  {
    id: 'iced-tea',
    name: 'Southern Peach Iced Tea',
    category: 'drinks',
    price: 3.00,
    description: 'Slow-steeped golden Pekoe black tea naturally flavored with juicy Georgia white peach and lemon slices.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    calories: 90,
    isVegetarian: true,
    options: {
      sizes: [
        { name: 'Regular (16oz)', priceDelta: 0 },
        { name: 'Large (24oz)', priceDelta: 1.00 },
      ],
      extras: [
        { name: 'Lemon Wedges', price: 0.25 },
        { name: 'Sweetened Honey Shot', price: 0.50 },
      ],
    },
  },

  // --- DESSERTS ---
  {
    id: 'chocolate-brownie',
    name: 'Warm Fudge Brownie',
    category: 'desserts',
    price: 5.50,
    description: 'Baked fresh daily: molten dark chocolate center, chewy crackly crust, served warm with Madagascar vanilla drizzle.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    calories: 480,
    isVegetarian: true,
    options: {
      extras: [
        { name: 'Add Vanilla Ice Cream Scoop', price: 1.75 },
        { name: 'Warm Salted Caramel Sauce', price: 0.75 },
        { name: 'Toasted Pecans', price: 1.00 },
      ],
    },
  },
  {
    id: 'cheesecake-slice',
    name: 'New York Cheesecake',
    category: 'desserts',
    price: 6.50,
    description: 'Classic velvety cream cheese custard over a buttery graham cracker crust with sweet tart strawberry coulis.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    calories: 510,
    isVegetarian: true,
    options: {
      extras: [
        { name: 'Extra Berry Compote', price: 0.75 },
        { name: 'Whipped Chantilly Cream', price: 0.50 },
      ],
    },
  },
  {
    id: 'apple-pie',
    name: 'Caramel Apple Hand Pie',
    category: 'desserts',
    price: 5.00,
    description: 'Flaky golden puff pastry pocket stuffed with spiced Honeycrisp apples, brown butter cinnamon, and salted caramel glaze.',
    image: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?auto=format&fit=crop&w=800&q=80',
    calories: 390,
    isVegetarian: true,
    options: {
      extras: [
        { name: 'Add Cinnamon Dusting', price: 0.25 },
        { name: 'Warm Custard Dip', price: 1.00 },
      ],
    },
  },
  {
    id: 'sundae',
    name: 'Loaded Hot Fudge Sundae',
    category: 'desserts',
    price: 4.50,
    description: 'Velvety vanilla soft serve layered with warm hot fudge, crunchy roasted peanuts, rainbow sprinkles and a bright cherry.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    calories: 430,
    isVegetarian: true,
    options: {
      extras: [
        { name: 'Extra Hot Fudge Cup', price: 0.75 },
        { name: 'Crushed Oreo Cookie Dust', price: 0.75 },
      ],
    },
  },
];
