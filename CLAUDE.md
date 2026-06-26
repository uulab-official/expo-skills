# Claude Instructions

This repository is an open-source Expo skills pack. Keep it usable by Claude Code, Codex, and other agents that read `SKILL.md`.

## How To Work In This Repo

- Read `README.md`, `docs/taxonomy.md`, and the relevant `skills/*/SKILL.md` before editing.
- Keep each skill focused on one workflow.
- Keep `SKILL.md` self-contained because Claude reads it directly.
- Do not rely on `agents/openai.yaml` for essential behavior; that file is optional Codex UI metadata.
- Add or update templates when a workflow needs repeatable input from users.
- Preserve the public/private split: public skills describe workflows, local profiles hold team-specific defaults.

## Public Safety

Never commit:

- Expo tokens
- Apple private keys or app-specific passwords
- Google Play service account JSON
- Android `.jks` or `.keystore` files
- keystore passwords
- Firebase Admin service account JSON
- Supabase service role keys
- Appwrite server API keys
- real review demo credentials
- private `.expo-skills/profile.local.md` files

## Required Updates

When adding a skill:

1. Add `skills/<skill-name>/SKILL.md`.
2. Add `agents/openai.yaml` when possible for Codex UI metadata.
3. Update `README.md`.
4. Update `docs/taxonomy.md`.
5. Update `skills/expo-skill-orchestrator/SKILL.md` if routing should include it.
6. Update templates when users need boilerplate to use the skill well.

## Verification

Validate all skills when the validator is available:

```bash
for d in skills/*; do
  python3 /path/to/quick_validate.py "$d"
done
```

Then scan for placeholders and accidental secrets before committing.
