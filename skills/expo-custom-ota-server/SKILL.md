---
name: expo-custom-ota-server
description: Use when designing, implementing, auditing, or operating a custom Expo OTA update server that implements the Expo Updates protocol, including manifest endpoints, asset hosting, publish pipelines, runtimeVersion/platform filtering, code signing, rollback, monitoring, and migration from or coexistence with EAS Update.
---

# Expo Custom OTA Server

Use this skill when an Expo app needs a self-hosted update service instead of, or alongside, EAS Update.

## First Pass

1. Read `docs/custom-ota-server.md`, `docs/update-server-policy.md`, `docs/environment-flavors.md`, `docs/versioning-policy.md`, `release-state.json`, and `app.config.*` when present.
2. Confirm why EAS Update is not enough: private infrastructure, compliance, custom rollout, non-Expo publishing pipeline, special routing, cost governance, or offline/internal network.
3. Verify current Expo Updates protocol and `expo-updates` docs before writing server code or changing `updates.url`.
4. Separate client binary changes from server/publish changes. Changing `updates.url`, code signing certificate, runtime policy, native config, or bundle identity requires a new binary.
5. Keep signing private keys, storage credentials, CDN credentials, and admin tokens outside the repo.

## Decision Rules

- Prefer EAS Update unless the team can own manifest generation, asset hosting, rollout, rollback, monitoring, and incident response.
- Do not assume `eas update` publishes to a custom server. Custom servers need their own publish/upload command.
- Use the official custom server example as a learning reference, not as production-ready infrastructure.
- Keep EAS Build usable even when OTA is self-hosted.
- Document the custom update server URL and publish command in `docs/custom-ota-server.md` and `docs/update-server-policy.md`.

## Protocol Responsibilities

Implement the Expo Updates v1 protocol, at minimum:

- Manifest endpoint, usually `GET /api/manifest`.
- Asset endpoint or CDN URLs for every manifest asset.
- Request validation for `expo-protocol-version`, `expo-platform`, `expo-runtime-version`, and `accept`.
- Runtime/platform/flavor/channel/branch filtering before selecting an update.
- Response headers: `expo-protocol-version: 1`, `expo-sfv-version: 0`, `cache-control`, and correct `content-type`.
- Manifest body with `id`, `createdAt`, `runtimeVersion`, `launchAsset`, `assets`, `metadata`, and `extra`.
- Asset integrity with SHA-256 hashes when available.
- 204 no-content or compatible no-op response when no update applies.
- 406 for unsupported response formats or incompatible protocol requests.

Add multipart/directive support only when needed. If implementing rollback directives, test `rollBackToEmbedded` with a production-like binary.

## Storage Model

Use a database table or manifest index with these fields:

```text
id
appId
platform
runtimeVersion
channel
branch
environmentFlavor
createdAt
commitSha
manifestJson
launchAssetKey
assetBaseUrl
isDisabled
rolloutPercent
metadata
```

Assets should live in object storage or a CDN-backed static host. Store immutable assets by content hash or update ID.

## Publish Pipeline

Recommended custom publish flow:

1. Run project checks.
2. Verify the target flavor, platform, branch, channel, and runtimeVersion.
3. Export the JS bundle/assets with the current Expo CLI export command.
4. Upload assets to object storage/CDN.
5. Generate or transform the Expo Updates manifest.
6. Sign the manifest when code signing is enabled.
7. Insert a release row in the update server database.
8. Smoke-test the manifest endpoint with representative request headers.
9. Test on a development/preview/production-like binary.

Package scripts in app repos can look like:

```json
{
  "ota:publish:staging": "node scripts/publish-custom-ota.js --flavor staging",
  "ota:publish:production": "node scripts/publish-custom-ota.js --flavor production",
  "ota:check:server": "node scripts/check-custom-ota-server.js"
}
```

If these scripts do not exist, create a documented plan before implementing automation.

This repository provides starter app scripts:

```text
templates/scripts/check-custom-ota-server.js
templates/scripts/publish-custom-ota.js
```

Copy them into an app only after documenting the target server in `docs/custom-ota-server.md`. The publish script is intentionally a scaffold because storage, CDN, database, and signing implementations are project-specific.

## Code Signing

- Strongly consider code signing for production custom OTA.
- Keep private signing keys outside source control.
- Commit only the public certificate when the app config needs it.
- Rotate keys with a binary release plan; old binaries cannot verify updates signed only by unknown new keys.
- If `expo-expect-signature` is present, return a valid `expo-signature` header or do not serve the update.

## Rollout And Rollback

- Start production rollouts with internal or percentage-based targeting when possible.
- Store enough metadata to answer: which binary, runtimeVersion, platform, channel, branch, and commit received an update?
- Disable a bad update without deleting artifacts.
- Keep a rollback path: serve an older compatible update, stop serving the bad update, or send a tested rollback directive.
- Monitor manifest requests, asset download failures, update apply failures, app crash rate, and runtime mismatch rate.

## Security And Operations

- Require admin authentication for publish/disable/promote APIs.
- Keep asset URLs immutable and cacheable; keep manifest responses short-cache or no-cache.
- Validate platform/runtimeVersion/channel server-side. Never trust a publish script alone.
- Protect object storage from public writes.
- Add audit logs for publish, disable, promote, rollback, and signing key operations.
- Avoid leaking internal branch names, credentials, or service URLs in public manifests unless intentional.

## App Config Checklist

```text
updates.url = https://updates.example.com/api/manifest
runtimeVersion = app version or native runtime policy
updates.codeSigningCertificate = ./certs/certificate.pem when enabled
updates.codeSigningMetadata.keyid = main when enabled
updates.codeSigningMetadata.alg = rsa-v1_5-sha256 when enabled
```

Changing these values requires a new binary.

## Verification

Run:

```bash
npm run verify
npm run ota:check
npx expo config --type public
```

Then test custom server behavior:

```bash
curl -i \
  -H "expo-protocol-version: 1" \
  -H "expo-platform: ios" \
  -H "expo-runtime-version: 1.0.0" \
  -H "accept: application/expo+json, application/json, multipart/mixed" \
  https://updates.example.com/api/manifest
```

Verify manifest shape, headers, asset URLs, signature behavior, no-update behavior, and runtime mismatch behavior before releasing.
