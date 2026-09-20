import { useScrollReveal } from '../hooks/useScrollReveal';

const SKILLS = [
  'Web Development', 'React', 'JavaScript', 'TypeScript', 'UI/UX',
  'Video Editing', 'Premiere Pro', 'After Effects', 'CapCut', 'Motion Graphics',
  'Graphic Design', 'Canva', 'Branding', 'Adobe Creative Suite', 'Creative Strategy',
];

export default function AboutSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  return (
    <section id="about" className="section">
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div
          ref={sectionRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left - Profile */}
          <div
            className={`fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* Profile image with glow */}
            <div
              style={{
                position: 'relative',
                width: 'min(240px, 60vw)',
                height: 'min(240px, 60vw)',
                marginBottom: '24px',
              }}
            >
              {/* Glow ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-12px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, rgba(139, 92, 246, 0.6), rgba(99, 102, 241, 0.3), transparent, rgba(167, 139, 250, 0.4), rgba(139, 92, 246, 0.6))',
                  animation: 'rotateGlow 6s linear infinite',
                  filter: 'blur(3px)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '-2px',
                  borderRadius: '50%',
                  background: '#080810',
                }}
              />
              <img
                src="/images/profile.jpg"
                alt="Alex Johnson"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                }}
              />

              {/* Floating accent */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  zIndex: 2,
                  background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #080810',
                  boxShadow: '0 0 16px rgba(139, 92, 246, 0.6)',
                }}
              >
                <span style={{ fontSize: '14px' }}>⚡</span>
              </div>
            </div>

            {/* Stat pills */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { num: '2+', label: 'Years Exp.' },
                { num: '20+', label: 'Projects' },
                { num: '20+', label: 'Clients' },
              ].map((stat) => (
                <div
                  key={stat.num}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      background: 'linear-gradient(135deg, #a78bfa, #818cf8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.num}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.5px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div
            className={`fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '0.15s' }}
          >
            <div className="section-label" style={{ marginBottom: '12px' }}>About Me</div>
            <div className="section-divider" />

            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: '600',
                lineHeight: 1.2,
                color: 'white',
                marginBottom: '20px',
                letterSpacing: '-0.5px',
              }}
            >
              Turning ideas into{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #a78bfa, #818cf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                digital reality
              </span>
            </h2>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '16px',
              }}
            >
              I’m a creative digital professional who blends web development, video editing,
              and graphic design to build polished experiences that look good and work even better.
            </p>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '32px',
              }}
            >
              From responsive websites and smooth interfaces to engaging videos and strong visual
              identity, I turn ideas into compelling digital content with clarity, creativity, and impact.
            </p>

            {/* Skill tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {SKILLS.map((skill) => (
                <span key={skill} className="skill-badge" style={{ fontSize: '12px', padding: '6px 14px' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
