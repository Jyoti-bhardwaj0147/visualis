# Visualis

A Next.js App Router wellness app for visual-focus exercises and screen breaks. No authentication, database, or medical scores.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production use `npm run build` and `npm start`.

## Checks

```sh
npm run typecheck
npm test
npm run build
```

## Architecture

- `lib/motion-paths.ts` contains pure, normalized path functions shared by all six exercises. Random Tracking uses a predefined irregular loop with cosine interpolation.
- `hooks/useExerciseSession.ts` drives one animation clock. Pausing cancels its animation frame; background tabs automatically pause sessions. Stopping does not save activity.
- `components/exercises` separates setup, target rendering, controls, timer, and completion.
- `lib/progress-storage.ts` is the persistence boundary. Records use the requested session shape; `eye-break` records identify completed breaks. Local calendar dates define Monday–Sunday weeks and streaks.
- Decorative Motion animation follows reduced-motion preferences. Functional exercise motion starts only through explicit action.
- The eye-break timer waits 20 minutes, then asks the user to start a 20-second break. A completed break is recorded; browser notifications are not used. Keep this app open for the timer; it is not persisted across refreshes.
- Activity stays in browser localStorage. Storage failures display an explanation. The Progress page lets the user clear all history.

To add cloud sync, replace the persistence adapter and expose async loading/error state through `useExerciseProgress`; the exercise engine and path functions remain independent.
