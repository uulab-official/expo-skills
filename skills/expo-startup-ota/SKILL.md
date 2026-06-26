---
name: expo-startup-ota
description: Implement or review Expo startup UX, native splash screens, custom React Native splash screens, font loading, session bootstrap, EAS Update, OTA update checks, download progress, reload behavior, and runtime-version safety.
---

# Expo Startup OTA

Use this skill when touching app launch, splash, startup loading, or OTA behavior.

## First Pass

1. Inspect Expo config for `expo-splash-screen`, `updates`, `runtimeVersion`, `scheme`, and platform icons.
2. Read the root layout and startup/session providers before editing.
3. Inspect `release-state.json`, `eas.json` channel/branch setup, and OTA check scripts when present.
4. Determine whether the change is native config, JS/assets-only, or both. Native config changes require a new binary.
5. Verify current Expo Updates guidance from official Expo docs if behavior depends on the latest SDK.

## Startup Rules

- Keep the native splash static and brief. Put logic in React Native after JS starts.
- Load fonts and minimum assets before rendering UI that depends on them.
- Run OTA checks before entering the main app when the product expects update gating.
- Run session/profile bootstrap once and pass the result to the app to avoid a second internal splash.
- If session fetch fails, use a recoverable guest/signed-out state unless the app must block entry.
- Fade from startup UI into the app instead of flashing intermediate screens.

## OTA Rules

- OTA can update only JS and compatible assets for the installed `runtimeVersion`.
- OTA target platform and runtime version must match the installed build exactly.
- `updates.url` may point to EAS Update or a custom server implementing the Expo Updates protocol.
- EAS Update is the default recommendation for most apps, especially while usage fits the current free or paid plan limits.
- Custom update servers are for teams that explicitly want to own update hosting, manifest generation, rollout, monitoring, and rollback.
- Native modules, config plugins, permissions, icons, splash assets, bundle IDs, and runtime changes need a new binary.
- Use a deliberate `runtimeVersion` policy and document it.
- If using a custom update server, document publish, rollback, monitoring, and asset hosting before enabling production OTA.
- Before quoting EAS Update free-tier numbers, verify current official Expo pricing. As of 2026-06-26, Expo's pricing page lists Free plan EAS Update limits as 1,000 MAUs, 100 GiB bandwidth, and 20 GiB storage.
- Avoid automatic update checks that fight a custom startup sequence.
- Make progress monotonic. It should never jump backward across reload.
- Persist a reload floor before `Updates.reloadAsync()` when showing progress across update reloads.

## Update Server Decision

| Situation | Prefer |
| --- | --- |
| Prototype, MVP, small production app, or fewer than the current free-tier MAUs | EAS Update |
| Team wants Expo-hosted CDN, dashboard, channel/branch workflow, and `eas update` | EAS Update |
| Team needs private update infrastructure, custom routing, special compliance, or non-Expo publishing pipeline | Custom Expo Updates server |
| Team cannot operate update monitoring and rollback yet | EAS Update |

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
npm run ota:check
npx expo start
```

If an OTA publish is part of the task, state the channel, branch, runtime version, and why the update is binary-compatible.
