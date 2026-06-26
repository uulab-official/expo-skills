---
name: expo-maps-location
description: Use when adding or reviewing maps, location UI, markers, clustering, geocoding/search integration, route-to-map behavior, provider choice, or Korea-focused Naver Map, Kakao Map, Google Maps, Apple Maps, expo-maps, or react-native-maps setup in Expo apps.
---

# Expo Maps Location

Use this skill when an Expo app needs maps, map provider decisions, markers, clustering, or Korea-focused location UX.

## First Pass

1. Inspect Expo SDK, native workflow, `app.config.*`, `eas.json`, installed map packages, location permissions, and route screens.
2. Read `docs/maps-provider-decision.md` when present; create it from the template for new map work.
3. Identify provider needs: Korea POI quality, global coverage, Google Maps on iOS, Apple Maps acceptable on iOS, web support, cost/quota, and required native SDK features.
4. Separate JS-only changes from native config changes. Map SDKs, API keys, location permission strings, package names, bundle IDs, and URL schemes require development/preview/production builds.
5. Verify current provider docs before promising support, pricing, quota, or Expo Go compatibility.

## Provider Choice

| Need | Prefer |
| --- | --- |
| Simple native map, Android Google Maps, iOS Apple Maps | `expo-maps` |
| Broad React Native ecosystem, Google Maps on iOS needed | `react-native-maps` |
| Korea-first UX, Korean addresses/POI, Naver ecosystem | Naver Map SDK via a React Native wrapper |
| Kakao ecosystem, Kakao Local/Search, Kakao Map UX | Kakao Map SDK via a React Native wrapper |
| Web map in Expo web or embedded web view | Provider JavaScript SDK or web map component |

Notes:

- `expo-maps` is Expo-built but currently alpha; it requires development builds and supports Google Maps on Android and Apple Maps on iOS.
- `react-native-maps` is still the default cross-platform fallback for many Expo apps. Use `expo install`, configure provider keys, and test app-store builds.
- Naver/Kakao native maps are not Expo Go-only features. Plan for config plugins, prebuild/CNG, or EAS development builds.
- If the user needs both Google Maps on iOS and Korea-specific Naver/Kakao search, consider separating map rendering from search provider integration.

## App Config Checklist

- Stable `scheme`, `ios.bundleIdentifier`, and `android.package`.
- Location permission copy for foreground location when showing user location.
- Google Maps: Google Cloud project, Maps SDK enabled, Android package + SHA-1 restriction, iOS bundle restriction when used.
- Naver Maps: Naver Cloud Maps project/API setup, platform identifiers, client ID/key values stored through public-safe env names only.
- Kakao Maps: Kakao app registered, platform keys registered, Kakao Map activated, correct key per platform.
- Keys are represented in `.env.example`; real keys stay in private env/secret manager.
- Store review docs explain why location is needed and whether location is optional.

## Marker Performance

- Never render every database row as a marker. Query by visible bounds, zoom level, category, and search filters.
- Debounce `onRegionChangeComplete` and ignore tiny camera movements.
- Use stable marker IDs, memoized marker props, and immutable marker arrays.
- Cluster at low zoom; show individual markers only after zooming in.
- Prefer native image markers or simple symbols over complex React marker children.
- For `react-native-maps`, turn off `tracksViewChanges` after custom marker images render when applicable.
- Keep selected marker state separate from the full marker collection.
- Use server-side clustering, geohash buckets, or a spatial index when marker count can exceed a few hundred in one viewport.
- Avoid marker re-fetch loops while the user is panning. Fetch after settle, cancel stale requests, and keep previous markers until new data arrives.
- Test performance on low-end Android devices and real iPhones, not only simulators.

## Data And Search

- Keep map rendering provider independent from search/geocoding provider when possible.
- Normalize place data into one app shape: `id`, `provider`, `name`, `latitude`, `longitude`, `address`, `category`, `raw`.
- Cache search results and reverse-geocoding responses; respect provider quota and terms.
- Store only needed coordinates and user consent state. Treat precise location as sensitive data.
- Use one route parser for deep links, push notifications, and map result links.

## Recommended Structure

```text
src/features/map/
  screens/MapScreen.tsx
  components/MapViewAdapter.tsx
  components/MapMarker.tsx
  components/ClusterMarker.tsx
  hooks/useMapCamera.ts
  hooks/useVisibleMarkers.ts
  services/mapSearch.ts
  services/markerClusters.ts
  types.ts
src/lib/location/
  permissions.ts
  currentLocation.ts
docs/
  maps-provider-decision.md
  permissions-inventory.md
```

## Verification

Run local gates and verify on real or representative devices:

```bash
npm run typecheck
npm run lint
npx expo config --type public
npx expo start
```

For native map SDKs, also run a development, preview, or production build. Confirm map tiles load, API key restrictions work, location permission copy appears, markers do not lag while panning, and marker clusters update correctly across zoom levels.
