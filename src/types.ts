export type Profile = {
  id: string
  name: string
  age: number
  birthDate?: string // ISO date (YYYY-MM-DD) to derive zodiac
  role: string
  company: string
  location: string
  interests: string[]
  languages?: string[]
  bio: string
  photos: string[]
}
