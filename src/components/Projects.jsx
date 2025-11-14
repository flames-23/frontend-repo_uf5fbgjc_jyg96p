import { useMemo, useState } from 'react';

export default function Projects({ projects }){
  const [q, setQ] = useState('all');
  const tags = useMemo(() => ['all', ...Array.from(new Set(projects.flatMap(p => p.tags)))], [projects]);
  const filtered = useMemo(() => q === 'all' ? projects : projects.filter(p => p.tags.includes(q)), [q, projects]);
  const [active, setActive] = useState(null);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {tags.map(t => (
          <button key={t} onClick={() => setQ(t)} className={`px-3 py-1 rounded border ${q === t ? 'border-[#00FF66] text-[#00FF66]' : 'border-white/10 text-neutral-300 hover:border-white/30'}`}>{t}</button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(p => (
          <article key={p.slug} className="group bg-white/5 border border-white/10 rounded overflow-hidden hover:border-[#00FF66]/50 transition">
            <div className="aspect-video bg-black/50 grid place-items-center text-neutral-400 text-xs">screenshot</div>
            <div className="p-4">
              <h3 className="text-cyan-200 font-semibold group-hover:text-[#00FF66] transition">{p.title}</h3>
              <p className="mt-1 text-sm text-neutral-300">{p.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded bg-black/50 border border-white/10 text-neutral-300">{t}</span>)}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button onClick={() => setActive(p)} className="px-3 py-1 rounded border border-[#00FF66]/60 text-[#00FF66] hover:border-[#00FF66]">Open</button>
                {p.simOutput && (
                  <button onClick={() => alert(p.simOutput)} className="px-3 py-1 rounded border border-cyan-400/60 text-cyan-300 hover:border-cyan-300">Run (simulate)</button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 bg-black/70 z-50 grid place-items-center p-4" role="dialog" aria-modal="true">
          <div className="bg-[#050505] border border-white/10 max-w-lg w-full rounded">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h4 className="text-[#00FF66] font-mono">{active.title}</h4>
              <button onClick={() => setActive(null)} className="px-2 py-1 rounded border border-white/10 hover:bg-white/5">Close</button>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-neutral-200">{active.description}</p>
              <pre className="bg-black/60 border border-white/10 rounded p-3 text-xs text-neutral-300 overflow-auto" aria-label="Sample code"><code>{active.sample}</code></pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
