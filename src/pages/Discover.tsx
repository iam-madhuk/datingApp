import { useEffect, useRef, useState } from 'react'
import { useApp } from '../state/AppContext'
import type { Profile } from '../types'


function Card({ profile, onLike, onPass, swipeDir, showMatch }: { profile: Profile; onLike: () => void; onPass: () => void; swipeDir?: 'left'|'right'|''; showMatch?: boolean }) {
  const zodiac = profile.birthDate ? getZodiac(new Date(profile.birthDate)) : null
  return (
    <div
      className={`card max-w-md mx-auto overflow-hidden transition-transform duration-500 ease-in-out hover:scale-[1.03] active:scale-[0.97] shadow-lg hover:shadow-2xl relative ${swipeDir==='left' ? 'animate-swipe-left' : ''} ${swipeDir==='right' ? 'animate-swipe-right' : ''}`}
      tabIndex={0}
    >
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
        {swipeDir==='left' && <span className="text-5xl text-red-500 font-bold animate-pop">✖️</span>}
        {swipeDir==='right' && <span className="text-5xl text-green-500 font-bold animate-pop">❤️</span>}
        {showMatch && <Confetti />}
      </div>
      <div className="relative group">
        <img src={profile.photos[0]} alt={profile.name} className="w-full h-72 object-cover group-hover:brightness-95 group-hover:scale-105 transition duration-300" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 text-white">
          <h2 className="text-2xl font-semibold drop-shadow animate-fade-in">{profile.name}, {profile.age}</h2>
          <p className="text-sm opacity-90 drop-shadow">{profile.role} • {profile.company}</p>
        </div>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap gap-2">
          <span className="badge transition-colors duration-200 hover:bg-blue-100">{profile.location}</span>
          {profile.interests.slice(0,3).map((i) => (<span key={i} className="chip transition-colors duration-200 hover:bg-blue-50">{i}</span>))}
          {profile.languages && profile.languages.length > 0 && (
            <span className="badge transition-colors duration-200 hover:bg-blue-100">{profile.languages[0]}</span>
          )}
          {zodiac && (<span className="chip transition-colors duration-200 hover:bg-blue-50">{zodiac}</span>)}
        </div>
        <p className="mt-3 text-gray-700 animate-fade-in">{profile.bio}</p>
        <div className="mt-6 flex gap-10 justify-center">
          <button
            className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-3xl font-bold shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 focus:ring-2 focus:ring-red-300"
            onClick={onPass}
            aria-label="Pass"
          >
            <span className="sr-only">Pass</span>✖️
          </button>
          <button
            className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl font-bold shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 focus:ring-2 focus:ring-green-300"
            onClick={onLike}
            aria-label="Like"
          >
            <span className="sr-only">Like</span>❤️
          </button>
        </div>
      </div>
    </div>
  )
}

function Confetti() {
  // Simple confetti burst
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {[...Array(18)].map((_,i) => (
        <span
          key={i}
          className="absolute text-3xl"
          style={{
            left: `${50+30*Math.cos((i/18)*2*Math.PI)}%`,
            top: `${50+30*Math.sin((i/18)*2*Math.PI)}%`,
            color: `hsl(${i*20},80%,60%)`,
            transform: `translate(-50%,-50%) scale(1.2) rotate(${i*20}deg)`,
            animation: 'confetti-burst 0.8s ease-out'
          }}
        >🎉</span>
      ))}
    </div>
  )
}

export default function Discover() {
  const { profiles, like, pass, matches } = useApp()
  const [index, setIndex] = useState(0)
  const [q, setQ] = useState({ role: '', location: '', interest: '', language: '', zodiac: '', height: '' })
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [swipeDir, setSwipeDir] = useState('')
  const [showMatch, setShowMatch] = useState(false)

  const filtered = profiles.filter((p) => (
    (!q.role || p.role.toLowerCase().includes(q.role.toLowerCase())) &&
    (!q.location || p.location.toLowerCase().includes(q.location.toLowerCase())) &&
    (!q.interest || p.interests.some((i) => i.toLowerCase().includes(q.interest.toLowerCase())))
    && (!q.language || (p.languages || []).some((l) => l.toLowerCase().includes(q.language.toLowerCase())))
    && (!q.zodiac || (p.birthDate && getZodiac(new Date(p.birthDate)).toLowerCase().includes(q.zodiac.toLowerCase())))
    && (!q.height || (p.height && String(p.height).includes(q.height)))
  ))

  const current = filtered[index]
  const next = () => setIndex((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)))

  // Keyboard shortcuts: Enter=like, Backspace=pass
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!current) return
      if (e.key === 'Enter') handleLike()
      if (e.key === 'Backspace') handlePass()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current])

  // Drag swipe with animation
  useEffect(() => {
    const el = cardRef.current
    if (!el || !current) return
    let startX = 0
    let dragging = false
    const down = (e: PointerEvent) => { dragging = true; startX = e.clientX; el.setPointerCapture(e.pointerId) }
    const move = (e: PointerEvent) => { if (!dragging) return; const dx = e.clientX - startX; el.style.transform = `translateX(${dx}px) rotate(${dx/40}deg)` }
    const up = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      const dx = e.clientX - startX
      el.style.transform = ''
      if (dx > 120) handleLike()
      else if (dx < -120) handlePass()
    }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
    }
  }, [current])

  function handleLike() {
    setSwipeDir('right')
    setTimeout(() => {
      like(current.id)
      setSwipeDir('')
      if (matches instanceof Set ? matches.has(current.id) : Array.isArray(matches) && matches.some((m: any) => m.id === current.id)) {
        setShowMatch(true)
        setTimeout(() => setShowMatch(false), 900)
      }
      next()
    }, 400)
  }
  function handlePass() {
    setSwipeDir('left')
    setTimeout(() => {
      pass(current.id)
      setSwipeDir('')
      next()
    }, 400)
  }

  if (!current) return (
    <div className="app-container">
      <Filters q={q} setQ={setQ} reset={() => setIndex(0)} />
      <p className="text-center text-gray-600">No more profiles. Adjust filters or check your matches!</p>
    </div>
  )

  return (
    <div className="app-container space-y-4">
      <Filters q={q} setQ={setQ} reset={() => setIndex(0)} />
      <div ref={cardRef} className="grid place-items-center will-change-transform">
        <Card profile={current} onLike={handleLike} onPass={handlePass} swipeDir={swipeDir} showMatch={showMatch} />
      </div>
      <p className="mt-1 text-xs text-gray-500">Tip: Drag card left/right or press Enter/Backspace</p>
    </div>
  )
}

function Filters({ q, setQ, reset }: { q: { role: string; location: string; interest: string; language: string; zodiac: string; height?: string }; setQ: (q: any) => void; reset: () => void }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="sticky top-2 z-20 w-full max-w-3xl mx-auto">
      <button
        className={`mb-2 px-4 py-2 rounded-lg font-semibold shadow transition-colors duration-200 ${open ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Hide filters' : 'Show filters'}
      >{open ? 'Hide Filters ▲' : 'Show Filters ▼'}</button>
      {open && (
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 flex flex-wrap gap-4 items-center transition-all duration-300">
          <FilterInput label="Role" value={q.role} onChange={v => { setQ({ ...q, role: v }); reset() }} icon="💼" />
          <FilterInput label="Location" value={q.location} onChange={v => { setQ({ ...q, location: v }); reset() }} icon="📍" />
          <FilterInput label="Interest" value={q.interest} onChange={v => { setQ({ ...q, interest: v }); reset() }} icon="🎯" />
          <FilterInput label="Language" value={q.language} onChange={v => { setQ({ ...q, language: v }); reset() }} icon="🌐" />
          <FilterInput label="Zodiac" value={q.zodiac} onChange={v => { setQ({ ...q, zodiac: v }); reset() }} icon="♈" />
          <FilterInput label="Height" value={q.height || ''} onChange={v => { setQ({ ...q, height: v }); reset() }} icon="📏" />
          <button
            className="ml-auto px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition-colors duration-200"
            onClick={() => { setQ({ role: '', location: '', interest: '', language: '', zodiac: '', height: '' }); reset() }}
            aria-label="Reset filters"
          >Reset</button>
        </div>
      )}
    </div>
  )

function FilterInput({ label, value, onChange, icon }: { label: string; value: string; onChange: (v: string) => void; icon: string }) {
  const [focus, setFocus] = useState(false)
  return (
    <div className={`relative transition-all duration-200 ${focus ? 'scale-105 z-10' : ''}`}> 
      <span className="absolute left-2 top-2 text-lg select-none pointer-events-none opacity-70">{icon}</span>
      <input
        className={`pl-8 pr-3 py-2 rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-white/90 shadow-sm transition-all duration-200 w-36 md:w-40 ${focus ? 'ring-2 ring-blue-300' : ''}`}
        placeholder={`Filter by ${label}`}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        aria-label={`Filter by ${label}`}
      />
    </div>
  )
}
}

function getZodiac(d: Date): string {
  const month = d.getUTCMonth() + 1
  const day = d.getUTCDate()
  // Western zodiac date ranges
  const ranges = [
    ['Capricorn', [12,22], [1,19]],
    ['Aquarius', [1,20], [2,18]],
    ['Pisces', [2,19], [3,20]],
    ['Aries', [3,21], [4,19]],
    ['Taurus', [4,20], [5,20]],
    ['Gemini', [5,21], [6,20]],
    ['Cancer', [6,21], [7,22]],
    ['Leo', [7,23], [8,22]],
    ['Virgo', [8,23], [9,22]],
    ['Libra', [9,23], [10,22]],
    ['Scorpio', [10,23], [11,21]],
    ['Sagittarius', [11,22], [12,21]]
  ] as const
  for (const [sign, start, end] of ranges) {
    const afterStart = (month > start[0]) || (month === start[0] && day >= start[1])
    const beforeEnd = (month < end[0]) || (month === end[0] && day <= end[1])
    if ((start[0] <= end[0] && afterStart && beforeEnd) || (start[0] > end[0] && (afterStart || beforeEnd))) {
      return sign
    }
  }
  return 'Capricorn' // Fallback
}
