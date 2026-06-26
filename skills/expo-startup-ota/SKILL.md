---
name: expo-startup-ota
description: Implement or review Expo startup UX, native splash screens, custom React Native splash screens, font loading, session bootstrap, EAS Update, OTA update checks, download progress, reload behavior, and runtime-version safety.
---

# Expo Startup OTA

Use this skill when touching app launch, splash, startup loading, or OTA behavior.

## First Pass

1. Inspect Expo config for `expo-splash-screen`, `updates`, `runtimeVersion`, `scheme`, and platform icons.
2. Read the root layout and startup/session providers before editing.
3. Determine whether the change is native config, JS/assets-only, or both. Native config changes require a new binary.
4. Verify current Expo Updates guidance from official Expo docs if behavior depends on the latest SDK.

## Startup Rules

- Keep the native splash static and brief. Put logic in React Native after JS starts.
- Load fonts and minimum assets before rendering UI that depends on them.
- Run OTA checks before entering the main app when the product expects update gating.
- Run session/profile bootstrap once and pass the result to the app to avoid a second internal splash.
- If session fetch fails, use a recoverable guest/signed-out state unless the app must block entry.
- Fade from startup UI into the app instead of flashing intermediate screens.

## OTA Rules

- OTA can update only JS and compatible assets for the installed `runtimeVersion`.
- Native modules, config plugins, permissions, icons, splash assets, bundle IDs, and runtime changes need a new binary.
- Use a deliberate `runtimeVersion` policy and document it.
- Avoid automatic update checks that fight a custom startup sequence.
- Make progress monotonic. It should never jump backward across reload.
- Persist a reload floor before `Updates.reloadAsync()` when showing progress across update reloads.

## Progress UI Checklist

- Progress is visible during normal startup and update download.
- Progress area has fixed dimensions so labels do not shift layout.
- Percentage uses tabular numbers.
- Korean status messages are not clipped or forced into fixed-height boxes.
- The fill animation and percent label derive from the same value.
- Errors have a retry or continue path.

## Verification

Run project checks, then test a no-update launch and an update-available launch when possible:

```bash
npm run verify
npx expo start
```

If an OTA publish is part of the task, state the channel, branch, runtime version, and why the update is binary-compatible.
