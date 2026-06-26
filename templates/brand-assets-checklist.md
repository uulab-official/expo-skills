# Brand Assets Checklist

Use this file before store submission or whenever app name, icon, splash, scheme, or branding changes.

## App Identity

- App display name:
- Expo slug:
- Scheme:
- iOS bundle identifier:
- Android package:
- Store category:
- Support URL:
- Privacy URL:

## Required Assets

```text
assets/images/
  icon.png
  splash-icon.png
  splash-icon-dark.png
  adaptive-icon-foreground.png
  adaptive-icon-monochrome.png
```

## Expo Config

- `name` and `slug` are final for the current release.
- `scheme` is stable before auth redirects, deep links, and notification routes ship.
- `icon` points to the app icon.
- `android.adaptiveIcon.foregroundImage` is configured when shipping Android.
- `android.adaptiveIcon.backgroundColor` or `backgroundImage` is configured.
- `android.adaptiveIcon.monochromeImage` is configured when themed icons matter.
- `ios.icon` is configured when using iOS-specific light/dark/tinted icons or an `.icon` directory.
- `expo-splash-screen` plugin is configured with image, background color, dark variant, and image width.

Example shape:

```json
{
  "expo": {
    "name": "App Name",
    "slug": "app-name",
    "scheme": "appname",
    "icon": "./assets/images/icon.png",
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon-foreground.png",
        "monochromeImage": "./assets/images/adaptive-icon-monochrome.png",
        "backgroundColor": "#ffffff"
      }
    },
    "plugins": [
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "backgroundColor": "#ffffff",
          "dark": {
            "image": "./assets/images/splash-icon-dark.png",
            "backgroundColor": "#111111"
          },
          "imageWidth": 200
        }
      ]
    ]
  }
}
```

## Native Release Notes

These changes require a new binary:

- App icon, adaptive icon, or iOS icon change.
- Native splash image/background/plugin change.
- Bundle identifier, Android package, app scheme, permissions, associated domains, or intent filters.
- Native module or config plugin changes.

## Verification

- Run `npx expo config --type public` and check the public config.
- Test icon and splash in an internal, preview, or production build.
- Check light and dark splash backgrounds.
- Check Android launcher icon on multiple icon masks.
- Check iOS home screen icon and store upload warnings.
