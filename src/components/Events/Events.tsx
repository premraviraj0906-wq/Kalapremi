import React, { useEffect, useState, useRef } from 'react';
import { useInView } from '../../hooks';
import { PiTicketDuotone, PiCalendarBlankDuotone, PiMapPinDuotone, PiArrowRightBold } from 'react-icons/pi';
import './Events.css';

const EVENT_DATE = new Date('2026-08-22T17:00:00+05:30');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useEventCountdown(): TimeLeft {
  const calc = (): TimeLeft => {
    const diff = EVENT_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [t, setT] = useState<TimeLeft>(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

// Custom 60fps Canvas Confetti Particle System
const ConfettiCanvas: React.FC<{ active: boolean }> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.width = canvasRef.current.offsetWidth;
      height = canvasRef.current.height = canvasRef.current.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#F0C040', '#ffffff', '#e0a916', '#ffdf80', '#e35f22'];
    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      gravity: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }

    const particles: Particle[] = [];

    // Create initial burst
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: width / 2,
        y: height / 2,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 14,
        speedY: (Math.random() - 0.7) * 18 - 4,
        gravity: 0.22,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.12,
        opacity: 1,
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.speedY += p.gravity;
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.008;

        if (p.opacity <= 0) return;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (idx % 2 === 0) {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      const activeParticles = particles.filter(p => p.opacity > 0);
      if (activeParticles.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="gala-confetti-canvas" />;
};

const Events: React.FC = () => {
  const { ref: sectionRef, inView } = useInView(0.1);
  const timeLeft = useEventCountdown();
  const pad = (n: number) => String(n).padStart(2, '0');

  // Real-time Event Lifecycles
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [triggerConfetti, setTriggerConfetti] = useState(false);

  const END_DATE = new Date('2026-08-22T20:00:00+05:30');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isCommenced = currentTime >= EVENT_DATE.getTime() && currentTime < END_DATE.getTime();
  const isEnded = currentTime >= END_DATE.getTime();

  // Trigger confetti burst on transition to commenced
  useEffect(() => {
    if (isCommenced && !isEnded) {
      setTriggerConfetti(true);
      const timer = setTimeout(() => setTriggerConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isCommenced, isEnded]);

  const highlights = [
    {
      num: '01',
      title: 'Film Screenings & Premieres',
      desc: 'Projection of multiple short films and the exclusive premiere of upcoming Kalapremi productions.',
    },
    {
      num: '02',
      title: 'Merchandise & Commissioned Art',
      desc: 'Exhibiting Kalapremi merchandise and specially commissioned original artworks by our artists.',
    },
    {
      num: '03',
      title: 'Connect with Artists',
      desc: 'A rare opportunity to meet and connect with passionate artists working across their crafts.',
    },
    {
      num: '04',
      title: 'Panel Discussion',
      desc: 'Where stories are discussed, celebrated, and reimagined — a candid conversation between creators.',
    },
  ];

  const getBadgeText = () => {
    if (isEnded) return "GALA CONCLUDED";
    if (isCommenced) return "GALA IN PROGRESS";
    return "OFFICIAL ADMIT PASS";
  };

  return (
    <section id="events" className="events-gala-section" ref={sectionRef}>
      {/* Ambient Cinema Backdrop Lighting */}
      <div className="gala-spotlight-beam" />
      <div className="gala-grid-bg" />
      <div className="gala-particles" />

      <div className="gala-container">
        {/* Section Header */}
        <div className={`gala-header ${inView ? 'visible' : ''}`}>
          <div className="gala-eyebrow">
            <span className="gold-sparkle">✦</span>
            <span>ANNUAL CREATIVE GALA 2026</span>
            <span className="gold-sparkle">✦</span>
          </div>

          <h2 className="gala-main-title">
            SHANTE <em>ISHTA</em>
          </h2>

          <p className="gala-kannada-subtitle">
            ಶಂತೆ ಇಷ್ಟ &nbsp;·&nbsp; <em>Single Eye of the Heart</em>
          </p>

          <p className="gala-lead-text">
            Join us for Kalapremi’s flagship gathering celebrating independent cinema, live performance art, and creative human connection in Bangalore.
          </p>
        </div>

        {/* ── 3D GOLDEN TICKET & LIVE COUNTDOWN HERO CARD ── */}
        <div className={`gala-hero-pass-wrap ${inView ? 'visible' : ''}`}>
          <div className={`gala-ticket-card ${isCommenced && !isEnded ? 'gala-ticket-live' : ''}`}>
            <div className="ticket-gold-border" />
            <div className="ticket-inner-glow" />
            <ConfettiCanvas active={triggerConfetti} />

            <div className="ticket-card-header">
              <div className="t-brand">
                <span className="t-brand-label">KALAPREMI <span className="font-montserrat">PRODUCTIONS</span> PRESENTS</span>
                <h3 className="t-brand-name">Shante<em>Ishta</em> ’26</h3>
              </div>
              <div className="t-badge">
                <PiTicketDuotone className="t-icon" />
                <span>{getBadgeText()}</span>
              </div>
            </div>

            {/* Render proper state: Countdown, Commenced, or Ended */}
            {isEnded ? (
              <div className="ticket-countdown-block ended-mode">
                <div className="ended-icon-decor">✦</div>
                <div className="live-showcase-title ended-banner">
                  <h3>THE GALA HAS ENDED</h3>
                  <p className="kannada-eye-phrase">ಶಂತೆ ಇಷ್ಟ &nbsp;·&nbsp; <em>Single Eye of the Heart</em></p>
                  <p className="ended-desc">Hope you enjoyed! But if you didn't attend the gala, you missed out on a lot.</p>
                </div>
              </div>
            ) : isCommenced ? (
              <div className="ticket-countdown-block live-mode commenced-mode">
                <div className="live-status-row physical-mode">
                  <div className="live-badge physical">
                    <span className="live-dot" />
                    <span>GALA IN PROGRESS</span>
                  </div>
                  <div className="live-viewers venue">
                    <span>BANGALORE, IN</span>
                  </div>
                </div>
                
                {/* Interesting Single Eye of the Heart Interactive Visualizer */}
                <div className="heart-eye-visualizer-container">
                  <div className="eye-outer-ring" />
                  <div className="eye-inner-ring" />
                  <div className="eye-pupil-glow">✦</div>
                  <div className="eye-sparkles">
                    <span className="s1">✦</span>
                    <span className="s2">✦</span>
                    <span className="s3">✦</span>
                  </div>
                </div>
                
                <div className="live-showcase-title commenced-banner">
                  <h3>THE GALA HAS COMMENCED</h3>
                  <p className="kannada-eye-phrase">ಶಂತೆ ಇಷ್ಟ &nbsp;·&nbsp; <em>Single Eye of the Heart</em></p>
                  <p className="commenced-desc">The gateway is open. Present this active pass at the entrance gate to receive your creative entry token.</p>
                </div>
              </div>
            ) : (
              <div className="ticket-countdown-block">
                <span className="tc-title">COUNTDOWN TO THE GALA</span>
                <div className="tc-grid">
                  <div className="tc-unit">
                    <span className="tc-val">{pad(timeLeft.days)}</span>
                    <span className="tc-lbl">DAYS</span>
                  </div>
                  <span className="tc-sep">:</span>
                  <div className="tc-unit">
                    <span className="tc-val">{pad(timeLeft.hours)}</span>
                    <span className="tc-lbl">HOURS</span>
                  </div>
                  <span className="tc-sep">:</span>
                  <div className="tc-unit">
                    <span className="tc-val">{pad(timeLeft.minutes)}</span>
                    <span className="tc-lbl">MINUTES</span>
                  </div>
                  <span className="tc-sep">:</span>
                  <div className="tc-unit">
                    <span className="tc-val">{pad(timeLeft.seconds)}</span>
                    <span className="tc-lbl">SECONDS</span>
                  </div>
                </div>
              </div>
            )}

            {/* Event Info & Booking Link */}
            <div className="ticket-card-footer">
              <div className="ticket-event-details">
                <div className="t-detail">
                  <PiCalendarBlankDuotone className="td-icon" />
                  <span>August 22, 2026</span>
                </div>
                <div className="t-detail">
                  <PiMapPinDuotone className="td-icon" />
                  <span>Bengaluru, Karnataka</span>
                </div>
              </div>

              {!isCommenced && !isEnded ? (
                <a
                  href="https://www.district.in/events/shante-ishta2026-aug22-2026-buy-tickets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gala-book-btn"
                  id="shante-ishta-gala-book-now"
                >
                  <span>RESERVE GALA SEAT</span>
                  <PiArrowRightBold className="btn-arrow" />
                </a>
              ) : (
                <div className="vacant-space" />
              )}
            </div>
          </div>
        </div>

        {/* ── GALA EXPERIENCE HIGHLIGHTS BENTO GRID ── */}
        <div className={`gala-bento-section ${inView ? 'visible' : ''}`}>
          <h3 className="bento-section-title">The Heartbeat of Shante Ishta</h3>

          <div className="gala-bento-grid">
            {highlights.map((item, idx) => (
              <div
                key={item.num}
                className="gala-bento-card"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="bento-card-body">
                  <span className="bento-card-num">{item.num}</span>
                  <h4 className="bento-card-title">{item.title}</h4>
                  <p className="bento-card-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;

