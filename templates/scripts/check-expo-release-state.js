#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const releaseStatePath = path.join(root, 'release-state.json');

function readJson(file) {
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function getExpoConfig() {
  const appJson = readJson(path.join(root, 'app.json'));
  if (appJson && appJson.expo) return appJson.expo;

  const appBaseJson = readJson(path.join(root, 'app.base.json'));
  if (appBaseJson && appBaseJson.expo) return appBaseJson.expo;
  if (appBaseJson) return appBaseJson;

  return null;
}

function fail(message) {
  console.error(`[release:check] ${message}`);
  process.exitCode = 1;
}

function warn(message) {
  console.warn(`[release:check] warning: ${message}`);
}

const releaseState = readJson(releaseStatePath);
const expo = getExpoConfig();
const eas = readJson(path.join(root, 'eas.json'));

if (!releaseState) {
  fail('Missing release-state.json. Copy templates/release-state.example.json and fill it in.');
}

if (!expo) {
  fail('Missing app.json/app.base.json Expo config. Dynamic app.config.* projects should mirror release fields in release-state.json or extend this checker.');
}

if (releaseState && expo) {
  if (expo.version && expo.version !== releaseState.version) {
    fail(`expo.version (${expo.version}) does not match release-state.version (${releaseState.version}).`);
  }

  if (expo.runtimeVersion && typeof expo.runtimeVersion === 'string' && expo.runtimeVersion !== releaseState.runtimeVersion) {
    fail(`expo.runtimeVersion (${expo.runtimeVersion}) does not match release-state.runtimeVersion (${releaseState.runtimeVersion}).`);
  }

  const iosBuild = expo.ios && expo.ios.buildNumber;
  if (iosBuild && String(iosBuild) !== String(releaseState.iosBuildNumber)) {
    fail(`ios.buildNumber (${iosBuild}) does not match release-state.iosBuildNumber (${releaseState.iosBuildNumber}).`);
  }

  const androidCode = expo.android && expo.android.versionCode;
  if (androidCode && Number(androidCode) !== Number(releaseState.androidVersionCode)) {
    fail(`android.versionCode (${androidCode}) does not match release-state.androidVersionCode (${releaseState.androidVersionCode}).`);
  }

  if (Number(releaseState.androidVersionCode) > 2100000000) {
    fail('androidVersionCode must stay below Android maximum versionCode.');
  }

  const updatesUrl = expo.updates && expo.updates.url;
  if (releaseState.updatesUrl && updatesUrl && updatesUrl !== releaseState.updatesUrl) {
    fail(`expo.updates.url (${updatesUrl}) does not match release-state.updatesUrl (${releaseState.updatesUrl}).`);
  }

  if (releaseState.updateServerMode === 'custom' && !releaseState.customUpdatePublishCommand) {
    fail('custom update server mode requires release-state.customUpdatePublishCommand.');
  }

  if (releaseState.updateServerMode === 'eas') {
    if (!releaseState.easUpdateLimitCheckedAt) {
      warn('EAS Update mode should record release-state.easUpdateLimitCheckedAt after checking https://expo.dev/pricing.');
    }

    const limit = Number(releaseState.easUpdateMonthlyActiveUsersLimit);
    const estimate = Number(releaseState.otaEstimatedMonthlyActiveUsers);
    if (Number.isFinite(limit) && limit > 0 && Number.isFinite(estimate) && estimate > limit) {
      warn(`estimated OTA MAUs (${estimate}) exceed recorded EAS Update limit (${limit}); review plan or custom update server policy.`);
    }
  }
}

if (eas && releaseState) {
  const cliVersionSource = eas.cli && eas.cli.appVersionSource;
  if (releaseState.versionSource && cliVersionSource && cliVersionSource !== releaseState.versionSource) {
    fail(`eas.cli.appVersionSource (${cliVersionSource}) does not match release-state.versionSource (${releaseState.versionSource}).`);
  }

  const production = eas.build && eas.build.production;
  if (production && releaseState.channel && production.channel && production.channel !== releaseState.channel) {
    fail(`production channel (${production.channel}) does not match release-state.channel (${releaseState.channel}).`);
  }
}

if (!process.exitCode) {
  console.log('[release:check] OK');
}
