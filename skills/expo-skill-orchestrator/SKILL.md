---
name: expo-skill-orchestrator
description: Route broad Expo app requests to the right Expo skills and drive the work end to end. Use when the user asks to create an app, shape an app idea, add a feature, choose backend/release options, prepare a store submission, or says a vague request such as "build this Expo app", "make it production-ready", "set up everything", or "what skills do I need".
---

# Expo Skill Orchestrator

Use this skill as the entry point for broad or vague Expo work. Its job is to select the right specialized skills, gather missing information, present choices only when they matter, and keep the task moving.

## Operating Mode

- Start by reading team/project conventions: `EXPO_SKILLS.md`, `.expo-skills/profile.md`, `.expo-skills/profile.example.md`, `docs/account-automation.md`, `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `README.md`.
- Use project files as the source of truth for existing apps.
- Ask for missing information only when a safe default would be risky or irreversible.
- Present 2-3 choices when there is a real product or platform tradeoff.
- Use reasonable defaults for reversible setup work and record assumptions.
- Invoke the narrowest relevant skills instead of trying to solve everything here.

## Intake

Collect or infer these values:

- app name and slug
- app idea, target user, core problem, one-sentence promise, and MVP success criteria
- new app or existing app
- target platforms: iOS, Android, web
- backend choice: none, Supabase, Appwrite, Firebase, custom
- backend hosting: cloud, self-hosted, local development, or undecided
- account automation mode: CLI/API first, browser console fallback, or ask each time
- auth needs: none, email, Kakao, Google, Apple, social, anonymous, enterprise, custom OIDC
- app shell needs: bottom tabs, app bars, bottom sheet modals, settings, theme, splash, app icon
- media/device needs: camera, gallery, location, maps, markers, notifications, background tasks
- map needs: Naver Map, Kakao Map, Google Maps, Apple Maps, search/geocoding, clustering, marker optimization
- release target: prototype, internal test, TestFlight, Play internal, public store
- environment flavors: development, staging, production, app identifiers, package names, channels, branches
- build strategy: EAS cloud build, local EAS build, quota-aware mixed mode, or OTA-only
- review information: contact, demo account, privacy URLs, data safety, permission reasons
- version and OTA policy: public version, build numbers, runtimeVersion, channel, branch, update server mode
- EAS Update plan check: plan name, pricing checked date, estimated monthly active updated users, upgrade threshold
- custom OTA server details: manifest endpoint, asset base URL, publish command, rollback command, monitoring owner
- interactive release access: Expo/EAS login, Apple/Google account, OTP/2FA, fastlane match, backend CLI auth
- browser console automation access for Supabase, Appwrite, Firebase, Google, Apple, Kakao when CLI/API is unavailable
- team conventions: bundle prefix, Expo owner, credential directory, URL patterns

If many values are unknown, ask one compact question with choices:

```text
Which track should I use?
1. MVP: Expo Router + UI + local state
2. Backend app: Auth + Supabase/Appwrite/Firebase + storage
3. Store-ready: backend + notifications + EAS + screenshots/review
```

## Skill Routing

Use these skills in order when relevant:

- Team defaults: `expo-team-conventions`
- Idea to MVP: `expo-idea-composer`
- New or messy project: `expo-project-foundation`
- App shell boilerplate: `expo-app-shell-boilerplate`
- Environment flavors: `expo-environment-flavors`
- Navigation: `expo-router-navigation`
- Design system: `expo-ui-system`
- Startup, splash, OTA: `expo-startup-ota`
- Auth/session/security: `expo-auth-secure-storage`
- Supabase: `expo-supabase-backend`
- Appwrite: `expo-appwrite-backend`
- Firebase: `expo-firebase-backend`
- Camera/files/uploads: `expo-device-media`
- Maps/location UI: `expo-maps-location`
- Offline/local data/sync: `expo-data-offline-sync`
- Push/background: `expo-notifications-background`
- Quality/performance: `expo-quality-performance`
- Apple/Google console: `expo-store-console-setup`
- Store review info: `expo-store-review-info`
- Android JKS: `expo-android-jks-signing`
- EAS build strategy: `expo-eas-build-strategy`
- Version/OTA safety: `expo-version-ota-governance`
- Custom OTA server: `expo-custom-ota-server`
- Interactive release operation: `expo-release-operator`
- fastlane: `expo-fastlane-automation`
- Final release: `expo-release-review`

## Common Tracks

### New MVP

1. `expo-idea-composer` when product shape is unclear
2. `expo-team-conventions`
3. `expo-project-foundation`
4. `expo-app-shell-boilerplate`
5. `expo-router-navigation`
6. `expo-ui-system`
7. `expo-quality-performance`

### Auth App

1. `expo-team-conventions`
2. `expo-project-foundation`
3. `expo-app-shell-boilerplate`
4. `expo-router-navigation`
5. `expo-auth-secure-storage`
6. One backend skill
7. `expo-quality-performance`

### Media Upload App

1. Foundation and backend track
2. `expo-device-media`
3. `expo-data-offline-sync` when uploads must survive poor network
4. `expo-quality-performance`

### Map App

1. Foundation and app shell track
2. `expo-maps-location`
3. `expo-device-media` when camera/gallery/location permissions are also needed
4. `expo-data-offline-sync` when markers, places, or map search must work offline
5. `expo-quality-performance`

### Store Ready App

1. Product feature skills as needed
2. `expo-startup-ota`
3. `expo-notifications-background` when push is used
4. `expo-store-console-setup`
5. `expo-store-review-info`
6. `expo-android-jks-signing`
7. `expo-eas-build-strategy`
8. `expo-version-ota-governance`
9. `expo-custom-ota-server` when updateServerMode is custom
10. `expo-release-operator` when local login, OTP, match, backend CLI auth, or actual upload/build operations are needed
11. `expo-fastlane-automation` when metadata/signing automation is desired
12. `expo-release-review`

## Choice Defaults

Use these defaults unless the user, project, or profile says otherwise:

- Navigation: Expo Router
- Idea planning: use `expo-idea-composer` before implementation when the user gives a rough concept, asks for MVP shaping, or has not decided screens/backend/release target
- Config: `app.config.ts` when env or profile values are needed
- Language: TypeScript
- Backend: ask; do not guess between Supabase, Appwrite, and Firebase for a production app
- Maps: ask when choosing between Naver, Kakao, Google, Apple, `expo-maps`, and `react-native-maps`; Korea-first apps usually need Naver/Kakao considered explicitly
- Kakao auth: verify backend support; Supabase has official Kakao provider, Appwrite support must be checked against the installed version/docs before promising it
- Auth storage: secure storage for sensitive credentials
- Release tooling: EAS first, fastlane as metadata/signing/upload companion
- Build mode: ask or infer from quota/cost constraints; do not burn cloud builds for JS-only changes
- Environment flavors: use separate development/staging/production app identity when side-by-side installs, QA, or store release candidates matter
- OTA server: EAS Update by default; custom Expo Updates server only when the team can own hosting, manifests, rollout, monitoring, and rollback
- Credentials: private directory outside the app repo
- Account automation: CLI/API first, browser console fallback when available, and ask before paid, destructive, or credential-rotation actions

## Response Pattern

For broad tasks, briefly state:

1. What you inferred.
2. What choices matter.
3. Which skills you will use.
4. What you will verify.

Then proceed. Do not stop after planning unless the user asked only for a plan.

## Completion Gate

Before finishing:

- Run available verification commands.
- State which skills were used.
- State assumptions and unresolved external console tasks.
- Mention any manual store/credential steps that cannot be completed from the repo.
