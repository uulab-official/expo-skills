# Expo Versioning Policy

This policy keeps App Store, Google Play, EAS Build, and EAS Update version decisions predictable.

## Version Types

| Field | Example | Visible to users? | Must increase? | Used for OTA compatibility? |
| --- | --- | --- | --- | --- |
| Public version | `1.0.0` | Yes | When shipping a new public release | Often, when runtime policy follows app version |
| iOS build number | `26010101` | No | Every iOS binary upload | No |
| Android version code | `26010101` | No | Every Android binary upload | No |
| runtimeVersion | `1.0.0` | No | When native runtime compatibility changes | Yes |

## Recommended Default

For small teams and public templates, use local version governance:

```json
{
  "versionSource": "local",
  "version": "1.0.0",
  "iosBuildNumber": "26010101",
  "androidVersionCode": 26010101,
  "runtimeVersion": "1.0.0"
}
```

Recommended build number format:

```text
YYMMDDNN
```

Example:

```text
26010101
```

Meaning:

- `26`: year
- `0101`: month and day
- `01`: build sequence for that day

This stays below Android's maximum `versionCode` and sorts naturally by date.

## When To Change What

| Scenario | Public version | Build number/versionCode | runtimeVersion | Notes |
| --- | --- | --- | --- | --- |
| New TestFlight/Play internal binary for same release | unchanged | increase | unchanged unless native compatibility changed | Common review iteration |
| Public store release with user-facing changes | increase intentionally | increase | usually match new public version | Example `1.0.0` -> `1.0.1` |
| JS/assets-only OTA bug fix | unchanged | unchanged | unchanged | Must target exact runtime |
| Native module/config/permission/icon/splash change | maybe | increase | change if runtime compatibility changes | Requires new binary |
| Backend-only change | unchanged | unchanged | unchanged | No app release unless client behavior changes |

## Runtime Version Policy

Use one policy and document it.

### App Version Policy

Set `runtimeVersion` equal to public app version.

Good for:

- straightforward release trains
- simple OTA targeting
- teams that bump public version when native compatibility changes

Tradeoff:

- Test builds of the same public version share OTA compatibility.

### Native Runtime Policy

Use a separate runtime string such as `native-26010101` or `1.0.0-native.1`.

Good for:

- apps with many TestFlight iterations under one public version
- teams that need tighter OTA grouping

Tradeoff:

- requires more discipline and documentation.

## Local vs Remote Version Source

### Local

Use `release-state.json`, app config, and scripts as the source of truth.

Good for:

- reproducible public repos
- teams that want version changes visible in git
- local EAS builds

### Remote/EAS Managed

Let EAS manage developer-facing build numbers.

Good for:

- teams that rely on EAS Cloud Build automation
- projects that do not want build numbers edited in git

If using remote/EAS-managed versions, keep `release-state.json` focused on public version, runtimeVersion, channel, and branch, and document how to inspect latest build numbers before submission.

## Update Server Policy

Choose one update server mode.

### EAS Update Free-Tier Planning

Expo pricing and included usage can change, so do not hardcode quota decisions without a check date.

As of 2026-06-26, the official Expo pricing page lists the Free plan EAS Update allowance as:

- 1,000 monthly active users for updates
- 100 GiB global edge bandwidth
- 20 GiB storage

Record these fields in the app's release docs:

```json
{
  "easUpdatePlan": "free",
  "easUpdateLimitCheckedAt": "2026-06-26",
  "easUpdateMonthlyActiveUsersLimit": 1000,
  "easUpdateBandwidthLimit": "100 GiB",
  "easUpdateStorageLimit": "20 GiB",
  "otaEstimatedMonthlyActiveUsers": 0,
  "otaUpgradeThreshold": "800 MAUs or 80 GiB bandwidth"
}
```

Use EAS Update by default when the app is early-stage, the expected updated-user count is below the current plan limit, and the team wants Expo-hosted CDN, dashboard, branches, channels, and `eas update`.

Re-check pricing before launch, before large campaigns, and before promising update cost assumptions to a client.

### EAS Update

Default for most Expo apps:

```json
{
  "updateServerMode": "eas",
  "updatesUrl": "https://u.expo.dev/PROJECT_ID"
}
```

Use `eas update` to publish updates. Channel/branch mapping controls which builds receive which updates.

### Custom Updates Server

Use only when the team wants to own update infrastructure:

```json
{
  "updateServerMode": "custom",
  "updatesUrl": "https://updates.example.com/api/manifest",
  "customUpdatePublishCommand": "npm run updates:publish"
}
```

Requirements:

- server implements the Expo Updates protocol
- assets are hosted reliably
- runtimeVersion and platform filtering are correct
- rollback process exists
- monitoring exists
- publish command is documented

Do not assume `eas update` publishes to a custom server.

### EAS Update vs Custom Server

| Situation | Prefer |
| --- | --- |
| Free-tier or paid-plan usage is enough | EAS Update |
| Team wants Expo dashboard, CDN, channel mapping, and standard CLI publishing | EAS Update |
| Team needs private infrastructure, custom routing, special compliance, or a non-Expo publish pipeline | Custom server |
| Team cannot operate monitoring, rollback, and asset hosting yet | EAS Update |

## Local EAS Build Policy

Local EAS builds are useful for cost control, signing visibility, and reproducing cloud build failures:

```bash
eas build --profile production --platform ios --local
eas build --profile production --platform android --local
```

The local machine must have the required native build tools and credentials.

## fastlane match Policy

Use fastlane match when the team wants explicit iOS signing ownership.

Supported storage modes:

- private git repo
- Google Cloud Storage
- Amazon S3

Keep match credentials and storage credentials outside the app repo.

## Pre-Release Checks

Before any binary release:

```bash
npm run release:check
npx expo config --type public
```

Before any OTA:

```bash
npm run ota:check
```

OTA is allowed only when:

- changed files are JS/assets-only
- target platform matches
- target runtimeVersion matches exactly
- channel/branch are intentional
- update server URL is intentional

## Store Notes

- Apple `CFBundleShortVersionString` maps to public version.
- Apple `CFBundleVersion` maps to iOS build number.
- Google `versionName` maps to public version.
- Google `versionCode` maps to Android version code.
- Android `versionCode` must never decrease and must stay below the platform maximum.
