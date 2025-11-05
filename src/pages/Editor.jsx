import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  MousePointer2, Type, Square, Circle, Minus, ZoomIn, ZoomOut, Maximize2,
  Plus, Copy, Trash2, Palette, Layers, AlignCenter
} from 'lucide-react'

function useQuery(){
  const { search } = useLocation()
  return useMemo(()=> new URLSearchParams(search), [search])
}

export default function Editor(){
  const q = useQuery()
  const template = q.get('template') || 'blank'

  // State
  const [slides, setSlides] = useState([{ elements: [], bg: '#ffffff' }])
  const [current, setCurrent] = useState(0)
  const [selectedId, setSelectedId] = useState(null)
  const [tool, setTool] = useState('select')
  const [zoom, setZoom] = useState(1)

  const canvasRef = useRef(null)
  const wrapRef = useRef(null)

  const slide = slides[current]

  useEffect(()=>{ fitToContainer() ; window.addEventListener('resize', fitToContainer); return ()=> window.removeEventListener('resize', fitToContainer) }, [])

  function fitToContainer(){
    const wrap = wrapRef.current
    if(!wrap) return
    const parent = wrap.parentElement
    const w = Math.min(parent.clientWidth - 8, 960)
    const scale = Math.min(1, w/960)
    setZoom(scale)
  }

  function addSlide(){
    setSlides(p=>{ const n=[...p, {elements:[], bg:'#ffffff'}]; setCurrent(n.length-1); return n })
  }
  function duplicateSlide(){
    setSlides(p=>{ const dup = JSON.parse(JSON.stringify(p[current])); const n=[...p.slice(0,current+1), dup, ...p.slice(current+1)]; setCurrent(current+1); return n })
  }
  function deleteSlide(){
    setSlides(p=>{ if(p.length===1) return p; const n=[...p]; n.splice(current,1); setCurrent(Math.max(0,current-1)); return n })
  }

  function addText(){
    const el = { id: id(), type:'text', text:'Double click to edit', x:120, y:120, size:32, color:'#0f172a', bold:false }
    mutateSlide(s=> s.elements.push(el)); setSelectedId(el.id)
  }
  function addShape(kind){
    const base = { id:id(), type:kind, x:160, y:160, w:160, h:100, fill:'#10b981', stroke:'#0f172a', strokeW:2 }
    if(kind==='line'){ base.w=200; base.h=0; base.fill='transparent' }
    mutateSlide(s=> s.elements.push(base)); setSelectedId(base.id)
  }

  function mutateSlide(fn){ setSlides(p=>{ const n=[...p]; fn(n[current]); return n }) }

  function updateSelected(partial){ mutateSlide(s=>{ const el=s.elements.find(e=>e.id===selectedId); if(el) Object.assign(el, partial) }) }

  function onCanvasMouseDown(e){ if(e.target === canvasRef.current) setSelectedId(null) }

  return (
    <main className="mx-auto max-w-7xl px-6 pb-12">
      {/* Title + actions */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Editor</h1>
          <p className="text-slate-600 text-sm">A focused, minimal workspace.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button className="btn-ghost" onClick={addSlide}><Plus className="h-4 w-4 mr-1"/>Add</button>
          <button className="btn-ghost" onClick={duplicateSlide}><Copy className="h-4 w-4 mr-1"/>Duplicate</button>
          <button className="btn-ghost" onClick={deleteSlide}><Trash2 className="h-4 w-4 mr-1"/>Delete</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar overflow-x-auto gap-2">
        <div className="flex items-center gap-2">
          <ToolButton active={tool==='select'} onClick={()=>setTool('select')} title="Select"><MousePointer2 className="h-4 w-4"/></ToolButton>
          <ToolButton active={tool==='text'} onClick={()=>{ setTool('text'); addText() }} title="Text"><Type className="h-4 w-4"/></ToolButton>
          <ToolButton active={tool==='rect'} onClick={()=>{ setTool('rect'); addShape('rect') }} title="Rectangle"><Square className="h-4 w-4"/></ToolButton>
          <ToolButton active={tool==='ellipse'} onClick={()=>{ setTool('ellipse'); addShape('ellipse') }} title="Circle"><Circle className="h-4 w-4"/></ToolButton>
          <ToolButton active={tool==='line'} onClick={()=>{ setTool('line'); addShape('line') }} title="Line"><Minus className="h-4 w-4"/></ToolButton>
          <div className="ml-3 flex items-center gap-2">
            <span className="text-xs text-slate-600">BG</span>
            <input aria-label="Slide background" value={slide.bg} onChange={e=>mutateSlide(s=> s['bg']=e.target.value)} type="color" className="h-8 w-8 rounded border border-slate-200"/>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className="btn-ghost" onClick={()=> setZoom(z=> Math.max(0.25, z-0.1))}><ZoomOut className="h-4 w-4"/></button>
          <span className="w-14 text-center text-sm">{Math.round(zoom*100)}%</span>
          <button className="btn-ghost" onClick={()=> setZoom(z=> Math.min(1, z+0.1))}><ZoomIn className="h-4 w-4"/></button>
          <button className="btn-ghost" onClick={fitToContainer}><Maximize2 className="h-4 w-4"/></button>
        </div>
      </div>

      {/* Layout */}
      <div className="mt-4 grid grid-cols-12 gap-6">
        {/* Thumbs */}
        <aside className="col-span-3 max-h-[70vh] overflow-auto pr-2 sm:block hidden">
          <ol className="space-y-3">
            {slides.map((s, idx)=> (
              <li key={idx}>
                <button onClick={()=> setCurrent(idx)} className={`block w-full rounded-lg border ${idx===current? 'border-emerald-400 ring-1 ring-emerald-300' : 'border-slate-200'} bg-white shadow-sm hover:shadow transition`}>
                  <div className="aspect-[16/10] relative rounded-lg overflow-hidden">
                    <div className="absolute inset-0" style={{background:s.bg}}/>
                    {template==='clean' && <div className="absolute left-0 top-0 h-full w-1.5 bg-emerald-500"/>}
                    {template==='gradient' && <div className="absolute bottom-0 right-0 translate-x-3 translate-y-3 h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-300 to-sky-500 opacity-40 blur"/>}
                    {template==='corner' && <div style={{clipPath:'polygon(100% 0, 0 0, 100% 100%)'}} className="absolute right-0 top-0 h-6 w-6 bg-gradient-to-br from-emerald-500 via-teal-400 to-sky-500"/>}
                  </div>
                </button>
                <div className="mt-1 text-xs text-slate-500 text-center">Slide {idx+1}</div>
              </li>
            ))}
          </ol>
        </aside>

        {/* Canvas */}
        <div className="col-span-12 sm:col-span-6">
          <div className="relative mx-auto bg-slate-200/50 rounded-xl p-4 shadow-inner">
            <div ref={wrapRef} className="mx-auto" style={{width: 960*zoom}}>
              <div ref={canvasRef} onMouseDown={onCanvasMouseDown}
                   className="relative ring-1 ring-slate-300 rounded-lg overflow-hidden shadow-lg"
                   style={{ width:960, height:540, transform:`scale(${zoom})`, transformOrigin:'top left', background: slide.bg }}>
                {slide.elements.map(el => (
                  <Element key={el.id} el={el} selected={el.id===selectedId} setSelected={setSelectedId} updateSelected={updateSelected} />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500">Tip: drag items; double‑click text to edit; use right panel for styles.</p>
        </div>

        {/* Properties */}
        <aside className="col-span-12 sm:col-span-3">
          <Properties selected={slide.elements.find(e=>e.id===selectedId)} onChange={updateSelected} slide={slide} setSlideBg={v=> mutateSlide(s=> s.bg=v)} />
        </aside>
      </div>
    </main>
  )
}

function Element({ el, selected, setSelected, updateSelected }){
  const wrap = useRef(null)

  useEffect(()=>{
    const node = wrap.current
    if(!node) return
    function onDown(e){
      if(e.target.getAttribute('contenteditable')==='true') return
      const startX=e.clientX, startY=e.clientY
      const start = { x: el.x, y: el.y }
      function onMove(ev){ updateSelected({ id: el.id, x: start.x + (ev.clientX-startX), y: start.y + (ev.clientY-startY) }) }
      function onUp(){ window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    }
    node.addEventListener('mousedown', onDown)
    return ()=> node.removeEventListener('mousedown', onDown)
  }, [el, updateSelected])

  return (
    <div ref={wrap} onClick={()=> setSelected(el.id)} className={`absolute ${selected? 'ring-2 ring-emerald-500 rounded' : ''}`} style={{left: el.x, top: el.y}}>
      {el.type==='text' && (
        <div contentEditable suppressContentEditableWarning onBlur={(e)=> updateSelected({ id:el.id, text:e.currentTarget.textContent || '' })}
             className="px-2 py-1 outline-none" style={{ fontSize: el.size, color: el.color, fontWeight: el.bold?700:400 }}>{el.text}</div>
      )}
      {(el.type==='rect' || el.type==='ellipse') && (
        <div style={{ width: el.w, height: el.h, background: el.fill, border:`${el.strokeW}px solid ${el.stroke}`, borderRadius: el.type==='ellipse'? '9999px':'12px' }} />
      )}
      {el.type==='line' && (
        <div style={{ width: el.w, height: el.strokeW, background: el.stroke }} />
      )}
    </div>
  )
}

function Properties({ selected, onChange, slide, setSlideBg }){
  if(!selected){
    return (
      <div className="card p-4">
        <h3 className="font-semibold">Slide</h3>
        <div className="mt-3">
          <label className="block text-sm font-medium text-slate-700">Background</label>
          <input type="color" value={slide.bg} onChange={e=> setSlideBg(e.target.value)} className="mt-1 w-full h-[38px] rounded-md border border-slate-300"/>
        </div>
      </div>
    )
  }
  const isText = selected.type==='text'
  return (
    <div className="card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{isText? 'Text' : 'Shape'}</h3>
        <div className="flex items-center gap-2 text-slate-500">
          <Palette className="h-4 w-4"/>
          <Layers className="h-4 w-4"/>
        </div>
      </div>

      {isText ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700">Content</label>
            <textarea className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={3} defaultValue={selected.text} onChange={(e)=> onChange({ id:selected.id, text:e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">Font size</label>
              <input type="number" min="10" max="120" defaultValue={selected.size} onChange={e=> onChange({ id:selected.id, size: parseInt(e.target.value||'32',10) })}
                     className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Color</label>
              <input type="color" defaultValue={selected.color} onChange={e=> onChange({ id:selected.id, color:e.target.value })}
                     className="mt-1 w-full h-[38px] rounded-md border border-slate-300"/>
            </div>
          </div>
          <button className="btn-ghost" onClick={()=> onChange({ id:selected.id, bold: !selected.bold })}><AlignCenter className="h-4 w-4 mr-1"/>Toggle Bold</button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">Fill</label>
              <input type="color" defaultValue={selected.fill} onChange={e=> onChange({ id:selected.id, fill:e.target.value })}
                     className="mt-1 w-full h-[38px] rounded-md border border-slate-300"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Stroke</label>
              <input type="color" defaultValue={selected.stroke} onChange={e=> onChange({ id:selected.id, stroke:e.target.value })}
                     className="mt-1 w-full h-[38px] rounded-md border border-slate-300"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Stroke width</label>
            <input type="number" min="0" max="16" defaultValue={selected.strokeW} onChange={e=> onChange({ id:selected.id, strokeW: parseInt(e.target.value||'2',10) })}
                   className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"/>
          </div>
        </div>
      )}
    </div>
  )
}

function ToolButton({ active, title, children, onClick }){
  return (
    <button title={title} onClick={onClick}
            className={`btn-ghost ${active? 'bg-slate-100 ring-emerald-300' : ''}`}>{children}</button>
  )
}

function id(){ return 'el_'+Math.random().toString(36).slice(2,9) }


