# Social Auth Providers

Use this file to track Kakao, Google, Apple, and custom OAuth/OIDC setup for an Expo app.

## App Redirects

- Expo scheme:
- Auth callback route:
- Auth failure route:
- Development redirect URL:
- Preview redirect URL:
- Production redirect URL:
- Universal/app link domain:

## Provider Matrix

| Provider | Needed? | Backend support | Console configured | Callback URL | Real device tested | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Kakao | yes/no | Supabase official / Appwrite verify / custom | pending |  | no | |
| Google | yes/no | Supabase official / Appwrite official / Firebase / custom | pending |  | no | |
| Apple | yes/no | Supabase official / Appwrite official / Firebase / custom | pending |  | no | |
| Custom OIDC | yes/no | Supabase self-hosted/custom / custom backend | pending |  | no | |

## Kakao

- Kakao Developers app:
- REST API key source:
- Client secret source:
- Consent items:
- Callback URL:
- Backend provider:
- Notes:

Kakao secrets belong in the backend provider settings or server env, not in Expo source code.

## Google

- Google Cloud project:
- OAuth consent screen status:
- Web client ID:
- iOS client ID:
- Android client ID:
- SHA-1/SHA-256 needed:
- Callback URL:
- Backend provider:

## Apple

- Apple team:
- App ID:
- Services ID:
- Key ID:
- Team ID:
- Return URL:
- Backend provider:

Apple Sign in should be available on iOS when other third-party social login is offered, unless an App Store exception applies.

## Account Linking Policy

- Same email from different providers links automatically: yes/no
- Manual linking screen needed:
- Missing email behavior:
- Provider cancellation behavior:
- Store review fallback login:

## Verification

- Kakao success:
- Kakao cancel:
- Google success:
- Google cancel:
- Apple success:
- Apple private relay email:
- Duplicate email handling:
- Logout clears local/backend session:
