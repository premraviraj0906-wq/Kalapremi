import React, { useState, useEffect } from 'react';
import { navLinks } from '../../data';
import { useScrollY } from '../../hooks';
import './Navbar.css';

const Navbar: React.FC = () => {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const scrolled = scrollY > 80;

  /* ── Track active section ── */
  useEffect(() => {
    const ids = navLinks.map(l => l.href.replace('#', ''));
    const onScroll = () => {
      let cur = 'hero';
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) cur = id;
      });
      setActiveSection(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  /* Split nav links into two halves */
  const half = Math.floor(navLinks.length / 2);
  const leftLinks  = navLinks.slice(0, half);
  const rightLinks = navLinks.slice(half);

  return (
    <>
      {/* ── VIEWFINDER CORNER BRACKETS (always visible on hero) ── */}
      <div className={`vf-corners ${scrolled ? 'hidden' : ''}`}>
        <div className="vf-corner tl" />
        <div className="vf-corner tr" />
        <div className="vf-corner bl" />
        <div className="vf-corner br" />
        {/* Center crosshair */}
        <div className="vf-crosshair">
          <div className="ch-h" /><div className="ch-v" />
          <div className="ch-circle" />
        </div>
        {/* HUD labels */}
        <div className="vf-label top-left">KP-2022 / 35mm</div>
        <div className="vf-label top-right">∞ f/1.4</div>
        <div className="vf-label bot-left">ISO 3200</div>
        <div className="vf-label bot-right">AUTO</div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <nav className={`navbar-vf ${scrolled ? 'docked' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="nav-inner-vf">

          {/* Left links */}
          <ul className="nav-links-group left">
            {leftLinks.map((link, i) => (
              <li key={link.href}>
                <button
                  className={`nvf-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                  onClick={() => nav(link.href)}
                >
                  <span className="nvf-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="nvf-label">{link.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Center logo */}
          <button className="nav-logo-vf" onClick={() => nav('#hero')} aria-label="Home">
            <img src="/images/kalapremi_logo.png" alt="Kalapremi Productions" className="nav-logo-img-vf" />
            {/* Film strip dots below logo */}
            <div className="logo-perfs">
              {Array.from({ length: 5 }).map((_, i) => <div key={i} className="logo-perf" />)}
            </div>
          </button>

          {/* Right links */}
          <ul className="nav-links-group right">
            {rightLinks.map((link, i) => (
              <li key={link.href}>
                <button
                  className={`nvf-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                  onClick={() => nav(link.href)}
                >
                  <span className="nvf-num">{String(half + i + 1).padStart(2, '0')}</span>
                  <span className="nvf-label">{link.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className={`hamburger-vf ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Animated film-strip underline */}
        <div className="nav-filmstrip">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="nav-perf" />
          ))}
        </div>

        {/* Mobile menu */}
        <div className={`mobile-nav-vf ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              className={`mobile-link-vf ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
              onClick={() => nav(link.href)}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className="mobile-num">{String(i + 1).padStart(2, '0')}</span>
              <span>{link.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
