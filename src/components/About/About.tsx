import React from 'react';
import { useInView } from '../../hooks';
import './About.css';

const About: React.FC = () => {
  const { ref: sectionRef, inView } = useInView(0.08);

  const pillars = [
    {
      num: '01',
      title: 'THE ORIGIN',
      headline: 'A Space for Independent Voices',
      description:
        'Kalapremi Productions was born out of necessity when independent artists faced limited avenues to showcase original work. What started as a home for our own short films has evolved into a thriving platform standing alongside independent creators across mediums.',
    },
    {
      num: '02',
      title: 'THE SPECTRUM',
      headline: 'Multidisciplinary Creative House',
      description:
        'We bridge the boundaries between Cinema, Kathak & Contemporary Dance, Visual Stipple Canvas, and Fine Photography — uniting distinct artistic disciplines into a single harmonious platform.',
    },
    {
      num: '03',
      title: 'THE PHILOSOPHY',
      headline: 'Feeling Before Analyzing',
      description:
        'At our core, we believe in authentic human storytelling, growing together as a collective, and crafting narrative experiences without judgment — making art that resonates deeply.',
    },
  ];

  return (
    <section id="about" className="about-company-section" ref={sectionRef}>
      {/* Background ambient lighting */}
      <div className="company-bg-glow" />
      <div className="company-grid-overlay" />

      <div className="about-company-container">
        {/* Section Header */}
        <div className={`about-header-block ${inView ? 'visible' : ''}`}>
          <div className="eyebrow-badge">
            <span className="badge-dash">—</span>
            <span>ABOUT KALAPREMI PRODUCTIONS</span>
            <span className="badge-dash">—</span>
          </div>

          <h2 className="about-hero-title">
            Where Independent <em>Creativity</em> Finds Its Stage.
          </h2>

          <p className="about-lead-paragraph">
            We are an independent film house, art collective, and creative platform based in Bangalore.
            Dedicated to empowering creators, producing original cinema, and bridging diverse artistic forms into powerful human stories.
          </p>
        </div>

        {/* ── COMPANY PILLARS BENTO GRID ── */}
        <div className={`pillars-bento-grid ${inView ? 'visible' : ''}`}>
          {pillars.map((item, idx) => (
            <div key={item.num} className="bento-card" style={{ transitionDelay: `${idx * 0.15}s` }}>
              <div className="bento-card-top">
                <span className="bento-num">{item.num}</span>
                <span className="bento-tag">{item.title}</span>
              </div>
              <h3 className="bento-headline">{item.headline}</h3>
              <p className="bento-description">{item.description}</p>
              <div className="bento-corner-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
