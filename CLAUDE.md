# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev         # Start dev server with HMR at localhost:5173
npm run build       # Type-check (tsc -b) then bundle with Vite
npm run lint        # Run ESLint on all .ts/.tsx files
npm run preview     # Preview the production build locally
npm run test        # Run tests in watch mode
npm run test:run    # Run tests once
npm run coverage    # Run tests with v8 coverage report
```

## Stack

- **React 19** + **TypeScript 6** + **Vite 8**
- CSS via plain `.css` files (one per component, co-located)
- Inter font via Google Fonts
- HTML5 Audio API (no audio library)
- Vitest + Testing Library + @vitest/coverage-v8

## TypeScript strictness

`tsconfig.app.json` enforces `noUnusedLocals`, `noUnusedParameters`, and `erasableSyntaxOnly`. The build will fail on unused variables/parameters — clean those up rather than suppressing the rule.

`vite.config.ts` imports `defineConfig` from `vitest/config` (not `vite`) so the `test` block is typed correctly.

## Architecture

A single-page music player. All audio logic lives in `src/hooks/useAudioPlayer.ts`, which manages an `HTMLAudioElement` via `useRef` (never stored in state). An `isPlayingRef` tracks play intent so new `Audio` instances created on track change know whether to auto-play.

### Component tree

```
App
└── MusicPlayer          ← owns all state via useAudioPlayer hook
    ├── AlbumArt          ← memoized, renders cover image
    ├── TrackInfo         ← memoized, title + author
    ├── ProgressBar       ← memoized, range input + time labels
    └── PlayerControls    ← memoized, prev/play-pause/next buttons
```

### Data & assets

- Track playlist: `src/data/tracks.ts` — add/remove songs here. Paths use `import.meta.env.BASE_URL` so they resolve correctly both locally and on GitHub Pages.
- Audio files: `public/audio/`
- Cover images: `public/images/`
- Background: `src/assets/gradient-bg.jpg` — imported as a module in `App.tsx` so Vite rewrites the URL for the correct base path.

### Design tokens

All colors are CSS custom properties defined in `src/index.css`:
- `--color-accent: #c93b76` — pink (play button, progress fill)
- `--color-card: #212936` — player card background
- `--color-secondary: #4d5562` — muted text and icons
- `--color-text: #e5e7eb` — primary text
- `--color-track: #364050` — unfilled progress track

### Progress bar

Uses a CSS custom property `--progress` set via inline style to achieve the two-tone fill effect on a native `<input type="range">` without JavaScript DOM manipulation.

## Testing

33 tests across 5 files (~93% statement coverage). `App` and `MusicPlayer` have no render tests by design — they are integration wrappers with no logic of their own. The null guards in `useAudioPlayer` (lines 55, 70) are defensive checks that cannot be triggered through the hook's public API after mount.

The `Audio` global is mocked with a regular function (not an arrow function) so `new Audio()` works as a constructor in jsdom.

## Deployment

GitHub Actions workflow at `.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`. The `base` in `vite.config.ts` must match the repository name exactly. If the repo is renamed, update `base` there.
