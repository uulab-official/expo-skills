---
name: expo-release-operator
description: Use when performing an interactive Expo release that needs local logins, browser authentication, OTP or 2FA prompts, Expo/EAS credentials, Apple or Google store access, Kakao Developers setup, fastlane match, EAS Build/Submit, Firebase, Supabase, Appwrite, or backend CLI/API authentication.
---

# Expo Release Operator

Run the release like a calm operator: inspect local state, ask for only the next missing input, let secure CLIs or browser sessions collect secrets, verify each login, then continue.

## Core Rules

- Never ask the user to paste passwords, private keys, service account JSON, keystores, certificates, provisioning profiles, or long-lived tokens into chat.
- Prefer browser login, native CLI prompt, keychain, `.env.local`, or a private credential directory outside the repo.
- Prefer API/CLI automation when a safe token or local session exists; fall back to browser console automation when the provider has no suitable API for the task.
- Use the user's logged-in browser/session when browser tools are available. Let the user handle CAPTCHA, passkeys, biometric prompts, and 2FA in the browser.
- Ask for OTP/2FA codes only when a running CLI prompt needs them now. Do not save OTP codes.
- Print secret status, not secret values.
- Keep terminal sessions open when a command is waiting for login or OTP, and tell the user exactly what to complete.
- After every auth step, run a harmless identity/list command before continuing.
- Record paths, account names, team IDs, project IDs, and unresolved manual tasks in release docs.
- Stop before destructive actions such as `match nuke`, certificate revocation, app transfer, deleting store records, or rotating production keys unless the user explicitly confirms.

## First Pass

1. Read `EXPO_SKILLS.md`, `.expo-skills/profile.md`, `docs/app-intake.md`, `docs/account-automation.md`, `docs/environment-flavors.md`, `docs/custom-ota-server.md`, `docs/release-operator-session.md`, `release-state.json`, `eas.json`, `fastlane/`, store docs, and backend docs when present.
2. Identify target actions: OTA, custom OTA publish, EAS build, local build, EAS submit, TestFlight, Play internal, store review, metadata upload, backend deploy.
3. Determine required accounts: Expo, Apple Developer/App Store Connect, Google Play, Google Cloud/Firebase, Supabase, Appwrite, Kakao Developers, fastlane match storage.
4. Run safe status checks before login commands.
5. Build a short missing-access list and resolve it one item at a time.

## Interaction Pattern

Use this loop for each external service:

1. State why the service is needed.
2. Check whether the CLI and local credentials already work.
3. If not authenticated, run the official login command or open the provider console in the browser.
4. If a browser opens, continue browser automation after the user completes login/2FA/CAPTCHA.
5. If the command asks for OTP/2FA, ask for the current code only.
6. Verify with a non-mutating command or read-only console page.
7. Record non-secret status in `docs/account-automation.md` and continue to the next service.

Good prompt shape:

```text
Expo login is needed before EAS Build. I am going to run `npx expo whoami`.
If it is not logged in, I will run `npx expo login` and wait for you to finish the browser or terminal prompt.
```

## Auth Checks

| Service | Check first | Login or credential flow | Verify after |
| --- | --- | --- | --- |
| Expo CLI | `npx expo whoami` | `npx expo login` or `EXPO_TOKEN` | `npx expo whoami` |
| EAS CLI | `eas --version` | `eas account:login` or shared Expo auth | `npx expo whoami` plus a safe EAS command |
| Custom OTA server | `node scripts/check-custom-ota-server.js` when configured | project-specific storage/CDN/server auth outside repo | strict manifest smoke check with target runtime |
| Apple ASC API | env/path check | private `.p8` file and `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_KEY_PATH` | fastlane metadata dry run or EAS submit config check |
| Apple interactive | fastlane lane check | let fastlane/App Store Connect request 2FA in terminal | lane reaches metadata/readiness step |
| Google Play | service account path check | private JSON path in `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` | `supply` metadata-only or EAS submit config check |
| Google Cloud | `gcloud config get project` | `gcloud auth login`, `gcloud auth application-default login`, or service account path | `gcloud auth list` and target project check |
| fastlane match | `fastlane match --readonly` when configured | private match repo/GCS/S3 access and `MATCH_PASSWORD` | readonly match succeeds |
| Firebase | `firebase projects:list` | `firebase login`, Application Default Credentials, or service account flow | `firebase projects:list` |
| Supabase | `supabase projects list` | `supabase login`, browser-generated PAT, or `SUPABASE_ACCESS_TOKEN` from private env | `supabase projects list` |
| Appwrite | `appwrite whoami` | `appwrite login`, browser-created API key, or non-interactive CLI API key | `appwrite whoami` or project pull/list |
| Kakao Developers | browser console check | logged-in browser session; configure app keys, platforms, Kakao Login, consent, redirect URIs | app key and redirect status recorded without secret values |

Commands and flags can change. Verify current official docs when a command fails or before writing long-lived automation.

## Release Flow

### 1. Preflight

- Run project verification, release state check, and OTA safety check when scripts exist.
- Confirm flavor, app identity, version, build numbers, runtimeVersion, channel, branch, and target store track.
- Decide cloud build, local EAS build, OTA, or fastlane upload path.
- For custom OTA, confirm manifest endpoint, asset base URL, publish command, rollback command, storage/CDN auth, and monitoring owner.
- Copy `templates/release-operator-session.md` into `docs/release-operator-session.md` when the app lacks a release runbook.

### 2. Local Access

- Use `templates/scripts/check-release-auth.js` when copied into the app to identify missing tools/env paths.
- Use `node scripts/check-release-auth.js --strict ...` in CI or final release checks when warnings should fail the run.
- Check command availability before asking the user to log in.
- Prefer existing local sessions over creating new credentials.
- Use `docs/account-automation.md` to decide whether each service should be CLI/API-driven or browser-driven.
- If multiple accounts are possible, ask the user which account/team to use before building or submitting.

### 3. Store And Signing

- Use `expo-store-console-setup` for missing Apple/Google console records.
- Use `expo-android-jks-signing` for Android upload key/JKS work.
- Use `expo-fastlane-automation` for match, deliver, supply, TestFlight, and metadata lanes.
- Run fastlane match in readonly mode first for existing teams.
- Do not create or rotate signing credentials unless the release plan requires it and the user confirms.

### 4. Backend Access

- Use the backend skill for project-specific work: `expo-supabase-backend`, `expo-appwrite-backend`, or `expo-firebase-backend`.
- Login only when the release needs backend deploy, environment sync, type generation, function deploy, auth provider setup, or app registration.
- After the user chooses a backend account, set up local CLI/API access enough to let the agent list projects, link the app, configure public IDs, deploy functions, and update provider settings where the provider supports it.
- When backend settings require console-only work, use browser automation and record only non-secret IDs and paths.
- Keep service role keys and server API keys out of committed docs.

### 5. Build, Submit, Review

- Use `expo-eas-build-strategy` before spending cloud quota.
- Use `expo-version-ota-governance` before OTA or binary release.
- Use `expo-custom-ota-server` before running custom OTA publish commands.
- Use `expo-release-review` for final store readiness.
- Run upload/submit commands only after identity, team, package/bundle ID, version, and artifact path are verified.

## What To Ask The User

Ask concise questions only when the agent cannot infer safely:

- Which Expo account or organization should own this build?
- Which flavor should this release target: development, staging, or production?
- Which Apple team or App Store Connect provider should be used?
- Which Google Play app/account should receive this package?
- Should iOS signing come from EAS managed credentials or fastlane match?
- Which match storage mode should be used: git, Google Cloud Storage, or S3?
- Should this release use cloud EAS build, local EAS build, OTA, or an existing artifact?
- Please complete the browser login that just opened.
- May I use the logged-in browser session to configure this provider console?
- Please enter the OTP/2FA code in the terminal prompt now.

## Session Notes

Record non-secret state in `docs/release-operator-session.md`:

- account/team selected
- commands run
- verified identity
- credential paths used
- browser console tasks completed
- artifact paths
- flavor, EAS profile, channel, branch
- store track
- remaining manual console steps

Never record passwords, OTP codes, private key contents, service account JSON contents, keystore passwords, or token values.

## Verification

Before finishing, run the relevant safe checks:

```bash
npm run verify
npm run release:check
npm run ota:check
node scripts/check-release-auth.js expo ios android fastlane-match
node scripts/check-release-auth.js --strict expo ios android fastlane-match
```

Report what passed, what required user action, what remains manual in Apple/Google/Expo/backend consoles, and which account/team was used without exposing secrets.
