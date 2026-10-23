import type { Exercise } from "@/types/exercise";
export const exercises: Exercise[] = [
  {
    id: "circular-focus",
    name: "Circular Focus",
    path: "circular",
    description: "Follow a target moving smoothly around a circular path.",
    tag: "A gentle place to start",
  },
  {
    id: "horizontal-tracking",
    name: "Horizontal Tracking",
    path: "horizontal",
    description: "Follow the target from left to right and back again.",
    tag: "Find your flow",
  },
  {
    id: "vertical-tracking",
    name: "Vertical Tracking",
    path: "vertical",
    description: "Track the target moving from top to bottom.",
    tag: "A fresh perspective",
  },
  {
    id: "figure-eight",
    name: "Figure Eight",
    path: "figure-eight",
    description: "Follow a smooth infinity-shaped motion path.",
    tag: "Stay in the rhythm",
  },
  {
    id: "focus-shift",
    name: "Focus Shift",
    path: "focus-shift",
    description: "Watch the target gently grow and shrink.",
    tag: "Slow down & settle in",
  },
  {
    id: "random-tracking",
    name: "Random Tracking",
    path: "random",
    description: "Follow the target as it moves between different positions.",
    tag: "Explore a new path",
  },
];
