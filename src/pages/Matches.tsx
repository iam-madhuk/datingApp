import { useApp } from '../state/AppContext'

export default function Matches() {
  const { profiles, matches } = useApp()
  const matched = profiles.filter((p) => matches.has(p.id))
  if (!matched.length) return <p className="text-center text-gray-600">You have no matches yet. Keep exploring!</p>
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {matched.map((p) => (
        <div key={p.id} className="card group">
          <div className="flex items-center gap-4 p-4">
            <img src={p.photos[0]} alt={p.name} className="w-16 h-16 object-cover rounded-lg" />
            <div className="flex-1">
              <p className="font-semibold group-hover:text-brand-700 transition-colors">{p.name}</p>
              <p className="text-sm text-gray-600">{p.role} • {p.company}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="badge">{p.location}</span>
                {p.interests.slice(0,2).map((i) => (<span key={i} className="chip">{i}</span>))}
                {p.languages && p.languages.length > 0 && (
                  <span className="badge">{p.languages[0]}</span>
                )}
              </div>
            </div>
          </div>
          <div className="px-4 pb-4">
            <button className="btn btn-primary w-full">Open Chat</button>
          </div>
        </div>
      ))}
    </div>
  )
}
