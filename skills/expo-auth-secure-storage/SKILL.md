---
name: expo-auth-secure-storage
description: Implement or review Expo authentication, session persistence, SecureStore usage, token refresh, auto login, logout cleanup, OAuth redirects, Appwrite/Supabase/Firebase auth integration, biometric unlock, and sensitive local storage.
---

# Expo Auth Secure Storage

Use this skill when authentication or sensitive local persistence is involved.

## First Pass

1. Identify the auth provider and existing session model.
2. Inspect storage usage: `expo-secure-store`, AsyncStorage, SQLite, provider SDK persistence, and custom token caches.
3. Check route protection in Expo Router layouts.
4. Confirm redirect URI, scheme, and provider console settings before changing OAuth flows.

## Storage Rules

- Store refresh tokens or long-lived credentials in `expo-secure-store`, not AsyncStorage.
- Store non-sensitive cache data in AsyncStorage, SQLite, or query cache as appropriate.
- Never commit real demo passwords, provider secrets, service role keys, or OAuth client secrets.
- Treat `EXPO_PUBLIC_*` values as public. Do not put secrets there.
- On logout, clear provider session, secure tokens, cached profile data, and notification token association when applicable.

## Session Rules

- Bootstrap auth once at startup and expose a stable signed-in/signed-out/loading state.
- Refresh tokens before expiry where the provider requires it.
- Handle revoked tokens and deleted accounts by forcing a clean sign-out.
- Avoid rendering protected screens before auth state is known.
- Keep admin/operator accounts separate from store review demo accounts.

## Biometrics

- Use biometrics as a local unlock layer, not as the only account identity.
- Provide fallback when biometrics are unavailable or enrollment changes.
- Explain why biometric unlock is being requested.

## Provider Notes

- For Supabase, prefer public anon key on-device and keep service role keys server-side only.
- For Appwrite, keep project IDs public but protect server API keys.
- For Firebase, distinguish client config from admin service account credentials.

## Verification

Test these flows:

- first install signed out
- login
- app restart auto login
- token refresh or expired session
- logout cleanup
- deep link/OAuth return when applicable
