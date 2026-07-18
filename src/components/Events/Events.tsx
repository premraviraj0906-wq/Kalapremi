import React, { useEffect, useState, useRef } from 'react';
import { useInView } from '../../hooks';
import { PiFilmSlateDuotone, PiEyeDuotone, PiMaskHappyDuotone, PiMapPinDuotone } from 'react-icons/pi';
import './Events.css';

const COUNTDOWN = ['3', '2', '1', '▶'];

const Events: React.FC = () => {
  const { ref: sectionRef, inView } = useInView(0.15);
  const [phase, setPhase] = useState<'idle' | 'countdown' | 'playing'>('idle');
  const [countIdx, setCountIdx] = useState(0);
  const [projectorOn, setProjectorOn] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Trigger sequence when section enters view ── */
  useEffect(() => {
    if (inView && phase === 'idle') {
      // Small delay then projector flickers on
      timerRef.current = setTimeout(() => {
        setProjectorOn(true);
        setTimeout(() => {
          setPhase('countdown');
        }, 700);
      }, 400);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [inView]);

  /* ── Count down frames ── */
  useEffect(() => {
    if (phase !== 'countdown') return;
    if (countIdx < COUNTDOWN.length) {
      timerRef.current = setTimeout(() => setCountIdx(i => i + 1), 550);
    } else {
      setPhase('playing');
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, countIdx]);

  const playing = phase === 'playing';

  return (
    <section id="events" className="theater-section" ref={sectionRef}>

      {/* ── Ambient dark room ── */}
      <div className="theater-room" />

      {/* ── Film strips – left and right ── */}
      <div className="film-strip-side left">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="side-frame">
            <img src="/images/shante_ishta_event.jpg" alt="" className="side-thumb" />
          </div>
        ))}
      </div>
      <div className="film-strip-side right">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="side-frame">
            <img src="/images/shante_ishta_event.jpg" alt="" className="side-thumb" />
          </div>
        ))}
      </div>

      {/* ── Projector beam light ── */}
      <div className={`projector-origin ${projectorOn ? 'on' : ''}`}>
        <div className="projector-lens-ring" />
        <div className="projector-lens-core" />
        <div className="projector-beam" />
      </div>

      {/* ── Main cinema screen ── */}
      <div className="screen-wrap">

        {/* Screen border / frame */}
        <div className={`screen-frame ${playing ? 'playing' : ''}`}>

          {/* CRT scan-line flicker */}
          <div className="scanlines" />

          {/* ── COUNTDOWN phase ── */}
          {phase === 'countdown' && (
            <div className="countdown-overlay">
              <div className="count-circle">
                <svg className="count-ring" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44"
                    fill="none" stroke="rgba(240,192,64,0.3)" strokeWidth="1.5"
                    strokeDasharray="276"
                    strokeDashoffset={276 - (276 / COUNTDOWN.length) * countIdx}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.45s ease' }}
                  />
                </svg>
                <span className="count-digit">{COUNTDOWN[countIdx - 1] ?? ''}</span>
              </div>
              <div className="count-scratches" />
            </div>
          )}

          {/* ── EVENT CONTENT (after countdown) ── */}
          <div className={`screen-content ${playing ? 'reveal' : ''}`}>

            {/* Background event photo */}
            <div className="screen-photo">
              <img src="/images/shante_ishta_event.jpg"
                alt="Shante Ishta gathering" className="screen-photo-img" />
              <div className="photo-vignette" />
              <div className="photo-color-grade" />
            </div>

            {/* Centered content */}
            <div className="screen-text">
              {/* Eye / heart SVG symbol */}
              <div className="eye-symbol">
                <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Heart shape path as eye lid */}
                  <path
                    d="M40 45 C10 30, 2 18, 2 12 C2 6, 7 2, 13 2 C20 2, 28 8, 40 16
                              C52 8, 60 2, 67 2 C73 2, 78 6, 78 12 C78 18, 70 30, 40 45Z"
                    fill="none" stroke="#F0C040" strokeWidth="1.2"
                  />
                  {/* Iris */}
                  <circle cx="40" cy="20" r="10" fill="none" stroke="#F0C040" strokeWidth="1" />
                  {/* Pupil */}
                  <circle cx="40" cy="20" r="4" fill="#F0C040" opacity="0.6" />
                  {/* Lashes */}
                  <line x1="40" y1="2" x2="40" y2="6"  stroke="#F0C040" strokeWidth="1" strokeLinecap="round" />
                  <line x1="28" y1="5" x2="30" y2="8"  stroke="#F0C040" strokeWidth="1" strokeLinecap="round" />
                  <line x1="52" y1="5" x2="50" y2="8"  stroke="#F0C040" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>

              <p className="screen-eyebrow">Annual Cinematic Gathering</p>

              {/* Title with cinematic treatment */}
              <h2 className="screen-title">
                <span className="title-line-1">Shante</span>
                <span className="title-line-2">Ishta</span>
              </h2>

              {/* Kannada + meaning */}
              <div className="meaning-row">
                <div className="meaning-dash" />
                <div className="meaning-text">
                  <span className="kannada">ಶಾಂತೆ ಇಷ್ಟ</span>
                  <span className="translation">Single Eye of the Heart</span>
                </div>
                <div className="meaning-dash" />
              </div>
            </div>
          </div>

          {/* ── Subtitle strip (cinema-style) ── */}
          <div className={`subtitle-bar ${playing ? 'visible' : ''}`}>
            <div className="subtitle-scroll">
              Celebrating Independent Filmmakers &nbsp;·&nbsp; Feeling Before Analyzing &nbsp;·&nbsp; Where Creativity Meets Empathy &nbsp;·&nbsp; Stories Without Judgment &nbsp;·&nbsp; Kalapremi Productions &nbsp;·&nbsp; Celebrating Independent Filmmakers &nbsp;·&nbsp; Feeling Before Analyzing &nbsp;·&nbsp; Where Creativity Meets Empathy &nbsp;·&nbsp; Stories Without Judgment &nbsp;·&nbsp;
            </div>
          </div>

        </div>{/* /screen-frame */}

        {/* Screen curved reflection at bottom */}
        <div className="screen-reflection" />
      </div>{/* /screen-wrap */}

      {/* ── Audience silhouettes ── */}
      <div className={`audience ${playing ? 'visible' : ''}`}>
        {/* Row 3 (far back, smallest) */}
        <div className="aud-row row-3">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="aud-head" style={{ '--h': '22px', '--w': '18px' } as React.CSSProperties} />
          ))}
        </div>
        {/* Row 2 */}
        <div className="aud-row row-2">
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className="aud-head" style={{ '--h': '28px', '--w': '22px' } as React.CSSProperties} />
          ))}
        </div>
        {/* Row 1 (front, biggest) */}
        <div className="aud-row row-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aud-head" style={{ '--h': '36px', '--w': '30px' } as React.CSSProperties} />
          ))}
        </div>
      </div>

      {/* ── Info cards strip below ── */}
      <div className={`event-info-strip ${playing ? 'visible' : ''}`}>
        {([
          { icon: <PiFilmSlateDuotone />,  label: 'FORMAT',     value: 'Short Film Showcase' },
          { icon: <PiEyeDuotone />,         label: 'PHILOSOPHY', value: 'Feel Before Analyzing' },
          { icon: <PiMaskHappyDuotone />,   label: 'MISSION',    value: 'Authentic Storytelling' },
          { icon: <PiMapPinDuotone />,      label: 'PLATFORM',   value: 'Kalapremi Productions' },
        ] as { icon: React.ReactNode; label: string; value: string }[]).map((item, i) => (
          <div key={i} className="info-chip" style={{ animationDelay: `${i * 0.12}s` }}>
            <span className="chip-icon">{item.icon}</span>
            <span className="chip-label">{item.label}</span>
            <span className="chip-value">{item.value}</span>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Events;
