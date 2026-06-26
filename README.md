# Expo Skills

Open, practical `SKILL.md` playbooks for building Expo apps from project setup to store review.

Use them with Codex, Claude, or any agent that understands the Agent Skills pattern: a folder with a `SKILL.md` file, YAML frontmatter, and concise operating instructions.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Skills](https://img.shields.io/badge/skills-19-2ea44f)
![Expo](https://img.shields.io/badge/Expo-ready-000020)
![Codex](https://img.shields.io/badge/Codex-compatible-111827)
![Claude](https://img.shields.io/badge/Claude-compatible-6b46c1)

## Why This Exists

Expo is beginner-friendly, but real apps need more than snippets. You eventually need auth, storage, deep links, OTA updates, push notifications, signing keys, store metadata, screenshots, review notes, and release discipline.

This repository turns those workflows into reusable agent skills so anyone can ask an AI coding agent to do production-shaped Expo work with better defaults.

## What You Get

- Step-by-step Expo app creation and migration guidance.
- Reusable skills for navigation, UI, auth, media, offline sync, notifications, performance, and release.
- Backend playbooks for Supabase, Appwrite, and Firebase.
- Store launch workflows for Apple, Google, JKS signing, EAS, and fastlane.
- Store review information templates for Apple App Review and Google Play.
- Public-safe conventions for credentials without publishing private values.
- A personalization layer for team defaults without hardcoding private values.
- Agent boilerplates so LLMs can route tasks, ask useful questions, and proceed end to end.
- A format that works for both Codex and Claude-style skills.

## Installation

Clone the repository:

```bash
git clone https://github.com/your-org/expo-skills.git
cd expo-skills
```

### Codex

Codex discovers personal skills from your Codex skills directory. If `CODEX_HOME` is set, use that. Otherwise, use `~/.codex`.

Install all skills:

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
cp -R skills/* "${CODEX_HOME:-$HOME/.codex}/skills/"
```

Install one skill:

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
cp -R skills/expo-project-foundation "${CODEX_HOME:-$HOME/.codex}/skills/"
```

Check that a skill is installed:

```bash
ls "${CODEX_HOME:-$HOME/.codex}/skills/expo-project-foundation/SKILL.md"
```

Update installed skills after pulling the latest repository changes:

```bash
git pull
rsync -a --delete skills/ "${CODEX_HOME:-$HOME/.codex}/skills/"
```

### Claude Code

Claude Code discovers user skills from `~/.claude/skills`. Each skill should be a folder containing `SKILL.md`.

Install all skills:

```bash
mkdir -p "$HOME/.claude/skills"
cp -R skills/* "$HOME/.claude/skills/"
```

Install one skill:

```bash
mkdir -p "$HOME/.claude/skills"
cp -R skills/expo-project-foundation "$HOME/.claude/skills/"
```

Check that a skill is installed:

```bash
ls "$HOME/.claude/skills/expo-project-foundation/SKILL.md"
```

Update installed skills after pulling the latest repository changes:

```bash
git pull
rsync -a --delete skills/ "$HOME/.claude/skills/"
```

### Install For Both

If you use both Codex and Claude Code on the same machine:

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills" "$HOME/.claude/skills"
rsync -a --delete skills/ "${CODEX_HOME:-$HOME/.codex}/skills/"
rsync -a --delete skills/ "$HOME/.claude/skills/"
```

### Project-Local Usage

You can also keep this repository checked out next to your Expo app and point your agent at a specific skill folder in the prompt:

```text
Use the skill at /path/to/expo-skills/skills/expo-release-review to prepare this Expo app for store review.
```

## Skill Catalog

| Level | Skill | Use for |
| --- | --- | --- |
| Beginner | `expo-skill-orchestrator` | Pick the right skills and drive broad tasks |
| Beginner | `expo-project-foundation` | Create or migrate an Expo project foundation |
| Beginner | `expo-team-conventions` | Apply team/user defaults without hardcoding them |
| Beginner | `expo-router-navigation` | Expo Router, tabs, stacks, modals, deep links |
| Beginner | `expo-ui-system` | Theme, fonts, icons, app bars, reusable UI |
| Intermediate | `expo-startup-ota` | Splash, startup boot, EAS Update, OTA progress |
| Intermediate | `expo-auth-secure-storage` | Auth, sessions, SecureStore, biometrics |
| Intermediate | `expo-device-media` | Camera, gallery, files, uploads, permissions |
| Intermediate | `expo-supabase-backend` | Supabase Auth, Postgres, RLS, Storage, Realtime |
| Intermediate | `expo-appwrite-backend` | Appwrite Auth, Databases, Storage, Functions |
| Intermediate | `expo-firebase-backend` | Firebase JS SDK or React Native Firebase |
| Advanced | `expo-data-offline-sync` | API clients, SQLite, cache, offline queue, sync |
| Advanced | `expo-notifications-background` | Push, local notifications, badges, background tasks |
| Production | `expo-quality-performance` | QA, accessibility, crash checks, performance |
| Production | `expo-store-console-setup` | Apple/Google console setup and API keys |
| Production | `expo-store-review-info` | Review contact, demo account, privacy, data safety |
| Production | `expo-android-jks-signing` | JKS upload keys, SHA fingerprints, EAS credentials |
| Production | `expo-fastlane-automation` | fastlane match, deliver, supply, TestFlight |
| Production | `expo-release-review` | EAS build/submit, metadata, screenshots, review |

## Recommended Path

1. Start with `expo-skill-orchestrator` for broad tasks.
2. Use `expo-team-conventions` if your team has defaults.
3. Use `expo-project-foundation`.
4. Add `expo-router-navigation` and `expo-ui-system`.
5. Add startup and auth with `expo-startup-ota` and `expo-auth-secure-storage`.
6. Pick a backend: `expo-supabase-backend`, `expo-appwrite-backend`, or `expo-firebase-backend`.
7. Add app-specific capabilities such as media, offline sync, notifications, and background tasks.
8. Run `expo-quality-performance`.
9. Prepare store launch with console setup, review info, Android signing, fastlane, and release review skills.

## Repository Layout

```text
expo-skills/
  skills/
    expo-project-foundation/
      SKILL.md
      agents/openai.yaml
    expo-skill-orchestrator/
    expo-team-conventions/
    expo-supabase-backend/
    expo-appwrite-backend/
    expo-firebase-backend/
    ...
  docs/
    taxonomy.md
    agent-workflow.md
    personalization.md
    publishing-guide.md
    team-credential-convention.md
  templates/
    EXPO_SKILLS.md
    agent-start-prompt.md
    app-intake.md
    profile.example.md
    store-review-info.md
    privacy-data-inventory.md
    permissions-inventory.md
    store.config.example.json
```

## Agent Boilerplate

For a new Expo app repo, copy the boilerplate files you need:

```bash
cp templates/EXPO_SKILLS.md /path/to/app/EXPO_SKILLS.md
mkdir -p /path/to/app/.expo-skills
cp templates/profile.example.md /path/to/app/.expo-skills/profile.example.md
cp templates/app-intake.md /path/to/app/docs/app-intake.md
```

Then start your agent with [templates/agent-start-prompt.md](templates/agent-start-prompt.md). The recommended entry skill is [expo-skill-orchestrator](skills/expo-skill-orchestrator/SKILL.md), which will choose the smaller specialized skills as needed.

For store review preparation, also copy:

```bash
cp templates/store-review-info.md /path/to/app/docs/store-review-info.md
cp templates/privacy-data-inventory.md /path/to/app/docs/privacy-data-inventory.md
cp templates/permissions-inventory.md /path/to/app/docs/permissions-inventory.md
cp templates/store.config.example.json /path/to/app/store.config.example.json
```

## Personalization

The public skills intentionally avoid UULab-style hardcoded defaults. Instead, teams can create a local profile with their own Expo owner, bundle/package prefix, credential directory, backend choice, release policy, and URL patterns.

Use [expo-team-conventions](skills/expo-team-conventions/SKILL.md) before other skills when you want those defaults applied. See [docs/personalization.md](docs/personalization.md) and [templates/profile.example.md](templates/profile.example.md).

## Compatibility

The core format is intentionally simple:

```text
skill-name/
  SKILL.md
```

Each `SKILL.md` uses only required frontmatter:

```yaml
---
name: skill-name
description: What this skill does and when to use it.
---
```

Codex can also use the optional `agents/openai.yaml` metadata. Claude ignores that file and reads the `SKILL.md` instructions.

## Public Safety

Do not publish real values for:

- Expo access tokens
- Apple Developer or App Store Connect credentials
- Google Play service account JSON
- Android `.jks` or `.keystore` files
- keystore passwords, provisioning profiles, certificates, API keys
- Firebase service account files
- Supabase service role keys
- Appwrite API keys with server privileges
- private review demo accounts

Use `.env.example`, placeholders, and a private team credential directory instead. See [docs/team-credential-convention.md](docs/team-credential-convention.md).

## Validate

If you have Codex's skill validator available:

```bash
for d in skills/*; do
  python3 /path/to/quick_validate.py "$d"
done
```

At minimum, check that every skill has:

- `SKILL.md`
- frontmatter with `name` and `description`
- no real credentials
- concise instructions that work without private context

## Official References

- [Claude Code Skills](https://code.claude.com/docs/en/skills)
- [Anthropic Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Expo Firebase guide](https://docs.expo.dev/guides/using-firebase/)
- [Expo Supabase guide](https://docs.expo.dev/guides/using-supabase/)
- [Supabase Expo React Native quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/expo-react-native)
- [Appwrite React Native quickstart](https://appwrite.io/docs/quick-starts/react-native)
- [Expo app credentials](https://docs.expo.dev/app-signing/app-credentials/)
- [Expo local credentials](https://docs.expo.dev/app-signing/local-credentials/)
- [fastlane docs](https://docs.fastlane.tools/)

## Contributing

Contributions are welcome. Good skills are small, focused, public-safe, and useful without knowing the original author's projects.

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

MIT. See [LICENSE](LICENSE).
