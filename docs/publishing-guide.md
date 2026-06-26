# Publishing Guide

공개 레포로 유지하기 위한 운영 가이드입니다.

## Before Publishing

1. Run `npm run validate`.
2. Search for private values before commit when release or credential docs changed.
3. Keep each skill focused on agent instructions, not long tutorials.
4. Put human-facing explanation in the root README or docs.
5. Keep `agents/openai.yaml` aligned with each `SKILL.md`.
6. Confirm release-related workflows against current official docs before changing store automation.

## Private Value Scan

Run:

```bash
npm run validate
rg -n "SERVICE_ROLE=.+\\S|EXPO_TOKEN=.+\\S|MATCH_PASSWORD=.+\\S|ANDROID_(KEYSTORE|KEY)_PASSWORD=.+\\S|APP_REVIEW_DEMO_PASSWORD=.+\\S|AuthKey_[A-Z0-9]{10}\\.p8|-----BEGIN .*PRIVATE KEY-----" README.md docs skills templates examples .github
```

Review every hit manually. Some words may appear in safety checklists; real values must not.

## Skill Quality Checklist

- Frontmatter has only `name` and `description`.
- Description includes when to use the skill.
- Body is concise and imperative.
- Skill can be used without private context.
- No root-level app-specific assumptions are required.
- Validation passes with `quick_validate.py`.
- README catalog and taxonomy are updated when skills are added.
- Claude compatibility is preserved by keeping `SKILL.md` self-contained.
- Broad task routing is updated in `expo-skill-orchestrator` when a new workflow skill is added.

## Compatibility Notes

- `SKILL.md` is the portable source of truth.
- `agents/openai.yaml` is optional Codex UI metadata.
- Do not put critical instructions only in `agents/openai.yaml`.
- Keep scripts and references one level below the skill folder when added.

## Versioning

Use small, additive updates. When a skill changes a release-critical workflow, mention it clearly in the commit message.
