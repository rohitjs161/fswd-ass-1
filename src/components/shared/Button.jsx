import React from 'react';
import clsx from 'clsx';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus-ring disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-chai-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
    secondary: 'bg-white dark:bg-code-800 text-primary-600 dark:text-white border-2 border-primary-500 hover:bg-primary-50 dark:hover:bg-code-700',
    ghost: 'text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20',
    code: 'bg-gradient-to-r from-code-800 to-code-900 text-white border border-code-700 hover:border-primary-500',
    danger: 'bg-accent-red text-white hover:bg-red-600 shadow-lg hover:shadow-xl',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  };

  const LoadingSpinner = () => (
    <div className={clsx('spinner', iconSizes[size])} />
  );

  return (
    <button
      type={type}
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className={clsx('mr-2', iconSizes[size])}>
              {icon}
            </span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className={clsx('ml-2', iconSizes[size])}>
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
