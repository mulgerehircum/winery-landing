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
  
  return (
  <svg
    viewBox="0 0 512 512"
    preserveAspectRatio="xMidYMid meet"
    id="svg1"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs id="defs1">
      {/* Glass color filter - #f2f2f2 */}
      <filter id="glass-color" x="-50%" y="-50%" width="200%" height="200%">
        <feColorMatrix type="matrix" 
          values="0 0 0 0 0.949
                  0 0 0 0 0.949
                  0 0 0 0 0.949
                  0 0 0 1 0" />
      </filter>
      
      
      {/* Fresnel effect - brighter edges (sides of glass) */}
      <linearGradient id="fresnel-edge" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
        <stop offset="15%" stopColor="#ffffff" stopOpacity="0.05" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="85%" stopColor="#ffffff" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
      </linearGradient>
      
      {/* Reflection streaks - vertical highlights */}
      <linearGradient id="reflection-streaks" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="25%" stopColor="#ffffff" stopOpacity="0.04" />
        <stop offset="30%" stopColor="#ffffff" stopOpacity="0.06" />
        <stop offset="35%" stopColor="#ffffff" stopOpacity="0.04" />
        <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="65%" stopColor="#ffffff" stopOpacity="0.05" />
        <stop offset="70%" stopColor="#ffffff" stopOpacity="0.07" />
        <stop offset="75%" stopColor="#ffffff" stopOpacity="0.05" />
        <stop offset="80%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      
      {/* Noise pattern for texture */}
      <pattern id="drink-noise" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="8" cy="12" r="0.3" fill="#ffffff" opacity="0.03" />
        <circle cx="22" cy="8" r="0.25" fill="#ffffff" opacity="0.025" />
        <circle cx="15" cy="25" r="0.35" fill="#ffffff" opacity="0.02" />
        <circle cx="32" cy="18" r="0.2" fill="#ffffff" opacity="0.03" />
        <circle cx="5" cy="30" r="0.3" fill="#ffffff" opacity="0.025" />
        <circle cx="28" cy="32" r="0.25" fill="#ffffff" opacity="0.02" />
      </pattern>
      
      {/* Subtle white overlay for frosted effect - reduced for dim environment */}
      <linearGradient id="frosted-overlay" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
      </linearGradient>
      
      {/* Frosted glass effect - adjusted for dim environment with warm tone */}
      <filter id="frosted" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
        <feColorMatrix in="blur" type="saturate" values="0.5" result="desaturate" />
        <feColorMatrix in="desaturate" type="matrix" 
          values="1 0 0 0 0
                  0 0.95 0 0 0
                  0 0 0.9 0 0
                  0 0 0 1 0" result="warmtone" />
        <feComponentTransfer in="warmtone" result="dim">
          <feFuncA type="linear" slope="0.85" />
        </feComponentTransfer>
      </filter>
      
      {/* Liquid blur for the champagne itself - stronger for refraction */}
      <filter id="liquid-blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
      
      {/* Color temperature filter to match brick wall - warm and muted */}
      <filter id="warm-mute-filter" x="-50%" y="-50%" width="200%" height="200%">
        <feColorMatrix type="matrix" 
          values="0.9 0.05 0 0 0
                  0 0.85 0 0 0
                  0 0 0.8 0 0
                  0 0 0 1 0" result="warm" />
        <feComponentTransfer in="warm" result="dimmed">
          <feFuncR type="linear" slope="0.75" />
          <feFuncG type="linear" slope="0.75" />
          <feFuncB type="linear" slope="0.75" />
        </feComponentTransfer>
      </filter>
      
      {/* Refraction filter - blur and lower contrast */}
      <filter id="refraction-filter" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blurred" />
        <feComponentTransfer in="blurred" result="low-contrast">
          <feFuncR type="linear" slope="0.65" intercept="0.18" />
          <feFuncG type="linear" slope="0.65" intercept="0.18" />
          <feFuncB type="linear" slope="0.65" intercept="0.18" />
        </feComponentTransfer>
      </filter>
      
      {/* Enhanced meniscus - adjusted for dim environment */}
      <linearGradient id="meniscus" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="20%" stopColor="#ffffff" stopOpacity="0.3" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      
      {/* Specular highlight on meniscus - adjusted for dim environment */}
      <radialGradient id="specular-highlight" cx="50%" cy="0%" r="30%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      
      {/* Tiny bubbles pattern - champagne has many small bubbles */}
      <pattern id="bubbles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="8" r="0.4" fill="#ffffff" opacity="0.15" />
        <circle cx="12" cy="5" r="0.3" fill="#ffffff" opacity="0.12" />
        <circle cx="8" cy="14" r="0.35" fill="#ffffff" opacity="0.1" />
        <circle cx="16" cy="12" r="0.25" fill="#ffffff" opacity="0.18" />
        <circle cx="3" cy="16" r="0.3" fill="#ffffff" opacity="0.1" />
      </pattern>
      
      {/* Main light source - top left, adjusted for dim environment */}
      <radialGradient id="liquid-highlight" cx="35%" cy="20%" r="60%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="30%" stopColor="#fff8e1" stopOpacity="0.3" />
        <stop offset="60%" stopColor="#ffffff" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      
      {/* Secondary highlight - caustic effect - adjusted for dim environment */}
      <radialGradient id="caustic-highlight" cx="60%" cy="25%" r="40%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
        <stop offset="50%" stopColor="#fff8e1" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      
      {/* Rim light on the right side - adjusted for dim environment */}
      <linearGradient id="rim-light" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="85%" stopColor="#ffffff" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
      </linearGradient>
      
      {/* B. Bounce Light - Warm-tinted upward gradient from table (lower half of glass) */}
      <linearGradient id="bounce-light" x1="0" y1="1" x2="0" y2="0.5">
        <stop offset="0%" stopColor="#d4a574" stopOpacity="0.25" />
        <stop offset="50%" stopColor="#e8c9a0" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#f5e6d3" stopOpacity="0" />
      </linearGradient>
      
      {/* Key light gradient - brightens left rim, darkens right side */}
      <linearGradient id="key-light-gradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
        <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
        <stop offset="70%" stopColor="#000000" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
      </linearGradient>
      
      {/* Enhanced depth shadow at bottom - more dramatic */}
      <linearGradient id="depth-shadow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#000000" stopOpacity="0" />
        <stop offset="60%" stopColor="#000000" stopOpacity="0.05" />
        <stop offset="85%" stopColor="#000000" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
      </linearGradient>
      
      {/* Side shadow for depth - follows key light direction (darker on right) */}
      <linearGradient id="side-shadow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#000000" stopOpacity="0.08" />
        <stop offset="25%" stopColor="#000000" stopOpacity="0.04" />
        <stop offset="50%" stopColor="#000000" stopOpacity="0.02" />
        <stop offset="75%" stopColor="#000000" stopOpacity="0.06" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
      </linearGradient>
      
      {/* Refraction shadow - subtle darkening from refracted light paths */}
      <linearGradient id="refraction-shadow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#000000" stopOpacity="0" />
        <stop offset="40%" stopColor="#000000" stopOpacity="0.02" />
        <stop offset="60%" stopColor="#000000" stopOpacity="0.04" />
        <stop offset="80%" stopColor="#000000" stopOpacity="0.06" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.08" />
      </linearGradient>
      
      {/* Glass highlight - top left reflection - adjusted for dim environment */}
      <radialGradient id="glass-highlight" cx="30%" cy="25%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
        <stop offset="40%" stopColor="#ffffff" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      
      {/* Glass rim highlight - edge lighting with fresnel effect */}
      <linearGradient id="glass-rim" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
        <stop offset="10%" stopColor="#ffffff" stopOpacity="0.15" />
        <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="90%" stopColor="#ffffff" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
      </linearGradient>
      
      {/* Glass top highlight - adjusted for dim environment */}
      <linearGradient id="glass-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
        <stop offset="15%" stopColor="#ffffff" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
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
      
      {/* Mask to control liquid height */}
      <mask id="liquid-height-mask">
        <rect width="512" height="512" fill="black" />
        <rect x="0" y={liquidTopY} width="512" height={512 - liquidTopY} fill="white" />
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
          opacity: 1,
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
      </g>
    </g>
  </svg>
  );
};
export default SVGComponent;

