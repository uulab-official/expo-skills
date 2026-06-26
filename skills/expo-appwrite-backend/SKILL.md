---
name: expo-appwrite-backend
description: Add, review, or repair Appwrite in an Expo app. Use for Appwrite React Native SDK setup, client configuration, Auth, Databases, Storage, Functions, Realtime, OAuth redirects, environment variables, permissions, and Expo Router auth gates.
---

# Expo Appwrite Backend

Use this skill when Appwrite is the app backend.

## First Pass

1. Inspect `package.json`, Expo config, `.env.example`, Appwrite client setup, auth routes, and data access code.
2. Confirm endpoint, project ID, platform bundle/package IDs, and Appwrite region or self-hosted URL.
3. Check official Appwrite React Native docs before installing because SDK maturity and setup details can change.
4. Keep server API keys out of the mobile app.

## Install

Use the current Appwrite React Native SDK guidance. Typical setup includes the Appwrite React Native SDK plus Expo-compatible platform configuration.

Do not assume project details. Ask or derive:

- Appwrite endpoint
- project ID
- database ID
- collection IDs
- storage bucket IDs
- bundle ID and Android package

## Environment

Use public client env names:

```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=
EXPO_PUBLIC_APPWRITE_PROJECT_ID=
EXPO_PUBLIC_APPWRITE_DATABASE_ID=
EXPO_PUBLIC_APPWRITE_BUCKET_ID=
```

Do not put Appwrite server API keys in `EXPO_PUBLIC_*` or mobile source code.

## Client Rules

- Initialize `Client`, `Account`, `Databases`, `Storage`, `Functions`, and `Realtime` in one shared module.
- Keep IDs in environment/config files, not repeated string literals.
- Keep provider calls wrapped in feature-level functions or hooks.
- Handle offline and network errors explicitly.

## Auth

- Support account creation, login, logout, current session fetch, and deleted/revoked session recovery.
- Configure OAuth redirect URLs and platform settings in Appwrite Console before testing social login.
- Connect auth state to route protection in Expo Router.
- Clear cached user data and notification token association on logout.

## Databases And Permissions

- Model permissions intentionally. Do not rely on client-side filtering for private data.
- Store collection IDs in config and keep schema documentation in the repo.
- Keep write paths narrow and validate required fields before sending.
- Use Functions for privileged operations that require server credentials.

## Storage

- Validate file type and size before upload.
- Use bucket permissions that match the product privacy model.
- Store returned file IDs and preview/download URLs deliberately.
- Keep upload progress and retry UI in feature code.

## Realtime

- Subscribe only while the relevant screen or provider is active.
- Unsubscribe on unmount and auth changes.
- Handle duplicate events and reconnects.

## Verification

Test:

- first install signed out
- signup/login/logout
- current account restore after restart
- permission denial for another user's document
- file upload/download
- Function call when used
- Realtime subscribe/unsubscribe when used
