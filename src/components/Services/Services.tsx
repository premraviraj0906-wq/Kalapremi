import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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
  PiWhatsappLogoDuotone,
  PiXBold
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

interface ModalState {
  isOpen: boolean;
  phone: string;
  serviceTitle: string;
}

const Services: React.FC = () => {
  const { ref: sectionRef, inView: sectionIn } = useInView(0.1);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Modal State
  const [modal, setModal] = useState<ModalState>({ isOpen: false, phone: '', serviceTitle: '' });
  const [formData, setFormData] = useState({ name: '', description: '' });

  React.useEffect(() => {
    if (modal.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modal.isOpen]);

  const handleOpenModal = (e: React.MouseEvent, phone: string, serviceTitle: string) => {
    e.preventDefault();
    setModal({ isOpen: true, phone, serviceTitle });
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, phone: '', serviceTitle: '' });
    setFormData({ name: '', description: '' });
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description } = formData;
    const { phone, serviceTitle } = modal;
    
    if (!name.trim()) return;

    const message = `Hello, I am ${name}.\n\nI am interested in exploring a project involving: *${serviceTitle}*.\n\nProject Details:\n${description || 'I would like to discuss further details.'}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    handleCloseModal();
  };

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
                      
                      <button 
                        onClick={(e) => handleOpenModal(e, service.phone, service.title)}
                        className="action-call"
                      >
                        <PiWhatsappLogoDuotone className="call-icon" />
                        <span>Book Scene</span>
                      </button>
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

      {/* WhatsApp Inquiry Modal */}
      {modal.isOpen && createPortal(
        <div className="wa-modal-overlay" onClick={handleCloseModal}>
          <div className="wa-modal-content" onClick={e => e.stopPropagation()}>
            <button className="wa-modal-close" onClick={handleCloseModal}>
              <PiXBold />
            </button>
            <div className="wa-modal-header">
              <PiWhatsappLogoDuotone className="wa-modal-icon" />
              <h3>Script Your Project</h3>
              <p>Send a direct message to book <strong>{modal.serviceTitle}</strong>.</p>
            </div>
            
            <form onSubmit={handleSendWhatsApp} className="wa-modal-form">
              <div className="wa-input-group">
                <label>Character Name (Your Name)</label>
                <input 
                  type="text" 
                  placeholder="Enter your name..."
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div className="wa-input-group">
                <label>Plot Synopsis (Project Details)</label>
                <textarea 
                  placeholder="Briefly describe what you're looking for..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <button type="submit" className="wa-submit-btn">
                Send to WhatsApp
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Services;
