import React, { useState } from 'react';
import { services } from '../../data';
import { useInView } from '../../hooks';
import './Services.css';

const Services: React.FC = () => {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: listRef, inView: listIn } = useInView(0.05);
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <section id="services" className="services">
      {/* Ambient glow orb */}
      <div className="services-glow-orb" />

      <div className="services-inner">
        {/* Header */}
        <div ref={headRef} className={`services-header ${headIn ? 'visible' : ''}`}>
          <div className="services-label-row">
            <div className="label-line" />
            <span className="services-label-text">What We Offer</span>
            <div className="label-line" />
          </div>
          <h2 className="services-title">
            Art in every <em>form.</em>
          </h2>
          <p className="services-subtitle">
            Every discipline we practice is a craft honed over years of storytelling.
          </p>
        </div>

        {/* Service List */}
        <div ref={listRef} className={`services-list ${listIn ? 'visible' : ''}`}>
          {services.map((service, i) => {
            const isOpen = activeService === service.id;
            return (
              <div
                key={service.id}
                className={`svc-row ${isOpen ? 'open' : ''}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
                onClick={() => setActiveService(prev => prev === service.id ? null : service.id)}
              >
                {/* Left: number + accent line */}
                <div className="svc-index">
                  <span className="svc-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="svc-accent-line" />
                </div>

                {/* Center: content */}
                <div className="svc-body">
                  <div className="svc-main">
                    <div className="svc-icon-wrap">
                      <img src={service.icon} alt={service.title} className="svc-icon" />
                      <div className="svc-icon-ring" />
                    </div>
                    <div className="svc-info">
                      <h3 className="svc-name">{service.title}</h3>
                      <p className="svc-desc">{service.description}</p>
                    </div>
                  </div>

                  {/* Expandable contact panel */}
                  <div className={`svc-expand ${isOpen ? 'open' : ''}`}>
                    <div className="svc-expand-inner">
                      <div className="svc-expand-divider" />
                      <div className="svc-expand-grid">
                        <div>
                          <p className="svc-expand-label">Contact Person</p>
                          <p className="svc-expand-person">{service.contactPerson}</p>
                        </div>
                        <div>
                          <p className="svc-expand-label">Reach Out</p>
                          <a href={`tel:${service.phone}`} className="svc-phone">{service.phone}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: toggle */}
                <div className="svc-toggle">
                  <div className={`svc-toggle-icon ${isOpen ? 'minus' : 'plus'}`}>
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Background watermark */}
      <div className="services-bg-text" aria-hidden="true">ART</div>
    </section>
  );
};

export default Services;
