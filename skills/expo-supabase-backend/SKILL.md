---
name: expo-supabase-backend
description: Add, review, or repair Supabase in an Expo app. Use for Supabase Auth, React Native session persistence, SecureStore/AsyncStorage choices, Postgres access, Row Level Security, Storage uploads, Realtime subscriptions, Edge Functions, environment variables, and Expo Router auth gates.
---

# Expo Supabase Backend

Use this skill when Supabase is the app backend.

## First Pass

1. Inspect `package.json`, Expo config, `.env.example`, auth providers, API clients, and route guards.
2. Confirm whether the app uses Supabase Auth, Database, Storage, Realtime, or Edge Functions.
3. Read team conventions from `EXPO_SKILLS.md` or `.expo-skills/profile.md` when present, especially backend project naming, credential directory, and local env policy.
4. Verify current Supabase and Expo setup from official docs when installing or changing SDK behavior.
5. Keep service role or secret keys server-side only. On-device apps use the project URL and publishable/anon client key.

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
