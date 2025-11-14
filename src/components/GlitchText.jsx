import { useEffect, useRef } from 'react';
import './glitch.css';

export default function GlitchText({ text, className = '' }){
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute('data-text', text);
  }, [text]);

  return (
    <h1 ref={ref} className={`relative font-mono ${className} glitch-text`}>{text}</h1>
  );
}
