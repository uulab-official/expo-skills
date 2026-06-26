# Skill Execution Plan

Use this to convert a product blueprint into an ordered Expo Skills run.

## Context

- App:
- Source docs:
  - `docs/idea-brief.md`
  - `docs/product-blueprint.md`
  - `docs/feature-roadmap.md`
  - `docs/app-intake.md`

## Assumptions

- Backend:
- Auth:
- Release target:
- Environment flavors:
- Credential policy:

## Skill Order

| Order | Skill | Goal | Inputs | Verification |
| --- | --- | --- | --- | --- |
| 1 | `expo-team-conventions` | apply local defaults | `.expo-skills/profile.md` | profile values recorded |
| 2 | `expo-project-foundation` | create app foundation | app name, slug | app runs |
| 3 | `expo-app-shell-boilerplate` | app shell | screen map | tabs/settings/theme work |
| 4 | `expo-router-navigation` | navigation | routes | deep links/routes work |
| 5 | `expo-ui-system` | UI primitives | brand/theme | states render |

## Conditional Skills

| Condition | Skill |
| --- | --- |
| Auth/session needed | `expo-auth-secure-storage` |
| Supabase backend | `expo-supabase-backend` |
| Appwrite backend | `expo-appwrite-backend` |
| Firebase backend | `expo-firebase-backend` |
| Camera/gallery/uploads | `expo-device-media` |
| Maps/location | `expo-maps-location` |
| Offline sync | `expo-data-offline-sync` |
| Push/background | `expo-notifications-background` |
| Store release | release bundle skills |

## Release Bundle

| Skill | Use when |
| --- | --- |
| `expo-environment-flavors` | dev/staging/prod variants are needed |
| `expo-eas-build-strategy` | choosing cloud/local/OTA build path |
| `expo-version-ota-governance` | version/build/runtime/OTA policy |
| `expo-store-console-setup` | Apple/Google console setup |
| `expo-store-review-info` | review/demo/privacy/data safety docs |
| `expo-release-operator` | real login, OTP, credentials, build/submit |
| `expo-release-review` | final release readiness |

## Done

- MVP scope is implemented or queued.
- Verification commands are listed.
- External account/store tasks are assigned.
- Deferred ideas are not mixed into MVP tasks.
