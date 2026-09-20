import { useRef, useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const getProjectScreenshotUrl = async (url: string) => {
  const response = await fetch(
    `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch project screenshot');
  }

  const data = await response.json();
  return data?.data?.screenshot?.url || '';
};

const WORK_SECTIONS = [
  {
    title: 'Web Development',
    description: 'Responsive websites and digital products built for performance, UX, and conversion.',
    accent: 'rgba(139, 92, 246, 0.5)',
    projects: [
      {
        id: 1,
        name: 'HCI Fuaast Portal',
        description: 'A university portal experience focused on usability and streamlined access to academic information.',
        image: '/images/HCI_Portal.png',
        tags: ['React', 'Portal', 'UX', 'Web App'],
        link: 'https://hci-fuaast-portal.vercel.app/',
        accent: 'rgba(139, 92, 246, 0.5)',
      },
      {
        id: 2,
        name: 'Clinic Website',
        description: 'A clean healthcare website designed for patient trust, service visibility, and easy navigation.',
        image: '/images/Clinic_website.png',
        tags: ['Healthcare', 'Responsive', 'Landing Page'],
        link: 'https://clinic-website-tau-nine.vercel.app/',
        accent: 'rgba(99, 102, 241, 0.5)',
      },
      {
        id: 3,
        name: 'Faisal School Website',
        description: 'A modern school website highlighting academic programs, campus engagement, and institutional identity.',
        image: '/images/faisalSchool_website.png',
        tags: ['Education', 'School', 'Website'],
        link: 'https://faisal-school-website.vercel.app/',
        accent: 'rgba(167, 139, 250, 0.5)',
      },
      {
        id: 4,
        name: 'Anglo School Website',
        description: 'A polished educational website showcasing school values, programs, and a strong digital-first presentation.',
        image: '/images/AngloSchool_website.png',
        tags: ['Education', 'Branding', 'Website'],
        link: 'https://anglo-school-website.vercel.app/',
        accent: 'rgba(139, 92, 246, 0.5)',
      },
      {
        id: 5,
        name: 'Ibrahim Tahir Portfolio',
        description: 'A personal portfolio website designed to present work, identity, and professional presence online.',
        image: '/images/Ibrahim_website.png',
        tags: ['Portfolio', 'Personal Brand', 'Responsive'],
        link: 'https://ibrahim-tahir-portfolio.vercel.app/',
        accent: 'rgba(99, 102, 241, 0.5)',
      },
      {
        id: 6,
        name: 'Lenovo Online Store',
        description: 'A product-driven e-commerce storefront designed for browsing, showcasing devices, and encouraging conversion.',
        image: '/images/Lenovo_website.png',
        tags: ['E-commerce', 'Store', 'UI Design'],
        link: 'https://lenovo-online-store.vercel.app/',
        accent: 'rgba(167, 139, 250, 0.5)',
      },
    ],
  },
  {
    title: 'Video Editing',
    description: 'Story-driven editing, motion polish, and content crafted to engage audiences and elevate brands.',
    accent: 'rgba(96, 165, 250, 0.5)',
    projects: [
      {
        id: 3,
        name: 'YouTube Channel Project',
        description: 'A collection of long-form and short-form videos created for a YouTube channel, covering engaging edits, storytelling, and platform-optimized content.',
        image: '/images/youtube.png',
        tags: ['YouTube', 'Long Videos', 'Short Videos', 'Editing'],
        link: 'https://drive.google.com/drive/folders/1xluFuXj_MGctyWq7VxwFUWNeSo1txfUC?usp=sharing',
        accent: 'rgba(96, 165, 250, 0.5)',
      },
    ],
  },
  {
    title: 'Graphic Designing',
    description: 'Visual identities, posters, branding assets, and design systems built to feel memorable and premium.',
    accent: 'rgba(167, 139, 250, 0.5)',
    projects: [
      {
        id: 5,
        name: 'Designs',
        description: 'A curated collection of branding, promotional, and visual design work crafted with clean composition and strong creative direction.',
        image: '/images/design_thumbnail.png',
        tags: ['Branding', 'Designs', 'Adobe Suite'],
        link: 'https://drive.google.com/drive/folders/1XtE-nVV-_ZP5HwcgA3-GbWoHwNBdI7aO?usp=sharing',
        accent: 'rgba(167, 139, 250, 0.5)',
      },
    ],
  },
];

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
    accent: string;
  };
  delay: number;
  isVisible: boolean;
}

function ProjectCard({ project, delay, isVisible }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [imageSrc, setImageSrc] = useState(project.image);

  useEffect(() => {
    let active = true;

    const loadScreenshot = async () => {
      try {
        const screenshotUrl = await getProjectScreenshotUrl(project.link);
        if (active && screenshotUrl) {
          setImageSrc(screenshotUrl);
        }
      } catch {
        if (active) {
          setImageSrc(project.image);
        }
      }
    };

    if (project.link && project.link.startsWith('http')) {
      loadScreenshot();
    }

    return () => {
      active = false;
    };
  }, [project.image, project.link]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    setTilt({ x: dy * -4, y: dx * 4 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      className={`fade-in-up ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div
        ref={cardRef}
        className="project-card glass-reflection"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: hovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
          transition: hovered
            ? 'transform 0.1s ease-out, box-shadow 0.4s ease, border-color 0.4s ease'
            : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease',
          boxShadow: hovered
            ? `0 24px 64px rgba(0,0,0,0.6), 0 0 40px ${project.accent.replace('0.5', '0.15')}`
            : '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
        {/* Image container */}
        <div
          style={{
            position: 'relative',
            height: '220px',
            overflow: 'hidden',
            borderRadius: '18px 18px 0 0',
          }}
        >
          <img
            src={imageSrc}
            alt={project.name}
            className="project-card-img"
            loading="lazy"
            onError={() => setImageSrc(project.image)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Overlay gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to top, rgba(8,8,16,0.9) 0%, rgba(8,8,16,0.2) 50%, transparent 100%)`,
              transition: 'opacity 0.3s ease',
              opacity: hovered ? 0.7 : 0.85,
            }}
          />

          {/* Accent glow on hover */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at 50% 0%, ${project.accent.replace('0.5', '0.1')} 0%, transparent 70%)`,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              marginBottom: '8px',
              letterSpacing: '-0.3px',
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.45)',
              marginBottom: '16px',
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '11px',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.3px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => window.open(project.link, '_blank')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: '500',
              color: '#a78bfa',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.2s ease',
              opacity: hovered ? 1 : 0.7,
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            }}
          >
            View Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.05 });
  const [activeSection, setActiveSection] = useState(WORK_SECTIONS[0].title);

  const currentSection = WORK_SECTIONS.find((section) => section.title === activeSection) ?? WORK_SECTIONS[0];

  return (
    <section id="projects" className="section">
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div
          ref={headerRef}
          className={`fade-in-up ${headerVisible ? 'visible' : ''}`}
          style={{ marginBottom: '36px' }}
        >
          <div className="section-label" style={{ marginBottom: '12px' }}>Selected Work</div>
          <div className="section-divider" />
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: '600',
              color: 'white',
              letterSpacing: '-0.5px',
              maxWidth: '500px',
            }}
          >
            Things I've{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              built
            </span>
          </h2>
        </div>

        <div
          className={`fade-in-up ${gridVisible ? 'visible' : ''}`}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '32px',
            justifyContent: 'center',
          }}
        >
          {WORK_SECTIONS.map((section) => {
            const selected = section.title === activeSection;
            return (
              <button
                key={section.title}
                onClick={() => setActiveSection(section.title)}
                style={{
                  border: selected ? '1px solid rgba(167, 139, 250, 0.6)' : '1px solid rgba(255,255,255,0.1)',
                  background: selected ? 'rgba(167, 139, 250, 0.12)' : 'rgba(255,255,255,0.02)',
                  color: selected ? '#f5f3ff' : 'rgba(255,255,255,0.7)',
                  borderRadius: '999px',
                  padding: '10px 18px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {section.title}
              </button>
            );
          })}
        </div>

        {/* Active section content */}
        <div ref={gridRef} style={{ display: 'grid', gap: '28px' }}>
          <div className={`fade-in-up ${gridVisible ? 'visible' : ''}`}>
            <div style={{ marginBottom: '20px' }}>
              <div
                className="section-label"
                style={{ marginBottom: '8px', display: 'inline-block' }}
              >
                {currentSection.title}
              </div>
              <p
                style={{
                  margin: 0,
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  maxWidth: '640px',
                }}
              >
                {currentSection.description}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
              }}
            >
              {currentSection.projects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  delay={i * 0.1}
                  isVisible={gridVisible}
                />
              ))}
            </div>
          </div>
        </div>

        {/* See more */}
        <div
          className={`fade-in-up ${gridVisible ? 'visible' : ''}`}
          style={{ textAlign: 'center', marginTop: '48px', transitionDelay: '0.4s' }}
        >
          <button
            className="btn-ghost"
            onClick={() => window.open(currentSection.projects[0]?.link || '#', '_blank', 'noopener,noreferrer')}
          >
            View Section Projects
          </button>
        </div>
      </div>
    </section>
  );
}
