import React, { useState, useEffect } from 'react';
import { navLinks } from '../../data';
import './FloatingNav.css';

const FloatingNav: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
      const ids = navLinks.map(l => l.href.replace('#', ''));
      let cur = 'hero';
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) cur = id;
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
    <nav className={`floating-nav ${visible ? 'visible' : ''}`}>
      <div className="fn-links">
        {navLinks.slice(1).map(link => (
          <button
            key={link.href}
            className={`fn-link ${active === link.href.replace('#', '') ? 'active' : ''}`}
            onClick={() => nav(link.href)}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default FloatingNav;
