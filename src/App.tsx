import { Route, Routes, NavLink } from 'react-router-dom'
import Discover from './pages/Discover'
import Matches from './pages/Matches'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import { AppProvider } from './state/AppContext'
import Background from './components/Background'

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Background />
        <header className="app-header">
          <nav className="app-nav">
            <div className="brand">
              <span aria-hidden="true" className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-white shadow-sm">
                {/* Simple corporate heart+briefcase mark */}
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  <rect x="4" y="8" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M12 12c1.2-1.6 4.2-1.6 5.4 0 .9 1.2.6 3-1 4.1-1.3.9-2.7 1.8-3.2 2.1-.5-.3-1.9-1.2-3.2-2.1-1.6-1.1-1.9-2.9-1-4.1 1.2-1.6 4.2-1.6 5.4 0" fill="currentColor" opacity="0.9"/>
                </svg>
              </span>
              <span className="ml-2 hidden sm:inline font-semibold tracking-wide">Corporate Dating</span>
            </div>
            <div className="tabs">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'tab tab-active' : 'tab'}>Discover</NavLink>
              <NavLink to="/matches" className={({ isActive }) => isActive ? 'tab tab-active' : 'tab'}>Matches</NavLink>
              <NavLink to="/chat" className={({ isActive }) => isActive ? 'tab tab-active' : 'tab'}>Chat</NavLink>
              <NavLink to="/profile" className={({ isActive }) => isActive ? 'tab tab-active' : 'tab'}>Profile</NavLink>
            </div>
          </nav>
        </header>
        <main className="app-container w-full py-6 flex-1">
          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </AppProvider>
  )
}
