---
name: expo-router-navigation
description: Build, refactor, or review Expo Router navigation. Use for tabs, stacks, modals, auth gates, route groups, deep links, dynamic routes, not-found screens, notification routing, push/present behavior, back behavior, and navigation state issues in Expo apps.
---

# Expo Router Navigation

Use this skill when navigation structure or route behavior is part of the task.

## First Pass

1. Read the current route tree under `app/` or `src/app/`.
2. Inspect `_layout.tsx` files from root to leaf before changing screens.
3. Check `app.config.*` for `scheme`, linking-related plugins, and platform intent filters.
4. Identify whether auth is route-group based, layout-gated, or screen-gated. Keep the existing model unless it is broken.
5. Search for navigation helpers, route constants, notification handlers, and deep link handlers before creating new ones.

## Routing Rules

- Use route groups for organization, not URL semantics.
- Put tab navigation inside a tab group and keep modal/presented flows outside the tab group when they should cover the whole app.
- Keep auth redirects in a high-level layout so protected screens do not briefly render for signed-out users.
- Prefer `router.push` for drill-in navigation, `router.replace` for auth transitions, and `router.back` only when a back stack is guaranteed.
- Validate dynamic route params at the screen boundary and handle missing/invalid params with a visible error or redirect.
- Add `+not-found.tsx` when users can enter unknown links.
- Keep route names stable once deep links, notifications, or external links rely on them.

## Deep Links

- Confirm `scheme` exists in Expo config.
- Map external URLs to real route paths and test with representative examples.
- Handle cold-start links and in-app links.
- If notifications open screens, route through one shared parser instead of duplicating URL parsing in notification code.

## UX Checklist

- Back behavior is predictable on Android and iOS.
- Modals can be dismissed.
- Protected routes do not flicker private content.
- Empty/loading/error states do not trap navigation.
- Tab labels and icons match the product IA.
- Header titles come from screen context, not stale route names.

## Verification

Run local checks and manually test the route paths touched:

```bash
npm run typecheck
npx expo start
```

For deep links, test at least one cold-start URL and one in-app navigation path.
