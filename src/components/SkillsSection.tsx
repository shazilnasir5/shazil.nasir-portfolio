import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Skill {
  name: string;
  icon: string;
  level: number;
  description: string;
  category: string;
}

const SKILLS: Skill[] = [
  // Web Development
  { name: 'HTML5', icon: '🌐', level: 95, description: 'Semantic structure for clean, accessible landing pages', category: 'Web Development' },
  { name: 'CSS3', icon: '🎨', level: 94, description: 'Responsive layouts, modern styling, and polished UI', category: 'Web Development' },
  { name: 'JavaScript', icon: '⚡', level: 92, description: 'Interactive site behavior and client-side logic', category: 'Web Development' },
  { name: 'React', icon: '⚛️', level: 94, description: 'Reusable components and dynamic portfolio interfaces', category: 'Web Development' },
  { name: 'TypeScript', icon: '📘', level: 90, description: 'Typed, scalable frontend logic for cleaner code', category: 'Web Development' },
  { name: 'Vite', icon: '🚀', level: 88, description: 'Modern frontend setup and faster development flow', category: 'Web Development' },
  { name: 'Responsive Design', icon: '📱', level: 93, description: 'Mobile-friendly layouts for all screen sizes', category: 'Web Development' },
  { name: 'GitHub', icon: '💻', level: 90, description: 'Project versioning and deployment-ready workflows', category: 'Web Development' },

  // Video Editing
  { name: 'Premiere Pro', icon: '🎬', level: 95, description: 'Editing, sequencing, and storytelling for video projects', category: 'Video Editing' },
  { name: 'After Effects', icon: '✨', level: 90, description: 'Motion graphics, transitions, and engaging visual effects', category: 'Video Editing' },
  { name: 'CapCut', icon: '✂️', level: 88, description: 'Quick short-form edits for social and YouTube content', category: 'Video Editing' },
  { name: 'Color Grading', icon: '🎞️', level: 87, description: 'Cinematic color correction for polished visuals', category: 'Video Editing' },
  { name: 'Sound Design', icon: '🔊', level: 82, description: 'Audio cleanup and enhancement for stronger output', category: 'Video Editing' },
  { name: 'YouTube Content', icon: '📹', level: 86, description: 'Short and long-form edits tailored for online audiences', category: 'Video Editing' },

  // Graphic Design
  { name: 'Canva', icon: '🖌️', level: 93, description: 'Social media posts, banners, and visual creatives', category: 'Graphic Design' },
  { name: 'Figma', icon: '🧩', level: 88, description: 'Interface layouts, prototypes, and design exploration', category: 'Graphic Design' },
  { name: 'Branding', icon: '🏷️', level: 90, description: 'Visual identity and consistent brand presentation', category: 'Graphic Design' },
  { name: 'Poster Design', icon: '📰', level: 89, description: 'Campaign and promotional design with strong layout focus', category: 'Graphic Design' },
  { name: 'Social Media Creatives', icon: '📣', level: 87, description: 'Engaging digital assets for marketing and content growth', category: 'Graphic Design' },
  { name: 'Adobe Creative Suite', icon: '🖼️', level: 84, description: 'Photoshop-based design workflows and polished visuals', category: 'Graphic Design' },
];

const CATEGORIES = ['All', 'Web Development', 'Video Editing', 'Graphic Design'];

interface SkillBadgeProps {
  skill: Skill;
  index: number;
  isVisible: boolean;
}

function SkillBadge({ skill, index, isVisible }: SkillBadgeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`fade-in-up ${isVisible ? 'visible' : ''}`}
      style={{
        transitionDelay: `${(index % 6) * 0.06}s`,
        position: 'relative',
      }}
    >
      <div
        className="skill-badge"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%',
          padding: '14px 18px',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'default',
          boxShadow: hovered ? '0 4px 20px rgba(139, 92, 246, 0.2)' : 'none',
        }}
      >
        <span style={{ fontSize: '18px', lineHeight: 1 }}>{skill.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: hovered ? 'white' : 'rgba(255,255,255,0.8)',
              marginBottom: '4px',
              letterSpacing: '0.2px',
            }}
          >
            {skill.name}
          </div>
          {/* Level bar */}
          <div
            style={{
              height: '2px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: isVisible ? `${skill.level}%` : '0%',
                background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
                borderRadius: '2px',
                transition: `width 1s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.04}s`,
                boxShadow: hovered ? '0 0 8px rgba(139, 92, 246, 0.8)' : 'none',
              }}
            />
          </div>
        </div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: '600',
            color: hovered ? '#a78bfa' : 'rgba(255,255,255,0.3)',
            minWidth: '32px',
            textAlign: 'right',
            transition: 'color 0.2s ease',
          }}
        >
          {skill.level}%
        </span>

        {/* Tooltip */}
        {hovered && (
          <div
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 10px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(16, 16, 28, 0.96)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '11px',
              padding: '8px 12px',
              borderRadius: '10px',
              whiteSpace: 'nowrap',
              zIndex: 20,
              boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              pointerEvents: 'none',
            }}
          >
            {skill.description}
            <div
              style={{
                position: 'absolute',
                bottom: '-5px',
                left: '50%',
                width: '8px',
                height: '8px',
                background: 'rgba(16, 16, 28, 0.96)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderTop: 'none',
                borderLeft: 'none',
                transform: 'translateX(-50%) rotate(45deg)',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.05 });
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section">
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div
          ref={headerRef}
          className={`fade-in-up ${headerVisible ? 'visible' : ''}`}
          style={{ marginBottom: '48px' }}
        >
          <div className="section-label" style={{ marginBottom: '12px' }}>Technical Skills</div>
          <div className="section-divider" />
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: '600',
              color: 'white',
              letterSpacing: '-0.5px',
            }}
          >
            What I{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              work with
            </span>
          </h2>
        </div>

        {/* Category filter */}
        <div
          className={`fade-in-up ${headerVisible ? 'visible' : ''}`}
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '36px',
            flexWrap: 'wrap',
            transitionDelay: '0.1s',
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: '500',
                border: '1px solid',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                background: activeCategory === cat ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                borderColor: activeCategory === cat ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255,255,255,0.1)',
                color: activeCategory === cat ? 'white' : 'rgba(255,255,255,0.5)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '12px',
          }}
        >
          {filtered.map((skill, i) => (
            <SkillBadge key={skill.name} skill={skill} index={i} isVisible={gridVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
