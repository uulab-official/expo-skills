# Expo Skills

Expo アプリをプロジェクト作成からストア審査まで進めるための、実務向け公開 `SKILL.md` プレイブックです。

Codex、Claude Code、または `SKILL.md` ベースの Agent Skills パターンを扱える AI エージェントで利用できます。

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-CN.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Skills](https://img.shields.io/badge/skills-23-2ea44f)
![Expo](https://img.shields.io/badge/Expo-ready-000020)
![Codex](https://img.shields.io/badge/Codex-compatible-111827)
![Claude](https://img.shields.io/badge/Claude-compatible-6b46c1)

## 目的

Expo は始めやすい一方で、実際のアプリにはルーティング、UI システム、認証、ストレージ、プッシュ通知、OTA、署名キー、Apple/Google コンソール、fastlane、バージョン管理、審査情報が必要になります。

このリポジトリは、その繰り返し作業を公開可能なスキルとして分離し、誰でも AI エージェントに段階的に依頼できるようにするためのものです。

## 含まれるもの

- Expo アプリ作成、移行、ベース構造
- ボトムタブ、アプリバー、ボトムシートモーダル、設定画面、テーマ、スプラッシュ、アプリアイコンのアプリシェルボイラープレート
- Expo Router、テーマ、フォント、アイコン、スプラッシュ、OTA
- shimmer、skeleton、empty、error、offline、progress のローディングパターン
- Expo Router アプリ向けのコンポーネント構造とフォルダアーキテクチャ
- Supabase、Appwrite、Firebase バックエンド
- Supabase/Appwrite cloud または self-hosted 構成ドキュメント
- Kakao、Google、Apple ソーシャルログインのチェックリスト
- 認証、SecureStore、カメラ、画像、ファイルアップロード、オフライン同期
- プッシュ通知、バックグラウンドタスク、パフォーマンス、QA
- Apple/Google コンソール、Android JKS、fastlane match、EAS Build/Submit
- ストア審査、プライバシー、権限、データセーフティのテンプレート
- バージョン、ビルド番号、runtimeVersion、OTA 安全性チェック
- EAS cloud build、local EAS build、OTA の選択ポリシー
- ローカルログイン、OTP/2FA、Expo/EAS、Apple/Google、fastlane match、backend CLI を自然につなぐリリース実行スキル
- Codex と Claude Code のインストール手順

## インストール

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

## 推奨フロー

1. `expo-skill-orchestrator` で必要なスキルを選びます。
2. `expo-team-conventions` でチームのデフォルトを適用します。
3. `expo-project-foundation` でアプリの基盤を作ります。
4. `expo-app-shell-boilerplate` で共通アプリシェルを作り、`expo-router-navigation` と `expo-ui-system` で画面構成と UI を整えます。
5. `expo-startup-ota` と `expo-auth-secure-storage` で起動処理と認証を追加します。
6. `expo-supabase-backend`、`expo-appwrite-backend`、`expo-firebase-backend` からバックエンドを選びます。
7. メディア、オフライン、通知、バックグラウンド、品質系のスキルを追加します。
8. リリース前に `expo-store-console-setup`、`expo-store-review-info`、`expo-android-jks-signing`、`expo-eas-build-strategy`、`expo-release-operator`、`expo-version-ota-governance`、`expo-fastlane-automation`、`expo-release-review` を使います。

## OTA とビルド方針

デフォルトは EAS Update です。小規模アプリ、MVP、初期運用、現在の無料または有料プランの範囲内であれば、Expo のサーバーを使うのが最もシンプルです。

2026-06-26 時点の Expo 公式価格ページでは、Free プランの EAS Update は `1,000 MAUs`、`100 GiB bandwidth`、`20 GiB storage` と記載されています。価格や上限は変更される可能性があるため、リリース前に [Expo pricing](https://expo.dev/pricing) を確認してください。

カスタム更新サーバーは、次のような場合に選びます。

- 自社インフラ、カスタムルーティング、特別なセキュリティやコンプライアンスが必要
- `eas update` ではなく独自の publish パイプラインを運用できる
- manifest 生成、asset hosting、monitoring、rollback をチームが責任を持って扱える

関連ドキュメント:

- [docs/versioning-policy.md](docs/versioning-policy.md)
- [templates/update-server-policy.md](templates/update-server-policy.md)
- [templates/eas-build-policy.md](templates/eas-build-policy.md)
- [templates/release-state.example.json](templates/release-state.example.json)

## アプリリポジトリ用ボイラープレート

```bash
mkdir -p /path/to/app/.expo-skills /path/to/app/docs /path/to/app/scripts
cp templates/EXPO_SKILLS.md /path/to/app/EXPO_SKILLS.md
cp templates/profile.example.md /path/to/app/.expo-skills/profile.example.md
cp templates/app-intake.md /path/to/app/docs/app-intake.md
cp templates/backend-deployment.md /path/to/app/docs/backend-deployment.md
cp templates/social-auth-providers.md /path/to/app/docs/social-auth-providers.md
cp templates/app-shell-blueprint.md /path/to/app/docs/app-shell-blueprint.md
cp templates/brand-assets-checklist.md /path/to/app/docs/brand-assets-checklist.md
cp templates/component-architecture.md /path/to/app/docs/component-architecture.md
cp templates/ui-loading-patterns.md /path/to/app/docs/ui-loading-patterns.md
cp templates/release-state.example.json /path/to/app/release-state.json
cp docs/versioning-policy.md /path/to/app/docs/versioning-policy.md
cp templates/update-server-policy.md /path/to/app/docs/update-server-policy.md
cp templates/eas-build-policy.md /path/to/app/docs/eas-build-policy.md
cp templates/release-operator-session.md /path/to/app/docs/release-operator-session.md
cp templates/scripts/check-expo-release-state.js /path/to/app/scripts/check-expo-release-state.js
cp templates/scripts/check-ota-safety.js /path/to/app/scripts/check-ota-safety.js
cp templates/scripts/check-release-auth.js /path/to/app/scripts/check-release-auth.js
```

## 公開リポジトリの安全ルール

実際の Expo token、Apple/Google credential、JKS/keystore、provisioning profile、Firebase service account、Supabase service role key、Appwrite server API key、審査用パスワードはコミットしないでください。

公開リポジトリには `.env.example`、placeholder、テンプレート、手順だけを置きます。実際の値は非公開の credential ストレージまたは secret manager で管理してください。

## ライセンス

MIT. 詳細は [LICENSE](LICENSE) を参照してください。
