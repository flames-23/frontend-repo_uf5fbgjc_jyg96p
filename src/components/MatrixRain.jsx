import { useEffect, useRef } from 'react';

export default function MatrixRain({ density = 0.8, opacity = 0.2 }) {
  const canvasRef = useRef(null);
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1).map(() => Math.random() * canvas.height);

    const draw = () => {
      if (!ctx) return;
      ctx.fillStyle = `rgba(0,0,0,${Math.max(0.05, 0.2 * opacity)})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > density) continue;
        const text = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
        ctx.fillStyle = 'rgba(0,255,102,0.8)';
        ctx.shadowColor = '#00FF66';
        ctx.shadowBlur = 8;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        ctx.shadowBlur = 0;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    if (!prefersReduced) animationId = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [density, opacity, prefersReduced]);

  return <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />;
}
