import React from 'react';
import { useInView } from '../../hooks';
import { PiFilmReelDuotone, PiMaskHappyDuotone, PiProjectorScreenDuotone } from 'react-icons/pi';
import './About.css';

const About: React.FC = () => {
  const { ref: sectionRef, inView } = useInView(0.05);

  const pillars = [
    {
      num: '01', title: 'THE ORIGIN',
      headline: 'A passion project by filmmakers, for filmmakers',
      icon: <PiFilmReelDuotone />,
      description: 'Born from the passion of individual creators craving a space dedicated to the art of filmmaking. What started as a heartfelt endeavor is now a vibrant platform uniting artists.',
    },
    {
      num: '02', title: 'THE SPECTRUM',
      headline: 'Multidisciplinary Creative House',
      icon: <PiMaskHappyDuotone />,
      description: 'We bridge the boundaries between Theatre, Dance, Visual Art, Cinematography, Screen writing, Acting, Visual design, Traditional art, Direction and more.',
    },
    {
      num: '03', title: 'THE PHILOSOPHY',
      headline: 'Where passion meets purpose',
      icon: <PiProjectorScreenDuotone />,
      description: 'Art flourishes when creativity is free. We encourage fearless expression, embrace fresh perspectives and believe every creator deserves the opportunity to tell their story.',
    },
  ];

  return (
    <section id="about" className="minimal-about-section" ref={sectionRef}>
      <div className="minimal-container">
        <div className={`minimal-intro ${inView ? 'reveal' : ''}`}>
          <div className="minimal-intro-left">
            <div className="minimal-label-wrap">
              <span className="minimal-label">ABOUT US</span>
              <div className="minimal-line" />
            </div>
            <h2 className="minimal-hero-title">
              Where <br /><em>Creativity</em> Finds Its Stage.
            </h2>
          </div>
          <div className="minimal-intro-right">
            <p className="minimal-lead-paragraph">
              We are an independent film house, art collective, and creative platform based in Bangalore.
              Dedicated to empowering creators, producing original cinema, and bridging diverse artistic forms
              into powerful human stories.
            </p>
          </div>
        </div>

        <div className="minimal-pillars">
          {pillars.map((item, idx) => (
            <div
              key={item.num}
              className={`about-card ${inView ? 'reveal-item' : ''}`}
              style={{ '--item-delay': `${0.2 + idx * 0.18}s` } as React.CSSProperties}
            >
              {/* Top row: icon badge + number */}
              <div className="about-card-top">
                <div className="about-card-icon">{item.icon}</div>
                <span className="about-card-num">{item.num}</span>
              </div>

              {/* Content */}
              <span className="about-card-label">{item.title}</span>
              <h3 className="about-card-headline">{item.headline}</h3>
              <p className="about-card-desc">{item.description}</p>

              {/* Subtle inner glow on hover */}
              <div className="about-card-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
