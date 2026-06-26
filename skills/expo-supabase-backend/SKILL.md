---
name: expo-supabase-backend
description: Add, review, or repair Supabase in an Expo app. Use for Supabase Auth, React Native session persistence, SecureStore/AsyncStorage choices, Postgres access, Row Level Security, Storage uploads, Realtime subscriptions, Edge Functions, environment variables, and Expo Router auth gates.
---

# Expo Supabase Backend

Use this skill when Supabase is the app backend.

## First Pass

1. Inspect `package.json`, Expo config, `.env.example`, auth providers, API clients, and route guards.
2. Confirm whether the app uses Supabase Auth, Database, Storage, Realtime, or Edge Functions.
3. Verify current Supabase and Expo setup from official docs when installing or changing SDK behavior.
4. Keep service role keys server-side only. On-device apps use the project URL and anon key.

## Install

Use Expo-compatible dependencies from the current Supabase Expo guide. Typical packages include:

```bash
npx expo install @supabase/supabase-js react-native-url-polyfill
```

Add storage dependencies only when the chosen session storage requires them, such as SecureStore, AsyncStorage, or SQLite.

## Environment

Use public client env names:

```env
EXPO_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=PUBLIC_ANON_KEY
```

Never put `SUPABASE_SERVICE_ROLE_KEY` in app code, `EXPO_PUBLIC_*`, screenshots, docs, or committed env files.

## Client Rules

- Initialize Supabase in one shared module such as `src/lib/supabase.ts`.
- Import `react-native-url-polyfill/auto` before using Supabase in React Native.
- Choose a session persistence strategy intentionally. Prefer secure storage for sensitive tokens when practical.
- Keep auth bootstrap connected to the startup/auth skill so protected routes do not flicker.
- Do not create multiple Supabase clients unless there is a specific reason.

## Auth

- Support first install, signup, login, logout, app restart, expired session, and revoked session.
- Configure OAuth redirect URLs with Expo scheme and production deep links.
- Keep email confirmation and password reset links compatible with mobile deep links.
- Clear cached profile and notification token association on logout.

## Database And RLS

- Treat Row Level Security as required for user data.
- Define policies before exposing tables to the client.
- Keep migrations or SQL files in the repo when possible.
- Validate tenant/user ownership server-side with RLS, not only in UI filters.

## Storage

- Use signed URLs or public buckets intentionally.
- Validate file type, size, and ownership.
- Keep bucket policies aligned with user permissions.
- Upload progress and retry behavior should live in feature code, not the low-level client.

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
