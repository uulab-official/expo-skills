---
name: expo-team-conventions
description: Create, apply, or review team-specific Expo defaults without hardcoding them into public skills. Use for bundle/package prefixes, Expo owner, URL schemes, support/privacy URL patterns, preferred backend, credential directory names, EAS profiles, store account placeholders, release version policy, app template choices, and local convention files such as EXPO_SKILLS.md or .expo-skills/profile.md.
---

# Expo Team Conventions

Use this skill when a team wants reusable Expo defaults while keeping the public skill pack generic.

## Principle

Keep shared skills public and portable. Put team-specific defaults in local convention files, not in `SKILL.md`.

Examples of team-specific defaults:

- bundle/package prefix
- Expo owner
- Apple/Google account names
- credential directory
- support/privacy URL pattern
- preferred backend
- app naming rules
- version/build-number policy
- default tabs, legal screens, release scripts

## First Pass

1. Look for convention files in this order:
   - `EXPO_SKILLS.md`
   - `.expo-skills/profile.md`
   - `.expo-skills/profile.example.md`
   - `AGENTS.md`, `CLAUDE.md`, `CODEX.md`
   - `README.md` and `docs/**/*.md`
2. Treat committed example profiles as templates, not truth.
3. Treat uncommitted local profiles as user/team preferences.
4. Never copy secrets from a local profile into public docs, final answers, or committed files.
5. If a required convention is missing, use a safe placeholder and record the open decision.

## Profile Shape

Prefer a small markdown file that agents can read quickly:

```markdown
# Expo Skills Profile

## Identity

- organization: Example Team
- expoOwner: example-owner
- bundlePrefix: com.example
- androidPackagePrefix: com.example
- urlHostPattern: <app-slug>.example.com

## Defaults

- backend: supabase
- navigation: expo-router
- releaseBuildNumber: yymmddnn
- publicVersionStart: 1.0.0

## Credentials

- credentialsDir: $TEAM_CREDENTIALS_DIR
- commitRealCredentials: false

## Store

- supportUrlPattern: https://<app-slug>.example.com/support
- privacyUrlPattern: https://<app-slug>.example.com/privacy
```

## Apply Rules

- Public skills provide workflow and safety rules.
- Team profile provides defaults.
- User request overrides team profile.
- Project files override broad team defaults when the app already exists.
- Official docs override stale profile assumptions.

## What To Commit

Commit:

- `.expo-skills/profile.example.md`
- `.env.example`
- `credentials.example.json`
- docs that describe required local setup

Do not commit:

- `.expo-skills/profile.local.md`
- real `.env` files
- key files, tokens, passwords, service account JSON, certificates, provisioning profiles, or keystores

## Useful Outputs

When setting up a project, create or update:

- `EXPO_SKILLS.md` for repo-wide agent instructions
- `.expo-skills/profile.example.md` for shareable defaults
- `.env.example` for required variable names
- `docs/local-setup.md` for human setup notes

## Verification

Check:

- Public files contain placeholders only.
- Local-only files are ignored by git.
- Bundle/package IDs follow the profile.
- Credential paths point outside the public repo.
- Release, backend, and store skills read the same conventions.
