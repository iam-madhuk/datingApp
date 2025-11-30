# Corporate Dating App

A Tinder-like React app tailored for corporate professionals. Swipe, match, and chat with dummy local data. Built with Vite + TypeScript and Tailwind.

## Features
- Swipe like/pass on curated corporate profiles
- Matches list and simple local chat
- Filters by role, location, interests (baseline)
- Responsive corporate UI with keyboard support
- Routing, context state, localStorage persistence

## Getting Started

1. Install dependencies:
```powershell
npm install
```

2. Run the dev server:
```powershell
npm run dev
```

3. Run tests:
```powershell
npm test
```

## Keyboard Shortcuts
- Left Arrow: Pass
- Right Arrow: Like

## Notes
- Photos use placeholder paths in `src/data/profiles.ts`. Replace with your assets or integrate an image source.
- This app is front-end only; data is stored locally in `localStorage`.
