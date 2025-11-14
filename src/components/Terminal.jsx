import { useEffect, useRef, useState } from 'react'

export default function Terminal({ data, onClose }) {
  const [lines, setLines] = useState([
    'Simulated terminal — type "help" to start.',
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [histIndex, setHistIndex] = useState(-1)
  const viewportRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight })
  }, [lines])

  const helpText = [
    'Available commands:',
    '• help — list commands',
    '• about — short bio',
    '• skills — skills list',
    '• projects — list projects',
    '• open <project> — show details',
    '• run <project> — simulate run',
    '• contact — show contact info',
    '• clear — clear screen',
  ]

  const print = (arr) => setLines((l) => [...l, ...arr])

  const runCommand = (raw) => {
    const cmd = raw.trim()
    if (!cmd) return
    const tokens = cmd.split(/\s+/)
    const base = tokens[0].toLowerCase()
    const arg = tokens.slice(1).join(' ')

    print([`$ ${cmd}`])

    switch (base) {
      case 'help':
        print(helpText)
        break
      case 'about':
        print([data.copy.aboutShort])
        break
      case 'skills':
        print(data.skills.map(s => `${s.name}: ${s.level}% — ${s.note}`))
        break
      case 'projects': {
        const list = data.projects.map(p => `- ${p.slug} — ${p.title}`)
        print(['Projects:', ...list, 'Tip: open <slug> | run <slug>'])
        break
      }
      case 'open': {
        const p = data.projects.find(p => p.slug.toLowerCase() === arg.toLowerCase())
        if (!p) { print([`Project not found: ${arg}`]); break }
        print([`${p.title}`, p.description, `Tags: ${p.tags.join(', ')}`])
        break
      }
      case 'run': {
        const p = data.projects.find(p => p.slug.toLowerCase() === arg.toLowerCase())
        if (!p) { print([`Project not found: ${arg}`]); break }
        const out = p.simOutput || 'Running... done.'
        simulateTyping(out)
        break
      }
      case 'contact':
        print([`GitHub: ${data.links.github}`, `Email: ${data.links.email}`])
        break
      case 'clear':
        setLines([])
        break
      default:
        print([`Command not found: ${base}. Try "help".`])
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setHistory((h) => [...h, input])
    setHistIndex(-1)
    runCommand(input)
    setInput('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose?.()
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const idx = histIndex < 0 ? history.length - 1 : Math.max(0, histIndex - 1)
      setHistIndex(idx)
      setInput(history[idx])
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIndex < 0) return
      const idx = histIndex + 1
      if (idx >= history.length) {
        setHistIndex(-1)
        setInput('')
      } else {
        setHistIndex(idx)
        setInput(history[idx])
      }
    }
  }

  const simulateTyping = (text) => {
    const chars = [...text]
    let acc = ''
    const step = () => {
      const ch = chars.shift()
      if (typeof ch !== 'undefined') {
        acc += ch
        setLines((l) => [...l.slice(0, -1), acc])
        requestAnimationFrame(step)
      }
    }
    setLines((l) => [...l, ''])
    requestAnimationFrame(step)
  }

  return (
    <div className="h-[60vh] flex flex-col" role="region" aria-label="Terminal" aria-live="polite">
      <div ref={viewportRef} className="flex-1 overflow-auto px-4 py-3 font-mono text-sm text-green-300 bg-black/40">
        {lines.map((ln, i) => (
          <div key={i} className="whitespace-pre-wrap">{ln}</div>
        ))}
      </div>
      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-[#00FF66]/20 bg-black/60 px-3 py-2">
        <label htmlFor="term-input" className="text-[#00FF66] font-mono">$</label>
        <input
          id="term-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent outline-none text-green-200 placeholder-green-700"
          placeholder="Type a command... (help)"
          autoComplete="off"
        />
        <button type="button" onClick={onClose} className="text-cyan-200 hover:text-white px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66]">Close</button>
      </form>
    </div>
  )
}
