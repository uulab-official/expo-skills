# Account Automation

Use this file to let an AI agent operate account setup while keeping the user focused on product decisions.

Commit only non-secret status. Keep tokens, private keys, service account JSON, keystores, and passwords outside the repo.

## Operating Mode

- Preferred mode: CLI/API automation
- Fallback mode: browser console automation
- Browser controller available: yes / no
- Private credential directory:
- Private env file:
- Secret manager:
- User approval required before creating paid resources: yes / no
- User approval required before rotating/deleting credentials: yes

## Account Matrix

| Service | Needed? | Automation mode | Login/credential source | Verify command or page | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Expo/EAS | yes/no | CLI / browser | local session / `EXPO_TOKEN` | `npx expo whoami` | pending | |
| Supabase | yes/no | CLI / browser | `supabase login` / `SUPABASE_ACCESS_TOKEN` | `supabase projects list` | pending | |
| Appwrite | yes/no | CLI / browser | CLI login / `APPWRITE_API_KEY` | `appwrite whoami` | pending | |
| Firebase | yes/no | CLI / browser | `firebase login` / ADC / service account | `firebase projects:list` | pending | |
| Google Cloud | yes/no | CLI / browser | `gcloud auth login` / ADC | `gcloud config get project` | pending | |
| Google Play | yes/no | browser / API | service account JSON path | Play Console app/API access | pending | |
| Apple Developer | yes/no | browser / fastlane | App Store Connect API key / 2FA | App Store Connect team/app | pending | |
| fastlane match | yes/no | CLI | git / GCS / S3 + password | `fastlane match --readonly` | pending | |
| Kakao Developers | yes/no | browser | console session | app keys + redirect URI | pending | |

## Backend Automation

### Supabase

- Project ref:
- Organization:
- Access token env: `SUPABASE_ACCESS_TOKEN`
- Linked project path:
- Migrations path:
- Type generation command:
- Edge Functions deploy command:
- OAuth providers to configure:

### Appwrite

- Endpoint:
- Project ID:
- API key env: `APPWRITE_API_KEY`
- Appwrite config path:
- Platform IDs:
- Functions deploy command:
- OAuth providers to configure:

### Firebase

- Firebase project:
- Google Cloud project:
- Auth method: browser login / ADC / service account
- ADC env: `GOOGLE_APPLICATION_CREDENTIALS`
- Native config files source:
- Functions deploy command:
- OAuth providers to configure:

## Social Provider Console Tasks

### Kakao

- Kakao app:
- REST API key source:
- Native app key source:
- Client secret source:
- Redirect URIs:
- Consent items:
- Backend callback URL:

### Google

- OAuth consent screen:
- Web client ID:
- iOS client ID:
- Android client ID:
- SHA-1/SHA-256:
- Redirect URIs:

### Apple

- Team ID:
- Bundle ID:
- Services ID:
- Key ID:
- Private key path env:
- Return URLs:

## Browser Automation Rules

- Use browser automation only in the user's own logged-in browser/session.
- Ask the user to complete CAPTCHA, passkey, biometric, or 2FA steps directly in the browser or terminal.
- Do not save passwords, OTP codes, recovery codes, private key contents, or service account JSON contents.
- Record only IDs, paths, URLs, and completion status.
- Stop before paid-plan upgrades, destructive deletion, credential rotation, app transfer, or production policy changes unless the user explicitly confirms.

## Verification

- `node scripts/check-release-auth.js expo supabase appwrite firebase`:
- Backend CLI identity verified:
- Social provider redirect URIs verified:
- Store/API access verified:
- Non-secret account state recorded in `docs/release-operator-session.md`:
