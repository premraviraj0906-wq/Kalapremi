import React, { useState } from 'react';
import { services } from '../../data';
import { useInView } from '../../hooks';
import './Services.css';

const Services: React.FC = () => {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.1);
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <section id="services" className="services">
      <div className="services-inner">
        <div ref={headRef} className={`section-label ${headIn ? 'visible' : ''}`}>
          <div className="label-line" />
          <span>What We Offer</span>
          <div className="label-line" />
        </div>

        <div className="services-headline">
          <h2 className="services-title">
            Art in every <em>form.</em>
          </h2>
        </div>

        <div ref={gridRef} className={`services-grid ${gridIn ? 'visible' : ''}`}>
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`service-card ${activeService === service.id ? 'expanded' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
              onClick={() => setActiveService(prev => prev === service.id ? null : service.id)}
              data-cursor="hover"
            >
              <div className="service-card-top">
                <div className="service-icon-wrap">
                  <img src={service.icon} alt={service.title} className="service-icon" />
                  <div className="service-icon-glow" />
                </div>
                <div className="service-num">{String(i + 1).padStart(2, '0')}</div>
              </div>

              <h3 className="service-name">{service.title}</h3>
              <p className="service-desc">{service.description}</p>

              <div className={`service-contact-reveal ${activeService === service.id ? 'open' : ''}`}>
                <div className="service-contact-divider" />
                <p className="service-contact-label">Contact for enquiries</p>
                <p className="service-contact-person">{service.contactPerson}</p>
                <a href={`tel:${service.phone}`} className="service-phone">
                  {service.phone}
                </a>
              </div>

              <div className="service-toggle">
                <span>{activeService === service.id ? '—' : '+'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background decorative element */}
      <div className="services-bg-text" aria-hidden="true">ART</div>
    </section>
  );
};

export default Services;
