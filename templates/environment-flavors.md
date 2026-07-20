# Environment Flavors

Use this file to keep development, staging, and production builds aligned across Expo config, EAS Build, EAS Update, fastlane, and store tracks.

## Flavor Matrix

| Flavor | App name | iOS bundle ID | Android package | Scheme | Backend | EAS profile | Channel | Branch | Store track |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| development | App Dev | com.example.app.dev | com.example.app.dev | app-dev | dev | development | development | development | none |
| staging | App Staging | com.example.app.staging | com.example.app.staging | app-staging | staging | staging | staging | staging | TestFlight / Play internal |
| production | App | com.example.app | com.example.app | app | production | production | production | production | public |

## Environment Variables

Use placeholders only in committed files.

```text
APP_VARIANT=development|staging|production
APP_VERSION=1.0.0
IOS_BUILD_NUMBER=26010101
ANDROID_VERSION_CODE=26010101
RUNTIME_VERSION=1.0.0
EXPO_UPDATES_URL=https://u.expo.dev/<project-id>
EXPO_PUBLIC_API_URL=
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_APPWRITE_ENDPOINT=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_ADS_MODE=test
EXPO_PUBLIC_ADMOB_FORCE_TEST_IDS=1
EXPO_PUBLIC_ADMOB_IOS_APP_ID=
EXPO_PUBLIC_ADMOB_ANDROID_APP_ID=
```

Private values live in local env files, EAS environment variables, CI secrets, or a team credential manager.

AdMob app/ad-unit IDs are public identifiers. Keep app-specific live IDs centralized in committed config or managed production environment values, but never expose AdMob API OAuth secrets through `EXPO_PUBLIC_*`.

| Target | Ads mode | AdMob identity |
| --- | --- | --- |
| Expo start / simulator / development / preview | `test` | Google sample app IDs + test ad-unit IDs |
| TestFlight / App Store / Play / production OTA | `production` | app-specific live app IDs + live ad-unit IDs |

The EAS profile controls this choice. `eas build --local --profile production` is still a production artifact and must use live IDs.

## Version Rules

- Public version: semver, production user-facing.
- iOS build number: increase for every iOS upload.
- Android version code: increase for every Android upload.
- Recommended build number policy: `YYMMDDNN`.
- Runtime version policy: app version / native runtime / custom.
- Version source: local / EAS remote.

## OTA Rules

| Flavor | OTA branch | Runtime policy | Publish command |
| --- | --- | --- | --- |
| development | development | app version or native runtime | `eas update --branch development --message "..."`
| staging | staging | app version or native runtime | `eas update --branch staging --message "..."`
| production | production | app version or native runtime | `eas update --branch production --message "..."`

Do not publish across flavors unless backend endpoint, runtimeVersion, feature flags, and channel mapping are intentionally compatible.

## EAS Build Profiles

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "channel": "development",
      "env": { "APP_VARIANT": "development" }
    },
    "staging": {
      "distribution": "internal",
      "channel": "staging",
      "env": { "APP_VARIANT": "staging" }
    },
    "production": {
      "channel": "production",
      "env": { "APP_VARIANT": "production" }
    }
  }
}
```

## fastlane Lane Matrix

| Lane | Flavor | Artifact source | Store target | Notes |
| --- | --- | --- | --- | --- |
| `ios staging` | staging | EAS IPA or local IPA | TestFlight | API key auth preferred |
| `ios production` | production | EAS IPA or local IPA | App Store review | verify build number |
| `android staging` | staging | EAS AAB or local AAB | Play internal | verify versionCode |
| `android production` | production | EAS AAB or local AAB | Play production | verify rollout |

## Preflight Checklist

- `npx expo config --type public` shows the intended identity.
- `eas.json` profile channel matches the flavor.
- `release-state.json` values match the intended version/runtime/channel/branch.
- Store review notes and privacy docs match the flavor and backend.
- OTA target branch and runtimeVersion are correct.
- Development/preview AdMob config resolves only Google test IDs.
- Production AdMob config resolves only app-specific live IDs and fails preflight otherwise.
- fastlane lane target, artifact path, and store track are correct.
