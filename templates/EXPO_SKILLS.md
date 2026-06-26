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
- Backend hosting: cloud / self-hosted / local development / undecided
- Backend deployment: docs/backend-deployment.md
- Social auth providers: docs/social-auth-providers.md
- Maps provider decision: docs/maps-provider-decision.md
- Auth:
- Store target: prototype / internal test / public review
- Store review info: docs/store-review-info.md
- Component architecture: docs/component-architecture.md
- App shell blueprint: docs/app-shell-blueprint.md
- Brand assets checklist: docs/brand-assets-checklist.md
- UI loading patterns: docs/ui-loading-patterns.md
- Release state: release-state.json
- Environment flavors: docs/environment-flavors.md
- Versioning policy: docs/versioning-policy.md
- Update server policy: docs/update-server-policy.md
- EAS build policy: docs/eas-build-policy.md
- Release operator session: docs/release-operator-session.md
- EAS Update plan checked on:
- Estimated OTA monthly active users:
- OTA upgrade threshold:

## Team Defaults

- Expo owner:
- Expo login method: local session / EXPO_TOKEN / ask
- Bundle prefix:
- Android package prefix:
- URL host pattern:
- Credential directory:
- Release build number policy:
- Update server mode: EAS Update / custom Expo Updates protocol server
- EAS Update plan: free / starter / production / enterprise / custom
- Apple account source: local session / App Store Connect API key / ask
- Google Play credential source: service account JSON / ask
- Backend CLI auth: Supabase / Appwrite / Firebase / none

## Preferred Skill Order

- Broad task: `expo-skill-orchestrator`
- Team defaults: `expo-team-conventions`
- Project setup: `expo-project-foundation`
- App shell: `expo-app-shell-boilerplate`
- Environment flavors: `expo-environment-flavors`
- Navigation: `expo-router-navigation`
- UI: `expo-ui-system`
- Startup/OTA: `expo-startup-ota`
- Auth: `expo-auth-secure-storage`
- Backend: `expo-supabase-backend`, `expo-appwrite-backend`, or `expo-firebase-backend`
- Media: `expo-device-media`
- Maps/location: `expo-maps-location`
- Offline: `expo-data-offline-sync`
- Notifications: `expo-notifications-background`
- Shimmer/loading/component architecture: `expo-ui-system`, `expo-project-foundation`
- Quality: `expo-quality-performance`
- Store: `expo-store-console-setup`, `expo-store-review-info`, `expo-android-jks-signing`, `expo-eas-build-strategy`, `expo-version-ota-governance`, `expo-release-operator`, `expo-fastlane-automation`, `expo-release-review`

## Safety

- Do not commit real credentials.
- Do not print secrets in final answers.
- Keep private files outside the repo or ignored by git.
- Use `.env.example` for variable names only.
