---
name: expo-app-shell-boilerplate
description: Use when creating or standardizing an Expo app shell, including bottom tabs, stacks, modal sheets, app bars, settings screens, theme wiring, startup branding, splash screens, app icons, root providers, and reusable first-screen boilerplate.
---

# Expo App Shell Boilerplate

Use this skill when an app needs the repeatable structure that most Expo products share before domain features are added.

## First Pass

1. Inspect `app/`, root `_layout.tsx`, tab layouts, modal routes, `src/providers`, `src/theme`, and Expo config.
2. Read `EXPO_SKILLS.md`, `.expo-skills/profile.md`, `docs/component-architecture.md`, `docs/app-shell-blueprint.md`, and `docs/brand-assets-checklist.md` when present.
3. Reuse the app's current UI library and icon set. Do not add a new design framework just to create shell components.
4. Decide which shell parts are needed: bottom tabs, stack headers, full-screen modals, bottom sheet modals, settings, theme, startup branding.
5. Separate native config changes from JS-only changes. Icons, splash plugin settings, bundle IDs, schemes, permissions, and runtime changes require a new binary.

## Default App Shell

Prefer this production-shaped route skeleton for new Expo Router apps:

```text
app/
  _layout.tsx
  (auth)/
    _layout.tsx
    sign-in.tsx
  (tabs)/
    _layout.tsx
    index.tsx
    settings.tsx
  modals/
    _layout.tsx
    account.tsx
    feedback.tsx
  +not-found.tsx
src/
  app/
    AppBootstrap.tsx
    AppProviders.tsx
  components/
    layout/
      AppBar.tsx
      Screen.tsx
      Section.tsx
    ui/
      Button.tsx
      IconButton.tsx
      ListItem.tsx
      SwitchRow.tsx
      BottomSheetModal.tsx
      Dialog.tsx
  features/
    settings/
      screens/SettingsScreen.tsx
      components/SettingsSection.tsx
  theme/
    tokens.ts
    ThemeProvider.tsx
    useTheme.ts
```

Keep routes thin. Route files select layouts, configure navigation options, read params, and render feature screens.

## Navigation Defaults

- Put tabs inside `(tabs)/_layout.tsx`; keep root modals outside the tab group so they cover the whole app.
- Use an outer root `Stack` that hides the tab header and registers modal routes.
- Use Expo Router `presentation: 'formSheet'` for simple bottom-sheet-like modal routes when it fits the platform behavior.
- Use React Native `Modal` for short local confirmation flows that do not need deep links.
- Use a dedicated bottom sheet library only when the app needs advanced gestures, nested scroll coordination, or fully custom sheet styling.
- Add `+not-found.tsx` before public deep links or notification routes are introduced.

## Common Components

Create the shell primitives before feature screens start duplicating layout code:

```text
src/components/layout/
  Screen.tsx
  AppBar.tsx
  Section.tsx
src/components/ui/
  IconButton.tsx
  Button.tsx
  TextField.tsx
  ListItem.tsx
  SwitchRow.tsx
  BottomSheetModal.tsx
  Dialog.tsx
  ToastHost.tsx
  Skeleton.tsx
  EmptyState.tsx
  ErrorState.tsx
```

Rules:

- `Screen` owns safe-area padding, background color, keyboard behavior, and scroll defaults.
- `AppBar` owns titles and actions, not data loading or navigation decisions beyond simple button callbacks.
- `BottomSheetModal` should have stable snap heights, a close affordance, accessible labels, and a keyboard-safe layout.
- `SettingsScreen` should use `Section`, `ListItem`, and `SwitchRow` so account, theme, notifications, language, privacy, and support rows stay consistent.
- Icon-only actions need labels and a minimum touch target of 44x44 points where practical.

## Theme And Settings

- Put color, spacing, radius, typography, shadow/elevation, and z-index tokens in `src/theme/tokens.ts`.
- Add light/dark/system mode support early if the app will ship beyond a prototype.
- Persist user theme preference separately from system color scheme.
- Put app setting preferences under a single feature such as `src/features/settings`.
- Keep secrets and backend URLs out of settings UI unless they are explicit developer/debug options.

## Startup Branding

- Define `assets/images/icon.png`, Android adaptive icon layers, and `assets/images/splash-icon.png` before store submission work begins.
- Configure `expo-splash-screen` in Expo config for native launch branding.
- Keep the native splash static; put progress, auth bootstrap, OTA checks, and animated loading in React Native after JS starts.
- Test splash and icons with preview or production builds, not only Expo Go.
- Document native branding assets in `docs/brand-assets-checklist.md`.

## Agent Boilerplate

When setting up an app repository, copy these docs from this repository when available. If only the installed skill is available, create files with the same sections instead of stopping:

```bash
cp templates/app-shell-blueprint.md /path/to/app/docs/app-shell-blueprint.md
cp templates/brand-assets-checklist.md /path/to/app/docs/brand-assets-checklist.md
cp templates/component-architecture.md /path/to/app/docs/component-architecture.md
cp templates/ui-loading-patterns.md /path/to/app/docs/ui-loading-patterns.md
```

Then implement in this order:

1. `expo-project-foundation` for folder structure and app config.
2. `expo-app-shell-boilerplate` for routes, tabs, app bars, settings, theme, and branding docs.
3. `expo-router-navigation` for detailed route behavior.
4. `expo-ui-system` for reusable primitives and states.
5. `expo-startup-ota` for splash, fonts, session bootstrap, and OTA gating.

## Verification

Run the strongest available local checks:

```bash
npm run typecheck
npm run lint
npx expo config --type public
npx expo start
```

If native splash, icons, app name, scheme, or platform config changed, verify with an internal, preview, or production build before calling it done.
