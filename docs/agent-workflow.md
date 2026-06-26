# Agent Workflow

Use this document to help an AI agent choose the right Expo Skills without making the user micromanage every step.

For this repository itself, agents should also read the root `CODEX.md` or `CLAUDE.md` file depending on the tool being used.

## Default Flow

1. Read `EXPO_SKILLS.md` and `.expo-skills/profile.md` if present.
2. Use `expo-skill-orchestrator` to classify the task.
3. Use the smallest set of specialized skills.
4. Ask for missing information only when needed.
5. Present choices when the decision changes architecture, backend, release cost, or store setup.
6. Implement, verify, and summarize.

## Information To Collect

- App name and slug
- Existing app or new app
- Platforms: iOS, Android, web
- Backend: none, Supabase, Appwrite, Firebase, custom
- Auth: none, email, social, anonymous, enterprise
- Device features: camera, gallery, location, notifications, background tasks
- Release target: prototype, internal test, public store
- Store review info: contact, demo account, privacy policy, data safety, permission reasons
- Version/OTA policy: public version, build numbers, runtimeVersion, channel, branch, update server mode
- EAS Update plan check: plan, pricing checked date, estimated monthly active updated users, upgrade threshold
- Version policy document: `docs/versioning-policy.md` when present
- Build strategy: cloud EAS, local EAS, quota budget, or OTA
- Interactive release access: Expo/EAS login, Apple/Google accounts, OTP/2FA, fastlane match, backend CLI auth
- Team defaults: owner, bundle prefix, credential directory, URL patterns

## Recommended Choice Prompts

### Backend

```text
Which backend should I wire?
1. Supabase: Postgres, RLS, Storage, Realtime
2. Appwrite: Auth, Databases, Storage, Functions
3. Firebase: Firebase Auth/Firestore/Storage or native Firebase services
```

### Release Track

```text
Which release track are we targeting?
1. Prototype: run locally only
2. Internal test: EAS build + TestFlight/Play internal
3. Store review: metadata, screenshots, credentials, review notes
```

### OTA Server

```text
Which OTA update server should I use?
1. EAS Update: Expo-hosted updates, best default while plan limits fit
2. Custom Expo Updates server: self-hosted manifests/assets/rollout
3. No OTA yet: binary releases only
```

### Credentials

```text
Where should private credentials live?
1. TEAM_CREDENTIALS_DIR outside the repo
2. CI secret manager only
3. Existing team credential path from the project profile
```

### Interactive Release

```text
Which release operation should I run?
1. Login/preflight only: verify local accounts and credential paths
2. Build and submit: EAS/local build plus store upload
3. Store automation: fastlane match, metadata, screenshots, or track upload
```

## Skill Bundles

### MVP Bundle

- `expo-team-conventions`
- `expo-project-foundation`
- `expo-router-navigation`
- `expo-ui-system`
- `expo-quality-performance`

### Backend Bundle

- MVP bundle
- `expo-auth-secure-storage`
- one backend skill
- `expo-data-offline-sync` when offline support is required

### Release Bundle

- Backend or MVP bundle
- `expo-startup-ota`
- `expo-store-console-setup`
- `expo-store-review-info`
- `expo-android-jks-signing`
- `expo-eas-build-strategy`
- `expo-version-ota-governance`
- `expo-release-operator` when local logins, OTP, credential checks, or real upload/build commands are needed
- `expo-fastlane-automation` when needed
- `expo-release-review`

## Done Means

- Project files reflect the chosen conventions.
- Required `.env.example` values are documented.
- Real credentials are not committed.
- Verification commands have run or missing scripts are reported.
- External console tasks are listed clearly.
