import { Link } from 'react-router-dom'

const cards = [
  { key:'clean', title:'Clean', desc:'Left accent bar, minimal.', preview:'from-white to-white' },
  { key:'gradient', title:'Gradient', desc:'Soft emerald→sky accents.', preview:'from-emerald-50 to-sky-50' },
  { key:'corner', title:'Corner Accent', desc:'Diagonal corner color.', preview:'from-white to-white' },
  { key:'blank', title:'Blank', desc:'Start from scratch.', preview:'from-white to-white' },
]

export default function Templates(){
  return (
    <main className="relative isolate">
      <div className="absolute inset-x-0 -top-20 -z-10 blur-3xl opacity-40" aria-hidden="true">
        <div className="mx-auto aspect-[4/1] max-w-4xl bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400" />
      </div>
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Pick a template</h1>
          <p className="mt-3 text-slate-600">Clean, modern presets you can customize.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(c => (
            <article key={c.key} className="card overflow-hidden">
              <div className={`aspect-[16/10] bg-gradient-to-br ${c.preview} relative`}
                >
                {c.key==='clean' && <div className="absolute left-0 top-0 h-full w-2 bg-emerald-500" />}
                {c.key==='corner' && <div style={{clipPath:'polygon(100% 0, 0 0, 100% 100%)'}} className="absolute right-0 top-0 h-12 w-12 bg-gradient-to-br from-emerald-500 via-teal-400 to-sky-500"/>}
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-sm text-slate-600">{c.desc}</p>
                </div>
                <Link to={`/editor?template=${c.key}`} className="btn-primary">Use</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}


