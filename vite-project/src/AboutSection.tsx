import { memo, useEffect, useRef, useState } from 'react';

// @ts-expect-error - vite-imagetools handles query parameters at build time
import vineyardImg from './assets/About/vineyard.jpg?w=1200&q=85';
// @ts-expect-error - vite-imagetools handles query parameters at build time
import vineyardWebp from './assets/About/vineyard.jpg?w=1200&format=webp&q=85';
// @ts-expect-error - vite-imagetools handles query parameters at build time
import cellarImg from './assets/About/cellar.jpg?w=1200&q=85';
// @ts-expect-error - vite-imagetools handles query parameters at build time
import cellarWebp from './assets/About/cellar.jpg?w=1200&format=webp&q=85';
// @ts-expect-error - vite-imagetools handles query parameters at build time
import traditionImg from './assets/About/tradition.jpg?w=1200&q=85';
// @ts-expect-error - vite-imagetools handles query parameters at build time
import traditionWebp from './assets/About/tradition.jpg?w=1200&format=webp&q=85';

interface ContentBlock {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  image: string;
  imageWebp: string;
  imageAlt: string;
}

const content: ContentBlock[] = [
  {
    id: 1,
    title: "The Vineyard",
    subtitle: "Est. 1924",
    text: "Nestled in the misty valleys of the Pacific Northwest, our vines struggle against the elements to produce fruit of exceptional character. The volcanic soil, rich in minerals and history, imparts a distinct flinty backbone to our wines, while the cool maritime breeze preserves their natural acidity.",
    image: vineyardImg,
    imageWebp: vineyardWebp,
    imageAlt: "Misty vineyard rows"
  },
  {
    id: 2,
    title: "The Cellar",
    subtitle: "Shadow & Time",
    text: "Beneath the earth, silence reigns. In our limestone caves, temperature and humidity remain constant constants, guarding the slow alchemy of aging. Here, time is measured not in hours, but in vintages. We practice low-intervention winemaking, allowing the true voice of the terroir to emerge from the darkness.",
    image: cellarImg,
    imageWebp: cellarWebp,
    imageAlt: "Dark wine cellar with barrels"
  },
  {
    id: 3,
    title: "The Tradition",
    subtitle: "Hand & Heart",
    text: "Generations of knowledge are passed down not through books, but through the stained hands of those who work the harvest. We honor the old ways—hand-picking at dawn, gravity-flow fermentation, and patience above all. Every bottle is a testament to the human touch in an automated world.",
    image: traditionImg,
    imageWebp: traditionWebp,
    imageAlt: "Winemaker inspecting grapes"
  }
];

const AboutSection = memo(() => {
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleBlocks, setVisibleBlocks] = useState<boolean[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    textRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleBlocks((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
              observer.disconnect();
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -100px 0px',
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="w-full py-24 px-8 bg-[#111] text-white relative z-10 md:py-20 md:px-6">
      <div className="max-w-section mx-auto flex flex-col gap-16 md:gap-12">
        {content.map((block, index) => {
          const isTextOnLeft = index % 2 !== 0; // Odd indexes have text on left
          const isVisible = visibleBlocks[index];
          const animationClass = isVisible 
            ? (isTextOnLeft ? 'about-text-animate-left' : 'about-text-animate-right')
            : (isTextOnLeft ? 'opacity-0 md:translate-x-[-50px]' : 'opacity-0 md:translate-x-[50px]');

          return (
            <div key={block.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:gap-12">
              <div className={`relative w-full aspect-4/3 overflow-hidden rounded-sm group about-image-wrapper ${isTextOnLeft ? 'md:order-2' : ''}`}>
                <div className="relative w-full h-full">
                  <picture>
                    <source srcSet={block.imageWebp} type="image/webp" />
                    <img 
                      src={block.image} 
                      alt={block.imageAlt} 
                      loading="lazy" 
                      className={`w-full h-full object-cover transition-transform duration-700 will-change-transform backface-hidden transform-gpu group-hover:scale-105 ${block.id === 2 ? 'blur-[0.5px]' : ''}`}
                    />
                  </picture>
                  <div className="about-image-vignette"></div>
                </div>
              </div>
              <div 
                ref={(el) => {
                  textRefs.current[index] = el;
                }}
                className={`flex flex-col gap-6 md:gap-6 p-8 md:p-0 items-center text-center ${isTextOnLeft ? 'md:order-1' : ''} ${animationClass}`}
              >
                <span className="font-['Playfair_Display',serif] text-sm uppercase tracking-[0.2em] text-[#bd0d1a]">{block.subtitle}</span>
                <h2 className="font-['Playfair_Display',serif] text-5xl leading-[1.1] text-white m-0 md:text-4xl">{block.title}</h2>
                <p className="text-base leading-[1.8] text-white/70 m-0 max-w-[500px]">{block.text}</p>
                <div className="w-[60px] h-px bg-white/20 mt-4"></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

export default AboutSection;
