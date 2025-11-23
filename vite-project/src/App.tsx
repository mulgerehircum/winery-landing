import { useState, useEffect } from 'react'
import './App.css'
import SVGComponent from './SVGComponent'
import SmokeBackground from './SmokeBackground'
import WinesSection from './WinesSection'
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
  <div className="film-container-wrapper">
    {/* Film border with sprocket holes */}
    <div className="film-border-top"></div>
    <div className="film-border-bottom"></div>
    <div className="film-border-left"></div>
    <div className="film-border-right"></div>
    
    {/* Main content area */}
    <div className="film-content">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="col-start-2 flex items-center gap-6 md:gap-10 pt-4 md:pt-2">
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
          <div className="cart-icon-wrapper">
            <CartIcon />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        {/* Noir wall background - base #1a1a1a */}
        <div className="hero-background">
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
        <div className="hero-stage-table">
          {/* Glossy Reflection Gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 20%, transparent 60%)',
            }}
          ></div>
        </div>

        {/* Glass container - sits ON the stage table */}
        <div className="hero-glass-container">
          <SVGComponent style={{ width: '100%', height: 'auto', position: 'relative', zIndex: 2 }} />
        </div>

        <div 
          className="hero-text-container"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          <h1 className="text-[5rem] md:text-[7rem] font-bold tracking-[0.15em] leading-none hero-text">
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
