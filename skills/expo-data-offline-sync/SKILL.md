---
name: expo-data-offline-sync
description: Design or implement Expo data layers, API clients, SQLite persistence, caching, offline-first behavior, sync queues, conflict handling, migrations, Appwrite/Supabase/Firebase data access, and network state recovery.
---

# Expo Data Offline Sync

Use this skill when app data must survive restarts, poor network, or offline usage.

## First Pass

1. Identify the backend and current data access pattern.
2. Inspect API clients, query cache, local storage, SQLite schema, migrations, and error handling.
3. Determine whether the feature is online-only, cache-first, offline-readable, or offline-writable.
4. Confirm whether data contains secrets or personally sensitive information before choosing storage.

## Data Layer Rules

- Keep backend clients in `src/lib` or the project equivalent.
- Keep feature-level query/mutation hooks near their feature.
- Use SQLite for relational local data, large structured caches, or offline queues.
- Use AsyncStorage for small non-sensitive preferences.
- Use SecureStore for sensitive tokens or credentials, not general app data.
- Add migrations for durable schema changes.
- Model loading, empty, error, stale, and offline states explicitly.

## Offline Write Rules

- Assign local IDs for optimistic records.
- Persist queued writes before showing success.
- Store enough metadata to retry safely: operation type, payload, created time, retry count, and idempotency key when possible.
- Resolve conflicts with a documented policy: server wins, client wins, merge, or user choice.
- Surface sync failures without losing user input.

## Backend Notes

- Supabase: keep service role keys server-side; use RLS intentionally.
- Appwrite: separate client SDK use from server API-key tasks.
- Firebase: keep admin credentials out of the app.
- Custom APIs: centralize auth headers, timeout, retry, and response parsing.

## Verification

Test:

- fresh install with empty cache
- online fetch
- app restart
- offline read
- offline write when supported
- reconnect and sync
- migration from a previous schema when applicable
