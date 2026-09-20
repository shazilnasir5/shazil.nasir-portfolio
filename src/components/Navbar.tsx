import { useEffect, useState, useCallback } from 'react';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Update active section
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = useCallback((href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Prevent scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Main Navbar */}
      <nav
        className="animate-nav-reveal"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '8px',
            padding: scrolled ? '10px 20px' : '12px 24px',
            borderRadius: '50px',
            background: scrolled
              ? 'rgba(8, 8, 16, 0.85)'
              : 'rgba(255, 255, 255, 0.04)',
            border: scrolled
              ? '1px solid rgba(139, 92, 246, 0.2)'
              : '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.1)'
              : '0 4px 24px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            maxWidth: 'calc(100vw - 40px)',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => handleNav('#home')}
            style={{
              fontSize: '15px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #ffffff, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              border: 'none',
              cursor: 'pointer',
              marginRight: '12px',
              letterSpacing: '1px',
              padding: 0,
              lineHeight: 1,
            }}
          >
            SN
          </button>

          {/* Desktop Nav Links */}
          <div className="desktop-nav" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className={`nav-link ${active === item.href.replace('#', '') ? 'active' : ''}`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 2px',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Hamburger - mobile only */}
          <button
            className="hamburger-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
            }}
            aria-label="Toggle menu"
          >
            <div
              className="hamburger-line"
              style={{
                transform: mobileOpen ? 'rotate(45deg) translateY(6.5px)' : 'none',
              }}
            />
            <div
              className="hamburger-line"
              style={{
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <div
              className="hamburger-line"
              style={{
                transform: mobileOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : 'closed'}`}>
        {/* Close btn */}
        <button
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'absolute',
            top: '28px',
            right: '24px',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '24px',
            cursor: 'pointer',
          }}
          aria-label="Close menu"
        >
          ✕
        </button>

        {NAV_ITEMS.map((item, i) => (
          <button
            key={item.href}
            onClick={() => handleNav(item.href)}
            style={{
              background: 'none',
              border: 'none',
              color: active === item.href.replace('#', '') ? '#a78bfa' : 'rgba(255,255,255,0.7)',
              fontSize: '28px',
              fontWeight: '300',
              letterSpacing: '2px',
              cursor: 'pointer',
              padding: '12px 32px',
              transition: 'color 0.2s ease',
              animationDelay: `${i * 0.05}s`,
            }}
          >
            {item.label}
          </button>
        ))}

        <div style={{ height: '1px', width: '40px', background: 'rgba(139, 92, 246, 0.5)', margin: '16px 0' }} />
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', letterSpacing: '2px' }}>
          SN · Portfolio
        </span>
      </div>

      {/* Responsive style */}
      <style>{`
        @media (max-width: 640px) {
          nav { right: 12px !important; left: auto !important; top: 12px !important; }
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .mobile-menu {
            width: min(85vw, 320px) !important;
            right: 12px !important;
            top: 12px !important;
          }
        }
      `}</style>
    </>
  );
}
