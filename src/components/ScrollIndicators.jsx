import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollIndicators = () => {
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show scroll down indicator when near the top
      setShowScrollDown(scrollTop < 100);

      // Show scroll up indicator when near the bottom (within 100px of bottom)
      setShowScrollUp(scrollTop + windowHeight >= documentHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Scroll Down Indicator */}
      <AnimatePresence>
        {showScrollDown && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollDown}
            className="fixed right-4 bottom-20 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200"
            style={{ backgroundColor: 'rgba(224, 43, 138, 0.8)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(224, 43, 138, 1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(224, 43, 138, 0.8)'}
            aria-label="Scroll down"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll Up Indicator */}
      <AnimatePresence>
        {showScrollUp && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed right-4 bottom-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200"
            style={{ backgroundColor: 'rgba(224, 43, 138, 0.8)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(224, 43, 138, 1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(224, 43, 138, 0.8)'}
            aria-label="Scroll to top"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollIndicators;

