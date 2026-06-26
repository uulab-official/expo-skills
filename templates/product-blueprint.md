# Product Blueprint

Use this after `docs/idea-brief.md` is clear enough to design the app.

## Product Direction

- App name:
- Product promise:
- MVP track: MVP / production app / internal tool
- Primary platform: iOS / Android / both / web

## User Journeys

| Journey | User goal | Entry point | Success state | Failure/empty state |
| --- | --- | --- | --- | --- |
| First run | | | | |
| Core action | | | | |
| Settings/account | | | | |

## Screens

| Screen | Purpose | Data needed | Actions | States |
| --- | --- | --- | --- | --- |
| Home | | | | loading/empty/error/offline |
| Detail | | | | loading/empty/error/offline |
| Settings | | | | |

## Feature Decisions

- Auth: none / email / Kakao / Google / Apple / custom
- Backend: Supabase / Appwrite / Firebase / custom / none
- Uploads: none / image / video / documents
- Maps/location: none / Naver / Kakao / Google / Apple
- Notifications: none / local / push / direct FCM/APNs
- Offline: none / cache / queue / full sync
- Background tasks:
- Payments/monetization:

## Data Model Draft

| Entity | Owner | Fields | Privacy | Offline? |
| --- | --- | --- | --- | --- |
| User | | | private | |
| Item | | | | |

## Release Shape

- Environment flavors: development / staging / production
- OTA mode: EAS Update / custom / none
- Build strategy: EAS cloud / local EAS / mixed
- Store review needed:
- Account automation needed:

## Risks

- Product risk:
- Technical risk:
- Store/review risk:
- Credential/account risk:
