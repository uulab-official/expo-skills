---
name: expo-android-jks-signing
description: Create, import, verify, rotate, or audit Android JKS upload signing credentials for Expo/EAS apps. Use for keytool, keystore aliases, credentials.json, EAS local credentials, Play App Signing upload keys, SHA-1/SHA-256 fingerprints, versionCode safety, and preventing keystore leaks.
---

# Expo Android JKS Signing

Use this skill when Android release signing or upload keys are part of the task.

## First Pass

1. Identify Android package name from `app.config.*`.
2. Read team conventions from `EXPO_SKILLS.md` or `.expo-skills/profile.md` when present, especially credential directory and package prefix.
3. Inspect `credentials.json`, `eas.json`, `key.properties`, `android/` only if the project is prebuilt/bare, and existing credential docs.
4. Determine whether EAS managed credentials or local credentials are the intended source of truth.
5. Confirm whether this is a new app, an existing Play app, or an upload-key rotation.

## Safety Rules

- Never commit `.jks`, `.keystore`, keystore passwords, key passwords, or `key.properties` with real values.
- Commit only `.gitignore`, `.env.example`, `key.properties.example`, or `credentials.example.json`.
- Back up the upload keystore in a private team credential store. Losing it blocks uploads until Google resets the upload key.
- Do not generate a new key for an existing Play app unless rotating the upload key intentionally.
- Do not reset Android `versionCode` downward.

## New Upload Key

Use `keytool` when the team manages the upload key locally:

```bash
mkdir -p credentials
keytool -genkeypair \
  -v \
  -storetype JKS \
  -keystore credentials/<app-slug>-upload.jks \
  -alias <app-slug> \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Use strong unique passwords. Do not put them in shell history if avoidable; prefer a private password manager and local env file.

## Verify Key

List alias and certificate fingerprints:

```bash
keytool -list -v -keystore credentials/<app-slug>-upload.jks -alias <app-slug>
```

Record SHA-1/SHA-256 only where needed, such as Firebase or Google API client setup. Do not record passwords.

## EAS Local Credentials

When using EAS local credentials, create `credentials.json` with local paths and load passwords from local-only env when possible. If static password fields are used, ensure the file is ignored or private.

Example shape:

```json
{
  "android": {
    "keystore": {
      "keystorePath": "credentials/<app-slug>-upload.jks",
      "keystorePassword": "$ANDROID_KEYSTORE_PASSWORD",
      "keyAlias": "<app-slug>",
      "keyPassword": "$ANDROID_KEY_PASSWORD"
    }
  }
}
```

If the current EAS CLI does not expand env vars in this file for the project setup, generate a local ignored credentials file from a template during build.

## EAS Managed Credentials

If the team lets EAS manage credentials:

- Use `eas credentials` to inspect or download credentials.
- Document whether EAS or the team private vault is the source of truth.
- Download and back up the upload key before relying on it for long-term store continuity.

## Play App Signing

- Google Play uses an app signing key to sign distributed artifacts and an upload key to authenticate uploads.
- Keep the upload key locally/EAS-managed; Google can reset it if needed.
- When registering SHA fingerprints, choose app signing certificate or upload certificate based on the Google service being configured.

## Verification

Before release:

```bash
npx expo config --type public
eas build --profile production --platform android --local
```

After building, confirm the artifact package name and version code match the intended Play Console app.
