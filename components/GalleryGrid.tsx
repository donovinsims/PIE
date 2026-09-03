"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type GalleryImage = { full: string; mobile: string; alt: string };

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Initialize from the media query once; only update in response to external
  // changes (the listener callback), never synchronously in an effect body.
  const [reducedMotion, setReducedMotion] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Reflect external prefers-reduced-motion changes on the lightbox transition.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = useCallback(() => {
    setActiveIndex(null);
    dialogRef.current?.close();
  }, []);

  const open = useCallback((index: number) => {
    setActiveIndex(index);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setActiveIndex((current) => (current === null ? current : (current + dir + images.length) % images.length));
    },
    [images.length],
  );

  // Keyboard: Escape closes (native), ArrowLeft/ArrowRight navigate.
  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeIndex, go]);

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <section className="gallery-grid" aria-label="Pietro's Pizzeria photo gallery">
        {images.map((image, i) => (
          <button
            type="button"
            key={image.full}
            className="gallery-thumb"
            onClick={() => open(i)}
            aria-label={`View larger: ${image.alt}`}
          >
            <img
              src={image.full}
              srcSet={`${image.mobile} 640w, ${image.full} 1920w`}
              sizes="(max-width: 899px) calc((100vw - 50px) / 2), 280px"
              alt={image.alt}
              loading="lazy"
            />
          </button>
        ))}
      </section>

      <dialog
        ref={dialogRef}
        className="gallery-lightbox"
        aria-label="Gallery lightbox"
        onClose={close}
        onClick={(e) => {
          // Click on backdrop closes the dialog.
          if (e.target === dialogRef.current) close();
        }}
      >
        {active && (
          <div className={`lightbox-content${reducedMotion ? " no-motion" : ""}`}>
            <img src={active.full} alt={active.alt} />
            <div className="lightbox-meta">
              <span>{active.alt}</span>
              <span className="lightbox-count">
                {activeIndex! + 1} / {images.length}
              </span>
            </div>
          </div>
        )}
        <div className="lightbox-controls">
          <button type="button" className="lightbox-btn" onClick={() => go(-1)} aria-label="Previous image">
            ‹
          </button>
          <button type="button" className="lightbox-btn close" onClick={close} aria-label="Close lightbox">
            ✕
          </button>
          <button type="button" className="lightbox-btn" onClick={() => go(1)} aria-label="Next image">
            ›
          </button>
        </div>
      </dialog>
    </>
  );
}
