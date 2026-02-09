import React, { useState, useRef } from 'react';
import { useIntersectionObserver, useImageLazyLoad } from '../hooks/usePerformance';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  lazyLoad?: boolean;
  className?: string;
  aspectRatio?: string; // e.g., "16/9", "4/3", "1/1"
}

/**
 * مكون صورة محسّن مع Lazy Loading و Placeholder
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = '/placeholder.jpg',
  lazyLoad = true,
  className = '',
  aspectRatio,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  const isVisible = useIntersectionObserver(imgRef, {
    threshold: 0.1,
    rootMargin: '50px',
  });

  const shouldLoad = lazyLoad ? isVisible : true;
  const [imageSrc, isLoading] = useImageLazyLoad(shouldLoad ? (error ? fallbackSrc : src) : '');

  const handleError = () => {
    if (!error && fallbackSrc) {
      setError(true);
    }
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden bg-slate-200 ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Placeholder while loading */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse">
          <svg 
            className="w-12 h-12 text-slate-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
      )}
      
      {/* Actual Image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          loading={lazyLoad ? 'lazy' : 'eager'}
          onError={handleError}
          onLoad={handleLoad}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
