import { useState, useEffect, useRef } from 'react'
import './effects.css'
import SVGComponent from './SVGComponent'
import SmokeBackground from './SmokeBackground'
import WinesSection from './WinesSection'
import AboutSection from './AboutSection'
import VisitUsSection from './VisitUsSection'
import ContactSection from './ContactSection'
import CartModal from './CartModal'
import CartIcon from './CartIcon'
import CTAButton from './CTAButton'
import { CartProvider } from './CartContext'

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeLink, setActiveLink] = useState('Wines');
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const winesSectionRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    // Initialize with center position if no mouse movement yet
    setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = mainRef.current?.scrollTop || 0;
      
      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY.current || currentScrollY < 10) {
        setIsNavbarVisible(true);
      } 
      // Hide navbar when scrolling down
      else if (currentScrollY > lastScrollY.current) {
        setIsNavbarVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      return () => mainElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToSection = (section: 'Wines' | 'About' | 'Contact') => {
    let targetRef: HTMLElement | null = null;
    
    switch (section) {
      case 'Wines':
        targetRef = winesSectionRef.current;
        break;
      case 'About':
        targetRef = aboutSectionRef.current;
        break;
      case 'Contact':
        targetRef = contactSectionRef.current;
        break;
    }
    
    if (targetRef) {
      targetRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveLink(section);
    }
  };


  // Calculate beam points
  const beamOrigin = { x: 0, y: 0 }; // Top-left
  const angle = Math.atan2(mousePos.y - beamOrigin.y, mousePos.x - beamOrigin.x);
  const beamWidth = 120; // Half-width at target
  
  // Perpendicular points at target for the cone base
  const p1 = {
    x: mousePos.x + Math.cos(angle + Math.PI / 2) * beamWidth,
    y: mousePos.y + Math.sin(angle + Math.PI / 2) * beamWidth
  };
  
  const p2 = {
    x: mousePos.x + Math.cos(angle - Math.PI / 2) * beamWidth,
    y: mousePos.y + Math.sin(angle - Math.PI / 2) * beamWidth
  };

  return (
  <CartProvider onItemAdded={() => setIsNavbarVisible(true)}>
    <CartModal />
    {/* Film container with border and effects */}
    <div className="fixed inset-0 bg-[#1a1a1a] overflow-hidden z-1 film-container-wrapper">
    {/* Film border with sprocket holes */}
    <div className="absolute top-0 left-0 right-0 h-[10px] md:h-[15px] bg-black z-[20] film-border-top pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 right-0 h-[10px] md:h-[15px] bg-black z-[20] film-border-bottom pointer-events-none"></div>
    <div className="absolute top-0 bottom-0 left-0 w-[10px] md:w-[15px] bg-black z-[20] film-border-left pointer-events-none"></div>
    <div className="absolute top-0 bottom-0 right-0 w-[10px] md:w-[15px] bg-black z-[20] film-border-right pointer-events-none"></div>
    
    {/* Navbar */}
    <nav className={`fixed top-0 left-0 right-0 z-[15] p-[calc(1.5rem+8px)_2rem_1.5rem_2rem] md:p-4 md:px-6 pointer-events-auto navbar transition-transform duration-300 ease-in-out ${
      isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center max-w-[1280px] mx-auto navbar-content">
        <div className="col-start-2 flex items-center justify-center gap-4 md:gap-10 pt-2 md:pt-2">
          {(['Wines', 'About', 'Contact'] as const).map((link) => (
            <a 
              key={link}
              href="#" 
              className={`font-['Playfair_Display',serif] text-[0.9rem] md:text-base font-normal tracking-[0.08em] no-underline transition-colors duration-300 ease-in-out bg-transparent outline-none border-none cursor-pointer [-webkit-tap-highlight-color:transparent] ${
                activeLink === link 
                  ? 'text-[#bd0d1a] [text-shadow:0_-8px_35px_rgba(189,13,26,0.5)]' 
                  : 'text-[rgba(255,255,255,0.65)] [text-shadow:0_-8px_35px_rgba(255,255,255,0.25)] hover:text-[rgba(255,255,255,0.85)] hover:[text-shadow:0_-8px_35px_rgba(255,255,255,0.35)]'
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link);
              }}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="justify-self-end col-start-3 cart-icon-wrapper">
          <CartIcon />
        </div>
      </div>
    </nav>
    
    {/* Main content area */}
    <main ref={mainRef} className="absolute top-[10px] left-[10px] right-[10px] bottom-[10px] md:top-[15px] md:left-[15px] md:right-[15px] md:bottom-[15px] overflow-y-auto overflow-x-hidden film-content">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center z-10 overflow-hidden hero-section">
        {/* Noir wall background - base #1a1a1a */}
        <div className="absolute inset-0 -z-10 bg-[#1a1a1a] hero-background">
          {/* Light fog top - #2b2b2b at 6% opacity */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(43, 43, 43, 0.06) 0%, transparent 100%)',
            }}
          ></div>
          {/* Deep edges vignette - #0e0e0e at 50% gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(14, 14, 14, 0.5) 100%)',
            }}
          ></div>
        </div>

        {/* Animated smoke background */}
        <SmokeBackground />


        {/* Glass container - sits ON the stage table */}
        <div className="absolute bottom-[calc(18%+20px)] left-1/2 -translate-x-1/2 w-[80%] max-w-[400px] -z-[7] hero-glass-container">
          <SVGComponent style={{ width: '100%', height: 'auto', position: 'relative', zIndex: 2 }} />
          
          <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-[50px] z-20 pointer-events-auto w-max cta-container">
            <CTAButton 
              onClick={() => scrollToSection('Wines')}
              variant="primary"
              size="md"
            >
              Enter the Cellar
            </CTAButton>
          </div>
        </div>

        <div 
          className="absolute top-[15%] left-0 right-0 pointer-events-auto text-center z-[15] select-none hero-text-container"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          <h1 className="text-[calc(3.5rem-10px)] sm:text-[calc(6rem-10px)] md:text-[calc(9rem-10px)] font-bold tracking-[0.15em] leading-none hero-text">
            <span className="hero-word" data-word="IN">IN</span>
            {' '}
            <span className="hero-word hero-word-vino" data-word="VINO">VINO</span>
            {' '}
            <span className="hero-word" data-word="VERITAS">VERITAS</span>
          </h1>
        </div>
      </section>

      {/* Wines Section */}
      <section ref={winesSectionRef}>
        <WinesSection />
      </section>

      {/* About Section - Alternating Layout */}
      <section ref={aboutSectionRef}>
        <AboutSection />
      </section>

      {/* Visit Us Section */}
      <VisitUsSection />

      {/* Contact Section */}
      <section ref={contactSectionRef} id="contact-section">
        <ContactSection />
      </section>

      {/* Footer */}
      <footer className="relative w-full bg-[#1a1a1a] text-white z-10 py-12 px-8 md:py-10 md:px-6 border-t border-white/30">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-8 md:gap-6">
          {/* IN VINO VERITAS Text */}
          <div 
            className="text-center pointer-events-auto select-none hero-text-container"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            <h2 className="text-5xl md:text-4xl font-bold tracking-[0.15em] leading-none hero-text">
              <span className="hero-word" data-word="IN">IN</span>
              {' '}
              <span className="hero-word hero-word-vino" data-word="VINO">VINO</span>
              {' '}
              <span className="hero-word" data-word="VERITAS">VERITAS</span>
            </h2>
          </div>

          {/* Divider */}
          <div className="w-[60px] h-px bg-white/20"></div>

          {/* Navigation Links */}
          <nav className="flex items-center justify-center gap-4 md:gap-10 w-fit mx-auto">
            {(['Wines', 'About', 'Contact'] as const).map((link) => (
              <a 
                key={link}
                href="#" 
                className={`font-['Playfair_Display',serif] text-base md:text-sm font-normal tracking-[0.08em] no-underline transition-colors duration-300 ease-in-out bg-transparent outline-none border-none cursor-pointer [-webkit-tap-highlight-color:transparent] ${
                  activeLink === link 
                    ? 'text-[#bd0d1a] [text-shadow:0_-8px_35px_rgba(189,13,26,0.5)]' 
                    : 'text-[rgba(255,255,255,0.65)] [text-shadow:0_-8px_35px_rgba(255,255,255,0.25)] hover:text-[rgba(255,255,255,0.85)] hover:[text-shadow:0_-8px_35px_rgba(255,255,255,0.35)]'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link);
                }}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-[60px] h-px bg-white/20"></div>

          {/* Social Media Links */}
          <div className="flex items-center justify-center gap-6 md:gap-5">
            <a 
              href="https://andriiponomarenko.vercel.app/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/70 transition-colors duration-300 ease-in-out no-underline"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a 
              href="https://andriiponomarenko.vercel.app/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/70 transition-colors duration-300 ease-in-out no-underline"
              aria-label="Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a 
              href="https://andriiponomarenko.vercel.app/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/70 transition-colors duration-300 ease-in-out no-underline"
              aria-label="Twitter"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>

          {/* Divider */}
          <div className="w-[60px] h-px bg-white/20"></div>

          {/* Copyright */}
          <p className="text-xs md:text-xs text-white/50 font-light m-0">
            © {new Date().getFullYear()} Andrii Ponomarenko. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Spotlight Effect Layer */}
      <div 
        className="fixed inset-0 pointer-events-none hidden xl:block"
        style={{ zIndex: 15, mixBlendMode: 'overlay' }}
      >
      <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          {/* Spot Gradient - Bright center to soft gray to transparent */}
          <radialGradient id="spotGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#d0d0d0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          
          {/* Beam Gradient - Fades out away from source */}
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Cone Beam */}
        <path 
          d={`M 0,0 L ${p1.x},${p1.y} L ${p2.x},${p2.y} Z`} 
          fill="url(#beamGradient)" 
          style={{ filter: 'blur(30px)' }}
        />

        {/* Light Spot */}
        <ellipse 
          cx={mousePos.x} 
          cy={mousePos.y} 
          rx="160" 
          ry="120" 
          fill="url(#spotGradient)"
          transform={`rotate(35, ${mousePos.x}, ${mousePos.y})`}
          style={{ filter: 'blur(15px)' }}
        />
      </svg>
    </div>

    {/* Sin City specular highlights - #ffffff at 20% */}
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 25%, transparent 50%)',
        zIndex: -4,
      }}
    ></div>
    {/* Sin City shadows - #000000 at 25% multiply */}
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.25) 100%)',
        mixBlendMode: 'multiply',
        zIndex: -5,
      }}
    ></div>
  </main>
  </div>
  </CartProvider>)
}

export default App
