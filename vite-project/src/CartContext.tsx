import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { WineCardData } from './WineCard';

export interface CartItem extends WineCardData {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (wine: WineCardData) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  cartCount: number;
  lastAddedTime: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children, onItemAdded }: { children: ReactNode; onItemAdded?: () => void }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedTime, setLastAddedTime] = useState(0);

  const addToCart = useCallback((wine: WineCardData) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === wine.id);
      if (existing) {
        return prev.map(item => 
          item.id === wine.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...wine, quantity: 1 }];
    });
    setLastAddedTime(Date.now());
    
    // Call callback to show navbar if provided
    if (onItemAdded) {
      onItemAdded();
    }
    
    // Delay opening cart to allow animations to play
    setTimeout(() => {
      setIsCartOpen(true);
    }, 800);
  }, [onItemAdded]);

  const removeFromCart = useCallback((id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      cartTotal,
      cartCount,
      lastAddedTime
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

