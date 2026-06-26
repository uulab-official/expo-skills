#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

const targets = process.argv.slice(2);
const selected = new Set(targets.length ? targets : ['expo']);
let failed = false;

function markFail(message) {
  failed = true;
  console.error(`[release-auth] ${message}`);
}

function markWarn(message) {
  console.warn(`[release-auth] warning: ${message}`);
}

function commandExists(command) {
  try {
    execSync(`command -v ${command}`, { stdio: 'ignore', shell: '/bin/sh' });
    return true;
  } catch {
    return false;
  }
}

function requireCommand(command, target) {
  if (!commandExists(command)) {
    markFail(`${target} requires '${command}' on PATH.`);
  }
}

function requireEnv(name, target) {
  if (!process.env[name]) {
    markFail(`${target} requires env ${name}.`);
  }
}

function checkPathEnv(name, target) {
  const value = process.env[name];
  if (!value) {
    markFail(`${target} requires env ${name} pointing to a private file path.`);
    return;
  }
  if (!fs.existsSync(value)) {
    markFail(`${target} env ${name} points to a missing file.`);
  }
}

function maybePathEnv(name, target) {
  const value = process.env[name];
  if (value && !fs.existsSync(value)) {
    markFail(`${target} env ${name} points to a missing file.`);
  }
}

if (selected.has('expo')) {
  requireCommand('node', 'Expo');
  if (!commandExists('eas')) {
    markWarn("EAS CLI command 'eas' is not on PATH. Install it or use npx/project scripts before building.");
  }
  if (!process.env.EXPO_TOKEN) {
    markWarn('EXPO_TOKEN is not set. Interactive Expo login may still work via npx expo login or eas account:login.');
  }
}

if (selected.has('ios')) {
  requireEnv('ASC_KEY_ID', 'iOS/App Store Connect');
  requireEnv('ASC_ISSUER_ID', 'iOS/App Store Connect');
  checkPathEnv('ASC_KEY_PATH', 'iOS/App Store Connect');
}

if (selected.has('android')) {
  checkPathEnv('GOOGLE_PLAY_SERVICE_ACCOUNT_JSON', 'Google Play');
  maybePathEnv('ANDROID_KEYSTORE_PATH', 'Android signing');
}

if (selected.has('fastlane') || selected.has('fastlane-match')) {
  requireCommand('fastlane', 'fastlane');
}

if (selected.has('fastlane-match')) {
  if (!process.env.MATCH_GIT_URL && !process.env.MATCH_GCS_BUCKET && !process.env.MATCH_S3_BUCKET) {
    markFail('fastlane match requires one storage env: MATCH_GIT_URL, MATCH_GCS_BUCKET, or MATCH_S3_BUCKET.');
  }
  requireEnv('MATCH_PASSWORD', 'fastlane match');
}

if (selected.has('firebase')) {
  requireCommand('firebase', 'Firebase');
  if (!process.env.FIREBASE_TOKEN && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    markWarn('Firebase has no FIREBASE_TOKEN or GOOGLE_APPLICATION_CREDENTIALS. Browser login may still work via firebase login.');
  }
  maybePathEnv('GOOGLE_APPLICATION_CREDENTIALS', 'Firebase');
}

if (selected.has('supabase')) {
  requireCommand('supabase', 'Supabase');
  if (!process.env.SUPABASE_ACCESS_TOKEN) {
    markWarn('SUPABASE_ACCESS_TOKEN is not set. Interactive login may still work via supabase login.');
  }
}

if (selected.has('appwrite')) {
  requireCommand('appwrite', 'Appwrite');
  if (!process.env.APPWRITE_API_KEY) {
    markWarn('APPWRITE_API_KEY is not set. Interactive login may still work via appwrite login.');
  }
}

if (failed) {
  process.exitCode = 1;
} else {
  console.log(`[release-auth] OK for targets: ${Array.from(selected).join(', ')}`);
}
