import { memo } from 'react';

import vineyardImg from './assets/About/vineyard.jpg';
import cellarImg from './assets/About/cellar.jpg';
import traditionImg from './assets/About/tradition.jpg';

interface ContentBlock {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  image: string;
  imageAlt: string;
}

const content: ContentBlock[] = [
  {
    id: 1,
    title: "The Vineyard",
    subtitle: "Est. 1924",
    text: "Nestled in the misty valleys of the Pacific Northwest, our vines struggle against the elements to produce fruit of exceptional character. The volcanic soil, rich in minerals and history, imparts a distinct flinty backbone to our wines, while the cool maritime breeze preserves their natural acidity.",
    image: vineyardImg,
    imageAlt: "Misty vineyard rows"
  },
  {
    id: 2,
    title: "The Cellar",
    subtitle: "Shadow & Time",
    text: "Beneath the earth, silence reigns. In our limestone caves, temperature and humidity remain constant constants, guarding the slow alchemy of aging. Here, time is measured not in hours, but in vintages. We practice low-intervention winemaking, allowing the true voice of the terroir to emerge from the darkness.",
    image: cellarImg,
    imageAlt: "Dark wine cellar with barrels"
  },
  {
    id: 3,
    title: "The Tradition",
    subtitle: "Hand & Heart",
    text: "Generations of knowledge are passed down not through books, but through the stained hands of those who work the harvest. We honor the old ways—hand-picking at dawn, gravity-flow fermentation, and patience above all. Every bottle is a testament to the human touch in an automated world.",
    image: traditionImg,
    imageAlt: "Winemaker inspecting grapes"
  }
];

const AboutSection = memo(() => {
  return (
    <section className="w-full py-32 px-8 bg-[#111] text-white relative z-10 md:py-16 md:px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-32 md:gap-20">
        {content.map((block, index) => (
          <div key={block.id} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center md:gap-8">
            <div className={`relative w-full aspect-4/3 overflow-hidden rounded-sm group ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
              <div className="relative w-full h-full">
                <img 
                  src={block.image} 
                  alt={block.imageAlt} 
                  loading="lazy" 
                  className={`w-full h-full object-cover transition-transform duration-700 will-change-transform backface-hidden transform-gpu group-hover:scale-105 ${block.id === 2 ? 'blur-[0.5px]' : ''}`}
                />
                <div className="absolute inset-0 bg-linear-to-tr from-black/40 to-transparent pointer-events-none"></div>
              </div>
            </div>
            <div className={`flex flex-col gap-6 p-8 md:p-0 md:gap-4 ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
              <span className="font-['Playfair_Display',serif] text-sm uppercase tracking-[0.2em] text-[#bd0d1a]">{block.subtitle}</span>
              <h2 className="font-['Playfair_Display',serif] text-5xl leading-[1.1] text-white m-0 md:text-4xl">{block.title}</h2>
              <p className="text-base leading-loose text-white/70 m-0 max-w-[500px]">{block.text}</p>
              <div className="w-[60px] h-px bg-white/20 mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default AboutSection;
