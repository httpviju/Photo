import React from 'react';

interface VLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export const VLogo: React.FC<VLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
}) => {
  const sizeMap = {
    xs: 'w-5 h-5 text-[10px]',
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
    xl: 'w-14 h-14 text-2xl',
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* "V" Icon Emblem */}
      <div
        className={`${sizeMap[size]} rounded-xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 border border-amber-400/80 shadow-md flex items-center justify-center relative overflow-hidden select-none shrink-0 group`}
      >
        {/* Subtle glossy sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
        
        {/* Stylized 'V' Letter */}
        <span className="font-black font-mono tracking-tighter bg-gradient-to-b from-amber-200 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          V
        </span>

        {/* Small corner sparkle dot */}
        <div className="absolute top-1 right-1 w-1 h-1 bg-amber-300 rounded-full blur-[0.5px]" />
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="font-black text-slate-900 tracking-tight text-sm">
            Photo 4×6
          </span>
          <span className="text-[10px] font-mono font-bold text-blue-700">
            @http.viju
          </span>
        </div>
      )}
    </div>
  );
};
