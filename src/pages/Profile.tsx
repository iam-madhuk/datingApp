import { useMemo, useState } from 'react'
import { useApp } from '../state/AppContext'

export default function Profile() {
  const { profiles, myBirthDate, setMyBirthDate } = useApp()
  // Simulate "me" as the first profile for demo purposes
  const me = profiles[0]
  const [birthDate, setBirthDate] = useState<string>(myBirthDate || me?.birthDate || '')
  const zodiac = useMemo(() => birthDate ? getZodiac(new Date(birthDate)) : '', [birthDate])

  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-2xl font-semibold">Your Profile</h2>
      <p className="text-gray-600">Set your details. Zodiac is derived from birth date.</p>

      <div className="card">
        <div className="card-body grid gap-3">
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Birth date</label>
              <input type="date" className="border rounded px-3 py-2 w-full" value={birthDate} onChange={(e) => { setBirthDate(e.target.value); setMyBirthDate(e.target.value) }} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Zodiac</label>
              <div className="chip inline-block">{zodiac || '—'}</div>
            </div>
          </div>
          <div className="text-sm text-gray-500">We don’t store this yet—this demo computes it client-side.</div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Role</li>
            <li>Company</li>
            <li>Location</li>
            <li>Interests</li>
            <li>Languages</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function getZodiac(d: Date): string {
  const month = d.getUTCMonth() + 1
  const day = d.getUTCDate()
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
  return 'Capricorn'
}
