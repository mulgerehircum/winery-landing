import { useEffect, useRef, useState, useCallback } from 'react';
import WineCard, { type WineCardData } from './WineCard';
import { useCart } from './CartContext';

// Import bottle images
import midnightReserveImg from './assets/Bottles/midnight_reserve.png';
import noirCollectionImg from './assets/Bottles/noir_collection.png';
import jazzAgeBlendImg from './assets/Bottles/jazz_age_blend.png';

const wines: WineCardData[] = [
  {
    id: 1,
    name: 'Midnight Reserve',
    year: 2019,
    type: 'Cabernet Sauvignon',
    price: 39,
    rating: 4.3,
    reviews: 1247,
    color: '#bd0d1a',
    image: midnightReserveImg,
    tasting: {
      nose: 'Black cherry, vanilla, clove',
      palate: 'Full-bodied, velvety tannins',
      finish: 'Long, smoky'
    },
    quote: 'Dark, elegant and dangerously drinkable.'
  },
  {
    id: 2,
    name: 'Noir Collection',
    year: 2020,
    type: 'Pinot Noir',
    price: 45,
    rating: 4.5,
    reviews: 892,
    color: '#8b1538',
    image: noirCollectionImg,
    tasting: {
      nose: 'Raspberry, violet, earth',
      palate: 'Medium-bodied, silky texture',
      finish: 'Crisp, elegant'
    },
    quote: 'A sophisticated expression of terroir.'
  },
  {
    id: 3,
    name: 'Jazz Age Blend',
    year: 2021,
    type: 'Merlot',
    price: 32,
    rating: 4.1,
    reviews: 654,
    color: '#6b1a2a',
    image: jazzAgeBlendImg,
    tasting: {
      nose: 'Plum, chocolate, bay leaf',
      palate: 'Soft, approachable, luscious',
      finish: 'Smooth, spicy'
    },
    quote: 'Perfect for evening gatherings.'
  }
];

export default function WinesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initial scroll to center (middle card)
    const scrollToCenter = () => {
      container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
    };
    
    // Execute after layout
    requestAnimationFrame(scrollToCenter);
    // Fallback for any layout shifts
    const timer = setTimeout(scrollToCenter, 100);

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      hasMovedRef.current = false;
      const rect = container.getBoundingClientRect();
      startXRef.current = e.pageX - rect.left;
      scrollLeftRef.current = container.scrollLeft;
      container.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      container.style.cursor = 'grab';
      
      setTimeout(() => {
        hasMovedRef.current = false;
      }, 0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const rect = container.getBoundingClientRect();
      const x = e.pageX - rect.left;
      const walk = (x - startXRef.current) * 2;
      
      if (Math.abs(walk) > 5) {
        hasMovedRef.current = true;
      }
      
      container.scrollLeft = scrollLeftRef.current - walk;
    };

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    container.style.cursor = 'grab';

    return () => {
      clearTimeout(timer);
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCardClick = useCallback((id: number) => {
    if (hasMovedRef.current) return;
    setFlippedId(prev => prev === id ? null : id);
  }, []);

  return (
    <div className="wines-section">
      <div className="wines-container" ref={containerRef}>
        <div className="wines-spacer"></div>
        {wines.map((wine) => (
          <WineCard 
            key={wine.id}
            wine={wine}
            isFlipped={flippedId === wine.id}
            onClick={handleCardClick}
            onReserve={addToCart}
          />
        ))}
        <div className="wines-spacer"></div>
      </div>
    </div>
  );
}
