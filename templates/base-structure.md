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
  app/
    AppBootstrap.tsx
    AppProviders.tsx
  components/
    ui/
      Button.tsx
      IconButton.tsx
      ListItem.tsx
      SwitchRow.tsx
      Skeleton.tsx
      LoadingOverlay.tsx
      EmptyState.tsx
      ErrorState.tsx
    feedback/
    layout/
      AppBar.tsx
      Screen.tsx
      Section.tsx
  features/
    auth/
      components/
      hooks/
      screens/
      services/
      types.ts
    notifications/
    map/
      components/
      hooks/
      screens/
      services/
      types.ts
    settings/
      components/
      screens/
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
    location/
      permissions.ts
      currentLocation.ts
    supabase.ts or appwrite.ts or firebase.ts
  providers/
    AppProviders.tsx
  theme/
    tokens.ts
    ThemeProvider.tsx
    useTheme.ts
  utils/
  types/
docs/
  app-intake.md
  backend.md
  backend-deployment.md
  social-auth-providers.md
  maps-provider-decision.md
  app-shell-blueprint.md
  brand-assets-checklist.md
  component-architecture.md
  ui-loading-patterns.md
  environment-flavors.md
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
  "test": "npm run test:unit --if-present",
  "expo:config": "npx expo config --type public",
  "doctor": "npx expo-doctor",
  "verify": "npm run typecheck && npm run lint && npm run test && npm run expo:config && npm run release:check && npm run ota:check && npm run release:auth",
  "release:check": "node scripts/check-expo-release-state.js",
  "ota:check": "node scripts/check-ota-safety.js",
  "release:auth": "node scripts/check-release-auth.js expo",
  "release:auth:strict": "node scripts/check-release-auth.js --strict expo ios android"
}
```

## Architecture Rules

- Keep Expo Router files in `app/` thin; render feature screens from `src/features`.
- Put reusable primitives in `src/components/ui` and domain components inside each feature.
- Put app bootstrap, root providers, theme wiring, and shell-level startup in `src/app`.
- Use app shell docs to define tabs, app bars, bottom sheets, settings, splash, and icon choices before building feature screens.
- Define background tasks in module top-level scope under `src/lib/background`.
- Keep notification token registration and notification routing under `src/lib/notifications`.
- Keep location permission and current-location helpers under `src/lib/location`.
- Use shared loading/error/empty primitives so shimmer and skeleton states match real layouts.
