export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '32px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '16px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #ffffff, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AJ
          </span>
          <span style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
            © {year} Shazil Nasir. All rights reserved.
          </span>
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {[
            { label: 'GitHub', href: 'https://github.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com' },
            { label: 'Twitter', href: 'https://twitter.com' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.3)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.3)';
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.5px' }}>
          Crafted with ♥ in Rawalpindi
        </div>
      </div>
    </footer>
  );
}
