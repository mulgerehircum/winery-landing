import { useState, useEffect } from 'react'
import './effects.css'
import SVGComponent from './SVGComponent'
import SmokeBackground from './SmokeBackground'
import WinesSection from './WinesSection'
import AboutSection from './AboutSection'
import VisitUsSection from './VisitUsSection'
import CartModal from './CartModal'
import CartIcon from './CartIcon'

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeLink, setActiveLink] = useState('Wines');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    // Initialize with center position if no mouse movement yet
    setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  return (<>
  <CartModal />
  {/* Film container with border and effects */}
  <div className="fixed inset-0 bg-[#1a1a1a] overflow-hidden z-1 film-container-wrapper">
    {/* Film border with sprocket holes */}
    <div className="absolute top-0 left-0 right-0 h-[30px] md:h-[15px] bg-black z-10 film-border-top"></div>
    <div className="absolute bottom-0 left-0 right-0 h-[30px] md:h-[15px] bg-black z-10 film-border-bottom"></div>
    <div className="absolute top-0 bottom-0 left-0 w-[30px] md:w-[15px] bg-black z-10 film-border-left"></div>
    <div className="absolute top-0 bottom-0 right-0 w-[30px] md:w-[15px] bg-black z-10 film-border-right"></div>
    
    {/* Main content area */}
    <div className="absolute top-[30px] left-[30px] right-[30px] bottom-[30px] md:top-[15px] md:left-[15px] md:right-[15px] md:bottom-[15px] overflow-y-auto overflow-x-hidden film-content">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-20 p-[calc(1.5rem+8px)_2rem_1.5rem_2rem] md:p-4 md:px-6 pointer-events-auto navbar">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center max-w-[1280px] mx-auto navbar-content">
          <div className="col-start-2 flex items-center justify-center gap-4 md:gap-10 pt-2 md:pt-2">
            {['Wines', 'About', 'Contact'].map((link) => (
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
                  setActiveLink(link);
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

        {/* Stage Table - Glossy #111 strip */}
        <div className="absolute left-0 right-0 bottom-[10%] h-[16%] -z-[8] bg-[#111111] shadow-[0_-2px_10px_rgba(255,255,255,0.05)_inset,0_5px_20px_rgba(0,0,0,0.8)] border-t border-white/15 origin-bottom [transform:perspective(1000px)_rotateX(5deg)] hero-stage-table">
          {/* Glossy Reflection Gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 20%, transparent 60%)',
            }}
          ></div>
        </div>

        {/* Glass container - sits ON the stage table */}
        <div className="absolute bottom-[calc(18%+20px)] left-1/2 -translate-x-1/2 w-[80%] max-w-[400px] -z-[7] hero-glass-container">
          <SVGComponent style={{ width: '100%', height: 'auto', position: 'relative', zIndex: 2 }} />
          
          <div className="absolute top-[90%] left-1/2 -translate-x-1/2 pt-[50px] z-20 pointer-events-auto w-max cta-container">
            <button className="appearance-none bg-transparent border-[1.5px] border-white/80 rounded-full py-3 px-7 font-['Playfair_Display',serif] text-[0.9rem] uppercase tracking-[2px] text-white/80 cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] backdrop-blur-[2px] hover:bg-white/5 hover:border-white hover:text-white hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)] hover:-translate-y-[2px] active:translate-y-0 active:drop-shadow-[0_0_2px_rgba(255,255,255,0.3)] cta-button">
              Enter the Cellar
            </button>
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
      <WinesSection />

      {/* About Section - Alternating Layout */}
      <AboutSection />

      {/* Visit Us Section */}
      <VisitUsSection />

      {/* Spotlight Effect Layer */}
      <div 
        className="fixed inset-0 pointer-events-none"
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
  </div>
  </div>
  </>)
}

export default App
