---
name: expo-idea-composer
description: Use when turning an app idea, rough product concept, client request, or vague Expo app brief into a focused MVP, product blueprint, feature roadmap, technical stack choice, screen map, and ordered Expo skill execution plan before implementation.
---

# Expo Idea Composer

Use this skill before implementation when the user has an app idea but the product shape is not yet clear.

## First Pass

1. Read `EXPO_SKILLS.md`, `.expo-skills/profile.md`, `docs/app-intake.md`, `docs/idea-brief.md`, `docs/product-blueprint.md`, and `docs/feature-roadmap.md` when present.
2. Identify whether this is a new app, a feature inside an existing app, a client proposal, or a store-ready product plan.
3. Separate business assumptions from implementation decisions.
4. Ask only for decisions that change scope, backend, cost, data model, account setup, or store release path.
5. Do not implement app code until the user approves the product blueprint or explicitly asks for a quick prototype.

## Idea Intake

Capture or infer:

- target user and problem
- core promise in one sentence
- primary user journey
- MVP success criteria
- must-have features
- nice-to-have features
- monetization or operating model
- region and language needs
- account/auth needs
- data, upload, realtime, map, notification, background, and offline needs
- store release target and timeline
- constraints: budget, team, backend preference, account availability, compliance, design style

If the idea is too broad, split it into:

```text
MVP now
Next release
Later experiments
Do not build yet
```

## Choice Prompts

Use compact choices when the user wants help deciding.

### Product Shape

```text
Which shape should I optimize for?
1. MVP: prove the core value with the smallest useful app
2. Production app: auth, backend, QA, release, and store review from the start
3. Internal tool: speed, admin workflows, and controlled distribution
```

### Backend

```text
Which backend direction should I use?
1. Supabase: Postgres, RLS, realtime, storage, Kakao/Google/Apple auth
2. Appwrite: app backend, auth, database, storage, functions
3. Firebase: Google-native auth, Firestore, analytics, messaging, Crashlytics
```

### Build Scope

```text
What should be built first?
1. Clickable app shell and navigation
2. Auth + backend data flow
3. Store-ready foundation with release docs and credentials plan
```

## Output Documents

When an app repo needs durable planning docs, create or update:

```text
docs/idea-brief.md
docs/product-blueprint.md
docs/feature-roadmap.md
docs/skill-execution-plan.md
docs/app-intake.md
```

Use repository templates when available:

```text
templates/idea-brief.md
templates/product-blueprint.md
templates/feature-roadmap.md
templates/skill-execution-plan.md
templates/app-intake.md
```

## Blueprint Rules

- Keep the MVP small enough to build and verify.
- Prefer one primary user journey over many shallow features.
- Convert vague feature names into screen, data, and permission requirements.
- Decide backend and auth only after the data and account model are clear.
- Mark store, account, credential, and provider-console work early.
- Record assumptions. Do not hide uncertain business decisions inside technical tasks.
- Defer expensive production work unless it affects architecture, data ownership, or store approval.

## Skill Execution Plan

Map the blueprint to existing skills:

| Need | Skills |
| --- | --- |
| App foundation | `expo-team-conventions`, `expo-project-foundation` |
| App shell and UI | `expo-app-shell-boilerplate`, `expo-router-navigation`, `expo-ui-system` |
| Auth and backend | `expo-auth-secure-storage`, one backend skill |
| Media/maps/offline/push | `expo-device-media`, `expo-maps-location`, `expo-data-offline-sync`, `expo-notifications-background` |
| Release planning | `expo-environment-flavors`, `expo-eas-build-strategy`, `expo-version-ota-governance` |
| Store/account work | `expo-store-console-setup`, `expo-store-review-info`, `expo-release-operator`, `expo-fastlane-automation` |
| Quality gate | `expo-quality-performance`, `expo-release-review` |

## Done Means

- The idea has a one-sentence product promise.
- MVP and later scope are separated.
- Main screens and user journeys are listed.
- Backend, auth, data, permissions, and release implications are explicit.
- The app repo has planning docs or the user has approved a short in-chat blueprint.
- The next specialized Expo skills are listed in execution order.
