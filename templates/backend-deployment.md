# Backend Deployment

Use this file to document cloud or self-hosted backend decisions without committing secrets.

## Backend Choice

- Provider: Supabase / Appwrite / Firebase / custom
- Hosting mode: cloud / self-hosted / local development
- Public API endpoint:
- Admin console URL:
- Environment: development / preview / production
- Owner:

## Self-Hosted Checklist

Complete this section for self-hosted Supabase or Appwrite.

- Domain and TLS:
- Reverse proxy:
- Docker Compose / Kubernetes / PaaS:
- Version:
- Upgrade policy:
- Rollback policy:
- Backup schedule:
- Restore test date:
- SMTP provider:
- SMS provider:
- Storage backend:
- Log/monitoring owner:
- Health check URL:
- Admin access policy:

## Supabase Notes

- External API URL:
- Site URL:
- JWT secret source:
- Publishable/anon key source:
- Service role key source:
- Auth provider env source:
- Database backup:
- Storage backup:
- Migrations path:

## Appwrite Notes

- Endpoint:
- Project ID:
- Platform IDs:
- SMTP/SMS provider:
- Storage adapter:
- Functions runtimes:
- Database/volume backup:
- OAuth provider credentials source:
- Console admin policy:

## Public Client Env

Only public client values belong in the Expo app.

```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
EXPO_PUBLIC_APPWRITE_ENDPOINT=
EXPO_PUBLIC_APPWRITE_PROJECT_ID=
EXPO_PUBLIC_APPWRITE_PLATFORM=
```

## Private Values

Do not commit these values.

- Service role keys
- Appwrite server API keys
- OAuth client secrets
- SMTP passwords
- Admin credentials
- Database passwords
- Backup credentials

## Verification

- Public endpoint works on real device network:
- Auth callback works:
- Email delivery works:
- Storage upload/download works:
- Backup restore tested:
- Monitoring alerts tested:
