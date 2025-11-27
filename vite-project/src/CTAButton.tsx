import { memo, type ReactNode } from 'react';

export interface CTAButtonProps {
  children: ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  rounded?: 'full' | 'none';
  tabIndex?: number;
}

const CTAButton = memo(({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  fullWidth = false,
  rounded = 'full',
  tabIndex
}: CTAButtonProps) => {
  // Base styles shared by all variants
  const baseStyles = 'appearance-none bg-transparent border-[1.5px] font-[\'Playfair_Display\',serif] uppercase cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Rounded styles
  const roundedStyles = {
    full: 'rounded-full',
    none: 'rounded-none'
  };
  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Variant styles
  const variantStyles = {
    primary: 'border-white/80 text-white/80 backdrop-blur-[2px] hover:bg-white/5 hover:border-white hover:text-white hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)] hover:-translate-y-[2px] active:translate-y-0 active:drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]',
    secondary: 'border-white/20 text-white backdrop-blur-[2px] hover:bg-[#bd0d1a]/10 hover:border-[#bd0d1a] hover:text-white hover:drop-shadow-[0_0_4px_rgba(189,13,26,0.5)] hover:-translate-y-[2px] active:translate-y-0 active:drop-shadow-[0_0_2px_rgba(189,13,26,0.3)]'
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'py-3 px-7 text-[0.9rem] tracking-[2px]',
    md: 'py-4 px-10 text-[1rem] tracking-[3px]',
    lg: 'py-5 px-12 text-[1.1rem] tracking-[3px]'
  };
  
  const combinedClassName = `${baseStyles} ${roundedStyles[rounded]} ${widthStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      tabIndex={tabIndex}
    >
      {children}
    </button>
  );
});

CTAButton.displayName = 'CTAButton';

export default CTAButton;

