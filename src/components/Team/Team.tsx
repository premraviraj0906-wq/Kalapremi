import React from 'react';
import { teamMembers } from '../../data';
import { useInView } from '../../hooks';
import type { TeamMember } from '../../types';
import './Team.css';
import { PiPhoneCallDuotone, PiEnvelopeDuotone } from 'react-icons/pi';

const CharacterPoster: React.FC<{
  member: TeamMember;
  index: number;
  inView: boolean;
}> = ({ member, index, inView }) => {
  return (
    <div
      className={`character-poster ${inView ? 'in-view' : ''}`}
      style={{ '--delay': `${index * 0.15}s` } as React.CSSProperties}
    >
      {/* Poster Image Container */}
      <div className="poster-image-wrap">
        <img
          src={member.image}
          alt={member.name}
          className="poster-img"
          loading="lazy"
        />
        <div className="poster-vignette" />
        
        {/* Dynamic Spotlight Effect on Hover */}
        <div className="poster-spotlight" />
      </div>

      {/* Roster Details Layer */}
      <div className="poster-details">
        <div className="poster-roles-stack">
          {member.roles.map((role, idx) => (
            <span 
              key={idx} 
              className="role-badge" 
              style={{ '--badge-delay': `${idx * 0.1}s` } as React.CSSProperties}
            >
              {role}
            </span>
          ))}
        </div>

        <h3 className="poster-name">{member.name}</h3>

        <div className="poster-contact">
          <div className="contact-divider" />
          {member.contact ? (
            <a href={`tel:${member.contact}`} className="contact-link">
              <PiPhoneCallDuotone className="contact-icon" />
              <span>{member.contact}</span>
            </a>
          ) : (
            <span className="contact-link inactive">
              <PiEnvelopeDuotone className="contact-icon" />
              <span>Collaborator</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section id="team" className="roster-section" ref={sectionRef}>
      {/* Cinematic Ambient Background */}
      <div className="roster-bg-mesh" />
      <div className="roster-particles" />

      {/* Section Header */}
      <div className={`roster-header ${inView ? 'visible' : ''}`}>
        <div className="roster-slate">
          <span className="slate-line" />
          <span className="slate-text">SCENE 04 — KALAPREMI PRODUCTIONS</span>
          <span className="slate-line" />
        </div>
        
        <h2 className="roster-title">
          The <em>Cast & Crew</em>
        </h2>
        <p className="roster-subtitle">
          Meet the visionaries bringing Kalapremi's cinematic and artistic endeavors to life.
        </p>
      </div>

      {/* Cinematic Grid */}
      <div className="roster-grid">
        {teamMembers.map((member, i) => (
          <CharacterPoster key={member.id} member={member} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
};

export default Team;
