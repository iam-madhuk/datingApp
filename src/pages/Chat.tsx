export default function Chat() {
  const { profiles, matches, messages, sendMessage } = useApp()
  const matched = profiles.filter((p) => matches.has(p.id))
  const [activeId, setActiveId] = useState<string | null>(matched[0]?.id || null)
  const [login, setLogin] = useState(() => localStorage.getItem('login') || '')
  const [password, setPassword] = useState('')

  const thread = messages.filter((m) => m.toId === activeId || m.fromId === activeId)

  if (!login) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <form className="card p-8 space-y-4 w-full max-w-sm" onSubmit={e => {
          e.preventDefault()
          if (login && password) {
            localStorage.setItem('login', login)
            setLogin(login)
          }
        }}>
          <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            placeholder="Username or Email"
            value={login}
            onChange={e => setLogin(e.target.value)}
            required
          />
          <input
            type="password"
            className="border rounded px-3 py-2 w-full"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="btn btn-primary w-full">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <aside className="md:col-span-1 chat-aside">
        <button className="mb-4 px-3 py-2 rounded bg-gray-100 text-gray-700 font-semibold w-full" onClick={() => { localStorage.removeItem('login'); setLogin(''); }}>Logout</button>
        {matched.map((p) => (
          <button key={p.id} className={`chat-item ${activeId === p.id ? 'bg-brand-50' : ''}`} onClick={() => setActiveId(p.id)}>
            <div className="flex items-center gap-3">
              <img src={p.photos[0]} alt={p.name} className="w-8 h-8 rounded object-cover" />
              <div>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-gray-500">{p.role}</p>
              </div>
            </div>
          </button>
        ))}
      </aside>
      <section className="md:col-span-2 card p-4">
        {!activeId ? (
          <p className="text-gray-600">Select a match to chat</p>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-2">
              {thread.map((m) => (
                <div key={m.id}>
                  <div className={`bubble ${m.fromId === 'me' ? 'bubble-me' : 'bubble-them'}`}>{m.text}</div>
                  <div className="msg-meta text-right">{new Date(m.ts).toLocaleTimeString()}</div>
                </div>
              ))}
            </div>
            <form className="mt-4 flex gap-2" onSubmit={(e) => {
              e.preventDefault()
              const input = (e.currentTarget.elements.namedItem('msg') as HTMLInputElement)
              const text = input.value.trim()
              if (text && activeId) {
                sendMessage(activeId, text)
                input.value = ''
              }
            }}>
              <input name="msg" className="flex-1 border rounded px-3 py-2" placeholder="Type a message" />
              <button className="btn btn-primary">Send</button>
            </form>
          </div>
        )}
      </section>
    </div>
  )
}
