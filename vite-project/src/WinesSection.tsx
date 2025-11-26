import { useEffect, useRef, useState, useCallback } from 'react';
import WineCard, { type WineCardData } from './WineCard';
import { useCart } from './CartContext';

// Import bottle images with optimization
import midnightReserveImg from './assets/Bottles/midnight_reserve.png';
// @ts-expect-error - vite-imagetools handles query parameters at build time
import midnightReserveSrcSet from './assets/Bottles/midnight_reserve.png?w=200;400;600;800&format=webp&as=srcset';
import noirCollectionImg from './assets/Bottles/noir_collection.png';
// @ts-expect-error - vite-imagetools handles query parameters at build time
import noirCollectionSrcSet from './assets/Bottles/noir_collection.png?w=200;400;600;800&format=webp&as=srcset';
import jazzAgeBlendImg from './assets/Bottles/jazz_age_blend.png';
// @ts-expect-error - vite-imagetools handles query parameters at build time
import jazzAgeBlendSrcSet from './assets/Bottles/jazz_age_blend.png?w=200;400;600;800&format=webp&as=srcset';

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
    imageSrcSet: midnightReserveSrcSet,
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
    imageSrcSet: noirCollectionSrcSet,
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
    imageSrcSet: jazzAgeBlendSrcSet,
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { addToCart } = useCart();

  const updateScrollButtons = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initial scroll to center (middle card)
    const scrollToCenter = () => {
      container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
      updateScrollButtons();
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
      updateScrollButtons();
    };

    const handleScroll = () => {
      updateScrollButtons();
    };

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('scroll', handleScroll);

    container.style.cursor = 'grab';

    // Initial check
    updateScrollButtons();

    return () => {
      clearTimeout(timer);
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollButtons]);

  const handleCardClick = useCallback((id: number) => {
    if (hasMovedRef.current) return;
    setFlippedId(prev => prev === id ? null : id);
  }, []);

  const scrollLeft = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = 290; // Mobile card width
    const gap = 32; // gap-8 = 32px
    container.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
  }, []);

  const scrollRight = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = 290; // Mobile card width
    const gap = 32; // gap-8 = 32px
    container.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
  }, []);

  return (
    <section className="relative w-full h-screen py-16 px-8 z-10 overflow-hidden pointer-events-none flex flex-col justify-center items-center bg-[#1a1a1a] md:py-8 md:px-0">
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-8 pointer-events-auto">
        <span className="font-['Playfair_Display',serif] text-sm uppercase tracking-[0.2em] text-[#bd0d1a] block mb-4">
          Collection
        </span>
        <h2 className="font-['Playfair_Display',serif] text-5xl md:text-4xl leading-[1.1] text-white m-0 mb-6">
          Our Highlights
        </h2>
        <div className="w-[60px] h-px bg-white/20 mx-auto"></div>
      </div>
      
      <div className="relative w-full max-w-[1400px] pointer-events-auto">
        {/* Left Arrow - Mobile Only */}
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={`md:hidden absolute left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center text-white/40 transition-all duration-500 pointer-events-auto ${
            canScrollLeft 
              ? 'opacity-100 cursor-pointer hover:text-white/70 hover:translate-x-[-2px]' 
              : 'opacity-0 cursor-not-allowed pointer-events-none'
          }`}
          aria-label="Scroll left"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        {/* Right Arrow - Mobile Only */}
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={`md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center text-white/40 transition-all duration-500 pointer-events-auto ${
            canScrollRight 
              ? 'opacity-100 cursor-pointer hover:text-white/70 hover:translate-x-[2px]' 
              : 'opacity-0 cursor-not-allowed pointer-events-none'
          }`}
          aria-label="Scroll right"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        <div 
          className="relative w-full overflow-x-auto overflow-y-hidden py-12 select-none flex gap-8 items-center scrollbar-none [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] max-md:snap-x max-md:snap-mandatory max-md:[mask-image:linear-gradient(to_right,transparent,black_15px,black_calc(100%-15px),transparent)] max-md:[-webkit-mask-image:linear-gradient(to_right,transparent,black_15px,black_calc(100%-15px),transparent)]"   
          ref={containerRef}
        >
          <div className="shrink-0 w-[calc(50vw-145px)] min-w-[20px] h-px md:w-[calc(50vw-190px)]"></div>
          {wines.map((wine) => (
            <WineCard 
              key={wine.id}
              wine={wine}
              isFlipped={flippedId === wine.id}
              onClick={handleCardClick}
              onReserve={addToCart}
            />
          ))}
          <div className="shrink-0 w-[calc(50vw-145px)] min-w-[20px] h-px md:w-[calc(50vw-190px)]"></div>
        </div>
      </div>
    </section>
  );
}
