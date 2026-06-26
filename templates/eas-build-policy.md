# EAS Build Policy

Use this file to decide when to spend EAS cloud builds and when to build locally.

## Build Strategy

- Default build mode: cloud / local / mixed
- Current plan/quota checked on:
- Monthly cloud build budget:
- Android cloud build budget:
- iOS cloud build budget:
- Local build owner/toolchain:
- EAS Update plan:
- EAS Update pricing checked on:
- Estimated OTA monthly active users:
- OTA upgrade threshold:

## Build Profiles

| Profile | Platform | Distribution | Channel | Build mode | Purpose |
| --- | --- | --- | --- | --- | --- |
| development | ios/android | internal | development | local/cloud | dev client |
| preview | ios/android | internal | preview | cloud | QA |
| production | ios/android | store | production | cloud/local | store submission |

## Use Cloud Build When

- Shared QA needs installable artifacts.
- Store-bound production artifact is required.
- Local native toolchain is unavailable.
- Reproducible remote environment matters.
- Current quota/credits are available.

## Use Local EAS Build When

- Saving cloud quota matters.
- Debugging native build failures.
- Local signing visibility matters.
- CI quota/cost should be avoided.
- The developer machine has required native tools and credentials.

## Use OTA Instead When

- Change is JS/assets-only.
- `runtimeVersion` matches the target binary exactly.
- No native config, permission, icon/splash, dependency, or native module change is included.
- Estimated monthly active updated users fit the current EAS Update plan, or a custom update server policy is documented.

## Commands

```bash
npm run verify
npm run release:check
npm run ota:check

eas build --profile preview --platform ios
eas build --profile preview --platform android

eas build --profile production --platform ios --local
eas build --profile production --platform android --local
```

## Pre-Build Note

Before starting a cloud build, record:

- date:
- branch:
- commit:
- profile:
- platform:
- reason:
- why OTA is not enough:
