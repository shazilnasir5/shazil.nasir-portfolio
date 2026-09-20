import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<'show' | 'fadeout'>('show');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('fadeout'), 1600);
    const timer2 = setTimeout(() => onComplete(), 2100);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div
      className="loading-screen"
      style={{
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: phase === 'fadeout' ? 'none' : 'all',
      }}
    >
      {/* Background subtle glow */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Initials */}
      <div
        className="animate-loading-initials"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(36px, 8vw, 56px)',
            fontWeight: '700',
            letterSpacing: '8px',
            background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #818cf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
          }}
        >
          SN
        </span>
        <span
          style={{
            fontSize: '11px',
            letterSpacing: '4px',
            color: 'rgba(255,255,255,0.35)',
            fontWeight: '400',
            textTransform: 'uppercase',
          }}
        >
          Portfolio
        </span>
      </div>

      {/* Loading bar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <div className="loading-bar-track">
          <div className="loading-bar-fill" />
        </div>
      </div>
    </div>
  );
}
