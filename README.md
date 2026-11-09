# Visualis

Visualis is a Next.js App Router wellness app for guided visual-focus exercises and mindful screen breaks. It offers six movement patterns, adjustable exercise sessions, and a weekly progress view. It does not measure eyesight or provide medical advice.

## Features

- Six guided paths: Circular Focus, Horizontal Tracking, Vertical Tracking, Figure Eight, Focus Shift, and Random Tracking.
- Exercise controls for duration, speed, target size, pause, resume, stop, and restart.
- A progress page showing completed sessions and weekly activity, with an option to clear saved activity.
- Responsive layouts, reduced-motion support, and a first-visit homepage intro.

Completed sessions are stored in this browser's `localStorage`. There is no account, database, or cross-device sync. Clearing browser site data removes the saved history; see the in-app Privacy page for details.

## Run locally

Install a Node.js version supported by the installed Next.js version, then run:

```bash
npm ci
npm run dev
```

Open the **Local** URL printed by Next.js, normally <http://localhost:3000>. If port 3000 is occupied, use the port shown in the terminal. The development script binds to `localhost` for local browser and IDE previews. Do not open `http://0.0.0.0:3000`; `0.0.0.0` is a listening address, not a browser destination.

To test from another device on the same network, run `npm run dev -- --hostname 0.0.0.0` and open `http://<your-PC-LAN-IP>:3000` on that device. Continue using the Local URL on this PC.

## Checks and production build

```bash
npm run typecheck
npm test
npm run build
npm run start
```

`typecheck` runs TypeScript without emitting files. `test` runs the Node test suite. `build` creates the production build, and `start` serves it. There is currently no `lint` script in `package.json`.

## Project structure

| Path | Purpose |
| --- | --- |
| `app/` | App Router pages, root layout, metadata, fonts, and global styles |
| `components/` | Homepage, exercise, progress, and layout UI |
| `hooks/` | Exercise session and progress state |
| `lib/` | Exercise definitions, movement paths, timer logic, and local storage |
| `state/` and `types/` | Shared state and TypeScript types |
| `tests/` | Core logic tests |

The interface uses React, Tailwind CSS 4 with global CSS, Motion, GSAP, Lenis, local DM Sans and Fraunces fonts, and Lucide icons.
