import React from 'react';
import { useInView } from '../../hooks';
import './About.css';
import { PiFilmReelDuotone, PiMaskHappyDuotone, PiProjectorScreenDuotone } from 'react-icons/pi';

const About: React.FC = () => {
  const { ref: sectionRef, inView } = useInView(0.08);

  const pillars = [
    {
      num: '01',
      icon: <PiFilmReelDuotone className="pillar-icon" />,
      title: 'THE ORIGIN',
      headline: 'A Space for Independent Voices',
      description:
        'Kalapremi Productions was born out of necessity when independent artists faced limited avenues to showcase original work. What started as a home for our own short films has evolved into a thriving platform standing alongside independent creators across mediums.',
    },
    {
      num: '02',
      icon: <PiMaskHappyDuotone className="pillar-icon" />,
      title: 'THE SPECTRUM',
      headline: 'Multidisciplinary Creative House',
      description:
        'We bridge the boundaries between Cinema, Kathak & Contemporary Dance, Visual Stipple Canvas, and Fine Photography — uniting distinct artistic disciplines into a single harmonious platform.',
    },
    {
      num: '03',
      icon: <PiProjectorScreenDuotone className="pillar-icon" />,
      title: 'THE PHILOSOPHY',
      headline: 'Feeling Before Analyzing',
      description:
        'At our core, we believe in authentic human storytelling, growing together as a collective, and crafting narrative experiences without judgment — making art that resonates deeply.',
    },
  ];

  return (
    <section id="about" className="editorial-about-section" ref={sectionRef}>
      {/* Dynamic Background Elements */}
      <div className="lens-flare-glow" />
      <div className="editorial-mesh-bg" />
      
      {/* Massive Background Watermark */}
      <div className="watermark-text">VISION</div>

      <div className="editorial-container">
        {/* Cinematic Split Layout: Left (Intro) & Right (Pillars) */}
        
        <div className={`editorial-intro ${inView ? 'reveal' : ''}`}>
          <div className="intro-badge">
            <span className="badge-dot" />
            <span>ABOUT KALAPREMI PRODUCTIONS</span>
          </div>

          <h2 className="editorial-hero-title">
            Where Independent <br />
            <em className="gold-italic">Creativity</em> Finds Its Stage.
          </h2>

          <div className="editorial-divider" />

          <p className="editorial-lead-paragraph">
            We are an independent film house, art collective, and creative platform based in Bangalore. 
            Dedicated to empowering creators, producing original cinema, and bridging diverse artistic forms 
            into powerful human stories.
          </p>
        </div>

        <div className="editorial-pillars">
          {pillars.map((item, idx) => (
            <div 
              key={item.num} 
              className={`editorial-card ${inView ? 'reveal-card' : ''}`} 
              style={{ '--card-delay': `${0.3 + idx * 0.2}s` } as React.CSSProperties}
            >
              <div className="card-glass-panel">
                <div className="card-top-row">
                  <div className="card-icon-wrap">
                    {item.icon}
                  </div>
                  <span className="card-num">{item.num}</span>
                </div>
                
                <h4 className="card-subtitle">{item.title}</h4>
                <h3 className="card-headline">{item.headline}</h3>
                <p className="card-description">{item.description}</p>
                
                <div className="card-flare-overlay" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
