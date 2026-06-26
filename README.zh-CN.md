# Expo Skills

这是一套公开的 `SKILL.md` 实战手册，用于把 Expo 应用从项目创建推进到应用商店审核。

它可用于 Codex、Claude Code，或任何理解 Agent Skills 模式的 AI 代理。基本格式是一个包含 `SKILL.md` 的技能文件夹。

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-CN.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Skills](https://img.shields.io/badge/skills-22-2ea44f)
![Expo](https://img.shields.io/badge/Expo-ready-000020)
![Codex](https://img.shields.io/badge/Codex-compatible-111827)
![Claude](https://img.shields.io/badge/Claude-compatible-6b46c1)

## 为什么需要它

Expo 很适合入门，但真实应用通常还需要路由、UI 系统、认证、存储、推送、OTA、签名密钥、Apple/Google 控制台、fastlane、版本管理和审核资料。

这个仓库把这些重复流程拆成可公开共享的技能，让任何人都能让 AI 代理按步骤完成更接近生产环境的 Expo 工作。

## 包含内容

- Expo 应用创建、迁移和基础结构
- Expo Router、主题、字体、图标、启动页和 OTA
- shimmer、skeleton、empty、error、offline、progress 加载状态模式
- 面向 Expo Router 应用的组件结构和文件夹架构
- Supabase、Appwrite、Firebase 后端技能
- Supabase/Appwrite cloud 或 self-hosted 配置文档
- Kakao、Google、Apple 社交登录检查清单
- 认证、SecureStore、相机、图片、文件上传和离线同步
- 推送通知、后台任务、性能、可访问性和 QA
- Apple/Google 控制台、Android JKS、fastlane match、EAS Build/Submit
- 商店审核、隐私、权限和数据安全模板
- 版本号、构建号、runtimeVersion 和 OTA 安全检查
- EAS cloud build、local EAS build 和 OTA 的选择策略
- 串联本地登录、OTP/2FA、Expo/EAS、Apple/Google、fastlane match 和 backend CLI 的交互式发布执行技能
- Codex 与 Claude Code 安装方法

## 安装

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

## 推荐使用流程

1. 使用 `expo-skill-orchestrator` 选择合适的技能。
2. 使用 `expo-team-conventions` 应用团队默认值。
3. 使用 `expo-project-foundation` 建立应用基础结构。
4. 使用 `expo-router-navigation` 和 `expo-ui-system` 搭建页面和 UI 系统。
5. 使用 `expo-startup-ota` 和 `expo-auth-secure-storage` 处理启动流程和认证。
6. 在 `expo-supabase-backend`、`expo-appwrite-backend`、`expo-firebase-backend` 中选择后端。
7. 根据需要添加媒体、离线、通知、后台任务和质量相关技能。
8. 发布前使用 `expo-store-console-setup`、`expo-store-review-info`、`expo-android-jks-signing`、`expo-eas-build-strategy`、`expo-release-operator`、`expo-version-ota-governance`、`expo-fastlane-automation`、`expo-release-review`。

## OTA 与构建策略

默认推荐 EAS Update。对于小型应用、MVP、早期生产环境，以及仍在当前免费或付费计划限制内的项目，使用 Expo 服务器通常最简单。

截至 2026-06-26，Expo 官方价格页面显示 Free 计划的 EAS Update 限额为 `1,000 MAUs`、`100 GiB bandwidth`、`20 GiB storage`。价格和限额可能变化，发布前请重新检查 [Expo pricing](https://expo.dev/pricing)。

只有在以下场景才建议使用自定义更新服务器。

- 需要私有基础设施、自定义路由、特殊安全或合规要求
- 团队能够维护替代 `eas update` 的发布流程
- 团队能够负责 manifest 生成、asset hosting、monitoring 和 rollback

相关文档:

- [docs/versioning-policy.md](docs/versioning-policy.md)
- [templates/update-server-policy.md](templates/update-server-policy.md)
- [templates/eas-build-policy.md](templates/eas-build-policy.md)
- [templates/release-state.example.json](templates/release-state.example.json)

## 应用仓库样板文件

```bash
mkdir -p /path/to/app/.expo-skills /path/to/app/docs /path/to/app/scripts
cp templates/EXPO_SKILLS.md /path/to/app/EXPO_SKILLS.md
cp templates/profile.example.md /path/to/app/.expo-skills/profile.example.md
cp templates/app-intake.md /path/to/app/docs/app-intake.md
cp templates/backend-deployment.md /path/to/app/docs/backend-deployment.md
cp templates/social-auth-providers.md /path/to/app/docs/social-auth-providers.md
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

## 公开仓库安全规则

不要提交真实的 Expo token、Apple/Google credential、JKS/keystore、provisioning profile、Firebase service account、Supabase service role key、Appwrite server API key 或审核账号密码。

公开仓库只应包含 `.env.example`、placeholder、模板和流程说明。真实值应放在私有 credential 存储或 secret manager 中。

## 许可证

MIT. 详情见 [LICENSE](LICENSE)。
