import React from 'react';
import { useInView } from '../../hooks';
import './About.css';

const About: React.FC = () => {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: bioRef, inView: bioIn } = useInView();
  const { ref: imgRef, inView: imgIn } = useInView();

  return (
    <section id="about" className="about">
      <div className="about-inner">
        {/* Section label */}
        <div ref={headRef} className={`section-label ${headIn ? 'visible' : ''}`}>
          <div className="label-line" />
          <span>About Us</span>
          <div className="label-line" />
        </div>

        {/* Split layout */}
        <div className="about-split">
          {/* Left: Text */}
          <div ref={bioRef} className={`about-text ${bioIn ? 'visible' : ''}`}>
            <h2 className="about-heading">
              Born from the need for a <em>space</em> where independent voices belong.
            </h2>

            <div className="about-body">
              <p>
                Kalapremi Productions was built out of the need for a platform — when we realized
                there were limited spaces for independent creators to promote their work. What began
                as a solution for our own films soon evolved into a collective that stands with
                creators across mediums.
              </p>
              <p>
                Founded by <strong>Sujith Kalapremi</strong> and supported by a passionate team,
                Kalapremi Productions not only focuses on short films but brings together talent
                across a wide range of creative fields.
              </p>
              <p>
                At its core, the production believes in growing together as a stronger team —
                promoting original storytelling, supporting independent voices, and creating
                opportunities for artists to share their work with a wider audience.
              </p>
            </div>

            <div className="about-pills">
              <span className="pill">Dance</span>
              <span className="pill">Cinema</span>
              <span className="pill">Visual Arts</span>
              <span className="pill">Stipple Art</span>
              <span className="pill">Photography</span>
            </div>
          </div>

          {/* Right: Founder image */}
          <div ref={imgRef} className={`about-image-wrap ${imgIn ? 'visible' : ''}`}>
            <div className="about-image-frame">
              <img
                src="/images/sujith_team.png"
                alt="Sujith Kalapremi — Founder"
                className="about-img"
              />
              <div className="about-image-overlay" />
            </div>
            <div className="about-founder-card">
              <p className="founder-name">Sujith Kalapremi</p>
              <p className="founder-role">Founder · Director · Stipple Artist</p>
              <p className="founder-bio">
                Multidisciplinary artist working across dance, choreography, filmmaking, and
                visual arts. Trained in contemporary and Kathak dance, he experiments with
                bamboo art, glass painting, pop art, and embossed work.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative lines */}
      <div className="about-deco-line left" />
      <div className="about-deco-line right" />
    </section>
  );
};

export default About;
