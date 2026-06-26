---
name: expo-environment-flavors
description: Use when configuring or auditing Expo development, staging, and production app flavors, environment variables, app.config variants, bundle identifiers, Android packages, EAS build profiles, EAS Update channels/branches, runtimeVersion, fastlane lanes, or release matrices.
---

# Expo Environment Flavors

Use this skill when an Expo app needs predictable development, staging, and production release lanes.

## First Pass

1. Read `docs/environment-flavors.md`, `docs/versioning-policy.md`, `docs/eas-build-policy.md`, `release-state.json`, `eas.json`, `app.config.*`, `package.json`, and `fastlane/` when present.
2. Identify the requested target: development, staging, production, or all.
3. Separate runtime JS env values from native identity values. Bundle IDs, package names, schemes, icons, splash, permissions, update URLs, and channels need a new binary.
4. Verify current Expo docs before changing EAS env, update channel/branch, runtimeVersion, or version source policy.
5. Keep real env values, API keys, service accounts, signing files, and match credentials outside the public repo.

## Flavor Matrix

Use three lanes unless the team documents otherwise:

| Flavor | Purpose | App identity | EAS profile | Channel | Branch | Store |
| --- | --- | --- | --- | --- | --- | --- |
| development | dev client and local QA | suffix `.dev`, name suffix `Dev` | `development` | `development` | `development` | none |
| staging | internal QA/release candidate | suffix `.staging`, name suffix `Staging` | `staging` or `preview` | `staging` | `staging` | TestFlight / Play internal |
| production | public app | no suffix | `production` | `production` | `production` | public store |

Rules:

- Use distinct `ios.bundleIdentifier`, `android.package`, `scheme`, and display name for installable side-by-side variants.
- Keep production app identity stable once social login, deep links, push, store listing, or app review depends on it.
- Use distinct backend/public endpoints per flavor unless the product explicitly shares data.
- Use `APP_VARIANT` or an equivalent env variable to drive `app.config.ts`.
- Put flavor decisions in `docs/environment-flavors.md`; do not hide them only in CI settings.

## Versioning Policy

- Public production version should follow semver.
- Development and staging may share the next production public version, but every binary upload still needs a unique iOS build number and Android version code.
- Use one build number policy, preferably `YYMMDDNN`, across all flavors when using local version source.
- Keep `runtimeVersion` compatible with OTA targets. If runtime policy follows app version, a staging binary with `1.2.0` should receive only updates for runtime `1.2.0`.
- Do not publish an OTA update across flavors unless channel, branch, runtimeVersion, backend endpoint, and feature flags are intentionally compatible.

## EAS Profiles

Use explicit profiles:

```json
{
  "cli": {
    "appVersionSource": "local"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "channel": "development",
      "env": { "APP_VARIANT": "development" }
    },
    "staging": {
      "distribution": "internal",
      "channel": "staging",
      "env": { "APP_VARIANT": "staging" }
    },
    "production": {
      "channel": "production",
      "env": { "APP_VARIANT": "production" },
      "autoIncrement": false
    }
  },
  "submit": {
    "staging": {},
    "production": {}
  }
}
```

Choose EAS-hosted env variables or profile `env` deliberately. Public `EXPO_PUBLIC_*` values are embedded in the client and must not contain secrets.

## App Config Pattern

Use dynamic config when flavors affect native identity:

```ts
const variant = process.env.APP_VARIANT ?? 'development';
const isProd = variant === 'production';

export default {
  name: isProd ? 'My App' : `My App ${variant}`,
  slug: 'my-app',
  scheme: isProd ? 'myapp' : `myapp-${variant}`,
  ios: {
    bundleIdentifier: isProd ? 'com.example.myapp' : `com.example.myapp.${variant}`,
    buildNumber: process.env.IOS_BUILD_NUMBER ?? '26010101',
  },
  android: {
    package: isProd ? 'com.example.myapp' : `com.example.myapp.${variant}`,
    versionCode: Number(process.env.ANDROID_VERSION_CODE ?? 26010101),
  },
  version: process.env.APP_VERSION ?? '1.0.0',
  runtimeVersion: process.env.RUNTIME_VERSION ?? process.env.APP_VERSION ?? '1.0.0',
  updates: {
    url: process.env.EXPO_UPDATES_URL,
  },
};
```

Adapt to the app's existing config style and avoid importing secret files into app config.

## OTA Rules

- Publish dev updates to `development`, staging updates to `staging`, production updates to `production`.
- Use `eas update --branch <branch> --message "<message>"` for EAS Update.
- Use custom publish commands only when `updateServerMode` is custom and documented.
- Never use staging OTA to patch production unless the channel mapping and runtime are deliberately promoted.
- Use rollout commands only after confirming the target channel has the intended current branch.

## fastlane And EAS

- Let EAS Build create Expo binaries unless the team intentionally builds natively with fastlane.
- Use fastlane for match, metadata, screenshots, TestFlight fallback, Play track upload, or review submission.
- Mirror lanes to flavors: `ios staging`, `ios production`, `android staging`, `android production`.
- Each lane must verify app identifier, package name, version, build number, artifact path, and track before upload.
- Use `match(readonly: true)` first for release operations; avoid destructive certificate cleanup.

## Verification

Run:

```bash
npm run release:check
npm run ota:check
npx expo config --type public
```

For each changed flavor, verify:

- app name, scheme, bundle ID, Android package
- version, build number, version code, runtimeVersion
- EAS profile channel and branch
- backend endpoint and public env values
- fastlane lane target and store track
- whether the change needs a binary build or OTA is enough
