import { useState } from 'react'

export default function Contact(){
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus('Please fill in all fields.')
      return
    }
    const emailLink = `mailto:placeholder@example.com?subject=Portfolio%20Message%20from%20${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + "\n\nFrom: " + form.email)}`
    setStatus('Message prepared. Your email app will open...')
    window.location.href = emailLink
  }

  const downloadTxt = () => {
    const blob = new Blob([`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'message.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mt-6 grid md:grid-cols-2 gap-6">
      <form onSubmit={onSubmit} className="bg-white/5 border border-white/10 rounded p-4">
        <div className="grid gap-3">
          <label className="grid gap-1 text-sm">Name<input name="name" value={form.name} onChange={onChange} className="px-3 py-2 rounded bg-black/50 border border-white/10" placeholder="Your name" aria-required="true"/></label>
          <label className="grid gap-1 text-sm">Email<input type="email" name="email" value={form.email} onChange={onChange} className="px-3 py-2 rounded bg-black/50 border border-white/10" placeholder="you@example.com" aria-required="true"/></label>
          <label className="grid gap-1 text-sm">Message<textarea name="message" value={form.message} onChange={onChange} className="px-3 py-2 rounded bg-black/50 border border-white/10 min-h-[120px]" placeholder="Say hello..." aria-required="true"/></label>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 rounded bg-[#00FF66] text-black font-medium hover:brightness-110">Send</button>
            <button type="button" onClick={downloadTxt} className="px-4 py-2 rounded border border-cyan-400/50 text-cyan-300 hover:border-cyan-300">Download .txt</button>
          </div>
          <p className="text-sm text-neutral-400">{status}</p>
        </div>
      </form>
      <div className="bg-white/5 border border-white/10 rounded p-4 text-sm text-neutral-300">
        <p>Update these links with your info:</p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>GitHub: <a className="text-cyan-300 hover:text-cyan-200" href="https://github.com/placeholder" target="_blank" rel="noreferrer">github.com/placeholder</a></li>
          <li>Email: <a className="text-cyan-300 hover:text-cyan-200" href="mailto:placeholder@example.com">placeholder@example.com</a></li>
        </ul>
      </div>
    </div>
  )
}
