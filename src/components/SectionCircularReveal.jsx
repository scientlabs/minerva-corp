import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';

const SectionCircularReveal = ({ 
  children,
  triggerRef,
  backgroundColor = '#1e40af', // Default blue
  backgroundImage = null,
  startOffset = 0, // Scroll position where reveal starts
  revealDistance = 800, // Distance over which reveal happens
  corner = 'center'
}) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Calculate the maximum radius needed to cover the entire screen
  const [maxRadius, setMaxRadius] = useState(0);
  const [triggerPosition, setTriggerPosition] = useState(0);

  useEffect(() => {
    const calculateMaxRadius = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      return Math.sqrt(width * width + height * height) * 1.2;
    };
    
    setMaxRadius(calculateMaxRadius());
    
    const handleResize = () => {
      setMaxRadius(calculateMaxRadius());
      updateTriggerPosition();
    };
    
    const updateTriggerPosition = () => {
      if (triggerRef?.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        setTriggerPosition(scrollTop + rect.bottom);
      }
    };
    
    updateTriggerPosition();
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updateTriggerPosition);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateTriggerPosition);
    };
  }, [triggerRef]);

  // Transform scroll position to radius
  // When scroll reaches trigger position, start revealing (radius increases)
  const radius = useTransform(
    scrollY,
    [triggerPosition + startOffset, triggerPosition + startOffset + revealDistance],
    [0, maxRadius],
    { clamp: true }
  );

  // Opacity: hide when not in reveal zone
  const opacity = useTransform(
    scrollY,
    [triggerPosition + startOffset - 100, triggerPosition + startOffset + revealDistance],
    [0, 1, 1],
    { clamp: true }
  );

  // Create mask-image that creates a circular hole
  const getMaskImage = (currentRadius) => {
    const radiusValue = currentRadius || 0;
    
    let centerX = '50%';
    let centerY = '50%';
    
    switch (corner) {
      case 'center':
        centerX = '50%';
        centerY = '50%';
        break;
      case 'top-left':
        centerX = '0%';
        centerY = '0%';
        break;
      case 'top-right':
        centerX = '100%';
        centerY = '0%';
        break;
      case 'bottom-left':
        centerX = '0%';
        centerY = '100%';
        break;
      case 'bottom-right':
        centerX = '100%';
        centerY = '100%';
        break;
    }
    
    if (!maxRadius || maxRadius === 0 || radiusValue === 0) {
      // Completely hidden - no circle visible
      return `radial-gradient(circle at ${centerX} ${centerY}, transparent 0%, transparent 100%)`;
    }
    
    const radiusRatio = radiusValue / maxRadius;
    // Invert: when radiusRatio is 0, hole is large (100%), when radiusRatio is 1, hole is small (0%)
    const holeSizePercent = Math.max((1 - radiusRatio) * 100, 0);
    
    // Radial gradient: transparent center (hole), black outside (shows background)
    return `radial-gradient(circle at ${centerX} ${centerY}, transparent 0%, transparent ${holeSizePercent}%, black ${Math.min(holeSizePercent + 0.5, 100)}%)`;
  };

  const maskImage = useTransform(radius, (r) => getMaskImage(r));

  if (maxRadius === 0) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 28,
        maskImage: maskImage,
        WebkitMaskImage: maskImage,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: opacity,
      }}
    >
      {backgroundImage && <div className="w-full h-full" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />}
      {!backgroundImage && <div className="w-full h-full" style={{ backgroundColor }} />}
      {children}
    </motion.div>
  );
};

export default SectionCircularReveal;

