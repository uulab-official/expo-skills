# UI Loading Patterns

Use this file to keep loading, shimmer, skeleton, empty, error, and offline states consistent.

## Loading State Choices

| Situation | Pattern |
| --- | --- |
| Initial screen data | Skeleton matching final layout |
| Short button action | Button loading state |
| Known progress | Progress bar or percentage |
| Refresh with existing data | Keep data visible and show subtle refresh indicator |
| Long blocking startup | Startup progress screen |
| Offline but cached data exists | Cached data plus offline banner |
| No data after successful load | Empty state |
| Recoverable failure | Error state with retry |

## Shimmer Rules

- Use shimmer only for content placeholders, not every wait.
- Keep shimmer subtle in light and dark themes.
- Match final content dimensions to avoid layout shift.
- Respect reduce-motion settings. Use a static skeleton fallback when motion is disabled.
- Hide decorative skeleton blocks from accessibility when supported.
- Provide one meaningful loading label per screen when the wait is long.

## Skeleton Inventory

```text
src/components/ui/Skeleton.tsx
src/components/ui/LoadingOverlay.tsx
src/components/ui/EmptyState.tsx
src/components/ui/ErrorState.tsx
src/components/feedback/OfflineBanner.tsx
```

## Data Screen Contract

Every data-heavy screen should define:

- initial loading state
- refreshing state
- empty state
- error state
- offline/cached state when offline support exists
- content state

## Implementation Notes

- Start with static skeletons if the app has no animation stack.
- Use `expo-linear-gradient` or `react-native-reanimated` only when shimmer is required or already adopted.
- Use `expo-image` placeholders such as BlurHash/ThumbHash for remote images when using `expo-image`.
- Do not remove already loaded content just to show a skeleton during background refresh.
