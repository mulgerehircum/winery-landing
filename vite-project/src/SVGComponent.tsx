import * as React from "react";
import glassImage from './assets/glass.svg';

interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {
  brickImage?: string;
  liquidHeight?: number; // Liquid height as percentage (0-100), default 70
}


const SVGComponent: React.FC<SVGComponentProps> = ({ brickImage, liquidHeight = 70, ...props }) => {
  // Calculate liquid top Y position (liquid fills from bottom up)
  // The glass bowl goes from approximately y=138 to y=329 in the 512x512 viewBox
  const glassTop = 133;
  const glassBottom = 340;
  const glassHeight = glassBottom - glassTop;
  const liquidTopY = glassBottom - (glassHeight * liquidHeight / 100);

  // Wave animation path definition
  // A looping wave pattern that is wide enough to scroll horizontally
  // Pattern width: 512px. Total width: 1536px (3 cycles) to ensure seamless scrolling
  // We construct using Q for the first segment and T for smooth continuation
  // Each 512px cycle consists of two 256px arcs (Up, then Down)
  const wavePath = `
    M 0 0 
    Q 128 10 256 0 T 512 0
    T 768 0 T 1024 0
    T 1280 0 T 1536 0
    V 512 
    H 0 
    Z
  `;
  
  const [ripples, setRipples] = React.useState<Array<{id: number, x: number, y: number}>>([]);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const handleSVGClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;

    const pt = svgRef.current.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svgRef.current.getScreenCTM()?.inverse());

    const newRipple = {
      id: Date.now(),
      x: svgP.x,
      y: svgP.y
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1500);
    
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
  <svg
    ref={svgRef}
    onClick={handleSVGClick}
    viewBox="0 0 512 512"
    preserveAspectRatio="xMidYMid meet"
    id="svg1"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs id="defs1">
      <style>
        {`
          @keyframes wave-flow {
            0% { transform: translateX(0); }
            100% { transform: translateX(-512px); }
          }
          .liquid-wave-1 {
            animation: wave-flow 3s linear infinite;
          }
          .liquid-wave-2 {
            animation: wave-flow 5s linear infinite reverse;
            opacity: 0.7;
          }
          @keyframes ripple-expand {
            0% { r: 0; opacity: 0.6; stroke-width: 3px; }
            100% { r: 120; opacity: 0; stroke-width: 0px; }
          }
          .wine-ripple-circle {
            animation: ripple-expand 1.5s ease-out forwards;
            fill: none;
            stroke: rgba(255, 255, 255, 0.4);
          }
        `}
      </style>
      {/* Glass color filter - #f2f2f2 */}
      <filter id="glass-color" x="-50%" y="-50%" width="200%" height="200%">
        <feColorMatrix type="matrix" 
          values="0 0 0 0 0.949
                  0 0 0 0 0.949
                  0 0 0 0 0.949
                  0 0 0 1 0" />
      </filter>
      
      {/* Minimal Refraction Gradient - Only hits edges */}
      <radialGradient id="glass-accent" cx="30%" cy="30%" r="65%">
        <stop offset="0%" stopColor="white" stopOpacity="0.0" />
        <stop offset="85%" stopColor="white" stopOpacity="0.0" />
        <stop offset="95%" stopColor="white" stopOpacity="0.15" />
        <stop offset="100%" stopColor="white" stopOpacity="0.3" />
      </radialGradient>

      {/* Sharp edge highlight */}
      <linearGradient id="glass-rim-edge" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="5%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="95%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
      </linearGradient>
      
      {/* Wine body gradient - Rich red gradient for depth */}
      <linearGradient id="wine-body-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d11d2e" />
        <stop offset="40%" stopColor="#bd0d1a" />
        <stop offset="100%" stopColor="#5e020a" />
      </linearGradient>

      {/* Wine highlight - Soft pink/white reflection */}
      <radialGradient id="wine-highlight" cx="30%" cy="30%" r="40%">
        <stop offset="0%" stopColor="#ff8a95" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#bd0d1a" stopOpacity="0" />
      </radialGradient>

      {/* Liquid clip path from glass.svg */}
      <clipPath id="glass-liquid-clip" clipPathUnits="userSpaceOnUse">
        <path transform="translate(256 191) scale(1.08) translate(-256 -191)" d="m 336.90131,292.63457
           c -21.1,23.4 -49.8,36.2 -80.9,36.2
           -31.1,0 -59.8,-12.9 -80.9,-36.2
           -21.1,-23.4 -31.3,-53.7 -28.8,-85.3
           l 12.1,-154.299997
           h 195.2
           l 12.1,154.299997
           c 2.5,31.7 -7.8,62 -28.8,85.3
           z" />
      </clipPath>
      
      {/* Mask to control liquid height with animation */}
      <mask id="liquid-height-mask">
        <rect width="512" height="512" fill="black" />
        <g transform={`translate(0, ${liquidTopY})`}>
          {/* Two overlapping waves for liquid effect */}
          <g className="liquid-wave-1">
             <path d={wavePath} fill="white" />
          </g>
          <g className="liquid-wave-2">
             <path d={wavePath} fill="white" transform="translate(-200, 0)" />
          </g>
        </g>
      </mask>
    </defs>
    <g
      id="layer1"
      style={{
        display: "inline",
      }}
    >
      <image
        width="512"
        height="512"
        preserveAspectRatio="xMidYMid meet"
        href={glassImage}
        id="image1"
        x="0"
        y="0"
        style={{
          display: "inline",
          fill: "none",
          opacity: 0.5,
          filter: "url(#glass-color) grayscale(1) brightness(1.5) contrast(1.3)",
        }}
      />
      
    
    </g>
    <g id="layer2">
      {/* Liquid using clipPath from glass.svg with height control */}
      <g clipPath="url(#glass-liquid-clip)" mask="url(#liquid-height-mask)">
        {/* Main wine body with gradient */}
        <rect
          x="0"
          y="0"
          width="512"
          height="512"
          fill="url(#wine-body-gradient)"
        />
        {/* Wine highlight */}
        <rect
          x="0"
          y="0"
          width="512"
          height="512"
          fill="url(#wine-highlight)"
        />
        {/* Wine glow overlay for depth */}
        <rect
          x="0"
          y="0"
          width="512"
          height="512"
          fill="#e11122"
          opacity="0.12"
        />
        
        {/* Ripples - clipped to liquid area */}
        {ripples.map(ripple => (
          <circle
            key={ripple.id}
            cx={ripple.x}
            cy={ripple.y}
            r="0"
            className="wine-ripple-circle"
          />
        ))}
      </g>
      
      {/* Minimal Glass Accents - ONLY edges and subtle rim reflection */}
      <g transform="translate(256 191) scale(1.08) translate(-256 -191)" style={{ pointerEvents: 'none' }}>
        <path 
          d="m 336.90131,292.63457 c -21.1,23.4 -49.8,36.2 -80.9,36.2 -31.1,0 -59.8,-12.9 -80.9,-36.2 -21.1,-23.4 -31.3,-53.7 -28.8,-85.3 l 12.1,-154.299997 h 195.2 l 12.1,154.299997 c 2.5,31.7 -7.8,62 -28.8,85.3 z"
          fill="url(#glass-accent)"
          stroke="url(#glass-rim-edge)"
          strokeWidth="1"
          style={{ mixBlendMode: 'screen', opacity: 0.6 }}
        />
      </g>
    </g>
  </svg>
  );
};
export default SVGComponent;
