# Release Operator Session

Use this file during an interactive Expo release. Commit only non-secret state.

## Target

- Date:
- App:
- Branch:
- Commit:
- Release type: OTA / EAS cloud build / local EAS build / EAS submit / fastlane upload / store review
- Platforms: iOS / Android
- Store track: TestFlight / App Store review / Play internal / Play closed / Play production

## Account Selection

- Expo account or organization:
- Apple Developer team:
- App Store Connect provider/team:
- Google Play account:
- Google Cloud project:
- Firebase project:
- Supabase project:
- Appwrite project:

## Credential Sources

Do not paste secret contents here. Record paths and env names only.

- Private credential directory:
- Env file loaded:
- App Store Connect API key envs: `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_KEY_PATH`
- Google Play service account path env: `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`
- Android keystore path env: `ANDROID_KEYSTORE_PATH`
- fastlane match storage: git / google_cloud / s3
- fastlane match envs: `MATCH_GIT_URL`, `MATCH_GCS_BUCKET`, `MATCH_S3_BUCKET`, `MATCH_PASSWORD`
- Expo token env: `EXPO_TOKEN`
- Supabase token env: `SUPABASE_ACCESS_TOKEN`
- Firebase auth method: browser login / service account / CI token
- Appwrite auth method: CLI login / non-interactive API key

## Auth Status

| Service | Needed? | Checked command | Status | Notes |
| --- | --- | --- | --- | --- |
| Expo/EAS | yes/no | `npx expo whoami` | pending | |
| Apple ASC API | yes/no | env/path check | pending | |
| Google Play | yes/no | service account path check | pending | |
| fastlane match | yes/no | `fastlane match --readonly` | pending | |
| Firebase | yes/no | `firebase projects:list` | pending | |
| Supabase | yes/no | `supabase projects list` | pending | |
| Appwrite | yes/no | `appwrite whoami` | pending | |

## Commands Run

```text
# Add command, purpose, result, and artifact path.
```

## User Prompts Needed

- Browser login completed:
- OTP/2FA entered in terminal:
- Store team selected:
- Build mode confirmed:
- Submit/upload confirmed:

## Artifacts

- iOS IPA:
- Android AAB/APK:
- EAS build URL:
- TestFlight build:
- Play track release:
- Store metadata path:
- Screenshot path:

## Remaining Manual Steps

- Apple:
- Google:
- Expo:
- Backend:
- QA:

## Final Verification

- `npm run verify`:
- `npm run release:check`:
- `npm run ota:check`:
- `node scripts/check-release-auth.js ...`:
- Store review notes updated:
- Privacy/data safety updated:
