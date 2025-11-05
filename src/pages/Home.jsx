import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-indigo-500/20 ring-1 ring-indigo-400/30 flex items-center justify-center">
              <span className="text-indigo-400 text-sm font-semibold">PM</span>
            </div>
            <span className="font-semibold tracking-tight">Presentation Maker</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-300">
            <a className="hover:text-white transition-colors" href="#features">Features</a>
            <a className="hover:text-white transition-colors" href="#about">About</a>
            <Link to="/editor" className="inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-400 transition-colors">Start Creating</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative isolate">
          <div className="absolute inset-x-0 -top-20 -z-10 blur-3xl opacity-40" aria-hidden="true">
            <div className="mx-auto aspect-[4/1] max-w-4xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500/70" />
          </div>

          <div className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Create stunning presentations in minutes
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
              A modern, minimal workspace inspired by the best of Google Slides and Canva. Design faster with AI, collaborate live, and never lose your work.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link to="/editor" className="inline-flex items-center rounded-md bg-indigo-500 px-6 py-3 font-medium text-white hover:bg-indigo-400 transition-colors">
                Start Creating
              </Link>
              <a href="#features" className="inline-flex items-center rounded-md px-6 py-3 font-medium text-gray-200 ring-1 ring-white/10 hover:bg-white/5 transition-colors">
                Learn more
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard title="AI Slide Design" description="Generate slide layouts, color palettes, and content suggestions tailored to your topic." icon={
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 0 0-5 5v1H6a4 4 0 0 0 0 8h1v1a5 5 0 0 0 10 0v-1h1a4 4 0 1 0 0-8h-1V7a5 5 0 0 0-5-5z"/></svg>
            } />
            <FeatureCard title="Real-Time Collaboration" description="Edit together with comments, cursors, and presence—no refresh needed." icon={
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7a5 5 0 1 1 10 0 5 5 0 0 1-10 0zm-2 13a7 7 0 0 1 14 0v1H5v-1z"/></svg>
            } />
            <FeatureCard title="Autosave and Cloud Sync" description="Your edits save instantly and sync securely across devices." icon={
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M6 14a4 4 0 1 1 1-7.874A6 6 0 1 1 18 13h-2l-4 5-4-5H6z"/></svg>
            } />
          </div>
        </section>
      </main>

      <footer id="about" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Presentation Maker</p>
          <div className="flex items-center gap-4">
            <a href="#features" className="hover:text-gray-200">Features</a>
            <a href="#" className="hover:text-gray-200">Privacy</a>
            <a href="#" className="hover:text-gray-200">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="rounded-xl bg-card ring-1 ring-white/10 p-6 flex flex-col gap-3">
      <div className="h-10 w-10 rounded-lg bg-white/5 text-indigo-400 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
    </div>
  )
}


