import React from 'react';
import clsx from 'clsx';

const Logo = ({ size = 'md', className = '', animated = true, showText = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={clsx('flex items-center space-x-3', className)}>
      {/* Logo Icon - ChaiCode Inspired */}
      <div className={clsx(
        sizeClasses[size],
        'bg-gradient-to-br from-primary-500 to-chai-500 rounded-xl flex items-center justify-center shadow-lg',
        animated && 'animate-code-glow hover:scale-110 transition-transform duration-300'
      )}>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-3/5 h-3/5 text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={clsx(
            textSizeClasses[size], 
            'font-bold gradient-text-chai'
          )}>
            EduPlatform
          </span>
          {size !== 'sm' && (
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
              Learn • Code • Grow
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
