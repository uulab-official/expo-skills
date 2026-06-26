# Expo Base Structure

Use this as a production-shaped default for new Expo apps.

```text
app/
  _layout.tsx
  (auth)/
  (tabs)/
  modals/
  +not-found.tsx
src/
  components/
    ui/
      Skeleton.tsx
      LoadingOverlay.tsx
      EmptyState.tsx
      ErrorState.tsx
    feedback/
    layout/
  features/
    auth/
      components/
      hooks/
      screens/
      services/
      types.ts
    notifications/
    settings/
    uploads/
  hooks/
  lib/
    api/
    background/
      tasks.ts
      registerBackgroundTasks.ts
    notifications/
      registerPushToken.ts
      notificationListeners.ts
      notificationRouter.ts
    supabase.ts or appwrite.ts or firebase.ts
  providers/
    AppProviders.tsx
  theme/
    tokens.ts
  utils/
  types/
docs/
  app-intake.md
  backend.md
  component-architecture.md
  ui-loading-patterns.md
  versioning-policy.md
  release-operator-session.md
  store-review-info.md
  privacy-data-inventory.md
  permissions-inventory.md
scripts/
  check-expo-release-state.js
  check-ota-safety.js
  check-release-auth.js
fastlane/
  Matchfile
  Fastfile
release-state.json
store.config.json
EXPO_SKILLS.md
.expo-skills/
  profile.example.md
```

## Package Scripts

```json
{
  "typecheck": "tsc --noEmit",
  "lint": "expo lint",
  "verify": "npm run typecheck && npm run lint && npm run release:check",
  "release:check": "node scripts/check-expo-release-state.js",
  "ota:check": "node scripts/check-ota-safety.js",
  "release:auth": "node scripts/check-release-auth.js expo"
}
```

## Architecture Rules

- Keep Expo Router files in `app/` thin; render feature screens from `src/features`.
- Put reusable primitives in `src/components/ui` and domain components inside each feature.
- Define background tasks in module top-level scope under `src/lib/background`.
- Keep notification token registration and notification routing under `src/lib/notifications`.
- Use shared loading/error/empty primitives so shimmer and skeleton states match real layouts.
