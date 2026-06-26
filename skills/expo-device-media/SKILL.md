---
name: expo-device-media
description: Implement or review Expo device media flows. Use for camera, image picker, media library, file system, document picker, image manipulation, upload flows, permission prompts, compression, previews, retries, and platform-specific media behavior.
---

# Expo Device Media

Use this skill when camera, gallery, files, uploads, or media permissions are part of the task.

## First Pass

1. Inspect Expo config for camera, photo library, microphone, and file-related permission strings.
2. Identify whether the task needs capture, picking, editing, upload, download, or local cache.
3. Check existing upload API, storage provider, image compression, and retry behavior.
4. Confirm whether web support is required.

## Permission Rules

- Request permission at the moment of intent, not on first app launch.
- Provide clear Korean copy for why camera, photo library, microphone, or location is needed.
- Handle denied, limited, and unavailable permission states.
- Add platform permission strings only for features actually used.
- Remember that permission config changes require a new binary.

## Media Flow

- Normalize assets into a small internal shape: uri, mime type, file name, size, width, height, duration when available.
- Compress large images before upload when quality allows.
- Preserve originals only when the product needs them.
- Show upload progress and allow retry.
- Clean up temporary files after successful upload when safe.
- Validate server limits before uploading large videos.

## UX Checklist

- User can cancel capture/picker without errors.
- Preview appears before destructive upload or submit actions.
- Failed uploads keep the selected media and show retry.
- Permission denial leads to settings guidance when recovery is possible.
- Loading states do not block navigation indefinitely.

## Verification

Test on at least one simulator and, for camera-only work, a real device if available. Simulators do not fully represent camera hardware, media metadata, or permission behavior.
