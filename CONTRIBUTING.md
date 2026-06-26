# Contributing

Thanks for helping make Expo Skills better.

## What Makes A Good Skill

- It solves one clear workflow.
- It is useful to someone who has never seen your app.
- It avoids private accounts, tokens, internal paths, and real credentials.
- It keeps team-specific defaults in profiles, not public skill instructions.
- It tells the agent what to inspect before editing.
- It includes concrete verification steps.
- It is concise enough to load into context without drowning the task.

## Add A Skill

1. Choose a lowercase hyphenated name, for example `expo-payments-stripe`.
2. Create `skills/<skill-name>/SKILL.md`.
3. Use only required frontmatter:

```yaml
---
name: expo-payments-stripe
description: What this skill does and when to use it.
---
```

4. Add optional `agents/openai.yaml` if you want richer Codex UI metadata.
5. Update `README.md` and `docs/taxonomy.md`.
6. Run validation if available.
7. Search for private values before committing.

## Private Value Check

```bash
rg -n "EXPO_TOKEN|SERVICE_ROLE|MATCH_PASSWORD|FASTLANE|APPLE|GOOGLE|password|secret|keystore|\\.jks|\\.p8|\\.mobileprovision|@gmail\\.com|010-" .
```

Review each match manually. Safety checklists can mention these words; real values must not be present.

## Style

- Use imperative language.
- Prefer checklists and short workflow sections.
- Link to official docs when behavior changes frequently.
- Do not add long tutorials inside `SKILL.md`; put human-facing docs under `docs/`.
- Do not include generated native `ios/` or `android/` folders as examples.

## Pull Request Checklist

- Skill name is lowercase hyphen-case.
- Skill has `name` and `description`.
- Description says when the skill should trigger.
- No secrets or private account values are present.
- README catalog is updated.
- Validation has passed or the reason it could not run is stated.
