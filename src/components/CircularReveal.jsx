import React, { useState, useEffect, useRef } from 'react';

const CircularReveal = ({ 
  children, 
  trigger = false,
  corner = 'top-left', // 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center', 'all'
  duration = 1000,
  backgroundColor = 'rgba(0, 0, 0, 0.95)',
  onComplete = null
}) => {
  const [isRevealing, setIsRevealing] = useState(false);
  const containerRef = useRef(null);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    if (trigger && !isRevealing) {
      setIsRevealing(true);
      
      // Calculate maximum radius needed
      const calculateRadius = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        // Diagonal distance ensures complete coverage
        return Math.sqrt(width * width + height * height);
      };
      
      const maxRadius = calculateRadius();
      setRadius(maxRadius);
      
      // Call onComplete after animation duration
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [trigger, isRevealing, duration, onComplete]);

  const getClipPath = () => {
    if (!isRevealing || radius === 0) {
      // Starting state - no reveal
      switch (corner) {
        case 'all':
          // For 'all', start from center with very small radius
          return `circle(0px at 50% 50%)`;
        case 'top-left':
          return `circle(0px at 0% 0%)`;
        case 'top-right':
          return `circle(0px at 100% 0%)`;
        case 'bottom-left':
          return `circle(0px at 0% 100%)`;
        case 'bottom-right':
          return `circle(0px at 100% 100%)`;
        case 'center':
          return `circle(0px at 50% 50%)`;
        default:
          return `circle(0px at 0% 0%)`;
      }
    } else {
      // Expanding state - circles growing to cover screen
      switch (corner) {
        case 'all':
          // For 'all', use a large circle from center that covers everything
          return `circle(${radius * 1.5}px at 50% 50%)`;
        case 'top-left':
          return `circle(${radius}px at 0% 0%)`;
        case 'top-right':
          return `circle(${radius}px at 100% 0%)`;
        case 'bottom-left':
          return `circle(${radius}px at 0% 100%)`;
        case 'bottom-right':
          return `circle(${radius}px at 100% 100%)`;
        case 'center':
          return `circle(${radius}px at 50% 50%)`;
        default:
          return `circle(${radius}px at 0% 0%)`;
      }
    }
  };

  const getOrigin = () => {
    switch (corner) {
      case 'top-left':
        return '0% 0%';
      case 'top-right':
        return '100% 0%';
      case 'bottom-left':
        return '0% 100%';
      case 'bottom-right':
        return '100% 100%';
      case 'center':
        return '50% 50%';
      case 'all':
        return 'center';
      default:
        return '0% 0%';
    }
  };

  if (!trigger && !isRevealing) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{
        clipPath: getClipPath(),
        WebkitClipPath: getClipPath(),
        transition: `clip-path ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        backgroundColor: backgroundColor,
        transformOrigin: getOrigin(),
      }}
    >
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default CircularReveal;

