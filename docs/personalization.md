# Personalization Model

Expo Skills should stay open-source and generic. Team-specific defaults live beside the app or in a private local profile.

This is how a team can turn repeated pain into reusable defaults without publishing private values.

## Layers

1. Public skills: reusable workflows in `skills/*/SKILL.md`.
2. Team profile: defaults such as bundle prefix, backend, credential directory, and release policy.
3. Project files: app-specific source of truth.
4. User request: the current task wins when it explicitly overrides defaults.

## Recommended Files

```text
EXPO_SKILLS.md
.expo-skills/
  profile.example.md
  profile.local.md
```

Commit `EXPO_SKILLS.md` and `profile.example.md` when they contain placeholders or public team conventions.

Do not commit `profile.local.md` when it contains private paths, account names, local credentials, or unpublished app details.

## Example Profile

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

## Git Ignore

Apps that use private local profiles should ignore:

```gitignore
.expo-skills/profile.local.md
.expo-skills/*.secret.md
```

## Agent Prompt

```text
Use expo-team-conventions first. Read EXPO_SKILLS.md and .expo-skills/profile.md if present, then use expo-project-foundation to create the app.
```

## What Belongs In The Profile

- Naming conventions
- Preferred backend
- Bundle/package prefixes
- URL patterns
- Release version policy
- Credential directory path pattern
- Required legal/support pages
- Default EAS profile names

## What Does Not Belong

- real passwords
- Expo tokens
- Apple private keys
- Google service account JSON
- Android keystores
- Supabase service role keys
- Appwrite server API keys
- review demo passwords
