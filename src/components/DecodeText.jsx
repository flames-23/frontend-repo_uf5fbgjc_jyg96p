import { useEffect, useRef, useState } from 'react';

const glyphs = '░▒▓█/\\|_[]<>01abcdef';

export default function DecodeText({ text = 'HELLO', className = '' }){
  const [out, setOut] = useState('');
  const [revealed, setRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(()=>{
    setOut(''.padEnd(text.length, '█'));
  },[text]);

  const animate = () => {
    const total = text.length;
    let i = 0;
    const step = () => {
      i++;
      const shown = text.slice(0, i);
      let rest = '';
      for (let j=i; j<total; j++) rest += glyphs[Math.floor(Math.random()*glyphs.length)];
      setOut(shown + rest);
      if (i < total) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const onReveal = () => {
    if (revealed) return;
    setRevealed(true);
    animate();
  };

  return (
    <span ref={ref} onMouseEnter={onReveal} onFocus={onReveal} tabIndex={0} className={`font-mono text-[#00FF66] cursor-crosshair outline-none focus:underline ${className}`}
      aria-label={`Hidden text: ${text}`}
    >{out || text}</span>
  );
}
