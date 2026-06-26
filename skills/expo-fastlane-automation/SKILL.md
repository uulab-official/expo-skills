---
name: expo-fastlane-automation
description: Add, repair, or operate fastlane automation for Expo apps. Use for Fastfile, Appfile, Matchfile, match signing, App Store Connect API keys, TestFlight upload, deliver metadata, Google Play supply uploads, screenshots, review information, CI release lanes, and keeping fastlane alongside EAS Build/EAS Submit.
---

# Expo Fastlane Automation

Use this skill when fastlane should automate store release tasks for an Expo app.

## First Pass

1. Identify whether EAS Build/Submit already covers the release path.
2. Read team conventions from `EXPO_SKILLS.md` or `.expo-skills/profile.md` when present, especially credential env names, store account placeholders, and release policy.
3. Inspect `fastlane/`, `eas.json`, `package.json`, store metadata, screenshots, and credential docs.
4. Decide fastlane's role: fallback uploader, metadata manager, screenshot uploader, iOS signing manager, or full release lane.
5. Keep fastlane and EAS complementary. Do not remove EAS scripts just because fastlane is added.

## Recommended Roles

- EAS Build: primary Expo binary build path.
- EAS Submit: primary simple store upload path.
- fastlane `match`: shared iOS certificates/profiles when the team manages signing explicitly.
- fastlane `testflight`/`pilot`: TestFlight fallback or tester management.
- fastlane `deliver`: App Store metadata, screenshots, and review submission workflows.
- fastlane `supply`: Google Play metadata, screenshots, and track uploads after Play API setup.

## Files To Create

```text
fastlane/
  Appfile
  Fastfile
  Matchfile
  metadata/
  screenshots/
```

Keep real credentials outside the repo. Store only placeholders and path references.

## App Store Connect API Key

Prefer API key auth for CI and non-interactive workflows:

```ruby
api_key = app_store_connect_api_key(
  key_id: ENV.fetch("ASC_KEY_ID"),
  issuer_id: ENV.fetch("ASC_ISSUER_ID"),
  key_filepath: ENV.fetch("ASC_KEY_PATH")
)
```

Pass `api_key: api_key` to `deliver`, `upload_to_testflight`, or other supported actions.

## iOS Lanes

Use `match` only when the team wants shared signing in a private repo or storage backend. Avoid `match nuke` unless the user explicitly requests destructive certificate cleanup.

Example lane shape:

```ruby
platform :ios do
  lane :metadata do
    api_key = app_store_connect_api_key(
      key_id: ENV.fetch("ASC_KEY_ID"),
      issuer_id: ENV.fetch("ASC_ISSUER_ID"),
      key_filepath: ENV.fetch("ASC_KEY_PATH")
    )
    deliver(
      api_key: api_key,
      skip_binary_upload: true,
      submit_for_review: false
    )
  end

  lane :testflight_upload do
    api_key = app_store_connect_api_key(
      key_id: ENV.fetch("ASC_KEY_ID"),
      issuer_id: ENV.fetch("ASC_ISSUER_ID"),
      key_filepath: ENV.fetch("ASC_KEY_PATH")
    )
    upload_to_testflight(api_key: api_key, ipa: ENV.fetch("IPA_PATH"))
  end
end
```

## Android Lanes

Use `supply` after the Play Console app exists, Play Developer API is enabled, and the service account has app permissions.

```ruby
platform :android do
  lane :metadata do
    supply(
      json_key: ENV.fetch("GOOGLE_PLAY_SERVICE_ACCOUNT_JSON"),
      package_name: ENV.fetch("GOOGLE_PLAY_PACKAGE_NAME"),
      skip_upload_apk: true,
      skip_upload_aab: true
    )
  end

  lane :internal do
    supply(
      json_key: ENV.fetch("GOOGLE_PLAY_SERVICE_ACCOUNT_JSON"),
      package_name: ENV.fetch("GOOGLE_PLAY_PACKAGE_NAME"),
      aab: ENV.fetch("AAB_PATH"),
      track: "internal"
    )
  end
end
```

## Metadata And Review

- Keep metadata locale folders in sync with `store.config.json` if both exist.
- Store review notes should explain login, main paths to inspect, and permission usage.
- Demo credentials must come from local env or private store, not committed text files.
- Screenshots should be real app captures or generated compositions using real captures.

## Package Scripts

Add thin scripts that load local env outside git:

```json
{
  "release:ios:metadata": "fastlane ios metadata",
  "release:ios:testflight": "fastlane ios testflight_upload",
  "release:android:metadata": "fastlane android metadata",
  "release:android:internal": "fastlane android internal"
}
```

If the team uses a credential wrapper, scripts should call the wrapper before fastlane.

## Verification

Run fastlane in metadata-only or dry-run mode before uploading binaries:

```bash
bundle exec fastlane ios metadata
bundle exec fastlane android metadata
```

For binary upload lanes, verify the artifact path, bundle/package ID, version, and build number before upload.
