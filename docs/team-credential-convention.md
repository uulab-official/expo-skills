# Team Credential Convention

공개 레포에는 실제 값을 넣지 말고, 팀 내부에서는 같은 이름과 위치 규칙을 쓰면 자동화가 쉬워집니다.

이 문서는 credential 파일 이름 규칙만 다룹니다. 팀별 앱 기본값은 `docs/personalization.md`와 `expo-team-conventions` 스킬로 관리합니다.

## Suggested Directory

```text
$TEAM_CREDENTIALS_DIR/
  apple/
    AuthKey_PLACEHOLDER.p8
  google/
    play-service-account.json
  android/
    <app-slug>-upload.jks
  expo/
    expo-token.env
  firebase/
    <app-slug>/
      GoogleService-Info.plist
      google-services.json
```

## Suggested Env

```env
TEAM_CREDENTIALS_DIR=/absolute/private/path
EXPO_TOKEN=

APPLE_TEAM_ID=
ASC_TEAM_ID=
ASC_KEY_ID=
ASC_ISSUER_ID=
ASC_KEY_PATH=$TEAM_CREDENTIALS_DIR/apple/AuthKey_PLACEHOLDER.p8

GOOGLE_PLAY_PACKAGE_NAME=
GOOGLE_PLAY_SERVICE_ACCOUNT_JSON=$TEAM_CREDENTIALS_DIR/google/play-service-account.json

ANDROID_KEYSTORE_PATH=$TEAM_CREDENTIALS_DIR/android/<app-slug>-upload.jks
ANDROID_KEY_ALIAS=
ANDROID_KEYSTORE_PASSWORD=
ANDROID_KEY_PASSWORD=
```

## Rules

- 이 파일은 규칙 예시입니다. 실제 값을 채운 파일은 private 저장소, password manager, 또는 로컬 env 파일에 둡니다.
- 앱 레포에는 `.env.example`만 커밋합니다.
- `TEAM_CREDENTIALS_DIR` 안의 파일을 공개 레포로 복사하지 않습니다.
- CI에서는 같은 변수명을 secret manager에 등록합니다.
