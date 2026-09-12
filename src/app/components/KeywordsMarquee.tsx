"use client";

import React from "react";

const TEXT_WORDS = [
  "Mobile Apps",
  "Development",
  "Design",
  "SEO",
  "Ranking",
];

export default function KeywordsMarquee() {
  return (
    <div className="cases__text-marquee">
      <div className="cases__text-group">
        {[...TEXT_WORDS, ...TEXT_WORDS, ...TEXT_WORDS, ...TEXT_WORDS].map((w, i) => (
          <div key={i} className="cases__text-item">
            {w} <span className="cases__text-star">✦</span>
          </div>
        ))}
      </div>
      <div className="cases__text-group" aria-hidden="true">
        {[...TEXT_WORDS, ...TEXT_WORDS, ...TEXT_WORDS, ...TEXT_WORDS].map((w, i) => (
          <div key={i + 100} className="cases__text-item">
            {w} <span className="cases__text-star">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
