import React, { useState, useRef } from 'react';
import { films } from '../../data';
import { useInView } from '../../hooks';
import './Films.css';

const Films: React.FC = () => {
  const [activeFilm, setActiveFilm] = useState(films[0]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.1);
  const stripRef = useRef<HTMLDivElement>(null);

  const scrollStrip = (dir: 'left' | 'right') => {
    if (stripRef.current) {
      stripRef.current.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
    }
  };

  return (
    <section id="films" className="films">
      <div className="films-inner">
        <div ref={headRef} className={`section-label ${headIn ? 'visible' : ''}`}>
          <div className="label-line" />
          <span>Our Films</span>
          <div className="label-line" />
        </div>

        {/* Active film feature */}
        <div className="film-feature">
          <div className="film-feature-bg">
            <img
              key={activeFilm.id}
              src={activeFilm.poster}
              alt={activeFilm.title}
              className="film-feature-bg-img"
            />
            <div className="film-feature-overlay" />
          </div>
          <div className="film-feature-info">
            <span className="film-genre">{activeFilm.genre}</span>
            <h2 className="film-feature-title">{activeFilm.title}</h2>
            <p className="film-feature-desc">{activeFilm.description}</p>
            <div className="film-meta">
              <span><em>Dir.</em> {activeFilm.director}</span>
              <span className="dot">·</span>
              <span>{activeFilm.year}</span>
            </div>
          </div>
        </div>

        {/* Film strip scroll */}
        <div ref={gridRef} className={`film-strip-section ${gridIn ? 'visible' : ''}`}>
          <div className="strip-nav">
            <button className="strip-arrow" onClick={() => scrollStrip('left')} aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="strip-arrow" onClick={() => scrollStrip('right')} aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="film-strip" ref={stripRef}>
            {films.map((film, i) => (
              <div
                key={film.id}
                className={`film-card ${activeFilm.id === film.id ? 'active' : ''} ${hoveredId === film.id ? 'hovered' : ''}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
                onClick={() => setActiveFilm(film)}
                onMouseEnter={() => setHoveredId(film.id)}
                onMouseLeave={() => setHoveredId(null)}
                data-cursor="hover"
              >
                <div className="film-card-img-wrap">
                  <img src={film.poster} alt={film.title} className="film-card-img" />
                  <div className="film-card-overlay" />
                  <div className="film-card-num">{String(i + 1).padStart(2, '0')}</div>
                </div>
                <div className="film-card-info">
                  <p className="film-card-title">{film.title}</p>
                  <p className="film-card-year">{film.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gold accent line */}
      <div className="films-accent" />
    </section>
  );
};

export default Films;
