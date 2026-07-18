import React, { useEffect, useRef, useState } from 'react';
import { useMousePosition, useScrollY } from '../../hooks';
import './Hero.css';

/* ── Poster data ── */
const POSTERS = [
  { src: '/images/yakshaikya_poster.png', x: 8,  y: 12, rot: -6,  scale: 0.82 },
  { src: '/images/krishne_poster.png',    x: 76, y: 8,  rot: 5,   scale: 0.75 },
  { src: '/images/life_poster.png',       x: 82, y: 55, rot: -4,  scale: 0.88 },
  { src: '/images/donka_poster.png',      x: 4,  y: 58, rot: 7,   scale: 0.78 },
  { src: '/images/stories_poster.png',    x: 42, y: 5,  rot: -2,  scale: 0.65 },
];

const Hero: React.FC = () => {
  const mouse = useMousePosition();
  const scrollY = useScrollY();
  const [ready, setReady] = useState(false);
  const [titleIn, setTitleIn] = useState(false);

  const particlesRef = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 20 + Math.random() * 70,
      size: Math.random() * 2 + 0.5,
      dur: 6 + Math.random() * 8,
      delay: Math.random() * 6,
    }))
  );

  useEffect(() => {
    const t1 = setTimeout(() => setReady(true), 100);
    const t2 = setTimeout(() => setTitleIn(true), 500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const px = (mouse.x / (window.innerWidth  || 1) - 0.5);
  const py = (mouse.y / (window.innerHeight || 1) - 0.5);
  const scrollFade = Math.max(0, 1 - scrollY / 600);

  return (
    <section id="hero" className="hero-art" style={{ opacity: scrollFade }}>

      {/* ── POSTER FRAGMENTS ── */}
      <div className="poster-field">
        {POSTERS.map((p, i) => (
          <div
            key={i}
            className={`poster-frag frag-${i} ${ready ? 'in' : ''}`}
            style={{
              left: `${p.x}%`,
              top:  `${p.y}%`,
              transform: `
                rotate(${p.rot + px * 3}deg)
                scale(${p.scale})
                translate(${px * (12 + i * 6)}px, ${py * (8 + i * 4)}px)
              `,
            }}
          >
            <img src={p.src} alt="" />
            <div className="frag-overlay" />
          </div>
        ))}
      </div>

      {/* ── GRAIN ── */}
      <div className="hero-grain-art" />

      {/* ── PARTICLES ── */}
      <div className="particle-field" aria-hidden="true">
        {particlesRef.current.map(p => (
          <span key={p.id} className="p-dot"
            style={{
              left: `${p.x}%`,
              top:  `${p.y}%`,
              width:  `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.dur}s`,
              animationDelay:    `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className={`hero-stage ${titleIn ? 'in' : ''}`}
        style={{ transform: `translate(${px * 8}px, ${py * 5}px)` }}>

        {/* Micro label */}
        <p className="hero-micro-label">
          <span className="ml-dash">—</span>
          Independent Creative Platform
          <span className="ml-dash">—</span>
        </p>

        {/* ONE LINE TITLE */}
        <h1 className="hero-headline">
          <span className="hl-kala">Kala</span><span className="hl-premi">premi</span>
          <span className="hl-space"> </span>
          <span className="hl-prod">Productions</span>
        </h1>

        {/* Ornament */}
        <div className="title-ornament">
          <div className="orn-line" />
          <svg className="orn-diamond" viewBox="0 0 16 16" fill="none">
            <rect x="8" y="0.5" width="10" height="10" rx="0.5"
              transform="rotate(45 8 8)"
              fill="none" stroke="#F0C040" strokeWidth="1" />
            <rect x="8" y="3.5" width="4" height="4" rx="0.2"
              transform="rotate(45 8 8)"
              fill="#F0C040" opacity="0.5" />
          </svg>
          <div className="orn-line" />
        </div>

        {/* Tagline */}
        <p className="hero-tag">
          Dance &nbsp;·&nbsp; Cinema &nbsp;·&nbsp; Visual Arts &nbsp;·&nbsp; Storytelling
        </p>

        {/* CTA */}
        <div className="hero-actions">
          <button className="btn-art-primary"
            onClick={() => document.getElementById('films')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Explore Films</span>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 11L11 2M11 2H5M11 2v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="btn-art-ghost"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            Our Story
          </button>
        </div>
      </div>

      {/* ── BOTTOM ROW ── */}
      <div className={`hero-bottom-row ${titleIn ? 'in' : ''}`}>
        <div className="hb-stats">
          {[['5+','Films'],['6','Artists'],['∞','Stories']].map(([n,l]) => (
            <div key={l} className="hb-stat">
              <span className="hb-n">{n}</span>
              <span className="hb-l">{l}</span>
            </div>
          ))}
        </div>

        <button className="scroll-cue"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="sc-line" />
          <span className="sc-text">Scroll</span>
        </button>

        <div className="hb-socials">
          <a href="https://www.instagram.com/kalapremi.productions/" target="_blank" rel="noreferrer" className="hb-social">Instagram</a>
          <span className="hb-dot">·</span>
          <a href="http://www.youtube.com/@KalapremiProductions" target="_blank" rel="noreferrer" className="hb-social">YouTube</a>
        </div>
      </div>

      {/* ── YEAR LABEL ── */}
      <div className={`year-label ${titleIn ? 'in' : ''}`}>
        <span>EST.</span><span className="yl-year">2022</span>
      </div>

    </section>
  );
};

export default Hero;
