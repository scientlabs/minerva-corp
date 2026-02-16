"use client";

import React, { useState, useEffect, useRef } from 'react';
import bgVideo1 from '../assets/241395_tiny.mp4';
import bgVideo2 from '../assets/5G-1.mp4';
import bgVideo3 from '../assets/Multi_Technology.mp4';
import bgVideo4 from '../assets/174086-850404739_tiny.mp4';

const videos = [bgVideo1, bgVideo4, bgVideo2, bgVideo3];

export default function VideoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);
  const touchStartX = useRef(null);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const autoPlayTimeoutRef = useRef(null);
  const fadeDuration = 2000; // 2s fade transition
  const playDuration = 5000; // 5s play before fade

  // keep refs within bounds
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goPrev();
      } else if (e.key === 'ArrowRight') {
        goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle touch/pointer events for sliding
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    
    const touchEndX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = touchStartX.current - touchEndX;
    
    // Require at least 50px slide to trigger navigation
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    
    touchStartX.current = null;
  };

  // Auto-advance videos with fade
  useEffect(() => {
    // Clear any existing timeout
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }

    const current = videoRefs.current[currentIndex];
    if (!current) return;

    // Play current video
    current.currentTime = 0;
    current.style.opacity = '1';
    current.style.transition = `opacity ${fadeDuration}ms ease-in-out`;
    current.play().catch(() => {});

    // Pause all other videos and set their opacity
    videoRefs.current.forEach((v, idx) => {
      if (v && idx !== currentIndex) {
        v.pause();
        v.style.opacity = '0';
        v.style.transition = `opacity ${fadeDuration}ms ease-in-out`;
      }
    });

    // Auto-advance after playDuration
    autoPlayTimeoutRef.current = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % videos.length;
      const next = videoRefs.current[nextIndex];
      
      if (!next) return;

      // Prepare next video
      next.currentTime = 0;
      next.style.opacity = '0';
      next.style.transition = `opacity ${fadeDuration}ms ease-in-out`;
      next.play().catch(() => {});

      // Start fade transition
      requestAnimationFrame(() => {
        next.style.opacity = '1';
        current.style.opacity = '0';

        // After fade completes, pause old video and update index
        setTimeout(() => {
          current.pause();
          setCurrentIndex(nextIndex);
        }, fadeDuration);
      });
    }, playDuration);

    // Cleanup
    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [currentIndex]);

  // Smooth fade transition between videos
  const transitionToVideo = (newIndex) => {
    const current = videoRefs.current[currentIndex];
    const next = videoRefs.current[newIndex];
    
    if (!current || !next) return;

    // Clear auto-play timeout when manually navigating
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }

    // Prepare next video
    next.currentTime = 0;
    next.style.opacity = '0';
    next.style.transition = `opacity ${fadeDuration}ms ease-in-out`;
    next.play().catch(() => {});

    // Set current video transition
    current.style.transition = `opacity ${fadeDuration}ms ease-in-out`;

    // Start fade transition
    requestAnimationFrame(() => {
      next.style.opacity = '1';
      current.style.opacity = '0';

      // After fade completes, pause old video and update index
      setTimeout(() => {
        current.pause();
        setCurrentIndex(newIndex);
      }, fadeDuration);
    });
  };

  const handleEnded = () => {
    const nextIndex = (currentIndex + 1) % videos.length;
    transitionToVideo(nextIndex);
  };

  const goPrev = () => {
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    transitionToVideo(prevIndex);
  };

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % videos.length;
    transitionToVideo(nextIndex);
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
    >
      {videos.map((src, idx) => (
        <video
          key={idx}
          ref={(el) => (videoRefs.current[idx] = el)}
          src={src}
          muted
          playsInline
          loop={false}
          onEnded={handleEnded}
          className="absolute w-full h-full object-cover"
          style={{
            opacity: idx === currentIndex ? 1 : 0,
            transition: `opacity ${fadeDuration}ms ease-in-out`,
            pointerEvents: idx === currentIndex ? 'auto' : 'none',
            zIndex: idx === currentIndex ? 1 : 0
          }}
        />
      ))}

      {/* Controls */}
      <div className="absolute left-4 bottom-6 z-20 flex items-center space-x-3">
        <button
          onClick={goPrev}
          className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
          aria-label="Previous video"
        >
          {'<'}
        </button>
        <button
          onClick={goNext}
          className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
          aria-label="Next video"
        >
          {'>'}
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute right-4 bottom-6 z-20 flex items-center space-x-2">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to video ${i + 1}`}
            className={`w-3 h-3 rounded-full ${i === currentIndex ? '' : 'bg-white/50'}`}
            style={i === currentIndex ? { backgroundColor: '#E02B8A' } : {backgroundColor: 'white'}}
          />
        ))}
      </div>
    </div>
  );
}
