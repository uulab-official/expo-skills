---
name: expo-supabase-backend
description: Add, review, or repair Supabase in an Expo app. Use for Supabase Auth, React Native session persistence, SecureStore/AsyncStorage choices, Postgres access, Row Level Security, Storage uploads, Realtime subscriptions, Edge Functions, environment variables, and Expo Router auth gates.
---

# Expo Supabase Backend

Use this skill when Supabase is the app backend.

## First Pass

1. Inspect `package.json`, Expo config, `.env.example`, auth providers, API clients, and route guards.
2. Confirm whether the app uses Supabase Cloud, self-hosted Supabase, Auth, Database, Storage, Realtime, or Edge Functions.
3. Read team conventions from `EXPO_SKILLS.md` or `.expo-skills/profile.md` when present, especially backend project naming, credential directory, and local env policy.
4. Verify current Supabase and Expo setup from official docs when installing or changing SDK behavior.
5. Keep service role or secret keys server-side only. On-device apps use the project URL and publishable/anon client key.
6. Use `expo-release-operator` when the task requires `supabase login`, project linking, function deploy, type generation from a remote project, browser console setup, OAuth provider configuration, or private token handling.

## Account Automation

- Prefer existing Supabase CLI auth, then `SUPABASE_ACCESS_TOKEN` from a private env, then `supabase login`.
- If the token must be created in the dashboard, use browser automation when available and let the user complete login/2FA directly.
- Verify with `supabase projects list` before linking, deploying, or generating types.
- Record project ref, org, linked path, and provider setup status in `docs/account-automation.md`; never record PATs, service role keys, JWT secrets, or OAuth client secrets.
- For OAuth providers, the agent may configure Supabase Dashboard values when logged in, but provider secrets must be stored only in Supabase/server settings.

## Install

Use Expo-compatible dependencies from the current Supabase Expo guide. Current Expo/Supabase flows commonly use `expo-sqlite` for local storage:

```bash
npx expo install @supabase/supabase-js react-native-url-polyfill expo-sqlite
```

If the project intentionally uses AsyncStorage-based auth persistence instead, install the current recommended AsyncStorage package and document that choice.

## Environment

Use public client env names:

```env
EXPO_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
```

For legacy projects, `EXPO_PUBLIC_SUPABASE_ANON_KEY` may exist. Prefer the current publishable key for new projects when available.

Never put `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_SECRET_KEY`, or any secret key in app code, `EXPO_PUBLIC_*`, screenshots, docs, or committed env files.

For self-hosted Supabase, set the public URL to the externally reachable API gateway URL, not an internal Docker hostname:

```env
EXPO_PUBLIC_SUPABASE_URL=https://supabase.example.com
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Document self-hosted operational values in private deployment docs:

```text
SITE_URL
API_EXTERNAL_URL
JWT_SECRET
SMTP settings
Storage backend
Auth provider env vars
Backup and restore plan
```

## Client Boilerplate

Create one shared client module, normally `src/lib/supabase.ts`:

```ts
import 'expo-sqlite/localStorage/install';
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase public environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

If using the legacy anon env name, keep the fallback explicit and remove it after migration:

```ts
const supabaseKey =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
```

## Client Rules

- Initialize Supabase in one shared module such as `src/lib/supabase.ts`.
- Import `expo-sqlite/localStorage/install` and `react-native-url-polyfill/auto` before creating the client when using the current Expo SQLite localStorage pattern.
- Choose a session persistence strategy intentionally. Prefer secure storage for sensitive tokens when practical.
- Keep auth bootstrap connected to the startup/auth skill so protected routes do not flicker.
- Do not create multiple Supabase clients unless there is a specific reason.

## Common App Files

For a production-shaped Expo app, create or update:

```text
src/lib/supabase.ts
src/features/auth/
src/features/profile/
src/features/uploads/
supabase/migrations/
.env.example
docs/backend.md
```

Keep generated schema/types in the repo when the project uses Supabase CLI or typed queries.

## Auth

- Support first install, signup, login, logout, app restart, expired session, and revoked session.
- Configure OAuth redirect URLs with Expo scheme and production deep links.
- Keep email confirmation and password reset links compatible with mobile deep links.
- Clear cached profile and notification token association on logout.
- Store review demo accounts separately from owner/admin accounts.

## Social Login

Support social login deliberately; each provider needs console setup, backend setup, Expo deep links, and a real-device test.

Recommended providers for Korean production apps:

| Provider | Supabase support | Notes |
| --- | --- | --- |
| Kakao | Official provider | Uses Kakao REST API key as client ID and Kakao Login client secret as client secret. |
| Google | Official provider | Configure Google OAuth client IDs and redirect URLs for web/native as required. |
| Apple | Official provider | Required by Apple when the app offers third-party social login on iOS, unless an exception applies. |

For Supabase Cloud, configure providers in the Dashboard. For self-hosted Supabase, configure OAuth providers in Docker/env config because provider settings are not managed through the cloud dashboard.

OAuth checklist:

- Add Supabase callback URL to each provider. Cloud shape is normally `https://<project-ref>.supabase.co/auth/v1/callback`; self-hosted shape is normally `https://<auth-domain>/auth/v1/callback`.
- Add Expo development and production redirect URLs to Supabase allow lists.
- Use the app scheme for native return URLs, such as `<scheme>://auth/callback`.
- Store provider client secrets only in Supabase/server env, never in the Expo app.
- Test Kakao, Google, and Apple on a production-like build because provider apps, universal links, and callback URLs often behave differently outside Expo Go.
- Verify account linking or duplicate email behavior before release.

Client login should live behind feature-level functions, for example:

```ts
await supabase.auth.signInWithOAuth({
  provider: 'kakao',
  options: {
    redirectTo: 'myapp://auth/callback',
  },
});
```

Use the current Supabase SDK docs for provider names and mobile redirect handling before shipping.

## Database And RLS

- Treat Row Level Security as required for user data.
- Define policies before exposing tables to the client.
- Keep migrations or SQL files in the repo when possible.
- Validate tenant/user ownership server-side with RLS, not only in UI filters.
- Add a quick RLS smoke test before release: one user must not read or mutate another user's rows.

## Storage

- Use signed URLs or public buckets intentionally.
- Validate file type, size, and ownership.
- Keep bucket policies aligned with user permissions.
- Upload progress and retry behavior should live in feature code, not the low-level client.
- Store bucket names in config/env, not scattered string literals.

## Realtime

- Subscribe at screen or feature boundaries and unsubscribe on unmount.
- Handle reconnect, auth changes, and duplicate events.
- Avoid realtime for workflows that need guaranteed delivery; use server state plus sync.

## Verification

Test:

- fresh install signed out
- signup/login/logout
- app restart session restore
- RLS blocks another user's row
- storage upload and download
- realtime subscribe/unsubscribe when used
