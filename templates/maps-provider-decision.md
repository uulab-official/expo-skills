# Maps Provider Decision

Use this file before adding a map SDK or place search provider.

## Product Need

- Map purpose: browse places / pick location / delivery / route preview / store finder / community pins / other
- Primary region: Korea / global / mixed
- Platforms: iOS / Android / web
- Needs user location: yes / no / optional
- Needs search/geocoding: yes / no
- Needs route/directions: yes / no
- Expected marker count in one city:
- Expected marker count in one viewport:
- Offline map needed:

## Provider Choice

| Provider | Use | Notes |
| --- | --- | --- |
| Expo Maps | Simple native map | Google Maps on Android, Apple Maps on iOS; development build required |
| react-native-maps | Broad React Native map | Google Maps on Android and Apple/Google Maps on iOS; verify current Expo SDK compatibility |
| Naver Map | Korea-first map UX | Use when Korean POI/address quality and Naver map UX matter |
| Kakao Map | Kakao ecosystem | Use when Kakao Local/Search or Kakao map UX is required |
| Web SDK/WebView | Web-heavy map | Use for Expo web or provider features not exposed natively |

Decision:

- Rendering provider:
- Search/geocoding provider:
- Directions provider:
- Reason:

## Required Console Setup

- Google Cloud project:
- Google Maps SDK for Android enabled:
- Google Maps SDK for iOS enabled:
- Android package:
- Android SHA-1 fingerprints:
- iOS bundle identifier:
- Naver Cloud Maps project:
- Kakao app:
- Kakao Map activation:
- Billing/quota owner:

## Environment Names

Use placeholders only in committed files.

```text
EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_API_KEY=
EXPO_PUBLIC_GOOGLE_MAPS_IOS_API_KEY=
EXPO_PUBLIC_NAVER_MAP_CLIENT_ID=
EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY=
EXPO_PUBLIC_KAKAO_JAVASCRIPT_KEY=
```

## Marker Strategy

- Marker source: API / local SQLite / static JSON / realtime
- Visible-bounds query:
- Debounce time:
- Cluster threshold:
- Server-side cluster needed:
- Marker asset type: native image / vector / custom React component
- Selected marker UX:
- Max markers rendered at once:

## Verification

- Development or preview build loads map tiles.
- API key restrictions match bundle/package/SHA-1.
- Location permission copy is correct.
- Panning does not trigger repeated stale requests.
- Zooming clusters and unclusters correctly.
- Low-end Android marker performance is acceptable.
- iOS real device performance is acceptable.
