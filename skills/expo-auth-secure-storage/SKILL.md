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
5. Identify social providers: Kakao, Google, Apple, email/password, anonymous, enterprise SSO, or custom OIDC.

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
- For Kakao, confirm the selected backend officially supports Kakao OAuth or document the custom token exchange/OIDC bridge.
- For Google, configure OAuth consent, client IDs, SHA fingerprints when needed, and redirect URLs for every environment.
- For Apple, configure Service ID/App ID, return URLs, key/team IDs where required, and test on iOS before review.

## Social Login Rules

- Use one internal auth callback route regardless of provider, such as `<scheme>://auth/callback`.
- Keep provider-specific code in auth services/hooks, not inside route screens.
- Validate OAuth `state`/nonce where the provider or SDK exposes it.
- Handle provider cancel, denied consent, missing email, duplicate email, and account linking explicitly.
- Do not store provider access tokens unless the product actually needs provider APIs.
- If provider access tokens are stored, treat them as sensitive and use secure storage or server-side storage.
- Apple Sign in should be available on iOS when the app offers other third-party social login, unless the app qualifies for an App Store exception.
- Store review demo accounts should not depend on the reviewer having a Kakao/Google/Apple account.

## Mobile Redirect Checklist

- `scheme` exists in Expo config.
- Deep link route handles success, failure, cancellation, and unknown provider.
- Provider console callback URL matches backend callback URL exactly.
- Backend allow-list includes development, preview, and production redirect URLs.
- Production build, not only Expo Go, has been tested for each social provider.
- Logout clears provider/backend session and local cached profile.

## Verification

Test these flows:

- first install signed out
- login
- app restart auto login
- token refresh or expired session
- logout cleanup
- deep link/OAuth return when applicable
- Kakao/Google/Apple cancel and failure paths when enabled
