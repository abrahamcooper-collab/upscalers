"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const TESTIMONIALS = [
  {
    id: "paul",
    quote: "Our business has been on for 6 months now, and from the time Mark Williams reached out to me, He has just made our business explode, our phone rings non-stop.",
    author: "Brent Hilliard - A & B Locksmith Owner",
    videoSrc: "https://ik.imagekit.io/j6u2tyqiv/upscalers/A_BLOCKSMITH.mp4",
  },
  {
    id: "mark",
    quote: "Most of the companies were selling me fake leads, and I would barely have customers, but when I met Abraham from Upscalers company, my company completely changed. We started having minimum of 5 leads a day, and when I increased my budget, my number of leads increased.",
    author: "Prince Asong - Prince Asong Moving Owner",
    videoSrc: "https://ik.imagekit.io/j6u2tyqiv/upscalers/prince.mp4",
  },
];

export default function VideoTestimonial() {
  const { containerRef, isVisible } = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const active = TESTIMONIALS[activeIndex];

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setTimeout(() => {
      setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setTimeout(() => {
      setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 300);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      // Unmute on explicit user interaction if desired
      if (videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch((err) => {
                console.log("Autoplay on scroll prevented by browser policy:", err);
              });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [activeIndex]);

  return (
    <section className="video-testimonial" ref={containerRef}>
      <div data-index="0" className={`video-testimonial__panel reveal-up ${isVisible(0) ? "is-visible" : ""}`}>
        <div className="vt-slider">

          {/* Left panel: quote & control buttons */}
          <div className="vt-slider__left">
            <div className="vt-slider__quote-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.189 18.666H4v-7.666c0-3.333.666-6 4-8l2.667 1.334c-1.334 1.333-2 3.333-2 5.333h6.522v9.333zM22.667 18.666H15.48v-7.666c0-3.333.666-6 4-8l2.666 1.334c-1.333 1.333-2 3.333-2 5.333h6.521v9.333z" />
              </svg>
            </div>

            <div className={`vt-slider__content-wrap ${isTransitioning ? "is-fading" : ""}`}>
              <blockquote className="vt-slider__quote">
                “{active.quote}”
              </blockquote>
              <cite className="vt-slider__author">{active.author}</cite>
            </div>

            <div className="vt-slider__controls">
              <button
                type="button"
                onClick={handlePrev}
                className="vt-slider__btn"
                aria-label="Previous feedback video"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="vt-slider__btn"
                aria-label="Next feedback video"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right panel: landscape oriented video player */}
          <div className="vt-slider__right">
            <div className="vt-player-wrapper">
              <video
                ref={videoRef}
                src={active.videoSrc}
                className="vt-player"
                playsInline
                muted={isMuted}
                loop
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              <button
                type="button"
                className={`vt-play-corner-btn ${isPlaying ? "is-hidden" : ""}`}
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause review video" : "Play review video"}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {isPlaying ? (
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  ) : (
                    <path d="M8 5v14l11-7z" />
                  )}
                </svg>
              </button>

              <button
                type="button"
                className="vt-sound-btn"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
