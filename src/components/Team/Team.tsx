import React, { useState } from 'react';
import { teamMembers } from '../../data';
import { useInView } from '../../hooks';
import type { TeamMember } from '../../types';
import './Team.css';

/* ── Art discipline icon (SVG inline) ── */
const artIcons: Record<string, JSX.Element> = {
  karthik: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="9"/>
      <line x1="12" y1="3" x2="12" y2="1"/><line x1="12" y1="23" x2="12" y2="21"/>
      <line x1="3" y1="12" x2="1" y2="12"/><line x1="23" y1="12" x2="21" y2="12"/>
    </svg>
  ),
  vidya: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  harish: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
    </svg>
  ),
  janardhan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
  deepika: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/>
      <circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
    </svg>
  ),
  kishan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
    </svg>
  ),
};

/* Gallery tilt per card */
const tilts = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.4];

/* ── Single framed art card ── */
const ArtworkCard: React.FC<{
  member: TeamMember;
  index: number;
  inView: boolean;
}> = ({ member, index, inView }) => {
  const [hovered, setHovered] = useState(false);
  const tilt = tilts[index % tilts.length];

  return (
    <div
      className={`artwork-wrap ${inView ? 'in-view' : ''}`}
      style={{ '--tilt': `${tilt}deg`, '--delay': `${index * 0.1}s` } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gallery spotlight cone above card */}
      <div className={`spotlight-cone ${hovered ? 'bright' : ''}`} />

      {/* Hanging wire */}
      <div className="hang-wire">
        <div className="hang-hook" />
      </div>

      {/* Frame */}
      <div className={`art-frame ${hovered ? 'lifted' : ''}`}>
        {/* Outer ornate border */}
        <div className="frame-outer">
          <div className="frame-inner">
            {/* The "painting" — member photo */}
            <div className="painting">
              <img
                src={member.image}
                alt={member.name}
                className="painting-img"
                loading="lazy"
              />
              {/* Paint texture overlay */}
              <div className="paint-texture" />
              {/* Info overlay on hover */}
              <div className={`painting-overlay ${hovered ? 'visible' : ''}`}>
                <div className="overlay-icon">
                  {artIcons[member.id]}
                </div>
              </div>
            </div>
          </div>
          {/* Corner ornaments */}
          <div className="corner-orn tl" />
          <div className="corner-orn tr" />
          <div className="corner-orn bl" />
          <div className="corner-orn br" />
        </div>

        {/* Exhibition number tag (top right) */}
        <div className="exhibit-tag">
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Museum-style exhibition label card */}
      <div className={`exhibit-label ${hovered ? 'hovered' : ''}`}>
        <div className="label-front">
          <p className="label-name">{member.name}</p>
          <p className="label-role">{member.role}</p>
          <div className="label-dots">
            <span /><span /><span />
          </div>
        </div>
        {/* Back of label (contact) */}
        <div className="label-back">
          <p className="label-back-title">Contact</p>
          {member.contact ? (
            <a href={`tel:${member.contact}`} className="label-phone">{member.contact}</a>
          ) : (
            <p className="label-collab">Open to Collaborations</p>
          )}
          <p className="label-house">Kalapremi Productions</p>
        </div>
      </div>
    </div>
  );
};

/* ── Main Team Component ── */
const Team: React.FC = () => {
  const { ref: sectionRef, inView } = useInView(0.05);

  return (
    <section id="team" className="team-section" ref={sectionRef}>
      {/* Gallery wall texture */}
      <div className="gallery-wall" />
      <div className="gallery-floor" />
      <div className="gallery-baseboard" />

      {/* Room light bar at top */}
      <div className="room-light-bar" />

      {/* Section header */}
      <div className={`gallery-header ${inView ? 'visible' : ''}`}>
        <div className="gallery-header-line" />
        <div className="gallery-header-text">
          <span className="gallery-label">KALAPREMI PRODUCTIONS</span>
          <h2 className="gallery-title">
            The <em>Collective</em>
          </h2>
          <p className="gallery-subtitle">Six artists. One vision. On exhibition.</p>
        </div>
        <div className="gallery-header-line" />
      </div>

      {/* Art grid — gallery wall layout */}
      <div className="gallery-grid">
        {teamMembers.map((member, i) => (
          <ArtworkCard key={member.id} member={member} index={i} inView={inView} />
        ))}
      </div>

      {/* Wall label strip */}
      <div className="wall-label-strip">
        <span>PERMANENT COLLECTION · 2022–PRESENT · EST. BANGALORE, INDIA</span>
      </div>
    </section>
  );
};

export default Team;
