---
name: expo-release-review
description: Prepare Expo apps for production release and store review. Use for EAS Build, EAS Submit, local/cloud builds, app version and build numbers, runtime version, OTA strategy, store metadata, screenshots, privacy URLs, app review notes, TestFlight, Play internal testing, and release checklists.
---

# Expo Release Review

Use this skill when preparing an Expo app for TestFlight, Play internal testing, App Store review, Play Store review, or production release.

## First Pass

1. Identify the app root and read project release docs.
2. Read team conventions from `EXPO_SKILLS.md` or `.expo-skills/profile.md` when present, especially release version policy, credential directory, URL patterns, and store account placeholders.
3. Inspect `app.config.*`, `eas.json`, `package.json`, `docs/store-review-info.md`, privacy/data inventories, store metadata files, screenshots, and credentials references.
4. Separate native binary changes from OTA-only changes.
5. Confirm the intended release target: internal test, TestFlight, closed testing, public store review, or OTA update.
6. Verify current Expo/EAS behavior from official docs when the command or store requirement may have changed.

## Secret Safety

- Never commit Expo tokens, Apple credentials, Google service account JSON, keystores, provisioning profiles, certificates, app-specific passwords, or review demo passwords.
- Use `.env.example` and path references for credentials.
- Keep store review demo accounts separate from owner/admin accounts.
- Do not print secrets in final answers, logs, docs, or scripts.

## Version Policy

- Public app version is user-visible semver.
- iOS build number and Android version code are upload identifiers and must increase for each binary upload.
- Keep `runtimeVersion` aligned with the OTA compatibility policy.
- Do not bump public version unless the user is intentionally shipping a new public release.
- For TestFlight or internal testing of the same public version, increment only build identifiers when appropriate.

## Build And Submit

- Prefer EAS Build and EAS Submit for Expo-aligned workflows.
- Use local builds when the team wants cost control or local signing visibility.
- Keep cloud builds as an explicit choice when local build requirements are unavailable.
- Run a verification gate before building.
- Record the exact profile, platform, build artifact path, and submit command used.

## Store Metadata

Prepare or verify:

- localized app name, subtitle/short description, full description, keywords
- support URL, marketing URL, privacy policy URL
- categories, age rating, content rights, export compliance
- permission explanations matching real app behavior
- review notes with login path and feature inspection steps
- review contact and demo account placeholders from private env/profile
- data safety and app privacy answers from a privacy data inventory
- screenshots for each required locale/platform

## Screenshot Rules

- Use real app UI captures, not fabricated interface mockups.
- Do not include dev menus, Expo Go, redboxes, debug labels, stale app names, or private data.
- Add localized overlay text only if it improves store clarity.
- Verify dimensions and platform requirements before upload.
- Visually inspect at least representative final screenshots.

## Final Release Checklist

- `npm run verify` or equivalent passes.
- App identity is consistent across Expo config, store metadata, screenshots, and review notes.
- Version/build numbers are valid and monotonic.
- Required URLs are live.
- Demo account works and has non-admin permissions.
- `docs/store-review-info.md`, privacy inventory, and permissions inventory are current when present.
- Push/deep link/auth flows work in a production-like build.
- Native permission prompts match store privacy declarations.
- The binary was built from the intended branch and commit.

## Verification

Run project gates and a production-like build command when requested:

```bash
npm run verify
eas build --profile production --platform all
```

If the task is OTA-only, state why the update is compatible with the installed runtime version before publishing.
