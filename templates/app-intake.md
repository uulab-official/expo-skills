# Expo App Intake

Use this when starting a new Expo app or turning a prototype into a production app.

## Product

- App name:
- One-line purpose:
- Primary users:
- Main screens:
- Must-have features:

## Platforms

- iOS:
- Android:
- Web:
- Tablet:

## Backend

- Backend choice: Supabase / Appwrite / Firebase / custom / none
- Backend hosting: cloud / self-hosted / local development / undecided
- Backend public endpoint:
- Backend private deployment doc: docs/backend-deployment.md
- Auth methods:
- Social providers: Kakao / Google / Apple / none
- Kakao login needed:
- Google login needed:
- Apple login needed:
- Custom OIDC needed:
- Data model summary:
- File upload needs:
- Realtime needs:
- Offline needs:

## Device Features

- Camera:
- Gallery:
- Location:
- Maps needed:
- Map provider: Naver / Kakao / Google / Apple / expo-maps / react-native-maps / undecided
- Maps provider decision doc: docs/maps-provider-decision.md
- Place search/geocoding:
- Expected markers per viewport:
- Marker clustering needed:
- Marker optimization risk:
- Push notifications:
- Push service: Expo Push Service / direct FCM/APNs / none
- Background tasks:
- Background task type: sync / prefetch / OTA check / location / none
- Biometrics:
- Deep links:

## UI And Architecture

- Component architecture doc: docs/component-architecture.md
- App shell blueprint doc: docs/app-shell-blueprint.md
- Brand assets checklist doc: docs/brand-assets-checklist.md
- Navigation model: bottom tabs / stack only / drawer / custom
- App shell needed: app bar / bottom sheet modal / settings / theme / splash / app icon
- Theme modes: system / light / dark
- Primary tabs:
- Modal flows:
- Loading patterns doc: docs/ui-loading-patterns.md
- Shimmer/skeleton needed:
- Empty/error/offline states needed:
- Image placeholders: expo-image BlurHash / ThumbHash / none
- Route groups:
- Feature modules:
- App icon ready:
- Native splash ready:

## Release

- Target: prototype / internal test / public store
- Environment flavors: development / staging / production / production-only
- Environment flavors doc: docs/environment-flavors.md
- Side-by-side installs needed:
- Build strategy: EAS cloud / local EAS / mixed / OTA-only
- Monthly cloud build budget:
- Public version:
- iOS build number:
- Android version code:
- Runtime version:
- Version source: local / remote
- Build number policy: YYMMDDNN / EAS remote / custom
- EAS channel:
- EAS branch:
- Development channel/branch:
- Staging channel/branch:
- Production channel/branch:
- Update server: EAS Update / custom
- EAS Update plan: free / starter / production / enterprise / custom
- EAS Update plan checked on:
- Estimated OTA monthly active users:
- OTA upgrade threshold:
- Custom update URL:
- Custom update publish command:
- Expo owner:
- Expo login method: local session / EXPO_TOKEN / ask
- Interactive release needed: yes / no
- iOS bundle ID:
- Android package:
- Support URL:
- Privacy URL:
- Store locales:

## Store Review

- Review contact:
- Demo account required:
- Demo account source:
- Privacy policy URL:
- Support URL:
- Data collected:
- Third-party SDKs:
- Native permissions:
- Ads:
- Account deletion path:

## Credentials

- Credential directory:
- CI secret manager:
- Apple team:
- Apple auth method: App Store Connect API key / interactive 2FA / ask
- Google Play account:
- Google Play auth method: service account JSON / ask
- Firebase project:
- Supabase CLI auth needed:
- Appwrite CLI auth needed:
- Firebase CLI auth needed:
- fastlane match storage: git / google_cloud / s3 / none

## Decisions Needed

- Backend:
- Auth:
- Release track:
- Store automation:
