import React, { useState, useRef, useCallback, useEffect } from 'react';
import { films } from '../../data';
import { useInView } from '../../hooks';
import type { Film } from '../../types';
import './Films.css';
import { PiSpeakerHighDuotone, PiSpeakerSlashDuotone } from 'react-icons/pi';



const Films: React.FC = () => {
  const [activeFilm, setActiveFilm] = useState<Film>(films[0]);

  const [isMuted, setIsMuted] = useState<boolean>(true); // Default muted
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isVideoEnded, setIsVideoEnded] = useState<boolean>(false);
  const [modalFilm, setModalFilm] = useState<Film | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const endTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { ref: headRef, inView: headIn } = useInView(0.1);
  const { ref: stageRef, inView: stageIn } = useInView(0.1);
  const { ref: gridRef, inView: gridIn } = useInView(0.1);

  const filteredFilms = films;

  // Smooth Audio & Video Fade Out Timer (Fades audio & video at 26s, ends at 30s)
  const startVideoTimer = useCallback(() => {
    setIsVideoEnded(false);
    setIsFadingOut(false);

    if (endTimerRef.current) clearTimeout(endTimerRef.current);
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);

    // At 26 seconds, start fading out video opacity & audio volume
    fadeTimerRef.current = setTimeout(() => {
      setIsFadingOut(true);
      // Fade out YouTube volume via postMessage
      if (iframeRef.current && iframeRef.current.contentWindow) {
        let vol = 100;
        const fadeInterval = setInterval(() => {
          vol = Math.max(0, vol - 15);
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'setVolume', args: [vol] }),
            '*'
          );
          if (vol <= 0) clearInterval(fadeInterval);
        }, 300);
      }
    }, 26000);

    // At 30 seconds, transition fully to centered poster banner
    endTimerRef.current = setTimeout(() => {
      setIsVideoEnded(true);
      setIsFadingOut(false);
    }, 30000);
  }, []);

  useEffect(() => {
    startVideoTimer();
    return () => {
      if (endTimerRef.current) clearTimeout(endTimerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [activeFilm, startVideoTimer]);

  // Strict Viewport Intersection Observer: Instant Mute & Pause on Scroll Away, Restore Audio on Return
  useEffect(() => {
    const sectionEl = document.getElementById('films');
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Instantly Mute Audio and Pause Video the moment user scrolls away
            setIsFadingOut(true);
            if (iframeRef.current && iframeRef.current.contentWindow) {
              iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'mute', args: '' }),
                '*'
              );
              iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }),
                '*'
              );
            }
          } else {
            // When user scrolls back into view, resume video & restore audio if previously unmuted!
            if (!isVideoEnded) {
              setIsFadingOut(false);
              if (iframeRef.current && iframeRef.current.contentWindow) {
                iframeRef.current.contentWindow.postMessage(
                  JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
                  '*'
                );
                if (!isMuted) {
                  iframeRef.current.contentWindow.postMessage(
                    JSON.stringify({ event: 'command', func: 'unMute', args: '' }),
                    '*'
                  );
                  iframeRef.current.contentWindow.postMessage(
                    JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }),
                    '*'
                  );
                }
              }
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, [isVideoEnded, isMuted]);

  const handleSelectFilm = useCallback(
    (film: Film) => {
      setActiveFilm(film);
      setIsMuted(true);
      startVideoTimer();
    },
    [startVideoTimer]
  );

  const replayVideo = () => {
    startVideoTimer();
  };

  const toggleSound = () => {
    const nextMuteState = !isMuted;
    setIsMuted(nextMuteState);

    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = nextMuteState ? 'mute' : 'unMute';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: '' }),
        '*'
      );
      // Ensure volume is restored to 100 if unmuting
      if (!nextMuteState) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }),
          '*'
        );
      }
    }
  };

  const scrollStrip = (dir: 'left' | 'right') => {
    if (stripRef.current) {
      stripRef.current.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
    }
  };

  const openNextModalFilm = () => {
    if (!modalFilm) return;
    const idx = films.findIndex((f) => f.id === modalFilm.id);
    const nextIdx = (idx + 1) % films.length;
    setModalFilm(films[nextIdx]);
  };

  const openPrevModalFilm = () => {
    if (!modalFilm) return;
    const idx = films.findIndex((f) => f.id === modalFilm.id);
    const prevIdx = (idx - 1 + films.length) % films.length;
    setModalFilm(films[prevIdx]);
  };

  return (
    <section id="films" className="films-showcase-section">
      <div className="films-inner">
        {/* Section Header */}
        <div ref={headRef} className={`films-header ${headIn ? 'visible' : ''}`}>
          <div className="eyebrow-line-wrap">
            <span className="eyebrow-line" />
            <span className="eyebrow-text">KALAPREMI PRODUCTIONS</span>
            <span className="eyebrow-line" />
          </div>
          <h2 className="films-section-title">
            Our <em>Films</em>
          </h2>
          <p className="films-section-subtitle">
            Original cinema crafted with passion and storytelling excellence. Click any poster below to switch featured preview.
          </p>
        </div>



        {/* ── MAIN CINEMATIC WIDESCREEN STAGE ── */}
        <div ref={stageRef} className={`film-feature-stage ${stageIn ? 'visible' : ''}`}>
          {/* Background Video or Banner Layer */}
          <div className="feature-bg-wrapper">
            {!isVideoEnded && activeFilm.youtubeId ? (
              <div className={`bg-video-container ${isFadingOut ? 'fading-out' : ''}`}>
                <iframe
                  ref={iframeRef}
                  key={activeFilm.id}
                  src={`https://www.youtube-nocookie.com/embed/${activeFilm.youtubeId}?autoplay=1&mute=1&start=120&end=150&controls=0&disablekb=1&fs=0&iv_load_policy=3&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${activeFilm.youtubeId}&playsinline=1&enablejsapi=1`}
                  title={`${activeFilm.title} Background Teaser`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="bg-video-iframe"
                />
              </div>
            ) : (
              <div className="centered-banner-container" onClick={replayVideo} title="Click to replay video">
                <img
                  key={activeFilm.id}
                  src={activeFilm.poster}
                  alt={activeFilm.title}
                  className="feature-centered-banner"
                  loading="lazy"
                  width="800"
                  height="1200"
                />
              </div>
            )}
            <div className="feature-ambient-overlay" />
            <div className="feature-projector-beam" />
          </div>

          {/* Redesigned Sound Toggle Button Top Right */}
          {!isVideoEnded && (
            <button
              className={`video-audio-toggle ${!isMuted ? 'unmuted' : ''}`}
              onClick={toggleSound}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? (
                <>
                  <PiSpeakerSlashDuotone className="sound-toggle-icon" />
                  <span className="sound-toggle-label">Muted</span>
                </>
              ) : (
                <>
                  <PiSpeakerHighDuotone className="sound-toggle-icon" />
                  <span className="sound-toggle-label">Sound On</span>
                  <span className="sound-waves">
                    <span className="wave-bar" />
                    <span className="wave-bar" />
                    <span className="wave-bar" />
                  </span>
                </>
              )}
            </button>
          )}

          {/* Text & Details Content Box */}
          <div className="feature-content-box">
            <div className="feature-now-playing">
              <span className="rec-dot-live" />{' '}
              {isVideoEnded ? 'CLICK BANNER TO REPLAY' : isFadingOut ? 'PAUSED / FADING' : 'NOW PREVIEWING FEATURE'}
            </div>

            <span className="feature-genre-tag">{activeFilm.genre}</span>

            <h3 className="feature-title">{activeFilm.title}</h3>

            <p className="feature-synopsis">{activeFilm.description}</p>

            <div className="feature-metadata-row">
              <div className="meta-item">
                <span className="meta-label">DIRECTOR</span>
                <span className="meta-val">{activeFilm.director}</span>
              </div>
              <div className="meta-sep">•</div>
              <div className="meta-item">
                <span className="meta-label">RELEASE YEAR</span>
                <span className="meta-val">{activeFilm.year}</span>
              </div>
            </div>

            <div className="feature-actions">
              <button className="btn-teaser-details" onClick={() => setModalFilm(activeFilm)}>
                <span>View Full Synopsis & Info ✦</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── HORIZONTAL FILM STRIP CAROUSEL ── */}
        <div ref={gridRef} className={`film-strip-wrapper ${gridIn ? 'visible' : ''}`}>
          <div className="strip-header-bar">
            <span className="strip-label">CLICK ANY POSTER TO SWITCH BACKGROUND TEASER</span>

            <div className="strip-nav-arrows">
              <button className="strip-arrow-btn" onClick={() => scrollStrip('left')} aria-label="Previous Film">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
              <button className="strip-arrow-btn" onClick={() => scrollStrip('right')} aria-label="Next Film">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="film-horizontal-strip" ref={stripRef}>
            {filteredFilms.map((film, i) => {
              const isActive = activeFilm.id === film.id;

              return (
                <div
                  key={film.id}
                  className={`film-card-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelectFilm(film)}
                >
                  <div className="film-card-poster-frame">
                    <img src={film.poster} alt={film.title} loading="lazy" width="200" height="300" />
                    
                    <div className="card-gradient-overlay" />
                    <span className="card-index">{String(i + 1).padStart(2, '0')}</span>

                    <div className="card-play-hover-icon">
                      <span className="p-icon">▶</span>
                      <span className="p-text">SELECT FILM</span>
                    </div>

                    {isActive && (
                      <div className="active-badge">
                        <span>{isVideoEnded ? 'SELECTED' : 'NOW PLAYING ▶'}</span>
                      </div>
                    )}
                  </div>

                  <div className="film-card-details">
                    <span className="card-genre">{film.genre}</span>
                    <h4 className="card-title">{film.title}</h4>
                    <p className="card-director">Dir. {film.director}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── FILM LIGHTBOX MODAL ── */}
      {modalFilm && (
        <div className="film-detail-modal-overlay" onClick={() => setModalFilm(null)}>
          <div className="film-detail-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="detail-modal-close" onClick={() => setModalFilm(null)}>
              ✕
            </button>

            <div className="detail-modal-grid">
              <div className="detail-poster-column">
                <img src={modalFilm.poster} alt={modalFilm.title} />
              </div>

              <div className="detail-info-column">
                <div className="detail-header">
                  <span className="detail-genre">{modalFilm.genre}</span>
                  <h3 className="detail-title">{modalFilm.title}</h3>
                </div>

                <div className="detail-meta-grid">
                  <div className="d-meta-cell">
                    <span className="cell-lbl">DIRECTOR</span>
                    <span className="cell-val">{modalFilm.director}</span>
                  </div>
                  <div className="d-meta-cell">
                    <span className="cell-lbl">RELEASE YEAR</span>
                    <span className="cell-val">{modalFilm.year}</span>
                  </div>
                  <div className="d-meta-cell">
                    <span className="cell-lbl">HOUSE</span>
                    <span className="cell-val">Kalapremi Productions</span>
                  </div>
                </div>

                <div className="detail-body">
                  <span className="body-heading">SYNOPSIS</span>
                  <p className="body-text">{modalFilm.description}</p>
                </div>

                <div className="detail-modal-footer">
                  <button className="nav-modal-btn" onClick={openPrevModalFilm}>
                    ← Previous Film
                  </button>
                  <button
                    className="nav-modal-btn highlight"
                    onClick={() => {
                      setActiveFilm(modalFilm);
                      setModalFilm(null);
                    }}
                  >
                    ▶ Select & Play
                  </button>
                  <button className="nav-modal-btn" onClick={openNextModalFilm}>
                    Next Film →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Divider Accent */}
      <div className="films-bottom-accent" />
    </section>
  );
};

export default Films;
