import { memo } from 'react';

// Using the brick textures for now as placeholders, but in a real app these would be 
// specific photography for each section (Vineyard, Cellar, Tradition)
import vineyardImg from './assets/Bricks023_4K-JPG/Bricks023_4K_Color.jpg';
import cellarImg from './assets/Bricks023_4K-JPG/Bricks023_4K_Displacement.jpg';
import traditionImg from './assets/Bricks023_4K-JPG/Bricks023_4K_NormalGL.jpg';

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
    <section className="about-section">
      <div className="about-container">
        {content.map((block, index) => (
          <div key={block.id} className={`about-block ${index % 2 !== 0 ? 'reversed' : ''}`}>
            <div className="about-image-wrapper">
              <div className="about-image-inner">
                <img src={block.image} alt={block.imageAlt} loading="lazy" />
                <div className="image-overlay"></div>
              </div>
            </div>
            <div className="about-text-wrapper">
              <span className="about-subtitle">{block.subtitle}</span>
              <h2 className="about-title">{block.title}</h2>
              <p className="about-description">{block.text}</p>
              <div className="text-decoration-line"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default AboutSection;

