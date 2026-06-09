import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = false,
  hoverEffect = true,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-cyber-panel backdrop-blur-lg border border-cyber-border rounded-2xl p-6 transition-all duration-300
        ${glow ? 'shadow-[0_0_15px_rgba(34,211,238,0.1)] border-[rgba(34,211,238,0.25)]' : ''}
        ${hoverEffect ? 'hover:translate-y-[-4px] hover:border-[rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;
