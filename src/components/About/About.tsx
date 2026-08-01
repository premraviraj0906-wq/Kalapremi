import React, { useEffect, useRef } from 'react';
import { useInView } from '../../hooks';
import { PiFilmReelDuotone, PiMaskHappyDuotone, PiProjectorScreenDuotone } from 'react-icons/pi';
import './About.css';

/* ── Coordinate space: 300×480, rendered at 2× ── */
const SCALE = 2.0;
const W_ORIG = 300;
const H_ORIG = 480;

type BodyPart =
  | 'head' | 'hair' | 'neck' | 'torso' | 'necklace'
  | 'leftArm' | 'rightArm' | 'bangles'
  | 'skirtInner' | 'skirtMid' | 'skirtOuter' | 'pleat'
  | 'standingLeg' | 'raisedLeg' | 'foot' | 'bells';

interface DotPoint {
  x: number; y: number;
  revealAt: number; r: number;
  part: BodyPart;
  /* arm along-limb parameter for wave offset (0–1) */
  t?: number;
}

const buildDancerPoints = (): DotPoint[] => {
  const pts: DotPoint[] = [];
  const dot = (x: number, y: number, part: BodyPart, t?: number) =>
    pts.push({ x, y, revealAt: Math.random(), r: Math.random() * 1.6 + 0.65, part, t });

  // Head
  for (let a = 0; a < Math.PI * 2; a += 0.2) dot(150 + Math.cos(a) * 22, 52 + Math.sin(a) * 22, 'head');
  // Hair bun
  for (let a = Math.PI; a < Math.PI * 2; a += 0.26) dot(150 + Math.cos(a) * 13, 30 + Math.sin(a) * 12, 'hair');
  // Earrings
  for (let y = 58; y < 76; y += 5) { dot(126, y, 'head'); dot(174, y, 'head'); }
  // Neck
  for (let y = 75; y < 96; y += 5) dot(150 + (Math.random() - 0.5) * 4, y, 'neck');
  // Torso
  for (let y = 96; y < 185; y += 8)
    for (let x = 130; x < 170; x += 11)
      dot(x + Math.random() * 3, y + Math.random() * 3, 'torso');
  // Necklace
  for (let a = 0.25; a < Math.PI - 0.25; a += 0.18)
    dot(150 + Math.cos(a) * 20, 99 + Math.sin(a) * 10, 'necklace');

  // LEFT ARM — raised in mudra; t=0 at shoulder, t=1 at fingertip
  for (let t = 0; t <= 1; t += 0.055)
    dot(148 - t * 100, 118 - t * 75, 'leftArm', t);
  // Mudra fingers
  [48, 44, 48, 53, 58, 54].forEach((x, i) => dot(x, [43, 38, 34, 33, 36, 40][i], 'leftArm', 1));

  // RIGHT ARM — extends down-right; t=0 shoulder, t=1 hand
  for (let t = 0; t <= 1; t += 0.055)
    dot(152 + t * 85, 128 + t * 50, 'rightArm', t);
  [237, 242, 246, 243].forEach((x, i) => dot(x, [178, 174, 178, 183][i], 'rightArm', 1));

  // Bangles
  for (let a = 0; a < Math.PI * 2; a += 0.55) {
    dot(88 + Math.cos(a) * 7, 74 + Math.sin(a) * 5, 'bangles');
    dot(206 + Math.cos(a) * 7, 160 + Math.sin(a) * 5, 'bangles');
  }

  // SKIRT — wide fanned Kathak costume
  for (let a = 0.05; a <= Math.PI - 0.05; a += 0.055) {
    const r = 85 + Math.sin(a) * 15;
    dot(150 + Math.cos(a) * r, 272 + Math.sin(a) * 40, 'skirtOuter', (a / Math.PI));
  }
  for (let a = 0.15; a <= Math.PI - 0.15; a += 0.07)
    dot(150 + Math.cos(a) * 60, 242 + Math.sin(a) * 28, 'skirtMid', (a / Math.PI));
  for (let a = -0.1; a <= Math.PI + 0.1; a += 0.04) {
    const r = 90 + Math.sin(a * 6) * 5;
    dot(150 + Math.cos(a) * r, 285 + Math.sin(a) * 44, 'skirtOuter', (a / Math.PI));
  }
  for (let i = 0; i < 7; i++) {
    const ax = 150 - 75 + i * 25;
    for (let y = 220; y < 285; y += 9) dot(ax + Math.sin(y * 0.3) * 4, y, 'pleat', i / 6);
  }

  // Standing leg
  for (let y = 185; y < 405; y += 7) dot(158 + Math.sin(y * 0.07) * 2, y, 'standingLeg');
  // Ankle bells
  for (let a = 0; a < Math.PI * 2; a += 0.45) dot(158 + Math.cos(a) * 9, 392 + Math.sin(a) * 5, 'bells');
  // Foot
  for (let x = 148; x < 172; x += 5) dot(x, 406, 'foot');

  // RAISED LEG — Kathak tatkar bent stance
  for (let t = 0; t <= 1; t += 0.065) dot(148 - t * 50, 230 + t * 30, 'raisedLeg', t);
  for (let t = 0; t <= 1; t += 0.065) dot(98 - t * 15, 260 - t * 45, 'raisedLeg', 0.5 + t * 0.5);
  [82, 86, 90, 94].forEach((x, i) => dot(x, [215, 212, 210, 212][i], 'raisedLeg', 1));

  return pts;
};

const DANCER_POINTS = buildDancerPoints();

/* ── Per-body-part animation offset ── */
function getOffset(part: BodyPart, t: number, limbT: number): { dx: number; dy: number } {
  const s = (f: number, phase = 0) => Math.sin(t * f + phase);
  const c = (f: number, phase = 0) => Math.cos(t * f + phase);

  switch (part) {
    case 'head':
    case 'hair':
      // Head sways slightly, bobs
      return { dx: s(0.9) * 3.5, dy: s(1.1) * 1.5 };

    case 'neck':
      return { dx: s(0.9) * 2, dy: s(1.1) * 1 };

    case 'torso':
    case 'necklace':
      // Core sways less than extremities
      return { dx: s(0.9) * 1.5, dy: s(1.3, 0.4) * 1.2 };

    case 'leftArm': {
      // Mudra arm lifts and lowers expressively — amplitude grows toward fingertips
      const amp = limbT * 12;
      return { dx: s(0.85, 0.3) * amp * 0.5, dy: c(0.85, 0.3) * amp };
    }

    case 'rightArm': {
      // Opposite phase to left arm, subtle extension
      const amp = limbT * 9;
      return { dx: s(0.85, Math.PI) * amp * 0.4, dy: s(1.0, Math.PI + 0.5) * amp };
    }

    case 'bangles':
      // Bangles jingle — small high-freq shimmer
      return { dx: s(2.5) * 2.5, dy: c(2.5) * 2 };

    case 'skirtOuter': {
      // Skirt flares with a sway; outer edge moves the most
      const phase = (limbT - 0.5) * Math.PI * 0.8;
      return { dx: s(0.7, phase) * 14, dy: Math.abs(s(0.7, phase)) * 4 };
    }
    case 'skirtMid': {
      const phase = (limbT - 0.5) * Math.PI * 0.5;
      return { dx: s(0.7, phase) * 8, dy: Math.abs(s(0.7, phase)) * 2 };
    }
    case 'pleat': {
      // Each pleat ripples with a wave
      const phase = limbT * Math.PI;
      return { dx: s(1.2, phase) * 5, dy: c(0.9, phase) * 3 };
    }

    case 'standingLeg':
      // Grounded — very minimal sway (weight-bearing)
      return { dx: s(0.9) * 1, dy: 0 };

    case 'raisedLeg': {
      // Raised leg draws arcs — Kathak footwork
      const legAmp = 1 + limbT * 1.5;
      return {
        dx: s(1.0, 1.2) * legAmp * 4,
        dy: c(1.0, 1.2) * legAmp * 6,
      };
    }

    case 'bells':
      // Ghungroos jingle with footwork
      return { dx: s(2.0) * 3, dy: Math.abs(s(2.0)) * 4 };

    case 'foot':
      // Tatkar footstamp: sharp up-down
      return { dx: 0, dy: Math.max(0, s(2.0)) * 5 };

    default:
      return { dx: 0, dy: 0 };
  }
}

const About: React.FC = () => {
  const { ref: sectionRef, inView } = useInView(0.05);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const scrollProgressRef = useRef(0);

  /* ── Scroll progress through section ── */
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('about');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const prog = Math.max(0, Math.min(1, (vh - rect.top) / (rect.height * 0.7)));
      scrollProgressRef.current = prog;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Canvas animation ── */
  useEffect(() => {
    if (!inView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Phone: large canvas at 1.8×, CSS clips to ~58vw — big and bright
    // Tablet: smaller watermark at 0.85×
    // Desktop: full 2× SCALE
    const screenW = window.innerWidth;
    const responsiveScale = screenW <= 768 ? 1.1 : screenW <= 1024 ? 0.85 : SCALE;
    const W_D = Math.round(W_ORIG * responsiveScale);
    const H_D = Math.round(H_ORIG * responsiveScale);
    canvas.width = W_D * dpr;
    canvas.height = H_D * dpr;
    canvas.style.width = `${W_D}px`;
    canvas.style.height = `${H_D}px`;
    ctx.scale(dpr * responsiveScale, dpr * responsiveScale);

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, W_ORIG, H_ORIG);

      const progress = scrollProgressRef.current;
      const animTime = ts * 0.001; // seconds

      DANCER_POINTS.forEach(p => {
        if (p.revealAt > progress) return;

        // Scroll-based fade in
        const scrollFade = Math.min(1, (progress - p.revealAt) / 0.04);
        // Breathing pulse (medium-bright backdrop sketch)
        const breathe = 0.38 + Math.sin(ts * 0.0008 + p.revealAt * 12) * 0.12;
        const alpha = scrollFade * breathe;

        // Dance movement offset (only after fully revealed)
        const danceWeight = Math.min(1, (progress - p.revealAt) / 0.15);
        const off = getOffset(p.part, animTime, p.t ?? 0);
        const dx = off.dx * danceWeight;
        const dy = off.dy * danceWeight;

        ctx.beginPath();
        ctx.arc(p.x + dx, p.y + dy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 192, 64, ${alpha})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView]);

  const pillars = [
    {
      num: '01', title: 'THE ORIGIN',
      headline: 'A community for artists built-by artists',
      icon: <PiFilmReelDuotone />,
      description: 'Kalapremi Productions was born out of necessity when independent artists faced limited avenues to showcase original work. What started as a home for our own short films has evolved into a thriving platform standing alongside independent creators across mediums.',
    },
    {
      num: '02', title: 'THE SPECTRUM',
      headline: 'Multidisciplinary Creative House',
      icon: <PiMaskHappyDuotone />,
      description: 'We bridge the boundaries between Cinema, Kathak & Contemporary Dance, Visual Stipple Canvas, and Fine Photography — uniting distinct artistic disciplines into a single harmonious platform.',
    },
    {
      num: '03', title: 'THE PHILOSOPHY',
      headline: 'Feeling Before Analyzing',
      icon: <PiProjectorScreenDuotone />,
      description: 'At our core, we believe in authentic human storytelling, growing together as a collective, and crafting narrative experiences without judgment — making art that resonates deeply.',
    },
  ];

  return (
    <section id="about" className="minimal-about-section" ref={sectionRef}>
      <div className="dancer-canvas-wrap">
        <canvas ref={canvasRef} className="dancer-stipple-canvas" />
      </div>

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
