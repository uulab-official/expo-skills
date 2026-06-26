---
name: expo-skill-orchestrator
description: Route broad Expo app requests to the right Expo skills and drive the work end to end. Use when the user asks to create an app, add a feature, choose backend/release options, prepare a store submission, or says a vague request such as "build this Expo app", "make it production-ready", "set up everything", or "what skills do I need".
---

# Expo Skill Orchestrator

Use this skill as the entry point for broad or vague Expo work. Its job is to select the right specialized skills, gather missing information, present choices only when they matter, and keep the task moving.

## Operating Mode

- Start by reading team/project conventions: `EXPO_SKILLS.md`, `.expo-skills/profile.md`, `.expo-skills/profile.example.md`, `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `README.md`.
- Use project files as the source of truth for existing apps.
- Ask for missing information only when a safe default would be risky or irreversible.
- Present 2-3 choices when there is a real product or platform tradeoff.
- Use reasonable defaults for reversible setup work and record assumptions.
- Invoke the narrowest relevant skills instead of trying to solve everything here.

## Intake

Collect or infer these values:

- app name and slug
- new app or existing app
- target platforms: iOS, Android, web
- backend choice: none, Supabase, Appwrite, Firebase, custom
- auth needs: none, email, social, anonymous, enterprise
- media/device needs: camera, gallery, location, notifications, background tasks
- release target: prototype, internal test, TestFlight, Play internal, public store
- review information: contact, demo account, privacy URLs, data safety, permission reasons
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
- New or messy project: `expo-project-foundation`
- Navigation: `expo-router-navigation`
- Design system: `expo-ui-system`
- Startup, splash, OTA: `expo-startup-ota`
- Auth/session/security: `expo-auth-secure-storage`
- Supabase: `expo-supabase-backend`
- Appwrite: `expo-appwrite-backend`
- Firebase: `expo-firebase-backend`
- Camera/files/uploads: `expo-device-media`
- Offline/local data/sync: `expo-data-offline-sync`
- Push/background: `expo-notifications-background`
- Quality/performance: `expo-quality-performance`
- Apple/Google console: `expo-store-console-setup`
- Store review info: `expo-store-review-info`
- Android JKS: `expo-android-jks-signing`
- fastlane: `expo-fastlane-automation`
- Final release: `expo-release-review`

## Common Tracks

### New MVP

1. `expo-team-conventions`
2. `expo-project-foundation`
3. `expo-router-navigation`
4. `expo-ui-system`
5. `expo-quality-performance`

### Auth App

1. `expo-team-conventions`
2. `expo-project-foundation`
3. `expo-router-navigation`
4. `expo-auth-secure-storage`
5. One backend skill
6. `expo-quality-performance`

### Media Upload App

1. Foundation and backend track
2. `expo-device-media`
3. `expo-data-offline-sync` when uploads must survive poor network
4. `expo-quality-performance`

### Store Ready App

1. Product feature skills as needed
2. `expo-startup-ota`
3. `expo-notifications-background` when push is used
4. `expo-store-console-setup`
5. `expo-store-review-info`
6. `expo-android-jks-signing`
7. `expo-fastlane-automation` when metadata/signing automation is desired
8. `expo-release-review`

## Choice Defaults

Use these defaults unless the user, project, or profile says otherwise:

- Navigation: Expo Router
- Config: `app.config.ts` when env or profile values are needed
- Language: TypeScript
- Backend: ask; do not guess between Supabase, Appwrite, and Firebase for a production app
- Auth storage: secure storage for sensitive credentials
- Release tooling: EAS first, fastlane as metadata/signing/upload companion
- Credentials: private directory outside the app repo

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
