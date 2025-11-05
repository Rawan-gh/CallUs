import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Editor from './pages/Editor.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="*" element={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-6">
              <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
              <Link to="/" className="inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 transition-colors">Go Home</Link>
            </div>
          </div>
        } />
      </Routes>
    </div>
  )
}


