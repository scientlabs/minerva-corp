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
  const [nextIndex, setNextIndex] = useState(1);
  const fadeDuration = 2000; // 2s fade overlap
  const playDuration = 5000; // 5s full play before fade

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

  // Play the active video and pause others whenever index changes
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === currentIndex) {
        try {
          v.currentTime = 0;
          const p = v.play();
          if (p && p.catch) p.catch(() => {});
          
          // Set timeout to advance to next video after 5 seconds
          timeoutRef.current = setTimeout(() => {
            setCurrentIndex((i) => (i + 1) % videos.length);
          }, 5000);
        } catch (e) {
          // ignore play errors (autoplay policies)
        }
      } else {
        try { v.pause(); } catch (e) {}
      }
    });

    // Cleanup timeout on unmount or index change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex]);

  useEffect(() => {
    // Initialize first video
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      firstVideo.currentTime = 0;
      firstVideo.play().catch(() => {});
      firstVideo.style.opacity = 1;
    }

    let timer;

    const loop = () => {
      const current = videoRefs.current[currentIndex];
      const next = videoRefs.current[nextIndex];
      if (!current || !next) return;

      // Prepare next video
      next.currentTime = 0;
      next.play().catch(() => {});
      next.style.transition = `opacity ${fadeDuration}ms ease-in-out`;
      current.style.transition = `opacity ${fadeDuration}ms ease-in-out`;

      // Wait 5 seconds before starting fade
      timer = setTimeout(() => {
        // Start fade overlap
        next.style.opacity = 1;
        current.style.opacity = 0;

        // After fade completes, pause the old video and advance index
        setTimeout(() => {
          current.pause();
          const newCurrent = nextIndex;
          const newNext = (nextIndex + 1) % videos.length;
          setCurrentIndex(newCurrent);
          setNextIndex(newNext);
        }, fadeDuration);
      }, playDuration);
    };

    loop();

    return () => clearTimeout(timer);
  }, [currentIndex]);


  const handleEnded = () => setCurrentIndex((i) => (i + 1) % videos.length);
  const goPrev = () => setCurrentIndex((i) => (i - 1 + videos.length) % videos.length);
  const goNext = () => setCurrentIndex((i) => (i + 1) % videos.length);

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
          onEnded={handleEnded}
          className={`absolute w-full h-full object-cover transition-opacity duration-700 ${idx === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
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
