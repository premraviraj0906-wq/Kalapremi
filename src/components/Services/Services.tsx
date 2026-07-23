import React, { useState } from 'react';
import { services } from '../../data';
import { useInView } from '../../hooks';
import './Services.css';
import { 
  PiVideoCameraDuotone,
  PiCameraDuotone,
  PiScissorsDuotone, 
  PiPenNibDuotone, 
  PiPaintBrushDuotone,
  PiFilmStripDuotone,
  PiBookOpenDuotone,
  PiWhatsappLogoDuotone
} from 'react-icons/pi';

// Map service IDs to cinematic react-icons
const serviceIcons: Record<string, React.ReactNode> = {
  'cinematography': <PiVideoCameraDuotone className="svc-cine-icon" />,
  'photography': <PiCameraDuotone className="svc-cine-icon" />,
  'video-editing': <PiScissorsDuotone className="svc-cine-icon" />,
  'traditional-art': <PiPaintBrushDuotone className="svc-cine-icon" />,
  'stipple-art': <PiPenNibDuotone className="svc-cine-icon" />,
  'screenwriting': <PiBookOpenDuotone className="svc-cine-icon" />,
};

const Services: React.FC = () => {
  const { ref: sectionRef, inView: sectionIn } = useInView(0.1);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="services" className="services-cinematic" ref={sectionRef}>
      {/* Cinematic ambient lighting */}
      <div className="cine-spotlight left" />
      <div className="cine-spotlight right" />

      <div className="services-inner">
        {/* Cinematic Slate Header */}
        <div className={`cine-header ${sectionIn ? 'visible' : ''}`}>
          <div className="clapper-top">
            <div className="chevron-strip"></div>
          </div>
          <div className="slate-info">
            <span className="slate-label">PRODUCTION CAPABILITIES</span>
            <h2 className="slate-title">The <em>Studio.</em></h2>
            <p className="slate-desc">
              From the raw capture of a lens to the final brushstroke of a canvas, our disciplines are united by the art of visual storytelling.
            </p>
          </div>
        </div>

        {/* Film Strip Layout */}
        <div className={`film-strip-container ${sectionIn ? 'visible' : ''}`}>
          <div className="film-strip-track">
            {services.map((service, i) => {
              const isHovered = hoveredIdx === i;
              
              return (
                <div 
                  key={service.id} 
                  className={`film-frame ${isHovered ? 'focused' : ''} ${hoveredIdx !== null && !isHovered ? 'dimmed' : ''}`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Sprocket holes */}
                  <div className="sprockets top">
                    {[...Array(6)].map((_, idx) => <div key={idx} className="sprocket-hole" />)}
                  </div>

                  <div className="frame-content">
                    {/* Scene / Take metadata */}
                    <div className="frame-meta">
                      <span>SCENE {String(i + 1).padStart(2, '0')}</span>
                      <span>TAKE 01</span>
                    </div>

                    <div className="frame-icon-wrap">
                      {serviceIcons[service.id] || <PiFilmStripDuotone className="svc-cine-icon" />}
                      <div className="icon-glow" />
                    </div>

                    <div className="frame-details">
                      <h3 className="frame-title">{service.title}</h3>
                      <p className="frame-desc">{service.description}</p>
                    </div>

                    <div className="frame-footer">
                      <div className="director-info">
                        <span className="dir-label">DIRECTED BY</span>
                        <span className="dir-name">{service.contactPerson}</span>
                      </div>
                      
                      <a 
                        href={`https://wa.me/${service.phone}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="action-call"
                      >
                        <PiWhatsappLogoDuotone className="call-icon" />
                        <span>Book Scene</span>
                      </a>
                    </div>
                  </div>

                  {/* Sprocket holes */}
                  <div className="sprockets bottom">
                    {[...Array(6)].map((_, idx) => <div key={idx} className="sprocket-hole" />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Background Watermark */}
      <div className="cine-bg-text" aria-hidden="true">ACTION</div>
    </section>
  );
};

export default Services;
