---
name: expo-notifications-background
description: Configure or review Expo notifications and background behavior. Use for push tokens, local notifications, badges, notification response routing, permission prompts, background fetch, background tasks, task manager, scheduling, and platform limits.
---

# Expo Notifications Background

Use this skill when notifications, badges, scheduled work, or background tasks are part of the request.

## First Pass

1. Inspect Expo config plugins and platform notification settings.
2. Read existing notification registration, token upload, listeners, and cleanup code.
3. Check auth/session flow because push tokens usually belong to a user.
4. Identify whether work must run in foreground, background, terminated state, or server-side instead.
5. Verify current Expo Notifications, BackgroundTask, and TaskManager docs before adding or changing native behavior.

## Package Setup

Use the current Expo packages for the target SDK:

```bash
npx expo install expo-notifications expo-device expo-constants
npx expo install expo-background-task expo-task-manager
```

Use `expo-background-task` for new deferrable background work. Treat `expo-background-fetch` as legacy unless the project already depends on it and migration is out of scope.

Recommended files:

```text
src/lib/notifications/
  registerPushToken.ts
  notificationRouter.ts
  notificationListeners.ts
src/lib/background/
  tasks.ts
  registerBackgroundTasks.ts
src/features/settings/notificationPreferences.ts
```

## Push Rules

- Request notification permission at a meaningful moment.
- Register, upload, refresh, and delete push tokens in sync with auth state.
- Store platform, device ID when available, app version, and user ID with the token server-side.
- Handle notification responses through the same route parser used for deep links.
- Avoid sending users to protected screens before auth state is ready.
- Choose the server path deliberately:
  - Expo Push Service for the default cross-platform flow using `ExpoPushToken`.
  - Direct FCM/APNs only when product requirements need native provider features or custom delivery infrastructure.
- Do not send production push notifications directly from the app. Send from a trusted server, function, or admin tool.
- Keep push token registration idempotent. Token upload should tolerate repeated app starts and user switches.
- Delete or deactivate tokens on logout and when the backend rejects a token.
- Store notification preference state separately from OS permission state.

## Local Notification Rules

- Use local notifications for reminders and device-local events.
- Cancel obsolete scheduled notifications when user settings change.
- Keep badge count source of truth clear.
- Respect quiet hours and notification preferences when the product has them.

## Background Task Rules

- Confirm Expo and platform support before promising background execution.
- Use background fetch/tasks for opportunistic work, not guaranteed real-time jobs.
- Keep tasks small, idempotent, and resilient to app termination.
- Move guaranteed or time-sensitive work to the server.
- Document which behavior differs between iOS, Android, and Expo Go/dev builds.
- Define TaskManager tasks in module top-level scope, not inside React components.
- Import the task definition module once during app startup before registering tasks.
- Use stable task names such as `sync-outbox` or `prefetch-updates`; changing task names can orphan old registrations.
- Gate background work by auth/session state stored in durable local storage, not React state.
- Do not assume exact execution timing. Platforms schedule background work based on battery, usage, and system policy.
- Treat native background mode/config changes as binary-release changes, not OTA-only changes.

## Notification Routing

- Normalize push payloads into the same internal route shape used by deep links.
- Validate payload type, entity IDs, and authorization before navigating.
- Queue notification responses until auth bootstrap and navigation are ready.
- Handle cold start, background tap, foreground receipt, and already-open app states.
- Keep analytics and badge clearing separate from navigation so failures do not block the route.

## Backend Checklist

- Token table includes user ID, token, platform, app version, environment, locale/time zone when useful, and updated timestamp.
- Server send path handles Expo ticket/receipt errors or native provider errors.
- Backend can deactivate invalid tokens.
- Notification payloads avoid private data in title/body when the device may be locked.
- Push, local notification, email, and in-app notification preferences are consistent when the product supports multiple channels.

## Verification

Test:

- permission denied and granted
- token registration after login
- logout token cleanup
- cold-start notification response
- foreground notification handling
- scheduled local notification cancellation
- background task behavior on the target platform when possible
- token invalidation or backend rejection path
- foreground/background/terminated behavior on a production-like build, not only Expo Go
