import { memo } from 'react';

export interface WineCardData {
  id: number;
  name: string;
  year: number;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  color: string;
  image: string;
  tasting: {
    nose: string;
    palate: string;
    finish: string;
  };
  quote: string;
}

interface WineCardProps {
  wine: WineCardData;
  isFlipped: boolean;
  onClick: (id: number) => void;
  onReserve: (wine: WineCardData) => void;
}

const StarRating = ({ rating }: { rating: number }) => {
  const filled = Math.floor(rating);
  return (
    <div className="flex gap-[2px]">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`w-[6px] h-[6px] rounded-full border border-white/30 ${i < filled ? 'bg-white border-white' : ''}`}></span>
      ))}
    </div>
  );
};

const WineCard = memo(({ wine, isFlipped, onClick, onReserve }: WineCardProps) => {
  return (
    <div 
      className={`shrink-0 w-[380px] h-[500px] lg:w-[420px] lg:h-[560px] perspective-[1500px] cursor-pointer transition-transform duration-300 hover:-translate-y-1 group md:w-[290px] md:h-[440px] max-md:snap-center ${isFlipped ? 'flipped' : ''}`}
      onClick={(e) => {
        // Don't trigger flip if clicking Reserve button
        if ((e.target as HTMLElement).closest('.reserve-button')) return;
        onClick(wine.id);
      }}
    >
      <div className={`relative w-full h-full transition-transform duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] [transform-style:preserve-3d] rounded-xl bg-[#111111f2] will-change-transform group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15),0_0_30px_rgba(189,13,26,0.1)] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        {/* Front Side */}
        <div className={`absolute inset-0 backface-hidden border border-white/10 rounded-xl overflow-hidden bg-[#111] flex flex-row pointer-events-auto ${isFlipped ? 'pointer-events-none' : ''}`}>
          <div className="w-[35%] h-full relative flex items-center justify-center bg-[radial-gradient(circle_at_bottom,rgba(189,13,26,0.15),transparent_60%)] overflow-hidden md:w-[40%]">
            {/* Sweep effect */}
            <div className={`absolute top-0 bottom-0 left-0 right-0 bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.1)_40%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.1)_60%,transparent_80%)] -translate-x-full transition-transform duration-600 z-[5] pointer-events-none ${isFlipped ? 'translate-x-full' : ''}`}></div>
            
            <img 
              src={wine.image} 
              alt={wine.name} 
              className="h-[95%] w-auto object-contain drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] transition-all duration-300 will-change-transform group-hover:drop-shadow-[0_0_15px_rgba(189,13,26,0.2)] group-hover:scale-[1.02]"
              loading="eager" 
            />
            <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[40%] h-[10px] bg-[#bd0d1a]/40 blur-[10px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"></div>
          </div>
          
          <div className="w-[65%] pt-10 pr-8 pb-8 pl-0 flex flex-col justify-center relative z-[2] md:w-[60%] md:p-[1.5rem_1rem_1.5rem_0]">
            <div className="mb-auto pt-8 md:pt-0">
              <h3 className="font-['Playfair_Display',serif] text-[2rem] leading-[1.1] text-white m-0 mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] md:text-[1.4rem] md:mb-1">{wine.name}</h3>
              <div className="flex flex-col gap-1 md:gap-[0.1rem]">
                <span className="font-['Playfair_Display',serif] text-[0.9rem] uppercase tracking-[0.1em] text-white/50 md:text-[0.75rem]">{wine.type}</span>
                <span className="font-['Playfair_Display',serif] text-[0.9rem] uppercase tracking-[0.1em] text-white/50 md:text-[0.75rem]">{wine.year}</span>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/5 relative md:mt-4 md:pt-3">
              <div className={`bg-black border border-[#bd0d1a]/30 rounded-[20px] py-1 px-3 font-sans font-600 text-[0.9rem] text-white transition-all duration-400 delay-300 md:text-[0.8rem] md:px-2 ${isFlipped ? 'opacity-0 -translate-x-[15px] delay-0' : 'opacity-100 translate-x-0'} group-hover:border-[#bd0d1a]/60`}>
                €{wine.price}
              </div>
              <div className={`flex items-center gap-2 transition-all duration-400 delay-300 ${isFlipped ? 'opacity-0 translate-x-[15px] delay-0' : 'opacity-100 translate-x-0'}`}>
                <span className="text-[0.9rem] font-bold text-white md:text-[0.8rem]">{wine.rating}</span>
                <StarRating rating={wine.rating} />
              </div>
              <div className="absolute bottom-[-2px] left-0 right-0 h-px bg-[#bd0d1a] scale-x-0 transition-transform duration-300 shadow-[0_-2px_5px_rgba(189,13,26,0.5)] group-hover:scale-x-100"></div>
            </div>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none z-[1]"></div>
        </div>

        {/* Back Side */}
        <div className={`absolute inset-0 backface-hidden border border-white/10 rounded-xl overflow-hidden bg-[#111] flex flex-col items-center text-center pointer-events-none [transform:rotateY(180deg)] p-8 md:p-6 ${isFlipped ? 'pointer-events-auto' : ''}`}>
          <div className="absolute inset-0 w-[35%] opacity-5 pointer-events-none z-0 flex justify-center items-center right-0 top-0 bottom-0">
            <img src={wine.image} alt="" className="h-[95%] w-auto object-contain grayscale brightness-200 scale-x-[-1]" />
          </div>
          <h3 className="font-['Playfair_Display',serif] text-[1.5rem] text-white m-0 mb-8 relative z-[2] md:text-[1.3rem] md:mb-6">{wine.name}</h3>
          <div className="grid grid-cols-2 gap-8 w-full flex-1 relative z-[2] text-left md:flex md:flex-col md:gap-4">
            <div className="flex flex-col gap-6 border-r border-white/10 pr-4 md:gap-4 md:border-r-0 md:border-b md:pb-4 md:pr-0">
              <div className="flex flex-col gap-1">
                <span className="text-[0.75rem] uppercase tracking-[0.1em] text-white/40">Nose</span>
                <span className="font-['Playfair_Display',serif] text-[1rem] text-white/90">{wine.tasting.nose}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.75rem] uppercase tracking-[0.1em] text-white/40">Palate</span>
                <span className="font-['Playfair_Display',serif] text-[1rem] text-white/90">{wine.tasting.palate}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.75rem] uppercase tracking-[0.1em] text-white/40">Finish</span>
                <span className="font-['Playfair_Display',serif] text-[1rem] text-white/90">{wine.tasting.finish}</span>
              </div>
            </div>
            <div className="flex flex-col gap-8 md:gap-4">
              <div className="text-[0.8rem] text-white/40 leading-[1.4]">
                {wine.rating} based on {wine.reviews.toLocaleString()} ratings
              </div>
              <div className="font-['Playfair_Display',serif] italic text-[1.1rem] text-[#bd0d1a] leading-[1.4]">
                "{wine.quote}"
              </div>
            </div>
          </div>
          <button 
            className="reserve-button mt-auto w-full p-4 bg-transparent border border-white/20 text-white font-['Playfair_Display',serif] text-[1rem] tracking-[0.1em] uppercase cursor-pointer transition-all duration-300 relative z-[2] hover:bg-[#bd0d1a]/10 hover:border-[#bd0d1a] md:p-3 md:text-[0.9rem]"
            tabIndex={isFlipped ? 0 : -1}
            onClick={(e) => {
              e.stopPropagation();
              onReserve(wine);
            }}
          >
            Reserve a bottle
          </button>
        </div>
      </div>
    </div>
  );
});

export default WineCard;
