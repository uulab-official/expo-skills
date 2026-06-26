# Expo Skills Profile

Use this as a starting point for a project or team profile. Replace placeholders locally.

## Identity

- organization: Example Team
- expoOwner: example-owner
- bundlePrefix: com.example
- androidPackagePrefix: com.example
- urlHostPattern: <app-slug>.example.com

## Defaults

- backend: supabase
- navigation: expo-router
- releaseBuildNumber: yymmddnn
- runtimeVersionPolicy: app-version
- versionSource: local
- buildNumberPolicy: YYMMDDNN
- easChannel: production
- easBranch: production
- updateServerMode: eas
- updatesUrlPattern: https://u.expo.dev/<project-id>
- customUpdatePublishCommand:
- easUpdatePlan: free
- easUpdateLimitCheckedAt:
- easUpdateMonthlyActiveUsersLimit: 1000
- easUpdateBandwidthLimit: 100 GiB
- easUpdateStorageLimit: 20 GiB
- otaEstimatedMonthlyActiveUsers:
- otaUpgradeThreshold: 800 MAUs or 80 GiB bandwidth
- easBuildStrategy: mixed
- cloudBuildBudgetAndroid:
- cloudBuildBudgetIos:
- fastlaneMatchStorage: git
- publicVersionStart: 1.0.0
- appConfigFile: app.config.ts

## Credentials

- credentialsDir: $TEAM_CREDENTIALS_DIR
- commitRealCredentials: false
- expoTokenEnv: EXPO_TOKEN
- appleApiKeyPathEnv: ASC_KEY_PATH
- googleServiceAccountEnv: GOOGLE_PLAY_SERVICE_ACCOUNT_JSON
- androidKeystorePathEnv: ANDROID_KEYSTORE_PATH

## Store

- supportUrlPattern: https://<app-slug>.example.com/support
- privacyUrlPattern: https://<app-slug>.example.com/privacy
- marketingUrlPattern: https://<app-slug>.example.com
- reviewContactSource: private-profile-or-console
- demoAccountUserEnv: APP_REVIEW_DEMO_USER
- demoAccountPasswordEnv: APP_REVIEW_DEMO_PASSWORD
- storeReviewInfoPath: docs/store-review-info.md

## App Defaults

- requiredScreens: home, settings, support, privacy
- defaultTabs: home, settings
- reviewDemoAccount: use-private-env-only
