# Custom OTA Server

Use this file when the app will use a custom server implementing the Expo Updates protocol.

## Decision

- Update server mode: EAS Update / custom Expo Updates server
- Why custom server is needed:
- EAS Update fallback:
- Owner:
- Incident contact:
- Server URL:
- Manifest endpoint: `/api/manifest`
- Asset base URL:
- Publish command:
- Rollback command:
- Monitoring dashboard:

## App Targets

| Flavor | Platform | Runtime version | Channel | Branch | Updates URL |
| --- | --- | --- | --- | --- | --- |
| development | ios/android | | development | development | |
| staging | ios/android | | staging | staging | |
| production | ios/android | | production | production | |

## Protocol Contract

Manifest request headers to support:

```text
expo-protocol-version: 1
expo-platform: ios | android
expo-runtime-version: <runtime>
accept: application/expo+json, application/json, multipart/mixed
expo-expect-signature: sig, keyid="main", alg="rsa-v1_5-sha256"
```

Manifest response headers:

```text
expo-protocol-version: 1
expo-sfv-version: 0
cache-control: private, max-age=0
content-type: application/expo+json
expo-signature: sig=:...:, keyid="main", alg="rsa-v1_5-sha256"
```

Manifest fields:

```text
id
createdAt
runtimeVersion
launchAsset
assets
metadata
extra
```

## Storage Model

```text
updates
  id
  app_id
  platform
  runtime_version
  channel
  branch
  environment_flavor
  created_at
  commit_sha
  manifest_json
  asset_base_url
  is_disabled
  rollout_percent

assets
  id
  update_id
  key
  url
  content_type
  hash
  byte_size
```

## Publish Flow

1. Run `npm run verify`.
2. Confirm flavor, platform, runtimeVersion, channel, and branch.
3. Export JS bundle/assets with the current Expo CLI export command.
4. Upload immutable assets to storage/CDN.
5. Generate manifest.
6. Sign manifest when code signing is enabled.
7. Insert or promote update record.
8. Smoke-test manifest and asset URLs.
9. Test on a production-like binary.

## Code Signing

- Enabled: yes / no
- Certificate path committed in app repo:
- Private key path outside repo:
- Key ID:
- Algorithm:
- Rotation policy:

## Rollout And Rollback

- Default rollout percent:
- Production rollout approval:
- Disable bad update command:
- Roll back to previous update command:
- Roll back to embedded directive supported: yes / no
- Monitoring signals:
  - manifest request count
  - no-update count
  - asset failures
  - signature failures
  - runtime mismatch
  - crash rate

## Preflight

- `updates.url` points to the custom server.
- `runtimeVersion` policy matches `docs/versioning-policy.md`.
- Custom publish command does not call `eas update` unless intentionally publishing to EAS Update.
- Manifest endpoint handles unsupported platform/runtime/accept values.
- Assets are immutable and reachable over HTTPS.
- Production private keys are not committed.
