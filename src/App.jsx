import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { TerminalSquare, Menu, X, Github, Mail, ArrowRight, Cpu } from 'lucide-react';
import MatrixRain from './components/MatrixRain';
import Terminal from './components/Terminal';
import Skills from './components/Skills';
import Projects from './components/Projects';
import CodePlayground from './components/CodePlayground';
import Contact from './components/Contact';
import GlitchText from './components/GlitchText';
import HoverDecode from './components/HoverDecode';
import data from './data/data';

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('hc');
    } else {
      document.documentElement.classList.remove('hc');
    }
  }, [highContrast]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setNavOpen(false);
  };

  return (
    <div className={`min-h-screen bg-[#0B0B0B] text-neutral-100 ${highContrast ? 'contrast-150' : ''}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-black/80 text-[#00FF66] px-3 py-2 rounded">
        Skip to content
      </a>

      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-black/40 border-b border-green-500/20">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66] rounded">
            <Cpu className="text-[#00FF66]" />
            <div className="text-left">
              <div className="text-sm text-[#00FF66] tracking-wider">Nalla</div>
              <div className="text-xs text-cyan-300/80">Matrix Portfolio</div>
            </div>
          </button>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button onClick={() => scrollTo('about')} className="hover:text-[#00FF66] transition">About</button>
            <button onClick={() => scrollTo('skills')} className="hover:text-[#00FF66] transition">Skills</button>
            <button onClick={() => scrollTo('projects')} className="hover:text-[#00FF66] transition">Projects</button>
            <button onClick={() => scrollTo('playground')} className="hover:text-[#00FF66] transition">Playground</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-[#00FF66] transition">Contact</button>
            <button onClick={() => setHighContrast(v => !v)} className="px-3 py-1 rounded border border-[#00FF66]/40 hover:border-[#00FF66] text-[#00FF66]">{highContrast ? 'Normal' : 'High Contrast'}</button>
          </nav>
          <button className="md:hidden" onClick={() => setNavOpen(v => !v)} aria-label="Toggle navigation">
            {navOpen ? <X /> : <Menu />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden border-t border-green-500/20 bg-black/70">
            <div className="px-4 py-3 flex flex-col gap-3">
              {['about','skills','projects','playground','contact'].map(i => (
                <button key={i} onClick={() => scrollTo(i)} className="text-left hover:text-[#00FF66]">{i[0].toUpperCase()+i.slice(1)}</button>
              ))}
              <button onClick={() => setHighContrast(v => !v)} className="px-3 py-2 rounded border border-[#00FF66]/40 hover:border-[#00FF66] text-[#00FF66] w-max">{highContrast ? 'Normal' : 'High Contrast'}</button>
            </div>
          </div>
        )}
      </header>

      <main id="main" className="pt-16">
        {/* Hero */}
        <section id="home" ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="absolute inset-0">
            <MatrixRain density={0.9} opacity={0.15} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />

          <div className="relative z-10 text-center px-6 max-w-3xl">
            <GlitchText text="Welcome to the Matrix of my Code" className="text-3xl md:text-5xl font-semibold text-[#00FF66]" />
            <p className="mt-4 text-base md:text-lg text-cyan-200/90">
              I’m Nalla — an 11th-grade student learning Linux, automation, and coding (Python, Bash, C).
            </p>
            <p className="mt-2 text-sm text-neutral-300">Hover to decode: <HoverDecode encoded="01001110 01100001 01101100 01101100 01100001" plain="Nalla" /></p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => setShowTerminal(true)} className="inline-flex items-center gap-2 px-5 py-3 rounded bg-[#00FF66] text-black font-medium hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66]">
                <TerminalSquare size={18} /> Open Terminal
              </button>
              <button onClick={() => scrollTo('projects')} className="inline-flex items-center gap-2 px-5 py-3 rounded border border-[#00FF66]/60 text-[#00FF66] hover:border-[#00FF66]"><ArrowRight size={18}/> See Projects</button>
              <a href="#contact" onClick={(e)=>{e.preventDefault();scrollTo('contact')}} className="inline-flex items-center gap-2 px-5 py-3 rounded border border-cyan-400/50 text-cyan-300 hover:border-cyan-300">Contact</a>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="relative py-20">
          <div className="absolute inset-0 -z-0">
            <MatrixRain density={0.3} opacity={0.06} />
          </div>
          <div className="relative mx-auto max-w-5xl px-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#00FF66]">About</h2>
            <p className="mt-4 text-neutral-200 leading-relaxed">
              I\'m an 11th-grade student who enjoys building small tools and learning how computers work. I use Linux for basic tasks and write automation scripts in Python and Bash. I study C to understand low-level programming. I like solving problems and making repetitive work faster.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {["Basic shell usage","Files & permissions","Package installs","Simple bash scripting","Using cron for automation"].map((t)=> (
                <div key={t} className="bg-white/5 border border-white/10 backdrop-blur rounded p-4">
                  <span className="text-[#00FF66]">•</span> {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20 bg-black/40">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#00FF66]">Skills</h2>
            <Skills skills={data.skills} />
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#00FF66]">Projects</h2>
            <Projects projects={data.projects} />
          </div>
        </section>

        {/* Playground */}
        <section id="playground" className="py-20 bg-black/40">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#00FF66]">Interactive Playground</h2>
            <CodePlayground snippets={data.snippets} />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#00FF66]">Contact</h2>
            <Contact />
            <div className="mt-6 flex items-center gap-4 text-sm">
              <a className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200" href="https://github.com/placeholder" target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a>
              <a className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200" href="mailto:placeholder@example.com"><Mail size={16}/> Email</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-xs text-neutral-400">
        <p>Built with a Matrix-inspired theme. Tip: Press `?` to open the terminal.</p>
      </footer>

      {/* Terminal Modal */}
      {showTerminal && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Interactive Terminal">
          <div className="bg-[#050505] border border-[#00FF66]/30 rounded-md shadow-xl w-full max-w-3xl">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#00FF66]/20">
              <div className="text-[#00FF66] font-mono text-sm">/home/nalla/terminal — simulated</div>
              <button onClick={() => setShowTerminal(false)} className="px-2 py-1 rounded hover:bg-white/5" aria-label="Close terminal"><X/></button>
            </div>
            <Terminal data={data} onClose={() => setShowTerminal(false)} />
          </div>
        </div>
      )}

      {/* Keyboard shortcut to open terminal */}
      <kbd className="sr-only" aria-hidden="true" />
      <Keybind onOpen={() => setShowTerminal(true)} />
    </div>
  );
}

function Keybind({ onOpen }){
  useEffect(()=>{
    const onKey = (e) => {
      if (e.key === '?') onOpen();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  },[onOpen]);
  return null;
}

export default App;
