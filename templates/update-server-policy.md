# Update Server Policy

Choose one OTA update server mode.

## Current EAS Update Plan Check

- Plan: free / starter / production / enterprise / custom
- Pricing checked on:
- Official pricing URL: https://expo.dev/pricing
- Monthly active updated users limit:
- Global edge bandwidth limit:
- Storage limit:
- Estimated monthly active updated users:
- Upgrade threshold:

As of 2026-06-26, Expo's official pricing page lists the Free plan EAS Update allowance as 1,000 MAUs, 100 GiB bandwidth, and 20 GiB storage. Re-check before launch or before a large campaign.

## EAS Update

- `updates.url`: `https://u.expo.dev/<project-id>`
- publish command: `eas update --branch <branch> --message "<message>"`
- recommended for most Expo apps
- good for prototypes, small apps, early production, and teams that want Expo dashboard/CDN/channel management

## Custom Expo Updates Server

- `updates.url`: your server endpoint
- server must implement the Expo Updates protocol
- publish command must be documented by the team
- team owns hosting, asset storage, rollout, monitoring, and rollback
- use only when private infrastructure, custom routing, compliance, or a non-Expo publishing pipeline is required

## Decision Matrix

| Situation | Prefer |
| --- | --- |
| Usage fits current EAS Update plan limits | EAS Update |
| Team wants Expo-hosted update infrastructure | EAS Update |
| Private update infrastructure or custom routing is required | Custom server |
| Monitoring/rollback ownership is unclear | EAS Update |

## Checklist

- Runtime version matches target binary.
- Platform matches target binary.
- Assets are reachable.
- Update manifest is valid.
- Rollback path exists.
- Production binary has been tested against the update server.
