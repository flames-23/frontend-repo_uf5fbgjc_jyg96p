export default function Skills({ skills = [] }){
  return (
    <div className="mt-6 grid gap-4">
      {skills.map((s)=> (
        <div key={s.name} className="bg-white/5 border border-white/10 rounded p-4">
          <div className="flex items-center justify-between">
            <div className="text-neutral-200 font-medium">{s.name}</div>
            <div className="text-[#00FF66] text-sm">{s.level}%</div>
          </div>
          <div className="mt-2 h-2 bg-black/50 rounded">
            <div className="h-2 bg-[#00FF66] rounded shadow-[0_0_10px_#00FF66] transition-all" style={{ width: `${s.level}%` }} />
          </div>
          <p className="mt-2 text-sm text-neutral-400">{s.note}</p>
        </div>
      ))}
    </div>
  )
}
