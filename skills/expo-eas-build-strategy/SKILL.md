---
name: expo-eas-build-strategy
description: Choose, configure, or audit Expo EAS Build strategy for cloud builds, local EAS builds, build quota usage, preview/internal/production profiles, worker cost awareness, credentials, and when to avoid binary rebuilds with OTA. Use when users ask whether to use EAS cloud build, local build, free monthly builds, build limits, or release build planning.
---

# Expo EAS Build Strategy

Use this skill when deciding how an Expo app should be built.

## First Pass

1. Read team conventions from `EXPO_SKILLS.md` or `.expo-skills/profile.md` when present.
2. Inspect `eas.json`, app config, credentials references, package scripts, release docs, and `release-state.json`.
3. Verify the current Expo pricing/plan limits from official Expo pricing or billing docs before quoting build quota or EAS Update MAU numbers.
4. Identify target build type: development, preview/internal, simulator, production, or store submission.
5. Decide whether the change needs a binary build or can ship as OTA.

## Strategy Options

### EAS Cloud Build

Use when:

- the team wants Expo-managed remote build machines
- local native toolchains are not installed
- CI-style reproducibility matters
- current plan quota/credits are enough
- queue time is acceptable

Current public pricing has offered a Free plan with separate Android and iOS monthly build allowances. Treat exact quota numbers as time-sensitive and verify before planning.

### Local EAS Build

Use when:

- the team wants cost control
- cloud quota should be saved
- a cloud build failure needs local reproduction
- local signing visibility matters
- native toolchains and credentials are available

Commands:

```bash
eas build --profile production --platform ios --local
eas build --profile production --platform android --local
```

### OTA Instead Of Build

Use when:

- changes are JS/assets-only
- target runtimeVersion matches exactly
- no native config, permission, dependency, splash/icon, or native module changes are included

Run `expo-version-ota-governance` before publishing OTA.

EAS Update has its own plan limits separate from build quota. As of 2026-06-26, Expo's pricing page lists the Free plan EAS Update allowance as 1,000 MAUs, 100 GiB bandwidth, and 20 GiB storage. Treat these numbers as time-sensitive and verify official pricing before release planning.

## Build Profile Policy

Keep profiles intentional:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "channel": "development"
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "channel": "production",
      "autoIncrement": false
    }
  }
}
```

Use `cli.appVersionSource` deliberately:

- `local`: app config/release-state controls version/build numbers.
- `remote`: EAS manages developer-facing build versions.

## Quota Hygiene

- Do not burn cloud builds for JS-only changes.
- Run typecheck/lint/tests before cloud builds.
- Prefer simulator/local builds during native debugging when possible.
- Use cloud builds intentionally for shared QA, final internal testing, and store-bound artifacts.
- Track failed/canceled builds and verify current billing behavior from official docs.
- Record monthly build budget in `docs/eas-build-policy.md` when the team cares about quota.

## Files To Create

Use `templates/eas-build-policy.md` in app repos:

```text
docs/eas-build-policy.md
eas.json
release-state.json
scripts/check-expo-release-state.js
scripts/check-ota-safety.js
```

## Verification

Before building:

```bash
npm run verify
npm run release:check
npx expo config --type public
```

Before using cloud quota, state:

- profile
- platform
- cloud or local
- expected artifact purpose
- why OTA is not enough
