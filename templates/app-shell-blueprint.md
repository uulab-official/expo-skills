# App Shell Blueprint

Use this file to give an AI agent the app shell decisions before it builds screens.

## Shell Choices

- App shell status: new / partial / production
- Platforms: iOS / Android / web
- Navigation model: Expo Router tabs + root stack / stack only / custom
- Primary tabs:
  - Home:
  - Search:
  - Create:
  - Activity:
  - Settings:
- Modal routes:
  - Account:
  - Feedback:
  - Detail create/edit:
- Bottom sheet style: Expo Router `formSheet` / React Native `Modal` / custom library / none
- Header style: native stack header / custom `AppBar` / mixed
- Theme modes: system / light / dark
- Settings rows: account / theme / notifications / language / privacy / support / sign out
- Startup flow: native splash only / custom startup screen / OTA-gated startup

## Default Route Tree

```text
app/
  _layout.tsx
  (auth)/
    _layout.tsx
    sign-in.tsx
  (tabs)/
    _layout.tsx
    index.tsx
    settings.tsx
  modals/
    _layout.tsx
    account.tsx
    feedback.tsx
  +not-found.tsx
```

## Default Source Tree

```text
src/
  app/
    AppBootstrap.tsx
    AppProviders.tsx
  components/
    layout/
      AppBar.tsx
      Screen.tsx
      Section.tsx
    ui/
      Button.tsx
      IconButton.tsx
      ListItem.tsx
      SwitchRow.tsx
      BottomSheetModal.tsx
      Dialog.tsx
      ToastHost.tsx
      Skeleton.tsx
      EmptyState.tsx
      ErrorState.tsx
  features/
    settings/
      screens/SettingsScreen.tsx
      components/SettingsSection.tsx
  theme/
    tokens.ts
    ThemeProvider.tsx
    useTheme.ts
```

## Implementation Rules

- Route files stay thin and render feature screens.
- Tabs live inside `(tabs)`; app-wide modals live outside `(tabs)`.
- Use `presentation: 'formSheet'` for simple routed bottom sheets when platform defaults are acceptable.
- Use local modal components only for temporary confirmations that do not need a URL.
- Add a settings screen early, even if it starts with only theme, notification, privacy, and support rows.
- Keep app bars, buttons, list rows, switches, dialogs, and sheets reusable.
- Keep theme tokens independent from backend, auth, and navigation state.

## Acceptance Checklist

- Root layout wires providers, fonts/startup readiness, and root stack.
- Tab layout has stable labels, icons, accessibility labels, and hidden header when using custom app bars.
- Settings screen exists and uses shared rows/sections.
- Theme mode can be changed or follows system by design.
- Modal and sheet dismissal works on iOS, Android, and web where supported.
- Native config changes are documented as binary-release changes.
