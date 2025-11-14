import { useState } from 'react'

export default function CodePlayground({ snippets = [] }){
  const [output, setOutput] = useState('')

  const simulate = (snippet) => {
    setOutput(`$ run ${snippet.lang}\n` + (snippet.simOutput || '...'))
  }

  return (
    <div className="mt-6 grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        {snippets.map(s => (
          <div key={s.title} className="bg-white/5 border border-white/10 rounded p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[#00FF66] font-semibold">{s.title}</h4>
              <span className="text-xs text-cyan-300">{s.lang}</span>
            </div>
            <pre className="mt-2 text-xs bg-black/50 p-3 rounded overflow-auto"><code>{s.code}</code></pre>
            <div className="mt-3 flex items-center gap-2">
              <button onClick={()=>simulate(s)} className="px-3 py-1.5 rounded bg-[#00FF66] text-black text-sm font-medium hover:brightness-110">Run (simulate)</button>
              <button onClick={()=>navigator.clipboard.writeText(s.code)} className="px-3 py-1.5 rounded border border-cyan-400/50 text-cyan-300 text-sm hover:border-cyan-300">Copy</button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-black/50 border border-white/10 rounded p-4">
        <div className="text-[#00FF66] font-mono text-sm">Simulated Console</div>
        <pre className="mt-2 text-xs text-green-300 min-h-[200px]"><code>{output}</code></pre>
      </div>
    </div>
  )
}
