---
name: expo-store-console-setup
description: Set up or audit Apple App Store Connect and Google Play Console for an Expo app. Use for bundle IDs, package names, Apple Developer identifiers, App Store Connect app records, Google Play app records, Play App Signing, Google Play Developer API service accounts, App Store Connect API keys, Firebase app registration, SHA fingerprints, store access, and console readiness before EAS Submit or fastlane.
---

# Expo Store Console Setup

Use this skill before build submission automation. It covers console-side setup that code changes alone cannot complete.

## First Pass

1. Identify app slug, display name, iOS bundle identifier, Android package, URL scheme, and store owner accounts from project config or user input.
2. Read team conventions from `EXPO_SKILLS.md` or `.expo-skills/profile.md` when present, using them only as defaults.
3. Inspect `app.config.*`, `eas.json`, `credentials.json`, `store.config.json`, `fastlane/`, and docs before making changes.
4. Separate console tasks from repo tasks. Console tasks may need the account owner in a browser; repo tasks should record required IDs and file paths.
5. Use `expo-release-operator` when console setup requires interactive local login, browser authentication, browser console automation, OTP/2FA, API key creation, service account setup, or verifying local credential paths.
6. Use official docs for current console UI because Apple, Google, Expo, and fastlane screens change over time.

## Required Decisions

- Apple Developer team and App Store Connect team.
- iOS bundle identifier, app group IDs, associated domains, push, Sign in with Apple, and other capabilities.
- App Store Connect app name, SKU, primary locale, bundle ID, category, age rating, privacy URL, support URL, and pricing availability.
- Google Play developer account, app package name, default language, app type, category, content rating, data safety, and target countries.
- Play App Signing mode and upload key ownership.
- Google Play Developer API service account and app permissions.
- Whether Firebase is used for push, analytics, auth, dynamic links, or Google services.

## Apple Setup

- Register the bundle identifier in Apple Developer before store submission.
- Enable only the capabilities the app really uses.
- Create the App Store Connect app record with the exact bundle ID.
- Create an App Store Connect API key when automation needs EAS Submit or fastlane without interactive Apple login.
- Store API key files outside the repo or in a private secret manager. Commit only path placeholders.
- Keep issuer ID, key ID, and private key path documented in a local-only env example or team credential guide.
- If API key creation must be done in the browser, let the user complete login/2FA and then use browser automation to navigate App Store Connect. Record only key ID, issuer ID, team ID, and private file path.

Suggested env names:

```env
ASC_KEY_ID=
ASC_ISSUER_ID=
ASC_KEY_PATH=/absolute/private/path/AuthKey_PLACEHOLDER.p8
APPLE_TEAM_ID=
ASC_TEAM_ID=
```

## Google Setup

- Create the Play Console app before automated submission.
- Enable Play App Signing for production distribution.
- Generate or upload an Android upload key. Keep the upload keystore private.
- Enable Google Play Developer API and connect a Google Cloud project.
- Create a service account, invite it to Play Console, and grant the minimum app permissions needed for upload/metadata.
- Store the service account JSON outside the repo or in a private secret manager.
- If Play Console API access must be configured in the browser, use browser automation after the user completes login/2FA. Record only project ID, service account email, app package, and JSON path.

Suggested env names:

```env
GOOGLE_PLAY_SERVICE_ACCOUNT_JSON=/absolute/private/path/play-service-account.json
GOOGLE_PLAY_PACKAGE_NAME=com.example.app
```

## Firebase And SHA

- Add iOS and Android Firebase apps only when the app uses Firebase-backed features.
- For Android, register package name plus SHA-1/SHA-256 fingerprints required by the feature.
- If Play App Signing is enabled, distinguish the app signing certificate fingerprints from upload key fingerprints.
- Keep `GoogleService-Info.plist` and `google-services.json` policy explicit. Public client config may be committed in some apps, but service account JSON must not be committed.

## Repo Outputs

Record placeholders, not secrets:

- `docs/store-console-setup.md` with console IDs and pending setup items.
- `docs/account-automation.md` with CLI/API versus browser-console status for Apple, Google, Firebase, and Kakao.
- `docs/store-review-info.md` with review contact, demo account, URLs, and manual console items.
- `.env.example` with required variable names.
- `credentials.example.json` or comments showing expected local file paths.
- `eas.json` submit profile references.
- `store.config.json` metadata scaffold when EAS metadata is used.

## Readiness Checklist

- Bundle ID and Android package match Expo config.
- Apple capabilities match app behavior and permissions.
- Play App Signing and upload key ownership are understood.
- App Store Connect API key exists or manual upload path is documented.
- Google service account has app-level permissions and JSON path is available locally.
- Required URLs are live or blocked explicitly.
- Store records exist before EAS Submit or fastlane upload.
