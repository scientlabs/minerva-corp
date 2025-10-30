"use client";

import React, { useState, useEffect, useRef } from 'react';
import bgVideo1 from '../assets/241395_tiny.mp4';
import bgVideo2 from '../assets/174086-850404739_tiny.mp4';
import bgVideo3 from '../assets/Multi_Technology.mp4';

const videos = [bgVideo1, bgVideo2, bgVideo3];

export default function VideoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);

  // keep refs within bounds
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, []);

  // Play the active video and pause others whenever index changes
  useEffect(() => {
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === currentIndex) {
        try {
          v.currentTime = 0;
          const p = v.play();
          if (p && p.catch) p.catch(() => {});
        } catch (e) {
          // ignore play errors (autoplay policies)
        }
      } else {
        try { v.pause(); } catch (e) {}
      }
    });
  }, [currentIndex]);

  const handleEnded = () => setCurrentIndex((i) => (i + 1) % videos.length);
  const goPrev = () => setCurrentIndex((i) => (i - 1 + videos.length) % videos.length);
  const goNext = () => setCurrentIndex((i) => (i + 1) % videos.length);

  return (
    <div className="absolute inset-0">
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
            className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
