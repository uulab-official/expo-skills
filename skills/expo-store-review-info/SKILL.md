---
name: expo-store-review-info
description: Collect, scaffold, or audit Apple App Review and Google Play review information for an Expo app. Use for review contact, demo account, reviewer notes, privacy policy/support URLs, data safety, app privacy labels, permissions explanations, store metadata, screenshots checklist, age/content declarations, ads declaration, and generating public-safe review docs before EAS Submit, fastlane deliver/supply, or manual console submission.
---

# Expo Store Review Info

Use this skill before store submission so review information is complete, consistent, and reusable.

## First Pass

1. Read team/project conventions from `EXPO_SKILLS.md` and `.expo-skills/profile.md` if present.
2. Inspect app config, `store.config.*`, `fastlane/metadata`, screenshots, `.env.example`, privacy/support URLs, and product docs.
3. Identify target stores: Apple App Store, Google Play, or both.
4. Separate public metadata from private review-only information.
5. Verify current Apple, Google, and Expo metadata requirements from official docs when fields or policies may have changed.

## Information To Collect

### App Identity

- app name
- SKU or internal app ID
- iOS bundle identifier
- Android package name
- primary locale and supported locales
- category
- age/content rating assumptions

### Review Contact

- first name
- last name
- email
- phone number with country code
- organization or team

This information is for reviewer contact. It may be stored in private team profile or local env. Do not publish a personal contact in a public template.

### Demo Access

- whether login is required
- demo username env key
- demo password env key
- account type and permissions
- steps to reach testable content
- special test data or device requirements

Never commit real demo credentials. Use env placeholders such as:

```env
APP_REVIEW_DEMO_USER=
APP_REVIEW_DEMO_PASSWORD=
```

### URLs

- privacy policy URL
- support URL
- marketing URL
- account deletion URL when required by the app behavior or platform policy
- user privacy choices URL when applicable

Apple requires a privacy policy URL for iOS apps. Google Play also expects privacy and data safety disclosures for apps distributed on Play.

### Privacy And Data Safety

Inventory each data type the app or third-party SDKs collect:

- contact info
- user identifiers
- location
- photos/videos/files
- messages or user-generated content
- purchases
- diagnostics, crash logs, analytics
- advertising identifiers

For each data type, record:

- collected or not collected
- purpose
- linked to user
- shared with third parties
- used for tracking
- encrypted in transit
- user deletion path

### Permissions

For every native permission, record:

- permission name
- feature that needs it
- user-facing explanation
- whether the app still works if denied
- store metadata/privacy impact

## Files To Create

Create or update these public-safe files when missing:

```text
docs/store-review-info.md
docs/privacy-data-inventory.md
docs/permissions-inventory.md
store.config.json or store.config.example.json
fastlane/metadata/review_information/
.env.example
```

Use `templates/store-review-info.md`, `templates/privacy-data-inventory.md`, `templates/permissions-inventory.md`, and `templates/store.config.example.json` from this repository as source templates when available.

## Apple Review Notes

Review notes should include:

- what the app does
- whether login is required
- demo account env placeholders or private source
- steps to inspect core features
- permission rationale
- special configuration, hardware, region, or test data requirements
- account deletion path when accounts exist

Keep notes concise and factual. Do not include marketing copy only.

## Google Play Notes

Prepare:

- app access instructions
- data safety answers based on the inventory
- privacy policy URL
- ads declaration
- content rating assumptions
- target audience assumptions
- permission declarations
- testing instructions for restricted or login-only features

## Metadata Automation

- Use EAS Metadata where it supports the target store metadata. Confirm current support before relying on it.
- Use fastlane `deliver` for App Store metadata/review information when it fits the workflow.
- Use fastlane `supply` for Google Play metadata and tracks when Google Play API is configured.
- Keep manual-only console items listed in `docs/store-review-info.md`.

## Verification

Before submission:

- Privacy/support URLs open publicly.
- Review contact is complete in private profile or console.
- Demo account works in a production-like build.
- Review notes match the current app UI.
- Data safety/app privacy answers match actual SDKs and app behavior.
- Native permissions match app config and store declarations.
- Screenshots do not show debug UI, private data, or stale feature claims.
