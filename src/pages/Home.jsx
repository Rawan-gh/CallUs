import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <main>
      <section className="relative isolate">
        <div className="absolute inset-x-0 -top-20 -z-10 blur-3xl opacity-40" aria-hidden="true">
          <div className="mx-auto aspect-[4/1] max-w-4xl bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400" />
        </div>
        <div className="mx-auto max-w-5xl px-6 pt-16 pb-16 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Create stunning presentations</h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">A clean, modern editor to design faster with clarity and control.</p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/templates" className="btn-primary px-6">Start Creating</Link>
            <a href="#features" className="btn-ghost px-6">Learn more</a>
          </div>
        </div>
      </section>
    </main>
  )
}


