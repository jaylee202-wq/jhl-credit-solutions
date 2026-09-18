"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VideoHeroPlaceholderProps {
  /** Path to the hero MP4, e.g. "/videos/JHL-Credit-Solutions-Hero.mp4" */
  videoSrc?: string;
  posterSrc?: string;
  className?: string;
}

const DEFAULT_VIDEO_SRC = "/videos/JHL-Credit-Solutions-Hero.mp4";

export function VideoHeroPlaceholder({
  videoSrc = DEFAULT_VIDEO_SRC,
  posterSrc,
  className,
}: VideoHeroPlaceholderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    video.muted = true;
    setIsMuted(true);

    const attemptPlay = () => {
      void video.play().catch(() => {
        // Autoplay may be blocked; visitor can still use the page without a hard failure.
      });
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener("loadeddata", attemptPlay, { once: true });
    }

    return () => {
      video.removeEventListener("loadeddata", attemptPlay);
    };
  }, [videoSrc, hasError]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted && video.paused) {
      void video.play().catch(() => {});
    }
  }, []);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-xl bg-navy-dark shadow-2xl",
        className,
      )}
    >
      {!hasError ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          aria-label="JHL Credit Solutions credit journey overview video"
          onError={() => setHasError(true)}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-dark via-navy to-navy-light px-6 text-center"
          role="img"
          aria-label="Video unavailable"
        >
          <p className="max-w-sm text-sm text-white/80 leading-relaxed">
            Video preview is temporarily unavailable. Please continue exploring
            JHL Credit Solutions below.
          </p>
        </div>
      )}

      {!hasError && (
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
          <button
            type="button"
            onClick={toggleMute}
            className="rounded-full border border-gold/40 bg-navy/80 p-2.5 text-white shadow-md backdrop-blur-sm transition-colors hover:border-gold hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <svg
                className="h-5 w-5 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
