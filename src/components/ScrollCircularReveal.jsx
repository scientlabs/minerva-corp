import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';

const ScrollCircularReveal = ({ 
  children,
  backgroundColor = 'rgba(255, 255, 255, 1)',
  scrollThreshold = 800, // pixels of scroll before full cover
  corner = 'center' // 'center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'
}) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Calculate the maximum radius needed to cover the entire screen
  const [maxRadius, setMaxRadius] = useState(0);

  useEffect(() => {
    const calculateMaxRadius = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Diagonal distance ensures complete coverage, add some extra for smooth transition
      return Math.sqrt(width * width + height * height) * 1.2;
    };
    
    setMaxRadius(calculateMaxRadius());
    
    const handleResize = () => {
      setMaxRadius(calculateMaxRadius());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Transform scroll position to radius
  // When scroll = 0, radius = 0 (no overlay, video fully visible)
  // When scroll = scrollThreshold, radius = maxRadius (overlay fully covers)
  // We want to hide the overlay completely at the top of the page
  const radius = useTransform(
    scrollY,
    [0, scrollThreshold],
    [0, maxRadius],
    { clamp: true }
  );
  
  // Opacity: hide overlay completely at top (no circle visible), show gradually as scrolling starts
  const opacity = useTransform(
    scrollY,
    [0, 100], // Start showing overlay after 100px scroll for smoother transition
    [0, 1],
    { clamp: true }
  );

  // Create mask-image that creates a circular hole in the white overlay
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
    
    // Calculate the hole size based on radius
    // When radiusValue = 0: large hole (most of screen visible)
    // When radiusValue = maxRadius: no hole (completely covered)
    const width = window.innerWidth;
    const height = window.innerHeight;
    const diagonal = Math.sqrt(width * width + height * height);
    
    // Calculate hole size - smaller as radius increases
    // radiusValue increases from 0 to maxRadius as we scroll
    // holeSize should decrease from large to small
    if (!maxRadius || maxRadius === 0) {
      // Return fully transparent mask (completely hidden overlay)
      return `radial-gradient(circle at ${centerX} ${centerY}, transparent 0%, transparent 100%)`;
    }
    
    const radiusRatio = radiusValue / maxRadius;
    // Invert: when radiusRatio is 0, hole is large (near 100%), when radiusRatio is 1, hole is small (near 0%)
    // Start with a large hole that shrinks as we scroll
    const holeSizePercent = Math.max((1 - radiusRatio) * 100, 0);
    
    // Radial gradient: transparent center (hole showing video), black outside (white overlay)
    // As holeSizePercent decreases, less transparent area = more white overlay visible
    return `radial-gradient(circle at ${centerX} ${centerY}, transparent 0%, transparent ${holeSizePercent}%, black ${Math.min(holeSizePercent + 0.5, 100)}%)`;
  };

  // Use motion value for mask-image
  const maskImage = useTransform(radius, (r) => getMaskImage(r));
  

  if (maxRadius === 0) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-30 pointer-events-none"
      style={{
        maskImage: maskImage,
        WebkitMaskImage: maskImage,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        backgroundColor: backgroundColor,
        opacity: opacity,
      }}
    >
      <div className="w-full h-full bg-white" />
    </motion.div>
  );
};

export default ScrollCircularReveal;

