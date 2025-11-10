import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FlipCard = ({
  title,
  description,
  image,
  imageAlt,
  linkTo = "/services",
  delay = 0,
  numPages = 1
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [showReveal, setShowReveal] = useState(false);
  const cardRef = useRef(null);
  const isFlippedRef = useRef(false);
  const navigate = useNavigate();

  // Use motion values for smooth animation
  const rotation = useMotionValue(0);
  const springConfig = {
    stiffness: 400,
    damping: 12,
    mass: 0.5,
    restDelta: 0.25,
    restSpeed: 0.25
  };
  const springRotation = useSpring(rotation, springConfig);

  // Find navbar height on mount and resize
  useEffect(() => {
    const navbar = document.querySelector('nav');
    if (navbar) {
      const updateNavHeight = () => {
        const height = navbar.getBoundingClientRect().height;
        setNavbarHeight(height);
      };
      updateNavHeight();
      window.addEventListener('resize', updateNavHeight);
      return () => window.removeEventListener('resize', updateNavHeight);
    }
  }, []);

  useEffect(() => {
    let scrollTimeout;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!cardRef.current) return;

      const cardRect = cardRef.current.getBoundingClientRect();
      const currentScroll = window.scrollY;
      const scrollDirection = currentScroll > lastScrollY ? 'down' : 'up';

      clearTimeout(scrollTimeout);

      // Navbar trigger point - when card reaches this, flip should complete
      const NAVBAR_PADDING = 0;
      const navbarTriggerPoint = navbarHeight + NAVBAR_PADDING;
      
      // Transition zone: starts 200px before navbar, ends when touching navbar
      const transitionStart = navbarTriggerPoint + 200;
      const transitionEnd = navbarTriggerPoint;

      const cardTop = cardRect.top;
      const isInTransitionZone = cardTop <= transitionStart && cardTop >= transitionEnd;
      const hasTouchedNavbar = cardTop <= transitionEnd;
      const isAboveTransitionZone = cardTop > transitionStart;

      if (scrollDirection === 'down') {
        if (isInTransitionZone) {
          // Calculate progress: 0 when at transitionStart, 1 when at transitionEnd
          const progress = Math.max(0, Math.min(1,
            (transitionStart - cardTop) / (transitionStart - transitionEnd)
          ));
          // Rotate from 0 to 90 degrees as card approaches navbar
          rotation.set(progress * 90);
          if (progress >= 0.99) {
            isFlippedRef.current = true;
            setIsFlipped(true);
          }
        } else if (hasTouchedNavbar) {
          // Card has reached navbar - complete the flip to 90 degrees
          rotation.set(90);
          isFlippedRef.current = true;
          setIsFlipped(true);
        } else if (isAboveTransitionZone) {
          // Card is above transition zone - no rotation
          rotation.set(0);
          isFlippedRef.current = false;
          setIsFlipped(false);
        }
      } else {
        // Scrolling up
        if (isInTransitionZone || hasTouchedNavbar) {
          // Calculate progress for reverse flip
          const progress = Math.max(0, Math.min(1,
            (transitionStart - cardTop) / (transitionStart - transitionEnd)
          ));
          // Reverse rotation: 90 degrees when at navbar, 0 when back above transition zone
          rotation.set(progress * 90);
          
          if (progress <= 0.01) {
            isFlippedRef.current = false;
            setIsFlipped(false);
          }
        } else if (isAboveTransitionZone) {
          // Card is back above transition zone - reset rotation
          rotation.set(0);
          isFlippedRef.current = false;
          setIsFlipped(false);
        }
      }

      lastScrollY = currentScroll;
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [delay, navbarHeight, rotation]);

  useEffect(() => {
    isFlippedRef.current = isFlipped;
    rotation.set(isFlipped ? 90 : 0);
  }, [isFlipped, rotation]);

  // Click handler to trigger circular reveal and navigate
  const handleClick = () => {
    navigate(linkTo);
  };

  const handleRevealComplete = () => {
    navigate(linkTo);
  };

  return (
    <>
      <div
        ref={cardRef}
        className="flip-card w-full h-[400px] md:h-[500px] cursor-pointer"
        style={{ 
          perspective: '2000px', 
          perspectiveOrigin: '50% 50%', 
          contain: 'layout size', 
          position: 'relative', 
          isolation: 'isolate',
          minHeight: '400px',
          display: 'block'
        }}
        onClick={handleClick}
      >
      <div className="relative w-full h-full preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
        {/* Visual indicator for flip zone */}
        <div
          className="absolute -top-4 left-0 w-full h-1 opacity-30"
          style={{
            background: 'linear-gradient(to right, transparent, #E02B8A, transparent)',
            transform: `scaleX(${springRotation.get() / 90})`,
            transition: 'transform 0.3s ease-out'
          }}
        />

        {/* Multiple page layers */}
        {Array.from({ length: numPages }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full preserve-3d"
            initial={{ rotateX: 0 }}
            style={{
              rotateX: springRotation,
              transformPerspective: useTransform(
                springRotation,
                [0, 45, 90],
                [2000, 1000, 2000]
              ),
              transformOrigin: 'center center',
              z: useTransform(
                springRotation,
                [0, 45, 90],
                [0, index * -10, index * -20],
                { clamp: false }
              ),
              opacity: useTransform(
                springRotation,
                [0, 45, 90],
                [1,
                  index === numPages - 1 ? 1 : 0.9 - index * 0.15,
                  index === numPages - 1 ? 1 : 0.8 - index * 0.2],
                { clamp: true }
              ),
              zIndex: springRotation.get() >= 45 ? numPages - index : index,
              willChange: 'transform'
            }}
          >
            {/* Front of Card - Two Column Layout (70/30) */}
            <div
              className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl bg-white flex flex-col md:flex-row"
              style={{
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Colored Vertical Bar */}
              <div className="w-2 md:w-5 h-full" style={{ backgroundColor: '#E02B8A' }}></div>
              {/* First Column - 70% - Title and Description */}
              <div className="w-full md:w-[20%] h-full overflow-hidden"></div>
              <div className="w-full md:w-[50%] p-6 md:p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                    {title}
                  </h3>
                </div>
                <div>

                  <div className="mt-2">
                    <hr className="border-gray-300 my-4" />
                    <p className="text-gray-700 leading-relaxed text-xl md:text-2xl">
                      {description}
                    </p>
                  </div>
                </div>

                {/* Learn More Link */}
                {/* <div className="mt-6">
                  <div className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200">
                    Learn More
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div> */}
              </div>

              {/* Second Column - 30% - Image */}
              <div className="w-full md:w-[30%] h-full overflow-hidden">
                <img
                  src={image}
                  alt={imageAlt || title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Back of Card - Content */}

          </motion.div>
        ))}
      </div>
    </div>

    </>
  );
};

export default FlipCard;
