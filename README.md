# Music Player React

A responsive music player built with React 19, TypeScript, and Vite. Matches a provided UI design with a dark card layout, gradient background, and pink accent color.

**Live demo:** https://mcastig.github.io/music-player-react/

## Features

- Play / pause the current track
- Skip to previous or next track
- Seek to any position via the progress bar
- Auto-advances to the next track when one ends
- Responsive layout (mobile, tablet, desktop)

## Tech Stack

- **React 19** + **TypeScript 6** + **Vite 8**
- HTML5 Audio API — no audio library
- Inter font (Google Fonts)
- Vitest + Testing Library for unit tests

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Type-check and bundle for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run coverage` | Run tests with coverage report |

## Project Structure

```
src/
  components/
    AlbumArt/        — cover image
    TrackInfo/       — title and author
    ProgressBar/     — seek bar with time labels
    PlayerControls/  — previous, play/pause, next buttons
    MusicPlayer/     — main orchestrator
  hooks/
    useAudioPlayer.ts  — all audio logic
  data/
    tracks.ts          — playlist (add songs here)
  assets/
    gradient-bg.jpg    — page background
public/
  audio/               — mp3 files
  images/              — album cover images
```

## Adding Tracks

Edit `src/data/tracks.ts`, place the audio file in `public/audio/` and the cover image in `public/images/`:

```ts
{
  id: 3,
  title: 'Song Title',
  author: 'Artist Name',
  cover: `${base}images/cover-3.jpg`,
  src: `${base}audio/song-file.mp3`,
},
```

## Deployment

The project is configured for GitHub Pages. Every push to `main` triggers the deploy workflow automatically.

Live URL: `https://<your-username>.github.io/music-player-react/`

To deploy to a differently named repository, update `base` in `vite.config.ts`:

```ts
base: '/your-repo-name/',
```
