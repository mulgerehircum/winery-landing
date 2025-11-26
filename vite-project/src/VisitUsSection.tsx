import { memo } from 'react';
import CTAButton from './CTAButton';
// @ts-expect-error - vite-imagetools handles query parameters at build time
import visitUsImg from './assets/visit_us.jpg?w=1200&format=webp&q=85';
// @ts-expect-error - vite-imagetools handles query parameters at build time
import visitUsImgFallback from './assets/visit_us.jpg?w=1200&q=85';

const VisitUsSection = memo(() => {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden z-10">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <picture>
          <source srcSet={visitUsImg} type="image/webp" />
          <img 
            src={visitUsImgFallback} 
            alt="Vineyard Estate" 
            className="w-[50%] h-full object-cover"
            loading="lazy"
            fetchPriority="low"
          />
        </picture>
        {/* Overlay for better text contrast if needed, but user asked for 'over the picture' */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content Container */}
      <div className="relative w-full max-w-section mx-auto px-8 md:px-6 h-full flex items-center justify-end">
        <div className="flex flex-col items-end gap-8 md:gap-8 md:pr-20">
          <div className="text-right">
             <h2 className="font-['Playfair_Display',serif] text-5xl md:text-7xl text-white mb-4 drop-shadow-lg">
              Experience the<br/>Legacy
            </h2>
            <p className="text-white/90 text-lg md:text-xl font-light tracking-wide max-w-md ml-auto drop-shadow-md">
              Join us for an unforgettable tasting journey through our historic vineyards.
            </p>
          </div>

          <CTAButton 
            onClick={() => {
              const contactSection = document.getElementById('contact-section');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            variant="primary"
            size="md"
          >
            Plan Your Visit
          </CTAButton>
        </div>
      </div>
    </section>
  );
});

export default VisitUsSection;


