# Expo Skills

Expo 앱을 프로젝트 생성부터 스토어 심사까지 실무 흐름으로 만들기 위한 공개 `SKILL.md` 플레이북입니다.

Codex, Claude Code, 또는 `SKILL.md` 기반 Agent Skills 패턴을 이해하는 AI 에이전트에서 사용할 수 있습니다.

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-CN.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Skills](https://img.shields.io/badge/skills-22-2ea44f)
![Expo](https://img.shields.io/badge/Expo-ready-000020)
![Codex](https://img.shields.io/badge/Codex-compatible-111827)
![Claude](https://img.shields.io/badge/Claude-compatible-6b46c1)

## 왜 만들었나요

Expo는 시작하기 쉽지만 실제 앱은 라우팅, UI 시스템, 인증, 저장소, 푸시, OTA, 서명 키, Apple/Google 콘솔, Fastlane, 버전 관리, 심사 정보까지 필요합니다.

이 저장소는 우리가 앱을 만들면서 불편했던 반복 작업을 공개 가능한 스킬로 분리해서, 누구나 AI 에이전트에게 단계별로 맡길 수 있게 만드는 것을 목표로 합니다.

## 포함된 것

- Expo 앱 생성, 마이그레이션, 기본 구조 설계
- Expo Router, 테마, 폰트, 아이콘, 시작 화면, OTA
- Supabase, Appwrite, Firebase 백엔드 스킬
- 인증, SecureStore, 카메라, 이미지, 파일 업로드, 오프라인 동기화
- 푸시 알림, 백그라운드 작업, 성능, 접근성, QA
- Apple/Google 콘솔, Android JKS, fastlane match, EAS Build/Submit
- 스토어 심사 정보, 개인정보, 권한, 데이터 안전성 템플릿
- 버전, 빌드 번호, runtimeVersion, OTA 안전성 체크
- EAS cloud build, local EAS build, OTA 선택 정책
- 로컬 로그인, OTP/2FA, Expo/EAS, Apple/Google, fastlane match, backend CLI를 자연스럽게 이어가는 릴리스 실행 스킬
- Codex와 Claude Code 설치 방법

## 설치

```bash
git clone https://github.com/uulab-official/expo-skills.git
cd expo-skills
```

### Codex

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
rsync -a --delete skills/ "${CODEX_HOME:-$HOME/.codex}/skills/"
```

### Claude Code

```bash
mkdir -p "$HOME/.claude/skills"
rsync -a --delete skills/ "$HOME/.claude/skills/"
```

### 둘 다 설치

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills" "$HOME/.claude/skills"
rsync -a --delete skills/ "${CODEX_HOME:-$HOME/.codex}/skills/"
rsync -a --delete skills/ "$HOME/.claude/skills/"
```

## 추천 사용 순서

1. `expo-skill-orchestrator`로 필요한 스킬을 고릅니다.
2. `expo-team-conventions`로 팀별 기본값을 적용합니다.
3. `expo-project-foundation`으로 앱 기반 구조를 만듭니다.
4. `expo-router-navigation`, `expo-ui-system`으로 화면 구조와 UI 시스템을 잡습니다.
5. `expo-startup-ota`, `expo-auth-secure-storage`로 시작 흐름과 인증을 붙입니다.
6. `expo-supabase-backend`, `expo-appwrite-backend`, `expo-firebase-backend` 중 백엔드를 고릅니다.
7. 미디어, 오프라인, 알림, 백그라운드, 성능 스킬을 추가합니다.
8. 스토어 출시 전 `expo-store-console-setup`, `expo-store-review-info`, `expo-android-jks-signing`, `expo-eas-build-strategy`, `expo-release-operator`, `expo-version-ota-governance`, `expo-fastlane-automation`, `expo-release-review`를 사용합니다.

## OTA와 빌드 정책

기본값은 EAS Update입니다. 작은 앱, MVP, 초기 운영, 현재 무료/유료 플랜 한도 안에 있는 앱은 Expo 서버를 쓰는 편이 가장 단순합니다.

2026-06-26 기준 Expo 공식 가격표에는 Free 플랜 EAS Update 한도가 `1,000 MAUs`, `100 GiB bandwidth`, `20 GiB storage`로 표시되어 있습니다. 가격과 한도는 바뀔 수 있으므로 릴리스 전 [Expo pricing](https://expo.dev/pricing)을 다시 확인하세요.

외부 업데이트 서버는 다음 조건에서 선택합니다.

- 자체 인프라, 커스텀 라우팅, 특수 보안/컴플라이언스가 필요함
- Expo CLI의 `eas update` 대신 별도 publish 파이프라인을 운영할 수 있음
- manifest 생성, asset hosting, monitoring, rollback을 팀이 책임질 수 있음

관련 문서:

- [docs/versioning-policy.md](docs/versioning-policy.md)
- [templates/update-server-policy.md](templates/update-server-policy.md)
- [templates/eas-build-policy.md](templates/eas-build-policy.md)
- [templates/release-state.example.json](templates/release-state.example.json)

## 앱 레포에 넣을 보일러플레이트

```bash
cp templates/EXPO_SKILLS.md /path/to/app/EXPO_SKILLS.md
mkdir -p /path/to/app/.expo-skills /path/to/app/docs /path/to/app/scripts
cp templates/profile.example.md /path/to/app/.expo-skills/profile.example.md
cp templates/app-intake.md /path/to/app/docs/app-intake.md
cp templates/release-state.example.json /path/to/app/release-state.json
cp docs/versioning-policy.md /path/to/app/docs/versioning-policy.md
cp templates/update-server-policy.md /path/to/app/docs/update-server-policy.md
cp templates/eas-build-policy.md /path/to/app/docs/eas-build-policy.md
cp templates/release-operator-session.md /path/to/app/docs/release-operator-session.md
cp templates/scripts/check-expo-release-state.js /path/to/app/scripts/check-expo-release-state.js
cp templates/scripts/check-ota-safety.js /path/to/app/scripts/check-ota-safety.js
cp templates/scripts/check-release-auth.js /path/to/app/scripts/check-release-auth.js
```

## 공개 안전 규칙

실제 Expo token, Apple/Google credential, JKS/keystore, provisioning profile, Firebase service account, Supabase service role key, Appwrite server API key, 심사용 비밀번호는 커밋하지 마세요.

공개 레포에는 `.env.example`, placeholder, 템플릿, 절차만 둡니다. 실제 값은 팀의 비공개 credential 저장소나 secret manager에서 관리하세요.

## 라이선스

MIT. 자세한 내용은 [LICENSE](LICENSE)를 참고하세요.
