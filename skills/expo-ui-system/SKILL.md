---
name: expo-ui-system
description: Create or refine an Expo app UI system. Use for themes, design tokens, fonts, icons, app bars, buttons, inputs, dialogs, bottom sheets, toasts, skeletons, empty states, loading/error patterns, accessibility defaults, and reusable React Native UI components.
---

# Expo UI System

Use this skill when UI consistency, reusable components, or app-wide styling are part of the task.

## First Pass

1. Inspect existing theme files, component libraries, font loading, icon usage, and shared layout primitives.
2. Check whether the app uses NativeWind, Restyle, Tamagui, React Native Paper, shadcn-style local components, or plain StyleSheet.
3. Reuse the current styling system. Do not introduce a new UI framework for a narrow change.
4. Confirm target platforms: iOS, Android, web, or all.
5. Inspect loading, empty, error, and offline states before adding new screens.

## Design System Rules

- Define color, spacing, radius, typography, shadow/elevation, and z-index tokens in one predictable place.
- Use real icon libraries such as `lucide-react-native`, `@expo/vector-icons`, or the project standard.
- Load fonts before rendering text that depends on them, usually through the startup flow.
- Keep text responsive without viewport-based font scaling. Support larger system text unless the product explicitly forbids it.
- Provide consistent states for buttons, inputs, lists, and cards: default, pressed, disabled, loading, error, and empty.
- Avoid nesting cards inside cards. Use cards for repeated items, modals, or framed tools, not every page section.
- Keep touch targets at least 44x44 points where practical.
- Use stable dimensions for repeated rows, cards, avatars, media frames, and skeleton placeholders so loading states do not shift layout.
- Prefer `expo-image` placeholders such as BlurHash/ThumbHash for remote images when the app already uses `expo-image`.

## Component Boundaries

- Put app-wide primitives in `src/components/ui` or the local equivalent.
- Put domain-specific components near their feature.
- Keep design tokens independent from business logic.
- Do not bake API calls or navigation side effects into basic UI primitives.

## Loading And Shimmer

- Create shared skeleton primitives before custom one-off loading blocks.
- Use shimmer sparingly for content placeholders; use spinners for short actions and progress bars for measurable work.
- Respect reduce-motion settings. Provide a static skeleton fallback when motion is disabled.
- Keep shimmer contrast subtle in light and dark themes.
- Make skeleton sizes match the final content: avatar, title line, body line, thumbnail, card, list row.
- Avoid showing skeletons after data has loaded once; prefer stale data plus small refresh indicators.
- Keep loading copy nearby for long waits, but do not put instructional text inside every skeleton.

Recommended primitives:

```text
src/components/ui/
  Skeleton.tsx
  LoadingOverlay.tsx
  EmptyState.tsx
  ErrorState.tsx
  ProgressBar.tsx
```

If the project has no animation stack, start with static skeleton blocks. Add `expo-linear-gradient` or `react-native-reanimated` only when shimmer is a product requirement or already part of the stack.

## Screen Composition

- Route files under `app/` should stay thin: read params, choose layout, and render feature screens.
- Put reusable screen sections in `src/features/<feature>/components`.
- Put data hooks in `src/features/<feature>/hooks` or a shared query layer.
- Keep UI primitives unaware of routes, auth providers, backend clients, and analytics.
- Give each screen state a deliberate component: loading, empty, error, content, refreshing.

## Accessibility

- Add labels for icon-only buttons.
- Preserve contrast in light and dark themes.
- Avoid fixed-height text containers that clip Korean, emoji, or larger text sizes.
- Ensure loading indicators have nearby state text when the wait is meaningful.
- Mark decorative skeletons as hidden from accessibility when supported; expose useful loading state text once per screen.

## Verification

Run available checks and inspect affected screens on at least one narrow mobile viewport:

```bash
npm run typecheck
npm run lint
npx expo start
```
