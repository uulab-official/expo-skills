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

## Push Rules

- Request notification permission at a meaningful moment.
- Register, upload, refresh, and delete push tokens in sync with auth state.
- Store platform, device ID when available, app version, and user ID with the token server-side.
- Handle notification responses through the same route parser used for deep links.
- Avoid sending users to protected screens before auth state is ready.

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

## Verification

Test:

- permission denied and granted
- token registration after login
- logout token cleanup
- cold-start notification response
- foreground notification handling
- scheduled local notification cancellation
- background task behavior on the target platform when possible
