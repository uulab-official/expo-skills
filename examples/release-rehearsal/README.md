# Release Rehearsal Example

This is a tiny Expo release-policy fixture, not a full app.

Use it to verify that the version, runtime, EAS channel, and OTA safety scripts work before copying the templates into a real app.

```bash
cd examples/release-rehearsal
npm run release:check
npm run ota:check
npm run release:auth
```

Expected result:

- `release:check` passes because `app.json`, `eas.json`, and `release-state.json` agree.
- `ota:check` passes when there are no native-risk changes in the git diff.
- `release:auth` may warn about missing local Expo/EAS auth, but should not print secrets.

For final release environments, use strict auth checks:

```bash
npm run release:auth:strict
```

Strict mode is expected to fail until the app has real private credential paths or CI secrets.
