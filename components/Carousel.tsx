"use client";

import { useState, type ReactNode } from "react";

type Props = {
  label: string;
  slides: ReactNode[];
};

export function Carousel({ label, slides }: Props) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const go = (dir: number) => {
    setIndex((i) => (i + dir + total) % total);
  };

  if (total === 0) {
    return (
      <div>
        <div className="flex items-center gap-2.5 mb-3">
          <span className="acc-mark" aria-hidden style={{ transform: "rotate(45deg)" }}>
            +
          </span>
          <span className="font-serif text-xl">{label}</span>
        </div>
        <p className="text-muted text-sm px-1">还没有内容。</p>
      </div>
    );
  }

  return (
    <section className="py-2">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-serif text-xl">{label}</span>
        <span className="eyebrow ml-auto">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            className="carousel-btn"
            onClick={() => go(-1)}
            aria-label="上一页"
            disabled={total <= 1}
          >
            ‹
          </button>
          <button
            type="button"
            className="carousel-btn"
            onClick={() => go(1)}
            aria-label="下一页"
            disabled={total <= 1}
          >
            ›
          </button>
        </div>
      </div>

      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              className="carousel-slide"
              key={i}
              inert={i !== index ? true : undefined}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-dots" role="tablist" aria-label={`${label}分页`}>
        {slides.map((_, i) => (
          <button
            type="button"
            key={i}
            className="carousel-dot"
            data-active={i === index}
            aria-label={`第 ${i + 1} 页`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
