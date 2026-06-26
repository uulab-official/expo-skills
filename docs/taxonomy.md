# Expo Skills Taxonomy

이 컬렉션은 기능별 샘플보다 “AI 에이전트가 어디서부터 어디까지 책임질지”를 기준으로 나눕니다.

## Boundaries

### `expo-project-foundation`

프로젝트를 만들거나 기존 앱을 Expo 실무 구조로 정리하는 시작점입니다. SDK, app config, package scripts, TypeScript, lint/test/verify, env example, EAS 기본값, Expo Router 중심 폴더 아키텍처, feature module 구조를 다룹니다.

### `expo-skill-orchestrator`

넓거나 모호한 요청의 진입점을 다룹니다. 필요한 정보를 수집하고, 선택지를 제시하고, `expo-team-conventions`, `expo-project-foundation`, backend/release 관련 스킬을 자연스럽게 조합합니다. 사용자가 "Expo 앱 만들어줘", "스토어까지 준비해줘", "필요한 스킬 알아서 써줘"처럼 요청할 때 먼저 사용합니다.

### `expo-team-conventions`

팀/개인별 Expo 기본값을 다룹니다. bundle/package prefix, Expo owner, credential directory, backend choice, release policy, support/privacy URL pattern, 로컬 profile 파일이 여기에 속합니다. 공개 스킬에는 UULab 같은 특정 팀 값을 넣지 않고, 이 스킬이 로컬 설정을 읽어 다른 스킬에 적용합니다.

### `expo-router-navigation`

화면 구조와 이동 규칙을 다룹니다. 탭, 스택, 모달, 인증 게이트, deep link, not-found, route params, 뒤로가기 UX가 여기에 속합니다.

### `expo-ui-system`

제품 UI의 반복 기반을 다룹니다. theme tokens, fonts, icons, app bars, buttons, inputs, shimmer/skeleton, empty/loading/error/offline states, accessibility defaults가 여기에 속합니다.

### `expo-startup-ota`

앱 시작 경험을 다룹니다. native splash, React Native custom splash, font loading, session bootstrap, EAS Update, OTA progress, reload safety가 여기에 속합니다.

### `expo-auth-secure-storage`

로그인과 세션 보안을 다룹니다. SecureStore, token refresh, auto login, logout cleanup, biometric unlock, Kakao/Google/Apple social login, OAuth redirect, auth provider 연결이 여기에 속합니다.

### `expo-device-media`

디바이스 권한과 미디어 입출력을 다룹니다. Camera, ImagePicker, MediaLibrary, FileSystem, compression, upload retry, permission copy가 여기에 속합니다.

### `expo-supabase-backend`

Supabase 백엔드를 다룹니다. Cloud/self-hosted Supabase, Auth, Kakao/Google/Apple OAuth, Postgres, RLS, Storage, Realtime, Edge Functions, Expo Router auth gate, mobile session persistence가 여기에 속합니다.

### `expo-appwrite-backend`

Appwrite 백엔드를 다룹니다. Cloud/self-hosted Appwrite, Auth, Google/Apple OAuth, Kakao 지원 여부 검증, Databases, Storage, Functions, Realtime, Appwrite Console platform settings, permissions가 여기에 속합니다.

### `expo-firebase-backend`

Firebase 백엔드를 다룹니다. Firebase JS SDK, React Native Firebase, Auth, Firestore, Storage, Analytics, Crashlytics, Messaging, config plugins, Google service files가 여기에 속합니다.

### `expo-data-offline-sync`

앱 데이터 계층을 다룹니다. API clients, React Query style cache, SQLite schema, migrations, offline queue, conflict handling이 여기에 속합니다.

### `expo-notifications-background`

알림과 백그라운드 실행을 다룹니다. Expo Push Service, direct FCM/APNs 선택, push tokens, local notifications, badges, notification routing, expo-background-task, TaskManager, task definition scope, background limits가 여기에 속합니다.

### `expo-quality-performance`

출시 전 품질을 다룹니다. tests, lint, typecheck, accessibility, crash smoke tests, performance traces, FlatList/image optimization이 여기에 속합니다.

### `expo-store-console-setup`

스토어 콘솔의 준비 상태를 다룹니다. Apple Developer, App Store Connect, Google Play Console, Play App Signing, Google Play Developer API, App Store Connect API key, Firebase 앱 등록이 여기에 속합니다.

### `expo-store-review-info`

Apple/Google 심사 정보 수집과 등록 준비를 다룹니다. App Review contact, demo account, reviewer notes, privacy policy/support URL, Apple App Privacy, Google Play Data safety, permissions inventory, screenshots checklist, store metadata scaffold가 여기에 속합니다.

### `expo-android-jks-signing`

Android 업로드 서명을 다룹니다. JKS 생성, alias, keytool 검증, SHA-1/SHA-256, EAS local credentials, Play App Signing 업로드 키 관리가 여기에 속합니다.

### `expo-eas-build-strategy`

EAS 빌드 운영 전략을 다룹니다. Cloud Build, local EAS build, Free/paid plan quota 확인, preview/internal/production profile, OTA로 대체 가능한 변경인지 판단, 빌드 예산 문서화가 여기에 속합니다.

### `expo-fastlane-automation`

fastlane 기반 자동화를 다룹니다. match, deliver, supply, TestFlight 업로드, metadata/screenshot 폴더, CI에서 쓰는 lane 설계가 여기에 속합니다.

### `expo-release-operator`

실제 배포 실행 중 필요한 로컬 로그인과 사용자 입력을 다룹니다. Expo/EAS 로그인, Apple/Google 계정 선택, OTP/2FA 입력 유도, fastlane match readonly 검증, Firebase/Supabase/Appwrite CLI 로그인, 로컬 credential path 확인, EAS build/submit 또는 fastlane upload 진행이 여기에 속합니다.

### `expo-release-review`

스토어 출시를 다룹니다. EAS local/cloud builds, submit, store metadata, screenshots, privacy labels, review notes, version/build number policy가 여기에 속합니다.

### `expo-version-ota-governance`

스토어 버전과 OTA 안정성을 다룹니다. public version, iOS buildNumber, Android versionCode, runtimeVersion, EAS channel/branch, release-state 파일, versioning policy 문서, OTA native-risk check, binary release checklist가 여기에 속합니다.

## Split Rule

새 스킬을 추가할 때는 아래 질문으로 판단합니다.

- 이 작업에 필요한 파일이 전혀 다른가?
- 검증 방법이 전혀 다른가?
- 실패했을 때 되돌리는 방법이 전혀 다른가?
- 다른 팀원이 이 스킬만 복사해도 가치가 있는가?

네 가지 중 두 개 이상이 맞으면 별도 스킬 후보입니다.
