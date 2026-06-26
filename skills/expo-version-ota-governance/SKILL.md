---
name: expo-version-ota-governance
description: Audit or implement Expo app versioning, build numbers, runtimeVersion policy, EAS Update compatibility, OTA safety, release state files, version bump scripts, and pre-release checks. Use when preparing EAS builds, publishing OTA updates, changing native config, bumping store versions, or preventing runtime/channel/version mistakes.
---

# Expo Version OTA Governance

Use this skill when release versioning or OTA safety matters.

## First Pass

1. Read team conventions from `EXPO_SKILLS.md` or `.expo-skills/profile.md` when present.
2. Inspect `docs/versioning-policy.md`, `app.config.*`, `app.json`, `eas.json`, `package.json`, `store.config.*`, update scripts, and release docs.
3. Identify the release action: new binary, internal build, public store version, or OTA update.
4. Separate native changes from JS/assets-only changes.
5. Verify current Expo EAS Build and EAS Update docs before changing version or update policy.

## Core Rules

- Store version is user-facing semver such as `1.0.0`.
- iOS build number and Android version code are developer-facing upload identifiers and must increase for every binary upload.
- OTA updates require exact platform and `runtimeVersion` compatibility with installed builds.
- `expo-updates` can use EAS Update or a custom server implementing the Expo Updates protocol.
- EAS Update is the default update server for most apps while usage fits current plan limits or the team wants Expo-hosted update infrastructure.
- Custom update servers are an advanced production choice, not a cost shortcut unless the team can operate hosting, manifests, rollout, monitoring, and rollback.
- Native config, permissions, native modules, icons, splash assets, bundle/package IDs, and runtime changes require a new binary.
- Do not publish OTA when the change depends on native code not present in the target binary.
- Before spending cloud build quota, check whether the change can safely ship as OTA.
- Before choosing EAS Update based on free-tier usage, verify current official Expo pricing. As of 2026-06-26, Expo lists Free plan EAS Update limits as 1,000 MAUs, 100 GiB bandwidth, and 20 GiB storage.
- Keep channel, branch, profile, and runtimeVersion relationships documented.
- Prefer a committed `docs/versioning-policy.md` for team decisions.

## Recommended Policy

For public templates and small teams:

- `versionSource`: `local`
- public version: semver, starting at `1.0.0`
- iOS build number and Android version code: shared `YYMMDDNN`
- `runtimeVersion`: match public version unless the team documents a stricter native runtime policy
- production channel/branch: `production`

Example build code:

```text
26010101
```

This means first build on January 1, 2026.

## Bump Matrix

| Scenario | Public version | Build number/versionCode | runtimeVersion |
| --- | --- | --- | --- |
| Same release TestFlight/Play internal build | unchanged | increase | unchanged unless native compatibility changed |
| New public store release | increase intentionally | increase | usually match public version |
| JS/assets-only OTA | unchanged | unchanged | unchanged |
| Native config/module/permission/icon/splash change | maybe | increase | change if compatibility changes |
| Backend-only change | unchanged | unchanged | unchanged |

## Version Source

Choose one policy per project:

- Local version source: app config is the source of truth. Use scripts/templates to bump values.
- Remote/EAS-managed version source: EAS manages developer-facing build numbers. Document how to inspect latest values.

Do not mix policies silently.

## Release State

Create a committed release state file when the team manages versions locally:

```json
{
  "version": "1.0.0",
  "iosBuildNumber": "26010101",
  "androidVersionCode": 26010101,
  "runtimeVersion": "1.0.0",
  "channel": "production",
  "branch": "production"
}
```

Use `templates/release-state.example.json` as a starting point.

Also copy `docs/versioning-policy.md` or create an app-local equivalent when the release policy differs from this repository.

## Checks To Add

When possible, add app-local scripts copied from this repository:

```text
scripts/check-expo-release-state.js
scripts/check-ota-safety.js
```

Package scripts:

```json
{
  "release:check": "node scripts/check-expo-release-state.js",
  "ota:check": "node scripts/check-ota-safety.js"
}
```

## Binary Release Checklist

- Public version is intentional.
- iOS build number and Android version code are monotonic.
- `runtimeVersion` policy is intentional.
- `eas.json` profile uses the expected channel.
- `updates.url` and EAS project ID are configured when EAS Update is used.
- Store metadata and review info match the version being submitted.
- Native config changes are shipped in the binary, not OTA-only.

## OTA Checklist

- Change is JS/assets-only.
- Target platform matches the installed build platform.
- Target `runtimeVersion` matches exactly.
- Target branch/channel is correct.
- `updates.url` points to the intended update service.
- If using a custom update server, the server implements the Expo Updates protocol and has been tested with the target binary.
- No dependency/native module/config plugin changes are included.
- Update message is clear.
- Rollback or follow-up binary plan exists for risky updates.

## Update Server Modes

### EAS Update

Use EAS Update for the default managed flow:

- `updates.url` normally points to `https://u.expo.dev/<project-id>`.
- EAS channel and branch mapping controls which updates a binary receives.
- Use `eas update` to publish.
- Free-tier usage can be enough for small apps, experiments, and early launches, but exact limits are time-sensitive and must be checked against official pricing before release planning.
- Document the plan limit check date, estimated monthly active updated users, bandwidth risk, and upgrade threshold in `release-state.json` or `docs/versioning-policy.md`.

### Custom Updates Server

Use a custom update server only when the team is ready to own update infrastructure:

- Server must implement the Expo Updates protocol.
- App config must set `updates.url` to the custom server endpoint.
- The team must own manifest generation, asset hosting, code signing strategy when used, rollout, monitoring, and rollback.
- `eas update` is for EAS Update; custom servers need their own publish/upload workflow.
- Document the custom update server URL and publish command in `docs/versioning-policy.md`.

## Update Server Decision Matrix

| Need | Recommended mode |
| --- | --- |
| Fast setup, Expo dashboard, channel/branch workflow, small user base | EAS Update |
| Usage is within current Free plan MAU/bandwidth/storage limits | EAS Update |
| Team wants predictable Expo billing and managed CDN | EAS Update |
| Private update infrastructure, custom compliance, or self-hosted asset routing is required | Custom server |
| Team lacks monitoring and rollback ownership | EAS Update |

## Verification

Run:

```bash
npm run release:check
npm run ota:check
npx expo config --type public
```

If scripts are missing, either add them from templates or manually verify the same fields before release.
