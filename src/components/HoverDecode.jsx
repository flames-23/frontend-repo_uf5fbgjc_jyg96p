import { useEffect, useRef, useState } from 'react';

// Hover-to-decode: shows scrambled text, reveals plain text with a typewriter effect on hover or focus
export default function HoverDecode({ encoded = '01001110 01100001 01101100 01101100 01100001', plain = 'Nalla', className = '' }){
  const [shown, setShown] = useState('');
  const [decoding, setDecoding] = useState(false);
  const ref = useRef(null);

  const start = () => {
    if (decoding) return;
    setDecoding(true);
    let i = 0;
    const tick = () => {
      i++;
      setShown(plain.slice(0, i) + (i < plain.length ? '_' : ''));
      if (i < plain.length) requestAnimationFrame(tick);
      else setTimeout(()=>setDecoding(false), 400);
    };
    requestAnimationFrame(tick);
  };

  useEffect(()=>{ setShown(encoded); }, [encoded]);

  return (
    <span
      ref={ref}
      tabIndex={0}
      onMouseEnter={start}
      onFocus={start}
      onBlur={()=>setShown(encoded)}
      onMouseLeave={()=>setShown(encoded)}
      className={`font-mono text-cyan-300 hover:text-[#00FF66] focus:text-[#00FF66] cursor-help border-b border-dotted border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-[#00FF66] ${className}`}
      aria-label={`Decoded text: ${plain}`}
    >{shown}</span>
  );
}
