import * as React from "react";
import glassImage from './assets/glass.png';

interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {}

const glassInnerPath = "m 97.933384,44.580278 -1.790374,16.829505 -1.611334,22.73773 -1.611336,22.737737 -1.25326,24.88618 -0.358074,23.81195 0.895186,16.11336 1.96941,11.27934 3.22267,11.45839 7.340528,13.06972 5.01304,6.2663 11.45839,3.22268 4.29689,1.61133 13.4278,0.71615 8.95186,-2.14845 10.92127,-6.80342 4.83401,-4.11785 6.08727,-11.81646 4.29689,-15.21817 2.32749,-13.60683 0.53711,-19.6941 -0.53711,-16.11335 -0.89519,-20.94736 -1.4323,-20.947362 -0.53711,-12.532608 -1.61134,-17.008541 -1.25326,-13.785871 -4.47593,-1.969408 -9.84705,-0.71615 -11.63742,-0.358074 -11.81646,-0.179038 -16.65046,0.358074 -13.60684,0.71615 z";

const SVG_WIDTH = 270.93332;
const SVG_HEIGHT = 406.39999;
const LIQUID_TOP_Y = 100; // Y position where liquid starts (top of clip)
const LIQUID_HEIGHT = 286.39999; // Height of liquid area

const SVGComponent: React.FC<SVGComponentProps> = (props) => (
  <svg
    width={`${SVG_WIDTH}mm`}
    height={`${SVG_HEIGHT}mm`}
    viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
    id="svg1"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs id="defs1">
      {/* Realistic champagne - golden straw color with frosted glass effect - brighter */}
      <linearGradient id="champagne" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f8ead8" stopOpacity="0.5" />
        <stop offset="20%" stopColor="#f3e0c5" stopOpacity="0.55" />
        <stop offset="50%" stopColor="#eed6b2" stopOpacity="0.6" />
        <stop offset="80%" stopColor="#e9cc9f" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#e4c28c" stopOpacity="0.7" />
      </linearGradient>
      
      {/* Subtle white overlay for frosted effect */}
      <linearGradient id="frosted-overlay" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
      </linearGradient>
      
      {/* Frosted glass effect - stronger blur for background distortion */}
      <filter id="frosted" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
        <feColorMatrix in="blur" type="saturate" values="0" result="desaturate" />
        <feComponentTransfer in="desaturate" result="brighten">
          <feFuncA type="linear" slope="1.2" />
        </feComponentTransfer>
      </filter>
      
      {/* Liquid blur for the champagne itself - stronger for refraction */}
      <filter id="liquid-blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
      
      {/* Enhanced meniscus - stronger highlight for realism - brighter */}
      <linearGradient id="meniscus" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
        <stop offset="20%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      
      {/* Specular highlight on meniscus - brighter */}
      <radialGradient id="specular-highlight" cx="50%" cy="0%" r="30%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
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
      
      {/* Main light source - top left, creating dynamic highlights - brighter */}
      <radialGradient id="liquid-highlight" cx="35%" cy="20%" r="60%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
        <stop offset="30%" stopColor="#fff8e1" stopOpacity="0.6" />
        <stop offset="60%" stopColor="#ffffff" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      
      {/* Secondary highlight - caustic effect - brighter */}
      <radialGradient id="caustic-highlight" cx="60%" cy="25%" r="40%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
        <stop offset="50%" stopColor="#fff8e1" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      
      {/* Rim light on the right side - brighter */}
      <linearGradient id="rim-light" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="85%" stopColor="#ffffff" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
      </linearGradient>
      
      {/* Enhanced depth shadow at bottom - more dramatic */}
      <linearGradient id="depth-shadow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#000000" stopOpacity="0" />
        <stop offset="60%" stopColor="#000000" stopOpacity="0.05" />
        <stop offset="85%" stopColor="#000000" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
      </linearGradient>
      
      {/* Side shadow for depth */}
      <linearGradient id="side-shadow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
        <stop offset="30%" stopColor="#000000" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </linearGradient>
      
      {/* Glass highlight - top left reflection */}
      <radialGradient id="glass-highlight" cx="30%" cy="25%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
        <stop offset="40%" stopColor="#ffffff" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      
      {/* Glass rim highlight - edge lighting */}
      <linearGradient id="glass-rim" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
      </linearGradient>
      
      {/* Glass top highlight */}
      <linearGradient id="glass-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="15%" stopColor="#ffffff" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      
      {/* Glass shape clip path */}
      <clipPath id="glass-shape-clip" clipPathUnits="userSpaceOnUse">
        <path d={glassInnerPath} />
      </clipPath>
      
      {/* Wavy top edge path - will be clipped by glass shape */}
      <path id="wavy-top" d={`M 0,${LIQUID_TOP_Y} 
        Q ${SVG_WIDTH * 0.15},${LIQUID_TOP_Y - 0.5} ${SVG_WIDTH * 0.3},${LIQUID_TOP_Y + 0.3}
        T ${SVG_WIDTH * 0.5},${LIQUID_TOP_Y - 0.4}
        T ${SVG_WIDTH * 0.7},${LIQUID_TOP_Y + 0.2}
        T ${SVG_WIDTH},${LIQUID_TOP_Y - 0.3}
        L ${SVG_WIDTH},${LIQUID_TOP_Y + LIQUID_HEIGHT}
        L 0,${LIQUID_TOP_Y + LIQUID_HEIGHT} Z`} />
      
      {/* Liquid clip: glass shape only (wavy top is visual overlay) */}
      <clipPath id="liquid-clip" clipPathUnits="userSpaceOnUse">
        <path d={glassInnerPath} />
      </clipPath>
      
      {/* Mask for wavy top that respects glass boundaries */}
      <mask id="wavy-top-mask">
        <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="black" />
        <use href="#wavy-top" fill="white" />
      </mask>
    </defs>
    <g
      id="layer1"
      transform="translate(30.389933,54.699997)"
      style={{
        display: "inline",
      }}
    >
      <image
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        preserveAspectRatio="none"
        href={glassImage}
        id="image1"
        x={-30.389933}
        y={-54.699997}
        style={{
          display: "inline",
          fill: "none",
          opacity: 0.85,
        }}
      />
      
    
    </g>
    <g id="layer2">
      {/* Main liquid body - clipped to glass shape and wavy top */}
      <g clipPath="url(#glass-shape-clip)" mask="url(#wavy-top-mask)">
        <path
          d={glassInnerPath}
          fill="url(#champagne)"
          filter="url(#liquid-blur)"
          id="path1"
        />
        
        {/* Depth shadow at bottom - more dramatic */}
        <path
          d={glassInnerPath}
          fill="url(#depth-shadow)"
        />
        
        {/* Side shadow for depth */}
        <path
          d={glassInnerPath}
          fill="url(#side-shadow)"
        />
        
        {/* Main light refraction highlight - top left */}
        <path
          d={glassInnerPath}
          fill="url(#liquid-highlight)"
        />
        
        {/* Secondary caustic highlight */}
        <path
          d={glassInnerPath}
          fill="url(#caustic-highlight)"
        />
        
        {/* Rim light on right side */}
        <path
          d={glassInnerPath}
          fill="url(#rim-light)"
        />
        
        {/* Frosted glass overlay - subtle white for refraction effect */}
        <path
          d={glassInnerPath}
          fill="url(#frosted-overlay)"
        />
        
        {/* Tiny bubbles pattern */}
        <path
          d={glassInnerPath}
          fill="url(#bubbles)"
          opacity={0.6}
        />
      </g>
      
      {/* Enhanced meniscus at the top - follows wavy edge, clipped to glass */}
      <g clipPath="url(#glass-shape-clip)" mask="url(#wavy-top-mask)">
        <rect
          x="0"
          y={LIQUID_TOP_Y - 5}
          width={SVG_WIDTH}
          height="15"
          fill="url(#meniscus)"
        />
        {/* Specular highlight on meniscus */}
        <ellipse
          cx={`${SVG_WIDTH * 0.5}`}
          cy={LIQUID_TOP_Y}
          rx={`${SVG_WIDTH * 0.3}`}
          ry="4"
          fill="url(#specular-highlight)"
        />
      </g>
      
      {/* Additional wavy surface detail - clipped to glass */}
      <g clipPath="url(#glass-shape-clip)" mask="url(#wavy-top-mask)">
        <path
          d={`M 0,${LIQUID_TOP_Y} 
            Q ${SVG_WIDTH * 0.2},${LIQUID_TOP_Y - 0.3} ${SVG_WIDTH * 0.4},${LIQUID_TOP_Y + 0.2}
            T ${SVG_WIDTH * 0.6},${LIQUID_TOP_Y - 0.25}
            T ${SVG_WIDTH * 0.8},${LIQUID_TOP_Y + 0.15}
            T ${SVG_WIDTH},${LIQUID_TOP_Y - 0.2}
            L ${SVG_WIDTH},${LIQUID_TOP_Y + 3}
            L 0,${LIQUID_TOP_Y + 3} Z`}
          fill="#ffffff"
          opacity="0.08"
        />
      </g>
      
      {/* Few scattered slightly larger bubbles - very subtle */}
      <g clipPath="url(#glass-shape-clip)" mask="url(#wavy-top-mask)">
        <circle cx="125" cy={LIQUID_TOP_Y + 40} r="0.8" fill="#ffffff" opacity="0.2" />
        <circle cx="155" cy={LIQUID_TOP_Y + 70} r="0.6" fill="#ffffff" opacity="0.18" />
        <circle cx="105" cy={LIQUID_TOP_Y + 110} r="0.7" fill="#ffffff" opacity="0.15" />
        <circle cx="175" cy={LIQUID_TOP_Y + 90} r="0.5" fill="#ffffff" opacity="0.2" />
        <circle cx="135" cy={LIQUID_TOP_Y + 140} r="0.6" fill="#ffffff" opacity="0.18" />
        <circle cx="165" cy={LIQUID_TOP_Y + 160} r="0.7" fill="#ffffff" opacity="0.15" />
      </g>
    </g>
  </svg>
);
export default SVGComponent;

