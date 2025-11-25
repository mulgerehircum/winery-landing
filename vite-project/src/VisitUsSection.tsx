import { memo } from 'react';
import visitUsImg from './assets/visit_us.jpg';

const VisitUsSection = memo(() => {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden z-10">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={visitUsImg} 
          alt="Vineyard Estate" 
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text contrast if needed, but user asked for 'over the picture' */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content Container */}
      <div className="relative w-full max-w-[1280px] mx-auto px-8 md:px-6 h-full flex items-center justify-end">
        <div className="flex flex-col items-end gap-8 md:pr-20">
          <div className="text-right">
             <h2 className="font-['Playfair_Display',serif] text-5xl md:text-7xl text-white mb-4 drop-shadow-lg">
              Experience the<br/>Legacy
            </h2>
            <p className="text-white/90 text-lg md:text-xl font-light tracking-wide max-w-md ml-auto drop-shadow-md">
              Join us for an unforgettable tasting journey through our historic vineyards.
            </p>
          </div>

          <button className="appearance-none bg-transparent border-[1.5px] border-white/80 rounded-full py-4 px-10 font-['Playfair_Display',serif] text-[1rem] uppercase tracking-[3px] text-white cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] backdrop-blur-[4px] hover:bg-white/10 hover:border-white hover:text-white hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)] hover:-translate-y-[2px] active:translate-y-0 active:drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
            Plan Your Visit
          </button>
        </div>
      </div>
    </section>
  );
});

export default VisitUsSection;

