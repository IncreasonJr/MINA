import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../data/menuItems';

export interface CartItemOptionDetails {
  size?: string;
  sizePriceDelta?: number;
  extras?: { name: string; price: number }[];
  specialInstructions?: string;
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  selectedSize?: string;
  sizePriceDelta: number;
  selectedExtras: { name: string; price: number }[];
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export interface AppliedCoupon {
  code: string;
  label: string;
  type: 'free_delivery' | 'percentage';
  discountPercent?: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email?: string;
  address?: string;
  instructions?: string;
  paymentMethod: string;
  cardNumberLast4?: string;
}

export interface OrderRecord {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  deliveryMode: 'delivery' | 'pickup';
  customer: CustomerDetails;
  couponApplied?: AppliedCoupon | null;
  placedAt: string;
  estimatedMinutes: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  standardDeliveryFee: number;
  deliveryMode: 'delivery' | 'pickup';
  setDeliveryMode: (mode: 'delivery' | 'pickup') => void;
  appliedCoupon: AppliedCoupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  addToCart: (
    item: MenuItem,
    options?: CartItemOptionDetails,
    quantity?: number
  ) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  removeItem: (cartId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartBounce: boolean;
  toastMessage: string | null;
  lastOrder: OrderRecord | null;
  placeOrder: (customer: CustomerDetails) => OrderRecord;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STANDARD_DELIVERY_FEE = 3.99;
const CART_STORAGE_KEY = 'savory_cart_items';
const COUPON_STORAGE_KEY = 'savory_coupon';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state from localStorage if available
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<OrderRecord | null>(() => {
    try {
      const saved = sessionStorage.getItem('savory_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const triggerCartBounce = () => {
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 600);
  };

  const addToCart = (
    item: MenuItem,
    options?: CartItemOptionDetails,
    quantity: number = 1
  ) => {
    const size = options?.size;
    const sizePriceDelta = options?.sizePriceDelta || 0;
    const extras = options?.extras || [];
    const extrasPrice = extras.reduce((sum, extra) => sum + extra.price, 0);
    const instructions = options?.specialInstructions || '';

    const unitPrice = Number((item.price + sizePriceDelta + extrasPrice).toFixed(2));
    
    // Generate deterministic cartId
    const extrasKey = extras
      .map((e) => e.name)
      .sort()
      .join('|');
    const cartId = `${item.id}::${size || 'default'}::${extrasKey}::${instructions}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.cartId === cartId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: Number((unitPrice * newQty).toFixed(2)),
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartId,
          item,
          quantity,
          selectedSize: size,
          sizePriceDelta,
          selectedExtras: extras,
          specialInstructions: instructions,
          unitPrice,
          totalPrice: Number((unitPrice * quantity).toFixed(2)),
        };
        return [...prevItems, newItem];
      }
    });

    triggerCartBounce();
    triggerToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${item.name}" to order bag!`);
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setItems((prevItems) => {
      return prevItems
        .map((ci) => {
          if (ci.cartId !== cartId) return ci;
          const newQty = ci.quantity + delta;
          if (newQty <= 0) return null;
          return {
            ...ci,
            quantity: newQty,
            totalPrice: Number((ci.unitPrice * newQty).toFixed(2)),
          };
        })
        .filter((ci): ci is CartItem => ci !== null);
    });
  };

  const removeItem = (cartId: string) => {
    setItems((prev) => prev.filter((ci) => ci.cartId !== cartId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyCoupon = (rawCode: string): boolean => {
    const code = rawCode.trim().toUpperCase();
    setCouponError(null);

    if (!code) {
      setCouponError('Please enter a coupon code.');
      return false;
    }

    if (code === 'FREEDEL') {
      setAppliedCoupon({
        code: 'FREEDEL',
        label: 'Free Delivery Applied ($3.99 OFF)',
        type: 'free_delivery',
      });
      triggerToast('Coupon FREEDEL applied: Free Delivery activated');
      return true;
    } else if (code === 'SAVE10') {
      setAppliedCoupon({
        code: 'SAVE10',
        label: '10% Discount Applied',
        type: 'percentage',
        discountPercent: 10,
      });
      triggerToast('Coupon SAVE10 applied: 10% discount subtracted');
      return true;
    } else {
      setCouponError("Invalid coupon code. Try 'FREEDEL' or 'SAVE10'.");
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  // Calculations
  const itemCount = items.reduce((sum, ci) => sum + ci.quantity, 0);
  const subtotal = Number(items.reduce((sum, ci) => sum + ci.totalPrice, 0).toFixed(2));

  let deliveryFee = STANDARD_DELIVERY_FEE;
  if (deliveryMode === 'pickup' || appliedCoupon?.type === 'free_delivery' || items.length === 0) {
    deliveryFee = 0;
  }

  let discount = 0;
  if (appliedCoupon?.type === 'percentage') {
    discount = Number(((subtotal * (appliedCoupon.discountPercent || 10)) / 100).toFixed(2));
  }

  const total = Number(Math.max(0, subtotal + deliveryFee - discount).toFixed(2));

  const placeOrder = (customer: CustomerDetails): OrderRecord => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `#SV-${randomSuffix}`;
    const estimatedMinutes = deliveryMode === 'pickup' ? 15 : 35;

    const record: OrderRecord = {
      orderNumber,
      items: [...items],
      subtotal,
      deliveryFee,
      discount,
      total,
      deliveryMode,
      customer,
      couponApplied: appliedCoupon,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes,
    };

    setLastOrder(record);
    try {
      sessionStorage.setItem('savory_last_order', JSON.stringify(record));
    } catch (e) {
      console.error(e);
    }

    clearCart();
    return record;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        deliveryFee,
        discount,
        total,
        standardDeliveryFee: STANDARD_DELIVERY_FEE,
        deliveryMode,
        setDeliveryMode,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartBounce,
        toastMessage,
        lastOrder,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
