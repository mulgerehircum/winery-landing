import { useEffect, useState, useRef } from 'react';
import { useCart } from './CartContext';

export default function CartIcon() {
  const { cartCount, setIsCartOpen, lastAddedTime } = useCart();
  const [isBouncing, setIsBouncing] = useState(false);
  const [showSpark, setShowSpark] = useState(false);
  const prevCountRef = useRef(cartCount);

  useEffect(() => {
    // Only animate if count increased (item added)
    if (cartCount > prevCountRef.current && lastAddedTime > 0) {
      // Trigger bounce
      setIsBouncing(true);
      
      // Trigger spark slightly after bounce starts
      setTimeout(() => setShowSpark(true), 50);

      // Reset animations
      const bounceTimer = setTimeout(() => setIsBouncing(false), 300);
      const sparkTimer = setTimeout(() => setShowSpark(false), 200);

      return () => {
        clearTimeout(bounceTimer);
        clearTimeout(sparkTimer);
      };
    }
    prevCountRef.current = cartCount;
  }, [cartCount, lastAddedTime]);

  return (
    <button 
      className={`bg-transparent border-none text-white/65 cursor-pointer p-2 relative transition-colors duration-300 flex items-center justify-center outline-none hover:text-white/85 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.35)] ${isBouncing ? 'animate-[cartBounce_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)]' : ''}`} 
      onClick={() => setIsCartOpen(true)}
      aria-label="Open cart"
    >
      {showSpark && <div className="absolute top-1/2 left-1/2 w-full h-full rounded-full pointer-events-none -z-10 animate-[sparkFlash_0.15s_ease-out_forwards] bg-[radial-gradient(circle,rgba(255,255,255,0.8)_0%,transparent_70%)]"></div>}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {cartCount > 0 && (
        <span key={cartCount} className="absolute -top-0.5 -right-0.5 bg-[#bd0d1a] text-white text-xs font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 shadow-[0_2px_4px_rgba(0,0,0,0.3)] animate-[badgePop_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)]">{cartCount}</span>
      )}
    </button>
  );
}
