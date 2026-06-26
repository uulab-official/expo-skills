# Agent Start Prompt

Copy this into Codex or Claude when starting work on an Expo app.

```text
Use the Expo Skills pack.

Start with expo-skill-orchestrator. Read EXPO_SKILLS.md and .expo-skills/profile.md if they exist. If the app idea, MVP scope, screen map, backend, or release path is unclear, use expo-idea-composer before implementation. If the task is broad, infer safe defaults, ask only for risky missing decisions, choose the right specialized skills, implement the work, and run verification.

If the task reaches store release, local credentials, OTP/2FA, EAS Build/Submit, fastlane match, backend CLI/API login, or provider console setup, use expo-release-operator. Prefer CLI/API automation first, use browser console automation when needed, prompt for only the next required user action, and avoid exposing secrets.

For this app:
- Goal:
- App name:
- Backend preference:
- Release target:
- Important constraints:
```
