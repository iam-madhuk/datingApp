import { createContext, useContext, useMemo, useState } from 'react'
import type { Profile } from '../types'
import { seedProfiles } from '../data/profiles'

export type Message = { id: string; fromId: string; toId: string; text: string; ts: number }

export type AppState = {
  profiles: Profile[]
  likes: Set<string>
  passes: Set<string>
  matches: Set<string>
  messages: Message[]
  myBirthDate?: string
  like: (id: string) => void
  pass: (id: string) => void
  sendMessage: (toId: string, text: string) => void
  setMyBirthDate: (isoDate: string) => void
}

const Ctx = createContext<AppState | null>(null)

const LS_KEYS = {
  likes: 'corpDating.likes',
  passes: 'corpDating.passes',
  messages: 'corpDating.messages',
  myBirthDate: 'corpDating.myBirthDate',
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profiles] = useState<Profile[]>(seedProfiles)
  const [likes, setLikes] = useState<Set<string>>(new Set(JSON.parse(localStorage.getItem(LS_KEYS.likes) || '[]')))
  const [passes, setPasses] = useState<Set<string>>(new Set(JSON.parse(localStorage.getItem(LS_KEYS.passes) || '[]')))
  const [messages, setMessages] = useState<Message[]>(JSON.parse(localStorage.getItem(LS_KEYS.messages) || '[]'))
  const [myBirthDate, setMyBirthDateState] = useState<string | undefined>(() => {
    const v = localStorage.getItem(LS_KEYS.myBirthDate)
    return v || undefined
  })

  const matches = useMemo(() => new Set([...likes].filter((id) => id)), [likes])

  const like = (id: string) => {
    const next = new Set(likes)
    next.add(id)
    setLikes(next)
    localStorage.setItem(LS_KEYS.likes, JSON.stringify([...next]))
  }

  const pass = (id: string) => {
    const next = new Set(passes)
    next.add(id)
    setPasses(next)
    localStorage.setItem(LS_KEYS.passes, JSON.stringify([...next]))
  }

  const sendMessage = (toId: string, text: string) => {
    const msg: Message = { id: crypto.randomUUID(), fromId: 'me', toId, text, ts: Date.now() }
    const next = [...messages, msg]
    setMessages(next)
    localStorage.setItem(LS_KEYS.messages, JSON.stringify(next))
  }

  const setMyBirthDate = (isoDate: string) => {
    setMyBirthDateState(isoDate)
    localStorage.setItem(LS_KEYS.myBirthDate, isoDate)
  }

  const value: AppState = { profiles, likes, passes, matches, messages, myBirthDate, like, pass, sendMessage, setMyBirthDate }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useApp = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('AppContext missing')
  return ctx
}
