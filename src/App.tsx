import { useState, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Background from './components/Background';
import MouseGlow from './components/MouseGlow';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Main Site */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          minHeight: '100vh',
        }}
      >
        {/* Ambient background */}
        <Background />

        {/* Mouse glow effect */}
        <MouseGlow />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main style={{ position: 'relative', zIndex: 2 }}>
          <HeroSection />

          {/* Divider */}
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(139,92,246,0.15) 50%, rgba(255,255,255,0.06) 70%, transparent)' }} />
          </div>

          <AboutSection />

          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(139,92,246,0.15) 50%, rgba(255,255,255,0.06) 70%, transparent)' }} />
          </div>

          <ProjectsSection />

          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(139,92,246,0.15) 50%, rgba(255,255,255,0.06) 70%, transparent)' }} />
          </div>

          <SkillsSection />

          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(139,92,246,0.15) 50%, rgba(255,255,255,0.06) 70%, transparent)' }} />
          </div>

          <ExperienceSection />

          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(139,92,246,0.15) 50%, rgba(255,255,255,0.06) 70%, transparent)' }} />
          </div>

          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
