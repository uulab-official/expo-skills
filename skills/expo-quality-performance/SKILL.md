---
name: expo-quality-performance
description: Audit or improve Expo app quality and performance. Use for tests, typecheck/lint gates, accessibility, crash smoke checks, startup performance, FlatList tuning, image optimization, render performance, memory issues, bundle size, and release readiness.
---

# Expo Quality Performance

Use this skill before release, after major feature work, or when the app feels slow or fragile.

## First Pass

1. Read package scripts and identify existing quality gates.
2. Inspect recent changes before broad refactors.
3. Reproduce the issue or collect evidence before optimizing.
4. Prefer focused fixes over rewriting the app architecture.

## Quality Gates

- TypeScript check passes.
- Lint passes or known exceptions are documented.
- Unit/integration tests pass when present.
- Critical flows have manual smoke coverage: launch, login, primary action, settings/logout, offline/error states.
- Permission prompts and privacy-sensitive flows have clear copy.
- Accessibility labels exist for icon-only controls.
- Error boundaries or recoverable states exist around network-heavy surfaces.

## Performance Checklist

- Avoid expensive work in render paths.
- Memoize only where profiling or obvious repetition justifies it.
- Use `FlatList`/`FlashList` settings deliberately: keyExtractor, getItemLayout when stable, windowing, empty/loading states.
- Optimize images: correct dimensions, caching, compression, and placeholders.
- Avoid blocking startup on noncritical network calls.
- Keep animation on native/Reanimated paths when smoothness matters.
- Watch for logs, dev-only code, and debug overlays before release.

## Investigation Pattern

1. State the symptom.
2. Measure or reproduce it.
3. Identify the likely layer: startup, navigation, rendering, network, storage, native module, or assets.
4. Make the smallest credible fix.
5. Re-run the same measurement or smoke flow.

## Verification

Run the strongest available gate:

```bash
npm run verify
```

If no gate exists, run:

```bash
npm run typecheck
npm run lint
npm test
```

Report missing scripts as a project gap instead of pretending verification passed.
