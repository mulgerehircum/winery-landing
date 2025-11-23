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
    <div className="vivino-stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`star-circle ${i < filled ? 'filled' : ''}`}></span>
      ))}
    </div>
  );
};

const WineCard = memo(({ wine, isFlipped, onClick, onReserve }: WineCardProps) => {
  return (
    <div 
      className={`wine-card ${isFlipped ? 'flipped' : ''}`}
      onClick={(e) => {
        // Don't trigger flip if clicking Reserve button
        if ((e.target as HTMLElement).closest('.reserve-button')) return;
        onClick(wine.id);
      }}
    >
      <div className="wine-card-inner-wrapper">
        {/* Front Side */}
        <div className="wine-card-face wine-card-front">
          <div className="bottle-section">
            <img 
              src={wine.image} 
              alt={wine.name} 
              className="bottle-image"
              loading="eager" 
            />
            <div className="bottle-glow"></div>
          </div>
          <div className="info-section">
            <div className="wine-header">
              <h3 className="wine-name">{wine.name}</h3>
              <div className="wine-meta">
                <span className="wine-type">{wine.type}</span>
                <span className="wine-year">{wine.year}</span>
              </div>
            </div>
            <div className="wine-footer">
              <div className="price-pill">
                €{wine.price}
              </div>
              <div className="vivino-rating">
                <span className="rating-score">{wine.rating}</span>
                <StarRating rating={wine.rating} />
              </div>
              <div className="hover-line"></div>
            </div>
          </div>
          <div className="card-overlay"></div>
        </div>

        {/* Back Side */}
        <div className="wine-card-face wine-card-back">
          <div className="back-watermark">
            <img src={wine.image} alt="" className="bottle-image-watermark" />
          </div>
          <h3 className="back-wine-name">{wine.name}</h3>
          <div className="back-content">
            <div className="tasting-column">
              <div className="tasting-item">
                <span className="tasting-label">Nose</span>
                <span className="tasting-value">{wine.tasting.nose}</span>
              </div>
              <div className="tasting-item">
                <span className="tasting-label">Palate</span>
                <span className="tasting-value">{wine.tasting.palate}</span>
              </div>
              <div className="tasting-item">
                <span className="tasting-label">Finish</span>
                <span className="tasting-value">{wine.tasting.finish}</span>
              </div>
            </div>
            <div className="meta-column">
              <div className="vivino-snippet">
                {wine.rating} based on {wine.reviews.toLocaleString()} ratings
              </div>
              <div className="featured-quote">
                "{wine.quote}"
              </div>
            </div>
          </div>
          <button 
            className="reserve-button"
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

