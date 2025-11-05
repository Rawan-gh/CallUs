import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Templates from './pages/Templates.jsx'
import Editor from './pages/Editor.jsx'

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <header className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-emerald-500/10 ring-1 ring-emerald-300/60 grid place-items-center">
            <span className="text-emerald-600 text-sm font-semibold">PM</span>
          </div>
          <span className="font-semibold tracking-tight">Presentation Maker</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
          <NavLink to="/" className={({isActive})=> isActive? 'text-slate-900' : 'hover:text-slate-900'}>Home</NavLink>
          <NavLink to="/templates" className={({isActive})=> isActive? 'text-slate-900' : 'hover:text-slate-900'}>Templates</NavLink>
          <Link to="/editor" className="btn-primary">Open Editor</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}


