import { describe, it, expect } from 'vitest'

type Profile = {
  id: string
  role: string
  location: string
  interests: string[]
}

function filter(profiles: Profile[], q: { role?: string; location?: string; interest?: string }) {
  return profiles.filter((p) => (
    (!q.role || p.role.toLowerCase().includes(q.role.toLowerCase())) &&
    (!q.location || p.location.toLowerCase().includes(q.location.toLowerCase())) &&
    (!q.interest || p.interests.some((i) => i.toLowerCase().includes(q.interest!.toLowerCase())))
  ))
}

describe('filter', () => {
  const data: Profile[] = [
    { id: '1', role: 'Product Manager', location: 'Gurugram', interests: ['running'] },
    { id: '2', role: 'Data Scientist', location: 'Noida', interests: ['yoga'] },
  ]

  it('filters by role', () => {
    const res = filter(data, { role: 'data' })
    expect(res.map((p) => p.id)).toEqual(['2'])
  })

  it('filters by interest', () => {
    const res = filter(data, { interest: 'run' })
    expect(res.map((p) => p.id)).toEqual(['1'])
  })
})
