import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Particles
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      maxOpacity: number;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];
    const PARTICLE_COUNT = 60;

    function createParticle(): Particle {
      return {
        x: Math.random() * width,
        y: height + 10,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -(Math.random() * 0.6 + 0.2),
        opacity: 0,
        maxOpacity: Math.random() * 0.4 + 0.1,
        life: 0,
        maxLife: Math.random() * 400 + 200,
      };
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = createParticle();
      p.y = Math.random() * height;
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    // Blobs config
    const blobs = [
      { x: 0.15, y: 0.2, r: 320, color: 'rgba(139, 92, 246, 0.07)', dx: 0.0003, dy: 0.0002 },
      { x: 0.85, y: 0.75, r: 280, color: 'rgba(99, 102, 241, 0.06)', dx: -0.0002, dy: 0.0003 },
      { x: 0.5, y: 0.5, r: 200, color: 'rgba(167, 139, 250, 0.04)', dx: 0.0001, dy: -0.0002 },
    ];

    let blobTime = 0;

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Draw animated blobs
      blobTime += 1;
      for (const blob of blobs) {
        const bx = blob.x * width + Math.sin(blobTime * blob.dx * 1000) * 80;
        const by = blob.y * height + Math.cos(blobTime * blob.dy * 1000) * 60;

        const gradient = ctx!.createRadialGradient(bx, by, 0, bx, by, blob.r);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'transparent');

        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(bx, by, blob.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.life += 1;
        p.x += p.speedX;
        p.y += p.speedY;

        // Fade in/out
        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.1) {
          p.opacity = (lifeRatio / 0.1) * p.maxOpacity;
        } else if (lifeRatio > 0.8) {
          p.opacity = ((1 - lifeRatio) / 0.2) * p.maxOpacity;
        } else {
          p.opacity = p.maxOpacity;
        }

        if (p.life >= p.maxLife || p.y < -10) {
          particles[i] = createParticle();
          continue;
        }

        ctx!.save();
        ctx!.globalAlpha = p.opacity;
        ctx!.fillStyle = '#a78bfa';
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Static gradient mesh */}
      <div className="bg-mesh" />

      {/* Grid */}
      <div className="bg-grid" />

      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.8,
        }}
      />

      {/* Noise overlay */}
      <div className="noise-overlay" />
    </>
  );
}
