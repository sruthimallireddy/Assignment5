# useFetch Demo

This small demo shows a reusable `useFetch` hook and a simple `PhotoGallery` component that uses it.

Quick start:

1. npm install
2. npm run dev

Open http://localhost:5173

Files added:
- `src/hooks/useFetch.js` — the custom hook
- `src/components/PhotoGallery.jsx` — demo component
- `src/components/PhotoGallery.css` — styles
- `src/App.jsx`, `src/index.jsx`, `index.html`, `package.json`

Hook usage:

const { data, loading, error, refetch } = useFetch(url);

- `data`: fetched data
- `loading`: boolean
- `error`: Error instance if an error occurred
- `refetch`: call to re-run the fetch
