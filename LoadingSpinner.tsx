import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  fullScreen = false, 
  message = 'جاري التحميل...',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4" role="status" aria-live="polite">
      <ArrowPathIcon 
        className={`${sizeClasses[size]} text-yellow-400 animate-spin`}
        aria-hidden="true"
      />
      <p className="font-black animate-pulse text-center">
        {message}
      </p>
      <span className="sr-only">{message}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8 text-slate-600">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
