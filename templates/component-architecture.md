# Component Architecture

Use this file to keep Expo Router, shared UI, feature modules, background tasks, and services predictable.

## Route Layer

- `app/` contains route files, layouts, route groups, and modals.
- Route files should stay thin: read route params, apply route-level options, render a feature screen.
- Do not put backend calls, push token logic, background task definitions, or large UI sections directly in route files.

## Shared UI

```text
src/components/ui/
  Button.tsx
  TextField.tsx
  Skeleton.tsx
  LoadingOverlay.tsx
  EmptyState.tsx
  ErrorState.tsx
src/components/feedback/
  ToastHost.tsx
  OfflineBanner.tsx
src/components/layout/
  Screen.tsx
  Section.tsx
```

Rules:

- Shared UI primitives do not import backend clients or navigation side effects.
- Keep dimensions stable for list rows, cards, thumbnails, and skeleton placeholders.
- Use icon-only buttons only when they have accessible labels.
- Keep loading, empty, error, and offline states visually consistent.

## Feature Modules

```text
src/features/<feature>/
  components/
  hooks/
  screens/
  services/
  types.ts
```

Rules:

- Put domain components near the feature that owns them.
- Put feature data calls in `services/` or hooks.
- Export only what other features actually need.
- Avoid circular dependencies between features.

## App Services

```text
src/lib/
  api/
  background/
  notifications/
  supabase.ts or appwrite.ts or firebase.ts
src/providers/
  AppProviders.tsx
```

Rules:

- Define background tasks at module top level.
- Register notification listeners once during app startup and clean them up.
- Keep auth/session bootstrap in a provider or startup module.
- Treat native config changes as binary-release changes.

## Review Checklist

- Route files are thin.
- Shared UI has no business logic.
- Feature modules own their screens and data hooks.
- Background tasks are top-level definitions.
- Notification routing shares deep-link parsing.
- Loading, empty, error, and offline states exist for data-heavy screens.
