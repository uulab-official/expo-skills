#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = process.cwd();

const nativeRiskPatterns = [
  /^app\.json$/,
  /^app\.config\./,
  /^app\.base\.json$/,
  /^eas\.json$/,
  /^package\.json$/,
  /^package-lock\.json$/,
  /^yarn\.lock$/,
  /^pnpm-lock\.yaml$/,
  /^ios\//,
  /^android\//,
  /(^|\/)plugins?\//,
  /(^|\/)assets\/.*(icon|splash|adaptive|foreground|monochrome)/i
];

function fail(message) {
  console.error(`[ota:check] ${message}`);
  process.exitCode = 1;
}

function warn(message) {
  console.warn(`[ota:check] warning: ${message}`);
}

function readJson(file) {
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function changedFiles() {
  const { execSync } = require('child_process');
  const base = process.env.OTA_BASE_REF || 'HEAD';
  try {
    const output = execSync(`git diff --name-only ${base}`, { encoding: 'utf8' });
    return output.split('\n').filter(Boolean);
  } catch (error) {
    fail(`Could not inspect git diff against ${base}: ${error.message}`);
    return [];
  }
}

const releaseState = readJson(path.join(root, 'release-state.json'));
if (!releaseState) {
  fail('Missing release-state.json. OTA target runtime/channel cannot be checked.');
}

const files = changedFiles();
const risky = files.filter((file) => nativeRiskPatterns.some((pattern) => pattern.test(file)));

if (risky.length) {
  fail(`OTA includes files that may require a new binary: ${risky.join(', ')}`);
}

if (releaseState) {
  if (!releaseState.runtimeVersion) fail('release-state.runtimeVersion is required for OTA.');
  if (!releaseState.channel) fail('release-state.channel is required for OTA.');
  if (!releaseState.branch) fail('release-state.branch is required for OTA.');
  if (!releaseState.updateServerMode) fail('release-state.updateServerMode is required for OTA.');
  if (!releaseState.updatesUrl) fail('release-state.updatesUrl is required for OTA.');
  if (releaseState.updateServerMode === 'custom' && !releaseState.customUpdatePublishCommand) {
    fail('custom update server mode requires release-state.customUpdatePublishCommand.');
  }
  if (releaseState.updateServerMode === 'eas' && !releaseState.easUpdateLimitCheckedAt) {
    warn('EAS Update mode should record release-state.easUpdateLimitCheckedAt after checking current Expo pricing.');
  }
}

if (!process.exitCode) {
  console.log('[ota:check] OK');
}
