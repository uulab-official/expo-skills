# Agent Workflow

Use this document to help an AI agent choose the right Expo Skills without making the user micromanage every step.

For this repository itself, agents should also read the root `CODEX.md` or `CLAUDE.md` file depending on the tool being used.

## Default Flow

1. Read `EXPO_SKILLS.md` and `.expo-skills/profile.md` if present.
2. Use `expo-skill-orchestrator` to classify the task.
3. Use `expo-idea-composer` before implementation when the idea, MVP scope, screen map, backend, or release path is unclear.
4. Use the smallest set of specialized skills.
5. Ask for missing information only when needed.
6. Present choices when the decision changes architecture, backend, release cost, or store setup.
7. Implement, verify, and summarize.

## Information To Collect

- App name and slug
- Product idea, target user, problem, one-sentence promise, MVP success criteria
- Existing app or new app
- Platforms: iOS, Android, web
- Backend: none, Supabase, Appwrite, Firebase, custom
- Backend hosting: cloud, self-hosted, local development, undecided
- Account automation: CLI/API first, browser console fallback, private credential directory, user approval boundaries
- Auth: none, email, Kakao, Google, Apple, social, anonymous, enterprise, custom OIDC
- App shell: bottom tabs, app bars, bottom sheet modals, settings, theme, splash, app icon
- Device features: camera, gallery, location, maps, markers, notifications, background tasks
- Maps: Naver, Kakao, Google, Apple, search/geocoding, marker count, clustering, provider quota
- Release target: prototype, internal test, public store
- Environment flavors: development, staging, production, app identifiers, packages, channels, branches
- Store review info: contact, demo account, privacy policy, data safety, permission reasons
- Version/OTA policy: public version, build numbers, runtimeVersion, channel, branch, update server mode
- EAS Update plan check: plan, pricing checked date, estimated monthly active updated users, upgrade threshold
- Custom OTA server: manifest endpoint, asset base URL, publish command, rollback command, monitoring owner
- Version policy document: `docs/versioning-policy.md` when present
- Build strategy: cloud EAS, local EAS, quota budget, or OTA
- Interactive release access: Expo/EAS login, Apple/Google accounts, OTP/2FA, fastlane match, backend CLI auth
- Browser console automation access: Supabase/Appwrite/Firebase/Google/Apple/Kakao console tasks when CLI/API is unavailable
- Team defaults: owner, bundle prefix, credential directory, URL patterns

## Recommended Choice Prompts

### Idea Shape

```text
How should I shape this idea?
1. MVP: smallest useful app to prove the core value
2. Production app: plan auth, backend, QA, release, and store review now
3. Internal tool: optimize for controlled users and fast operations
```

### Backend

```text
Which backend should I wire?
1. Supabase: Postgres, RLS, Storage, Realtime, Kakao/Google/Apple social auth
2. Appwrite: Auth, Databases, Storage, Functions, Google/Apple OAuth
3. Firebase: Firebase Auth/Firestore/Storage or native Firebase services
```

### App Shell

```text
Which app shell should I prepare?
1. Common mobile app: bottom tabs + app bar + settings + theme
2. Modal-heavy app: tabs + routed modals + bottom sheet forms
3. Minimal app: stack navigation + theme + splash/icon only
```

### Social Auth

```text
Which social login providers should I prepare?
1. Korea-ready: Kakao + Google + Apple
2. Global default: Google + Apple
3. Email only: no social provider
```

### Maps

```text
Which map setup should I prepare?
1. Korea-first: Naver or Kakao map + marker clustering/performance
2. Global default: Google/Apple maps via Expo-compatible map library
3. Search-only: no map view yet, just place/geocoding provider docs
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

### Environment Flavors

```text
Which environment setup should I use?
1. Three flavors: development + staging + production side-by-side
2. Two flavors: staging + production
3. Production only: simplest release path
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

### Account Automation

```text
How should I handle provider accounts?
1. CLI/API first: use existing local sessions or private env paths, browser only when needed
2. Browser first: use logged-in consoles for setup, then save only non-secret paths/status
3. Ask each time: confirm before each provider console or token step
```

## Skill Bundles

### MVP Bundle

- `expo-idea-composer` when the app concept, MVP, or screen map is unclear
- `expo-team-conventions`
- `expo-project-foundation`
- `expo-app-shell-boilerplate`
- `expo-environment-flavors` when dev/staging/prod variants, EAS profiles, or flavor-specific OTA are needed
- `expo-router-navigation`
- `expo-ui-system`
- `expo-maps-location` when maps, location UI, place search, or markers are needed
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
- `expo-custom-ota-server` when the app uses a self-hosted Expo Updates protocol server
- `expo-release-operator` when local logins, OTP, credential checks, or real upload/build commands are needed
- `expo-fastlane-automation` when needed
- `expo-release-review`

## Done Means

- Project files reflect the chosen conventions.
- Required `.env.example` values are documented.
- Real credentials are not committed.
- Verification commands have run or missing scripts are reported.
- External console tasks are listed clearly.
