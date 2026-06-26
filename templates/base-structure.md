# Expo Base Structure

Use this as a production-shaped default for new Expo apps.

```text
app/
  _layout.tsx
  (tabs)/
  +not-found.tsx
src/
  components/
    ui/
  features/
    auth/
    settings/
    uploads/
  lib/
    supabase.ts or appwrite.ts or firebase.ts
  theme/
  utils/
docs/
  app-intake.md
  backend.md
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
