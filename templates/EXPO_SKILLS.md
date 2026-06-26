# Expo Skills Instructions

Use this file to help Codex, Claude, or another AI agent work on this Expo app.

## How To Start

1. Use `expo-skill-orchestrator` first for broad tasks.
2. Read `.expo-skills/profile.md` or `.expo-skills/profile.example.md` if present.
3. Use specialized skills only when relevant.
4. Ask for missing information only when the decision is risky or irreversible.
5. Prefer implementing and verifying over stopping at a plan.

## App Profile

- App name:
- App slug:
- Platforms: iOS, Android
- Backend: Supabase / Appwrite / Firebase / custom / none
- Auth:
- Store target: prototype / internal test / public review
- Store review info: docs/store-review-info.md

## Team Defaults

- Expo owner:
- Bundle prefix:
- Android package prefix:
- URL host pattern:
- Credential directory:
- Release build number policy:

## Preferred Skill Order

- Broad task: `expo-skill-orchestrator`
- Team defaults: `expo-team-conventions`
- Project setup: `expo-project-foundation`
- Navigation: `expo-router-navigation`
- UI: `expo-ui-system`
- Startup/OTA: `expo-startup-ota`
- Auth: `expo-auth-secure-storage`
- Backend: `expo-supabase-backend`, `expo-appwrite-backend`, or `expo-firebase-backend`
- Media: `expo-device-media`
- Offline: `expo-data-offline-sync`
- Notifications: `expo-notifications-background`
- Quality: `expo-quality-performance`
- Store: `expo-store-console-setup`, `expo-store-review-info`, `expo-android-jks-signing`, `expo-fastlane-automation`, `expo-release-review`

## Safety

- Do not commit real credentials.
- Do not print secrets in final answers.
- Keep private files outside the repo or ignored by git.
- Use `.env.example` for variable names only.
