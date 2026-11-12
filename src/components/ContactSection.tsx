import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CONTACT_ITEMS = [
  {
    icon: '✉️',
    label: 'Email',
    value: 'shazilnasir898@gmail.com',
    href: 'mailto:shazilnasir898@gmail.com',
  },
  {
    icon: '📱',
    label: 'Phone',
    value: '+92 3355631801',
    href: 'tel:+923355631801',
  },
  {
    icon: 'github',
    label: 'GitHub',
    value: 'github.com/shazilnasir5',
    href: 'https://github.com/shazilnasir5',
  },
  {
    icon: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/shazil-nasir-88322a420',
    href: 'https://www.linkedin.com/in/shazil-nasir-88322a420/',
  },
  {
    icon: '�📍',
    label: 'Location',
    value: 'Chah Sultan, Rawalpindi',
    href: '#',
  },
];

export default function ContactSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="contact" className="section">
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
        <div ref={sectionRef}>
          {/* Header */}
          <div
            className={`fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ textAlign: 'center', marginBottom: '64px' }}
          >
            <div className="section-label" style={{ marginBottom: '12px' }}>
              Get In Touch
            </div>
            <div className="section-divider" style={{ margin: '12px auto 24px' }} />
            <h2
              style={{
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: '600',
                color: 'white',
                letterSpacing: '-1px',
                lineHeight: 1.1,
                marginBottom: '16px',
              }}
            >
              Let's build something{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #a78bfa, #818cf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                interesting.
              </span>
            </h2>
            <p
              style={{
                fontSize: '15px',
                color: 'rgba(255,255,255,0.4)',
                maxWidth: '440px',
                margin: '0 auto',
                lineHeight: 1.7,
              }}
            >
              Whether you have a project idea, a question, or just want to say hi —
              my inbox is always open.
            </p>
          </div>

          {/* Glass card with contact items */}
          <div
            className={`fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{
              transitionDelay: '0.15s',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              padding: 'clamp(24px, 5vw, 48px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Accent glow top */}
            <div
              style={{
                position: 'absolute',
                top: '-60px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '300px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '12px',
                marginBottom: '40px',
              }}
            >
              {CONTACT_ITEMS.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="contact-link"
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    textDecoration: 'none',
                    transform: hovered === i ? 'translateX(6px)' : 'translateX(0)',
                    borderColor: hovered === i ? 'rgba(139, 92, 246, 0.35)' : 'rgba(255,255,255,0.07)',
                    background: hovered === i ? 'rgba(139, 92, 246, 0.06)' : 'rgba(255,255,255,0.03)',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0, color: hovered === i ? 'white' : 'rgba(255,255,255,0.8)' }}>
                    {item.icon === 'github' ? (
                      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.64 2.29 3.04 1.61.1-.72.4-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.15a10.7 10.7 0 0 1 5.57 0c2.12-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3.01 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06V22c0 .3.2.64.77.53A11.1 11.1 0 0 0 12 .9Z" />
                      </svg>
                    ) : item.icon === 'linkedin' ? (
                      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.74H4.98V9.25h2.95v9.49ZM6.45 7.95a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.29 10.79h-2.95v-4.62c0-1.1-.02-2.51-1.53-2.51-1.53 0-1.77 1.2-1.77 2.43v4.7H9.54V9.25h2.83v1.3h.04c.39-.75 1.36-1.53 2.79-1.53 2.98 0 3.54 1.96 3.54 4.51v5.21Z" />
                      </svg>
                    ) : item.icon}
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: '10px',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.3)',
                        marginBottom: '2px',
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: '500',
                        color: hovered === i ? 'white' : 'rgba(255,255,255,0.7)',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                  {item.href !== '#' && (
                    <svg
                      style={{ marginLeft: 'auto', opacity: hovered === i ? 0.8 : 0.3, transition: 'opacity 0.2s ease', flexShrink: 0 }}
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div style={{ textAlign: 'center' }}>
              <a
                href="mailto:shazilnasir898@gmail.com"
                className="btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                  fontSize: '15px',
                  padding: '14px 36px',
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Let's Talk</span>
                <svg
                  style={{ position: 'relative', zIndex: 1 }}
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
