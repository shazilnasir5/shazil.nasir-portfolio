import { useScrollReveal } from '../hooks/useScrollReveal';

const TIMELINE = [
  {
    year: '2024 – Present',
    role: 'Video Editor & Creative Professional',
    company: 'Class and Grace',
    description: 'Working with a YouTube agency on the channel Class and Grace, creating engaging long-form and short-form video content for digital audiences.',
    type: 'work',
  },
  {
    year: '2023 – Present',
    role: 'BS in Computer Science',
    company: 'Federal Urdu University of Arts, Science and Technology, Islamabad',
    description: 'Currently pursuing a Bachelor of Science in Computer Science, building a strong foundation in software, digital systems, and creative technology.',
    type: 'education',
  },
];

interface TimelineItemProps {
  item: typeof TIMELINE[0];
  index: number;
  isVisible: boolean;
  isLast: boolean;
}

function TimelineItem({ item, index, isVisible, isLast }: TimelineItemProps) {
  const isWork = item.type === 'work';

  return (
    <div
      className={`fade-in-up ${isVisible ? 'visible' : ''}`}
      style={{
        transitionDelay: `${index * 0.12}s`,
        display: 'flex',
        gap: '24px',
        position: 'relative',
      }}
    >
      {/* Timeline line and dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div
          className="animate-pulse-glow"
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: isWork ? '#8b5cf6' : '#818cf8',
            boxShadow: `0 0 12px ${isWork ? 'rgba(139, 92, 246, 0.8)' : 'rgba(129, 140, 248, 0.8)'}, 0 0 24px ${isWork ? 'rgba(139, 92, 246, 0.4)' : 'rgba(129, 140, 248, 0.4)'}`,
            flexShrink: 0,
            marginTop: '6px',
            zIndex: 1,
            position: 'relative',
          }}
        />
        {!isLast && (
          <div
            style={{
              width: '1px',
              flex: 1,
              background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0.4), rgba(139, 92, 246, 0.05))',
              minHeight: '40px',
              marginTop: '8px',
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : '40px', flex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '6px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '1px',
              color: isWork ? '#8b5cf6' : '#818cf8',
              background: isWork ? 'rgba(139, 92, 246, 0.1)' : 'rgba(129, 140, 248, 0.1)',
              border: `1px solid ${isWork ? 'rgba(139, 92, 246, 0.2)' : 'rgba(129, 140, 248, 0.2)'}`,
              padding: '3px 10px',
              borderRadius: '20px',
            }}
          >
            {item.year}
          </span>
          <span
            style={{
              fontSize: '10px',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            {isWork ? '⚡ Work' : '🎓 Education'}
          </span>
        </div>

        <h3
          style={{
            fontSize: '17px',
            fontWeight: '600',
            color: 'white',
            marginBottom: '2px',
            letterSpacing: '-0.2px',
          }}
        >
          {item.role}
        </h3>
        <div
          style={{
            fontSize: '13px',
            color: '#a78bfa',
            marginBottom: '8px',
            fontWeight: '500',
          }}
        >
          {item.company}
        </div>
        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.4)',
            maxWidth: '520px',
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="experience" className="section">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div
          ref={headerRef}
          className={`fade-in-up ${headerVisible ? 'visible' : ''}`}
          style={{ marginBottom: '56px' }}
        >
          <div className="section-label" style={{ marginBottom: '12px' }}>Journey</div>
          <div className="section-divider" />
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: '600',
              color: 'white',
              letterSpacing: '-0.5px',
            }}
          >
            Experience &{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Education
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef}>
          {TIMELINE.map((item, i) => (
            <TimelineItem
              key={i}
              item={item}
              index={i}
              isVisible={timelineVisible}
              isLast={i === TIMELINE.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
