import { memo, useEffect, useRef } from 'react';
import { MapContainer, ImageOverlay, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// @ts-expect-error - vite-imagetools handles query parameters at build time
import mapImg from './assets/map.png?w=2000&q=90';

// Fix for default markers in Leaflet with React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Bounds for the GTA SA Grove Street map image
// Using simple coordinate system where image dimensions determine bounds
// Adjust these based on your actual map.png dimensions (width x height)
// For a typical map image, we'll use aspect-ratio friendly bounds
const bounds: [[number, number], [number, number]] = [
  [0, 0],
  [1000, 1000]
];

const ContactSection = memo(() => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Set up Google Maps-like styling
    if (mapRef.current) {
      const map = mapRef.current;
      
      // Disable default attribution control and add custom one
      map.attributionControl.setPrefix('');
      
      // Fit bounds to the image with padding
      map.fitBounds(bounds, { padding: [20, 20] });
      
      // Improve image rendering quality on zoom
      map.on('zoomend', () => {
        const imageLayers = document.querySelectorAll('.leaflet-image-layer img');
        imageLayers.forEach((img: Element) => {
          const htmlImg = img as HTMLImageElement;
          htmlImg.style.imageRendering = 'auto';
          htmlImg.style.transform = 'translateZ(0)';
        });
      });
    }
  }, []);

  return (
    <section className="relative w-full py-32 px-8 bg-[#1a1a1a] text-white relative z-10 md:py-16 md:px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-12">
          <span className="font-['Playfair_Display',serif] text-sm uppercase tracking-[0.2em] text-[#bd0d1a] block mb-4">
            Find Us
          </span>
          <h2 className="font-['Playfair_Display',serif] text-5xl md:text-4xl leading-[1.1] text-white m-0 mb-6">
            Visit Our Estate
          </h2>
          <div className="w-[60px] h-px bg-white/20 mx-auto"></div>
        </div>

        {/* Map and Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:gap-16">
          {/* Map Container */}
          <div className="relative w-full h-[500px] md:h-[400px] rounded-lg overflow-hidden google-maps-container">
            <MapContainer
              center={[500, 500]}
              zoom={0}
              minZoom={-1}
              maxZoom={2}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%', zIndex: 1 }}
              zoomControl={false}
              ref={mapRef}
              crs={L.CRS.Simple}
            >
              <ImageOverlay
                url={mapImg}
                bounds={bounds}
                opacity={1}
                interactive={true}
              />
              <ZoomControl position="bottomright" />
            </MapContainer>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-8 md:gap-6">
            <div>
              <h3 className="font-['Playfair_Display',serif] text-2xl md:text-xl text-white mb-6 md:mb-4">
                Contact Information
              </h3>
              
              <div className="flex flex-col gap-6 md:gap-5">
                {/* Address */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm uppercase tracking-[0.1em] text-white/50 font-light">
                    Address
                  </span>
                  <p className="text-white/90 text-base leading-relaxed m-0">
                    123 Grove Street<br />
                    Los Santos, San Andreas<br />
                    90013
                  </p>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm uppercase tracking-[0.1em] text-white/50 font-light">
                    Phone
                  </span>
                  <a 
                    href="tel:+15551234567" 
                    className="text-white/90 text-base hover:text-white transition-colors duration-300"
                  >
                    (555) 123-4567
                  </a>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm uppercase tracking-[0.1em] text-white/50 font-light">
                    Email
                  </span>
                  <a 
                    href="mailto:info@winery.com" 
                    className="text-white/90 text-base hover:text-white transition-colors duration-300"
                  >
                    info@winery.com
                  </a>
                </div>

                {/* Hours */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm uppercase tracking-[0.1em] text-white/50 font-light">
                    Tasting Room Hours
                  </span>
                  <div className="text-white/90 text-base leading-relaxed">
                    <p className="m-0">Monday - Thursday: 11:00 AM - 7:00 PM</p>
                    <p className="m-0">Friday - Saturday: 10:00 AM - 9:00 PM</p>
                    <p className="m-0">Sunday: 12:00 PM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10"></div>

            {/* Additional Info */}
            <div>
              <p className="text-white/70 text-sm leading-relaxed m-0">
                Reservations recommended for groups of 6 or more. 
                Private tastings and tours available by appointment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ContactSection;

