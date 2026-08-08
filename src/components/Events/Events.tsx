import React, { useEffect, useState } from 'react';
import { useInView } from '../../hooks';
import { PiTicketDuotone, PiCalendarBlankDuotone, PiMapPinDuotone, PiArrowRightBold, PiSparkleDuotone, PiFilmStripDuotone, PiPaintBrushDuotone, PiUserCircleGearDuotone } from 'react-icons/pi';
import './Events.css';

const EVENT_DATE = new Date('2026-08-22T09:00:00+05:30');

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

const Events: React.FC = () => {
  const { ref: sectionRef, inView } = useInView(0.1);
  const timeLeft = useEventCountdown();
  const pad = (n: number) => String(n).padStart(2, '0');

  const highlights = [
    {
      num: '01',
      icon: <PiFilmStripDuotone className="hl-icon" />,
      title: 'Film Screenings & Premieres',
      desc: 'Projection of multiple short films and the exclusive premiere of upcoming Kalapremi productions.',
    },
    {
      num: '02',
      icon: <PiPaintBrushDuotone className="hl-icon" />,
      title: 'Merchandise & Commissioned Art',
      desc: 'Exhibiting Kalapremi merchandise and specially commissioned original artworks by our artists.',
    },
    {
      num: '03',
      icon: <PiSparkleDuotone className="hl-icon" />,
      title: 'Connect with Artists',
      desc: 'A rare opportunity to meet and connect with passionate artists working across their crafts.',
    },
    {
      num: '04',
      icon: <PiUserCircleGearDuotone className="hl-icon" />,
      title: 'Panel Discussion',
      desc: 'Where stories are discussed, celebrated, and reimagined — a candid conversation between creators.',
    },
  ];

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
          <div className="gala-ticket-card">
            <div className="ticket-gold-border" />
            <div className="ticket-inner-glow" />

            <div className="ticket-card-header">
              <div className="t-brand">
                <span className="t-brand-label">KALAPREMI <span className="font-montserrat">PRODUCTIONS</span> PRESENTS</span>
                <h3 className="t-brand-name">Shante<em>Ishta</em> ’26</h3>
              </div>
              <div className="t-badge">
                <PiTicketDuotone className="t-icon" />
                <span>OFFICIAL ADMIT PASS</span>
              </div>
            </div>

            {/* Countdown Grid Inside Ticket */}
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
                <div className="bento-card-icon-wrap">
                  {item.icon}
                </div>
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
