/// <reference types="vite-imagetools/client" />

// Type declarations for vite-imagetools query parameters
declare module '*?w=*&format=webp&as=srcset' {
  const srcset: string;
  export default srcset;
}

declare module '*?format=webp' {
  const src: string;
  export default src;
}

declare module '*?w=*&format=webp' {
  const src: string;
  export default src;
}

declare module '*?w=*&format=webp&q=*' {
  const src: string;
  export default src;
}

declare module '*?w=*&q=*' {
  const src: string;
  export default src;
}

declare module '*?w=*&format=webp&q=*&as=srcset' {
  const srcset: string;
  export default srcset;
}

// Fallback for any image with query parameters
declare module '*.png?*' {
  const src: string;
  export default src;
}

declare module '*.jpg?*' {
  const src: string;
  export default src;
}

declare module '*.jpeg?*' {
  const src: string;
  export default src;
}

