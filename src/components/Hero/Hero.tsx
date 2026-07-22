import React, { useEffect, useRef, useState } from 'react';
import { useScrollY } from '../../hooks';
import './Hero.css';

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  alpha: number;
  width: number;
}

const Hero: React.FC = () => {
  const scrollY = useScrollY();
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Upward Golden Shooting Stars Canvas Effect (Bottom to Top)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Shooting stars rising from bottom to top
    const stars: ShootingStar[] = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * height * 0.8,
      length: Math.random() * 32 + 15,
      speed: Math.random() * 2.4 + 1.2,
      alpha: Math.random() * 0.45 + 0.15,
      width: Math.random() * 1.8 + 0.8,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render upward shooting stars with gold tail trails
      stars.forEach((star) => {
        star.y -= star.speed;

        // Reset to bottom when reaching the top
        if (star.y < -star.length) {
          star.y = height + Math.random() * 100;
          star.x = Math.random() * width;
          star.speed = Math.random() * 2.4 + 1.2;
        }

        // Draw elongated gold shooting star trail
        const gradient = ctx.createLinearGradient(star.x, star.y, star.x, star.y + star.length);
        gradient.addColorStop(0, `rgba(240, 192, 64, ${star.alpha})`);
        gradient.addColorStop(0.4, `rgba(240, 192, 64, ${star.alpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(240, 192, 64, 0)');

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x, star.y + star.length);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.width;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(240, 192, 64, 0.6)';
        ctx.stroke();

        // Star tip point highlight
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.width, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 180, ${star.alpha * 0.9})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Camera Reacts Exclusively to Scroll: Smooth Zooming & Rotation
  const apertureRotation = scrollY * 0.35;
  const apertureScale = 1 + (scrollY / 300) * 1.4; // Smooth zoom on scroll
  const stageOffsetY = Math.min(120, scrollY * 0.3);
  const scrollFade = Math.max(0, 1 - scrollY / 650);

  // Aperture F-stop markings
  const fStops = ['f/1.4', 'f/2.0', 'f/2.8', 'f/4.0', 'f/5.6', 'f/8.0', 'f/11', 'f/16'];

  return (
    <section id="hero" className="hero-camera-bg" style={{ opacity: scrollFade }}>
      {/* ── SHOOTING STARS CANVAS ── */}
      <canvas ref={canvasRef} className="camera-projector-canvas" />

      {/* ── CINEMA 35MM CAMERA VIEWFINDER BRACKETS ── */}
      <div className="camera-viewfinder-hud">
        <div className="vf-corner-tl" />
        <div className="vf-corner-tr" />
        <div className="vf-corner-bl" />
        <div className="vf-corner-br" />
        <div className="vf-center-crosshair">
          <div className="cross-h" />
          <div className="cross-v" />
        </div>
      </div>

      {/* ── ABSTRACT FILM SPROCKET HOLES ── */}
      <div className="film-sprocket-strip strip-left">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="sprocket-hole" />
        ))}
      </div>
      <div className="film-sprocket-strip strip-right">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="sprocket-hole" />
        ))}
      </div>

      {/* ── LIGHTER YET NOTICEABLE CAMERA APERTURE LENS RING ── */}
      <div
        className={`camera-aperture-ring lighter-aperture ${ready ? 'in' : ''}`}
        style={{
          transform: `translate(-50%, -50%) rotate(${apertureRotation}deg) scale(${apertureScale})`,
        }}
      >
        <svg viewBox="0 0 650 650" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer Lens Diameter Ring */}
          <circle cx="325" cy="325" r="300" stroke="rgba(240, 192, 64, 0.22)" strokeWidth="1.5" strokeDasharray="8 12" />
          <circle cx="325" cy="325" r="250" stroke="rgba(240, 192, 64, 0.16)" strokeWidth="1.2" />
          <circle cx="325" cy="325" r="180" stroke="rgba(240, 192, 64, 0.28)" strokeWidth="1.5" />

          {/* Aperture Diaphragm Blades */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 325 + 180 * Math.cos(rad);
            const y1 = 325 + 180 * Math.sin(rad);
            const x2 = 325 + 300 * Math.cos(rad + 0.35);
            const y2 = 325 + 300 * Math.sin(rad + 0.35);
            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(240, 192, 64, 0.18)"
                strokeWidth="1.2"
              />
            );
          })}

          {/* F-Stop Markings Placed Direct In-Between Concentric Lines (r = 215) */}
          {fStops.map((f, i) => {
            const angleDeg = i * 45 + 22.5; // Offset by 22.5 deg to center neatly between blade lines
            const rad = (angleDeg * Math.PI) / 180;
            const textRadius = 215; // Directly in-between r=180 and r=250 concentric circles!
            const tx = 325 + textRadius * Math.cos(rad);
            const ty = 325 + textRadius * Math.sin(rad);

            return (
              <text
                key={f}
                x={tx}
                y={ty}
                fill="rgba(240, 192, 64, 0.55)"
                fontSize="11"
                fontWeight="500"
                fontFamily="'Space Grotesk', monospace"
                textAnchor="middle"
                dominantBaseline="central"
                className="fstop-svg-text"
                transform={`rotate(${angleDeg + 90}, ${tx}, ${ty})`}
              >
                {f}
              </text>
            );
          })}
        </svg>
      </div>

      {/* ── CINEMATIC GRAIN ── */}
      <div className="hero-grain-camera" />

      {/* ── MAIN STAGE CONTENT ── */}
      <div
        className={`hero-stage-camera ${ready ? 'in' : ''}`}
        style={{ transform: `translateY(${stageOffsetY}px)` }}
      >
        {/* Micro Label */}
        <p className="camera-eyebrow">
          <span className="eyebrow-dash">—</span>
          Independent Creative Platform
          <span className="eyebrow-dash">—</span>
        </p>

        {/* TWO-LINE TYPOGRAPHY */}
        <h1 className="camera-headline">
          <div className="line-kalapremi">
            <span className="k-yellow">K</span>
            <span className="rest-white">alapremi</span>
          </div>
          <div className="line-productions">
            <span className="prod-text">PRODUCTIONS</span>
          </div>
        </h1>

        {/* Golden Diamond Ornament */}
        <div className="camera-divider">
          <div className="c-div-line" />
          <svg className="c-div-diamond" viewBox="0 0 16 16" fill="none">
            <rect
              x="8"
              y="0.5"
              width="10"
              height="10"
              rx="0.5"
              transform="rotate(45 8 8)"
              fill="none"
              stroke="#F0C040"
              strokeWidth="1"
            />
            <rect
              x="8"
              y="3.5"
              width="4"
              height="4"
              rx="0.2"
              transform="rotate(45 8 8)"
              fill="#F0C040"
              opacity="0.5"
            />
          </svg>
          <div className="c-div-line" />
        </div>

        {/* Tagline */}
        <p className="camera-tagline">
          Dance &nbsp;·&nbsp; Cinema &nbsp;·&nbsp; Visual Arts &nbsp;·&nbsp; Storytelling
        </p>

        {/* CTA BUTTONS */}
        <div className="camera-cta-group">
          <button
            className="btn-gold-camera"
            onClick={() => document.getElementById('films')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Explore Films</span>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 11L11 2M11 2H5M11 2v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>

          <button
            className="btn-ghost-camera"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Our Story
          </button>
        </div>
      </div>

      {/* ── MINIMAL CAMERA HUD BOTTOM BAR ── */}
      <div className={`camera-bottom-bar ${ready ? 'in' : ''}`}>
        <div className="hud-left-info">
          <span>35MM 4K RAW</span>
          <span className="hud-sep">•</span>
          <span>EST. 2022</span>
        </div>

        {/* Scroll Cue */}
        <button
          className="camera-scroll-cue"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll to About section"
        >
          <span className="cue-line-cam" />
          <span className="cue-text-cam">Scroll</span>
        </button>

        {/* Social Links */}
        <div className="hud-right-info">
          <a
            href="https://www.instagram.com/kalapremi.productions/"
            target="_blank"
            rel="noreferrer"
            className="social-hud-link"
          >
            Instagram
          </a>
          <span className="hud-sep">•</span>
          <a
            href="http://www.youtube.com/@KalapremiProductions"
            target="_blank"
            rel="noreferrer"
            className="social-hud-link"
          >
            YouTube
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
