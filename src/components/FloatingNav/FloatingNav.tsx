import React, { useState, useEffect } from 'react';
import { navLinks } from '../../data';
import './FloatingNav.css';
import {
  PiHouseDuotone,
  PiInfoDuotone,
  PiFilmReelDuotone,
  PiTicketDuotone,
  PiUsersThreeDuotone,
  PiSparkleDuotone,
  PiEnvelopeSimpleDuotone,
} from 'react-icons/pi';

const iconMap: Record<string, React.ReactNode> = {
  hero: <PiHouseDuotone className="fn-icon" />,
  about: <PiInfoDuotone className="fn-icon" />,
  films: <PiFilmReelDuotone className="fn-icon" />,
  events: <PiTicketDuotone className="fn-icon" />,
  team: <PiUsersThreeDuotone className="fn-icon" />,
  services: <PiSparkleDuotone className="fn-icon" />,
  connect: <PiEnvelopeSimpleDuotone className="fn-icon" />,
};

const FloatingNav: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.4);
      const ids = navLinks.map(l => l.href.replace('#', ''));
      let cur = 'hero';
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 220) cur = id;
      });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = (href: string) => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`floating-nav ${visible ? 'visible' : ''}`} aria-label="Floating Quick Navigation">
      <button className="fn-logo-btn" onClick={() => nav('#hero')} title="Scroll to Top">
        <img src="/images/kalapremi_logo.png" alt="Kalapremi" className="fn-logo-img" />
      </button>

      <div className="fn-divider" />

      <div className="fn-links">
        {navLinks.map(link => {
          const id = link.href.replace('#', '');
          const isActive = active === id;

          return (
            <button
              key={link.href}
              className={`fn-link ${isActive ? 'active' : ''}`}
              onClick={() => nav(link.href)}
              title={link.label}
            >
              {iconMap[id]}
              <span className="fn-label">{link.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default FloatingNav;
