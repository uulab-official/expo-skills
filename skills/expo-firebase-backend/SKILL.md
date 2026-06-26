---
name: expo-firebase-backend
description: Add, review, or repair Firebase in an Expo app. Use for Firebase JS SDK, React Native Firebase, Auth, Firestore, Storage, Analytics, Crashlytics, Cloud Messaging, google-services files, config plugins, dev client requirements, environment variables, and Expo Router auth gates.
---

# Expo Firebase Backend

Use this skill when Firebase is the app backend or native Firebase services are required.

## First Pass

1. Identify whether the app needs Firebase JS SDK, React Native Firebase, or both.
2. Inspect Expo config, `package.json`, service files, auth flow, and native build setup.
3. Verify current Expo Firebase guidance and React Native Firebase plugin requirements before editing.
4. Decide whether Expo Go support is required. Native Firebase modules generally require a dev client or production build.
5. Use `expo-release-operator` when the task requires `firebase login`, project listing, app registration, App Distribution, functions deploy, or private service account handling.

## Choose SDK Path

Use Firebase JS SDK when the app needs simpler Expo-compatible Auth, Firestore, or Storage behavior and can live within JS SDK constraints.

Use React Native Firebase when the app needs native Firebase capabilities such as Analytics, Crashlytics, Performance, or Cloud Messaging integrations. This path requires native config through Expo config plugins and a dev client or EAS build.

## Environment And Files

For JS SDK, keep web-style Firebase config in public env or config. It is not a server secret, but still avoid mixing dev/prod projects accidentally.

For native Firebase, configure:

```text
GoogleService-Info.plist
google-services.json
```

Decide explicitly whether these client config files are committed or provided from a private credential store. Never commit Firebase Admin service account JSON.

## Expo Config

- Add `ios.googleServicesFile` and `android.googleServicesFile` when native Firebase modules require them.
- Add required React Native Firebase config plugins.
- Use `expo-dev-client` when native Firebase modules are used during development.
- Treat config plugin/service file changes as native changes requiring a new binary.

## Auth

- Connect Firebase Auth state to startup and route protection.
- Handle first install, login, logout, app restart, expired/revoked sessions, and deleted users.
- Configure OAuth providers with correct bundle ID, package name, SHA fingerprints, and redirect settings.
- Keep admin SDK operations on trusted server code only.

## Firestore And Rules

- Treat Firestore security rules as required for private data.
- Keep indexes and rules in repo-managed files when possible.
- Avoid trusting client-side filters for authorization.
- Model offline persistence and conflict behavior deliberately.

## Storage

- Validate file type, size, and ownership.
- Align Storage rules with Auth and Firestore ownership.
- Keep upload progress and retry UI in feature code.

## Messaging And Notifications

- Use Expo notifications when the app is already on Expo push infrastructure.
- Use Firebase Cloud Messaging/native Firebase only when product requirements justify native setup.
- Register APNs, Android package, SHA, and Google service files consistently.

## Verification

Test:

- config resolves with `npx expo config --type public`
- dev client or production build launches when native Firebase is used
- login/logout/session restore
- Firestore rules block another user's data
- Storage upload/download
- Analytics/Crashlytics/Messaging only in production-like builds when used
