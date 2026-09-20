import { useEffect, useRef, useState } from 'react';

const TYPED_STRINGS = [
  'Web Developer',
  'Video Editor',
  'Graphic Designer',
  'Creative Problem Solver',
];

function useTypewriter(strings: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const current = strings[idx % strings.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (waiting) {
      timeout = setTimeout(() => setWaiting(false), pause);
      return () => clearTimeout(timeout);
    }

    if (deleting) {
      if (text === '') {
        setDeleting(false);
        setIdx((i) => i + 1);
        return;
      }
      timeout = setTimeout(() => setText((t) => t.slice(0, -1)), speed / 2);
    } else {
      if (text === current) {
        setWaiting(true);
        setTimeout(() => setDeleting(true), pause);
        return;
      }
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
    }

    return () => clearTimeout(timeout);
  }, [text, idx, deleting, waiting, strings, speed, pause]);

  return text;
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const typedText = useTypewriter(TYPED_STRINGS);
  const [parallaxY, setParallaxY] = useState(0);
  const blobsRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY * 0.3);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse parallax for blobs
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || 'ontouchstart' in window) return;

    const handleMouse = (e: MouseEvent) => {
      if (!blobsRef.current) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      const blobs = blobsRef.current.children;
      (blobs[0] as HTMLElement).style.transform = `translate(${dx * -20}px, ${dy * -15}px)`;
      (blobs[1] as HTMLElement).style.transform = `translate(${dx * 15}px, ${dy * 20}px)`;
      (blobs[2] as HTMLElement).style.transform = `translate(${dx * -10}px, ${dy * 10}px)`;
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Blob background */}
      <div
        ref={blobsRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {/* Blob 1 - top left */}
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '-5%',
            width: 'clamp(300px, 45vw, 600px)',
            height: 'clamp(300px, 45vw, 600px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
            transform: `translateY(${parallaxY * 0.2}px)`,
            transition: 'transform 0.1s ease-out',
            animation: 'blobFloat 14s ease-in-out infinite alternate',
          }}
        />
        {/* Blob 2 - bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '-5%',
            width: 'clamp(250px, 40vw, 500px)',
            height: 'clamp(250px, 40vw, 500px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, transparent 70%)',
            filter: 'blur(60px)',
            transform: `translateY(${-parallaxY * 0.15}px)`,
            transition: 'transform 0.1s ease-out',
            animation: 'blobFloat 18s ease-in-out infinite alternate-reverse',
          }}
        />
        {/* Blob 3 - center accent */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '40%',
            width: 'clamp(150px, 25vw, 300px)',
            height: 'clamp(150px, 25vw, 300px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
            transform: `translateY(${parallaxY * 0.1}px)`,
            transition: 'transform 0.1s ease-out',
            animation: 'blobFloat 20s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Floating ring decorations */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(85vw, 720px)',
          height: 'min(85vw, 720px)',
          borderRadius: '50%',
          border: '1px solid rgba(139, 92, 246, 0.07)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(65vw, 540px)',
          height: 'min(65vw, 540px)',
          borderRadius: '50%',
          border: '1px solid rgba(139, 92, 246, 0.05)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />
      {/* Rotating accent dot */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'min(85vw, 720px)',
          height: 'min(85vw, 720px)',
          marginTop: 'calc(min(85vw, 720px) / -2)',
          marginLeft: 'calc(min(85vw, 720px) / -2)',
          borderRadius: '50%',
          animation: 'rotateGlow 20s linear infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-3px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#8b5cf6',
            boxShadow: '0 0 12px rgba(139,92,246,0.9), 0 0 24px rgba(139,92,246,0.5)',
          }}
        />
      </div>

      {/* Hero Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '800px',
          width: '100%',
        }}
      >
        {/* Status badge */}
        <div
          className="animate-fade-in-1"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '50px',
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            marginBottom: '32px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#4ade80',
              boxShadow: '0 0 8px rgba(74, 222, 128, 0.8)',
              animation: 'pulseGlow 2s ease-in-out infinite',
            }}
          />
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', letterSpacing: '1px' }}>
            Available for opportunities
          </span>
        </div>

        {/* Main Name */}
        <h1
          className="animate-fade-in-2"
          style={{
            fontSize: 'clamp(44px, 9vw, 88px)',
            fontWeight: '700',
            lineHeight: 1.05,
            letterSpacing: '-2px',
            marginBottom: '16px',
          }}
        >
          <span style={{ color: 'white', display: 'block' }}>Shazil</span>
          <span
            style={{
              display: 'block',
              background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #c4b5fd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Nasir
          </span>
        </h1>

        {/* Typewriter */}
        <div
          className="animate-fade-in-3"
          style={{
            fontSize: 'clamp(16px, 3vw, 22px)',
            fontWeight: '300',
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.5px',
            marginBottom: '24px',
            minHeight: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0',
          }}
        >
          <span>{typedText}</span>
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1.1em',
              background: '#8b5cf6',
              marginLeft: '3px',
              borderRadius: '1px',
              animation: 'blinkCursor 1s step-end infinite',
            }}
          />
        </div>

        {/* Description */}
        <p
          className="animate-fade-in-3"
          style={{
            fontSize: 'clamp(14px, 2vw, 16px)',
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto 40px',
          }}
        >
          I build engaging web experiences, craft polished video content, and design visuals that
          bring ideas to life with clarity, creativity, and impact.
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-fade-in-4"
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            className="btn-primary"
            onClick={() => scrollToSection('projects')}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>View My Work</span>
          </button>
          <button
            className="btn-ghost"
            onClick={() => scrollToSection('contact')}
          >
            Contact Me
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="animate-fade-in-4"
          style={{
            marginTop: '64px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '11px', letterSpacing: '2px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
            Scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0.6), transparent)',
              animation: 'float 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}
