---
name: expo-project-foundation
description: Create or migrate a production-ready Expo app foundation. Use when starting a new Expo project, auditing an existing Expo app, standardizing app config, package scripts, TypeScript, environment files, EAS basics, folder structure, SDK versions, or project bootstrap conventions.
---

# Expo Project Foundation

Use this skill before feature work when the app foundation is missing, inconsistent, or unclear.

## First Pass

1. Identify the Expo app root. Prefer the directory containing `package.json` plus `app.json`, `app.config.*`, or Expo Router `app/`.
2. Read team/project conventions first: `EXPO_SKILLS.md`, `.expo-skills/profile.md`, `.expo-skills/profile.example.md`, `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `README.md`, and docs under `docs/`.
3. Treat team profiles as defaults, not secrets. Never copy private profile values into committed public files.
4. Inspect `package.json`, Expo config, `eas.json`, TypeScript config, lint/test scripts, and route layout before editing.
5. Confirm the target Expo SDK from the project. If the user asks for current Expo behavior, verify against official Expo documentation before changing code.
6. Preserve user changes and avoid introducing unmanaged `ios/` or `android/` folders unless the task explicitly requires a prebuild/native workflow.

## Foundation Checklist

- Define app identity in one place: name, slug, scheme, bundle identifier, Android package, version, runtime version, and owner when applicable.
- Keep secrets out of the repo. Commit `.env.example`, not real `.env` files, tokens, certificates, keystores, service account JSON, or app-specific passwords.
- Add scripts for common gates: `typecheck`, `lint`, `test`, `verify`, `start`, `ios`, `android`, and release-specific scripts when needed.
- Prefer Expo Router for navigation unless the project already uses another navigation architecture intentionally.
- Prefer TypeScript, strict-enough compiler settings, and path aliases only when they reduce real repetition.
- Keep product code under a predictable structure such as `app/`, `src/components`, `src/features`, `src/lib`, `src/theme`, `src/hooks`, `src/providers`, `src/services`, and `src/utils`.
- Document required native config changes because they require a new binary and cannot ship by OTA alone.

## Folder Architecture

Use Expo Router routes as routing shells, not the whole application:

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
  hooks/
  lib/
    api/
    background/
    notifications/
  providers/
  services/
  theme/
  types/
  utils/
```

Rules:

- Keep `app/` files thin. They should assemble providers, route groups, and feature screens.
- Keep app-wide primitives in `src/components/ui`; keep domain UI inside `src/features/<feature>/components`.
- Keep backend clients in `src/lib` and feature-specific API calls in feature services/hooks.
- Keep long-running setup such as notification listeners, background tasks, and auth bootstrap in providers or `src/lib`, not inside random screens.
- Keep feature modules portable: `screens`, `components`, `hooks`, `services`, and `types` should be enough for most features.
- Add barrels only when they simplify imports; avoid hiding circular dependencies.
- Do not put secrets, service account files, keystores, or generated native credentials inside `src/`.

## Component Structure

- Create shared UI primitives before duplicating screen-specific widgets.
- Use state components consistently: `Loading`, `Skeleton`, `EmptyState`, `ErrorState`, `OfflineBanner`.
- Prefer composition over large prop-heavy components.
- Keep navigation side effects out of pure UI components.
- Keep animations and haptics opt-in at the screen or feature layer unless they are core UI primitives.
- Document any required native config next to the feature that needs it and in release docs.

## App Config Rules

- Use `app.config.ts` or `app.config.js` when config depends on environment variables.
- Keep public runtime env names explicit, usually `EXPO_PUBLIC_*`.
- Keep store-facing version and build numbers distinct. Public version is user-visible; iOS build number and Android version code are upload identifiers.
- Set a stable `scheme` before adding auth redirects, deep links, or notifications.
- Add permission strings only for capabilities the app actually uses.

## Verification

Run the strongest available local gate before finishing:

```bash
npm run verify
```

If no unified gate exists, run the available equivalents:

```bash
npm run typecheck
npm run lint
npm test
npx expo config --type public
```

Report any command that is missing or fails, and explain the likely next fix.
