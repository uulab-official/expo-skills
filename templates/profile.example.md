# Expo Skills Profile

Use this as a starting point for a project or team profile. Replace placeholders locally.

## Identity

- organization: Example Team
- expoOwner: example-owner
- expoLoginMethod: local-session
- bundlePrefix: com.example
- androidPackagePrefix: com.example
- urlHostPattern: <app-slug>.example.com

## Defaults

- backend: supabase
- backendHosting: cloud
- backendDeploymentPath: docs/backend-deployment.md
- socialAuthProvidersPath: docs/social-auth-providers.md
- appShellBlueprintPath: docs/app-shell-blueprint.md
- brandAssetsChecklistPath: docs/brand-assets-checklist.md
- socialProviders: kakao, google, apple
- kakaoAuthProvider: supabase-or-custom
- googleAuthProvider: backend
- appleAuthProvider: backend
- navigation: expo-router
- navigationModel: expo-router-tabs
- appShell: bottom-tabs, app-bar, bottom-sheet-modal, settings, theme, splash, app-icon
- themeModes: system, light, dark
- folderArchitecture: expo-router-thin-routes-feature-modules
- loadingPattern: skeleton-first
- shimmerMotion: respect-reduce-motion
- imagePlaceholder: expo-image-blurhash-or-thumbhash
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
- appleAuthMethod: asc-api-key
- googlePlayAuthMethod: service-account-json
- backendCliAuth: ask
- releaseOperatorSessionPath: docs/release-operator-session.md
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
- requiredUiStates: loading, empty, error, offline
- notificationsModule: src/lib/notifications
- backgroundTasksModule: src/lib/background
- reviewDemoAccount: use-private-env-only
