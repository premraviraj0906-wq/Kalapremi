import React, { useState } from 'react';
import { useInView } from '../../hooks';
import './Connect.css';

const Connect: React.FC = () => {
  const { ref: contentRef, inView } = useInView(0.1);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('kalapremiproductions@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const socials = [
    { label: 'Instagram', url: 'https://www.instagram.com/kalapremi.productions/', icon: 'IG' },
    { label: 'YouTube', url: 'http://www.youtube.com/@KalapremiProductions', icon: 'YT' },
  ];

  return (
    <section id="connect" className="connect">
      {/* Noise texture overlay */}
      <div className="connect-noise" />

      <div className="connect-inner" ref={contentRef}>
        <div className={`connect-content ${inView ? 'visible' : ''}`}>

          <h2 className="connect-heading">
            Open to <em>collaborations</em><br />and conversations.
          </h2>

          <p className="connect-subtext">
            Whether you're a filmmaker, artist, or storyteller — we'd love to hear from you.
          </p>

          {/* Email CTA */}
          <div className="connect-email-wrap">
            <a
              href="mailto:kalapremiproductions@gmail.com"
              className="connect-email"
            >
              kalapremiproductions@gmail.com
            </a>
            <button
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
              title="Copy email"
            >
              {copied ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="4.5" y="1" width="8.5" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M1 4.5h3M1 4.5V13h8.5V10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>

          {/* Phones Row */}
          <div className="connect-phones-container">
            <div className="phone-card">
              <span className="phone-label">Sujith Kalapremi</span>
              <a href="tel:+919980669421" className="connect-phone">
                [+91 99806 69421]
              </a>
            </div>
            <div className="phone-card">
              <span className="phone-label">V Karthik</span>
              <a href="tel:+916361638446" className="connect-phone">
                [+91 63616 38446]
              </a>
            </div>
          </div>

          {/* Socials */}
          <div className="connect-socials">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                data-cursor="hover"
              >
                <span className="social-icon">{s.icon}</span>
                <span className="social-label">{s.label}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="social-arrow">
                  <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Film strip bottom decoration */}
      <div className="footer-film-strip">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="footer-perf" />
        ))}
      </div>
      {/* Endless Marquee Carousel Footer */}
      <div className="connect-marquee-banner" aria-hidden="true">
        <div className="marquee-track">
          {/* We repeat the group multiple times to guarantee a seamless wrap with no gaps */}
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="marquee-group">
              <span className="marquee-logo-title">
                <span className="k-yellow">K</span>alapremi
              </span>
              <span className="marquee-dot" />
              <span className="marquee-subtext">PRODUCTIONS</span>
              <span className="marquee-separator">★</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Connect;
