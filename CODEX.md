# Codex Instructions

This repository is an open-source Expo skills pack. Keep it portable for Codex, Claude, and other agents.

## Working Rules

- Treat `skills/*/SKILL.md` as the source of truth for each skill.
- Keep every skill public-safe: no real credentials, private accounts, internal domains, personal contacts, or local machine paths.
- Put team-specific defaults in profiles such as `EXPO_SKILLS.md` or `.expo-skills/profile.md`, not in public skills.
- Keep `agents/openai.yaml` aligned with the matching `SKILL.md`, but do not put critical instructions only there.
- Update `README.md`, `docs/taxonomy.md`, and `skills/expo-skill-orchestrator/SKILL.md` when adding or renaming a skill.
- Prefer official Expo, Apple, Google, Supabase, Appwrite, Firebase, and fastlane docs for workflows that change over time.

## Validation

Run the skill validator when available:

```bash
for d in skills/*; do
  python3 /path/to/quick_validate.py "$d"
done
```

Also check:

```bash
find skills -mindepth 1 -maxdepth 1 -type d | wc -l
```

Run the private value check from `CONTRIBUTING.md`. It should return no real secrets. Safety checklists may mention secret names without values.

## Release Notes

- Keep changes small and additive.
- Do not commit generated app projects, native build folders, `.env` files, keystores, certificates, service account JSON, or private profiles.
- If a public template needs an example value, use obvious placeholders.
