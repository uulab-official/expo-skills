---
name: expo-appwrite-backend
description: Add, review, or repair Appwrite in an Expo app. Use for Appwrite React Native SDK setup, client configuration, Auth, Databases, Storage, Functions, Realtime, OAuth redirects, environment variables, permissions, and Expo Router auth gates.
---

# Expo Appwrite Backend

Use this skill when Appwrite is the app backend.

## First Pass

1. Inspect `package.json`, Expo config, `.env.example`, Appwrite client setup, auth routes, and data access code.
2. Confirm endpoint, project ID, platform bundle/package IDs, and Appwrite Cloud region or self-hosted URL.
3. Read team conventions from `EXPO_SKILLS.md` or `.expo-skills/profile.md` when present, especially backend project naming, credential directory, and local env policy.
4. Check official Appwrite React Native docs before installing because the React Native SDK has been documented as beta and setup details can change.
5. Keep server API keys out of the mobile app.
6. Use `expo-release-operator` when the task requires `appwrite login`, project pull/push, function deploy, non-interactive API key setup, or private token handling.

## Install

Use the current Appwrite React Native SDK guidance. Typical Expo setup includes:

```bash
npx expo install react-native-appwrite react-native-url-polyfill
```

Treat SDK behavior as version-sensitive. If the project is production-critical, verify the currently documented React Native SDK status and test auth/session flows on real target builds before release.

Do not assume project details. Ask or derive:

- Appwrite endpoint
- project ID
- platform string for `setPlatform`, normally the iOS bundle ID or Android package configured in Appwrite Console
- database ID
- collection IDs
- storage bucket IDs
- bundle ID and Android package

## Environment

Use public client env names:

```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=
EXPO_PUBLIC_APPWRITE_PROJECT_ID=
EXPO_PUBLIC_APPWRITE_PLATFORM=
EXPO_PUBLIC_APPWRITE_DATABASE_ID=
EXPO_PUBLIC_APPWRITE_BUCKET_ID=
```

Do not put Appwrite server API keys in `EXPO_PUBLIC_*` or mobile source code.

For self-hosted Appwrite, the endpoint must be reachable from real devices and store review devices:

```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://appwrite.example.com/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=
EXPO_PUBLIC_APPWRITE_PLATFORM=
```

Document private self-hosted settings outside the app repo:

```text
Appwrite version
Public endpoint and proxy/TLS owner
SMTP/SMS provider
Storage adapter and backup plan
Functions runtimes
OAuth provider credentials
Database and volume backup plan
Upgrade and rollback plan
```

## Client Boilerplate

Create one shared client module, normally `src/lib/appwrite.ts`:

```ts
import 'react-native-url-polyfill/auto';
import {
  Account,
  Client,
  Databases,
  Functions,
  Realtime,
  Storage,
} from 'react-native-appwrite';

const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
const project = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const platform = process.env.EXPO_PUBLIC_APPWRITE_PLATFORM;

if (!endpoint || !project || !platform) {
  throw new Error('Missing Appwrite public environment variables');
}

export const appwriteClient = new Client()
  .setEndpoint(endpoint)
  .setProject(project)
  .setPlatform(platform);

export const account = new Account(appwriteClient);
export const databases = new Databases(appwriteClient);
export const storage = new Storage(appwriteClient);
export const functions = new Functions(appwriteClient);
export const realtime = new Realtime(appwriteClient);
```

## Client Rules

- Initialize `Client`, `Account`, `Databases`, `Storage`, `Functions`, and `Realtime` in one shared module.
- Import `react-native-url-polyfill/auto` before using the SDK.
- Call `setPlatform` with the platform identifier configured in Appwrite Console.
- Keep IDs in environment/config files, not repeated string literals.
- Keep provider calls wrapped in feature-level functions or hooks.
- Handle offline and network errors explicitly.

## Common App Files

For a production-shaped Expo app, create or update:

```text
src/lib/appwrite.ts
src/features/auth/
src/features/profile/
src/features/uploads/
docs/backend.md
.env.example
```

Record Appwrite Console IDs in public-safe docs, but keep server API keys private.

## Auth

- Support account creation, login, logout, current session fetch, and deleted/revoked session recovery.
- Configure OAuth redirect URLs and platform settings in Appwrite Console before testing social login.
- Connect auth state to route protection in Expo Router.
- Clear cached user data and notification token association on logout.
- Store review demo accounts separately from owner/admin accounts.

## Social Login

Appwrite OAuth2 creates an Appwrite identity/session after the provider redirects back. Configure each provider in Appwrite Console under Auth settings, then add the redirect URI from Appwrite to the provider console.

Recommended provider posture:

| Provider | Appwrite posture | Notes |
| --- | --- | --- |
| Google | Official OAuth provider | Configure OAuth consent screen, client ID/secret, and Appwrite redirect URI. |
| Apple | Official OAuth provider | Required by Apple when third-party social login is offered on iOS, unless an exception applies. |
| Kakao | Verify current Appwrite support first | If Kakao is not available as an official provider in the installed Appwrite version, use Supabase Auth for Kakao, a custom backend/OIDC bridge, or a separate Kakao token exchange flow. Do not imply first-class Appwrite Kakao support without checking current docs/version. |

Expo checklist:

- Configure Appwrite platform identifiers for iOS bundle ID and Android package.
- Configure success and failure redirect URLs using the app scheme or universal/app links.
- Add provider callback/redirect URLs exactly as shown by Appwrite Console.
- Keep OAuth client secrets only in Appwrite/server configuration.
- Test on a production-like build and a real device when possible; OAuth redirects can differ from Expo Go.
- Define duplicate email/account linking behavior before release.

Feature code should wrap the SDK call so screens do not know provider details:

```ts
await account.createOAuth2Session({
  provider: 'google',
  success: 'myapp://auth/callback',
  failure: 'myapp://auth/error',
});
```

Use the current Appwrite SDK/provider enum for the installed SDK before shipping.

## Databases And Permissions

- Model permissions intentionally. Do not rely on client-side filtering for private data.
- Store collection IDs in config and keep schema documentation in the repo.
- Keep write paths narrow and validate required fields before sending.
- Use Functions for privileged operations that require server credentials.
- Add a permission smoke test before release: one user must not read or mutate another user's document.

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
