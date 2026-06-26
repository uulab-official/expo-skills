#!/usr/bin/env node

const args = process.argv.slice(2);

function readFlag(name, fallback) {
  const index = args.indexOf(`--${name}`);
  if (index !== -1 && args[index + 1]) return args[index + 1];
  const prefix = `--${name}=`;
  const value = args.find((arg) => arg.startsWith(prefix));
  return value ? value.slice(prefix.length) : fallback;
}

const strict = args.includes('--strict');
const url = readFlag('url', process.env.CUSTOM_OTA_MANIFEST_URL);
const platform = readFlag('platform', process.env.CUSTOM_OTA_PLATFORM || 'ios');
const runtimeVersion = readFlag('runtime-version', process.env.CUSTOM_OTA_RUNTIME_VERSION || '1.0.0');

function finish(ok, message) {
  const prefix = ok ? '[custom-ota] OK' : '[custom-ota] FAIL';
  console[ok ? 'log' : 'error'](`${prefix}: ${message}`);
  if (!ok && strict) process.exit(1);
}

async function main() {
  if (!url) {
    finish(false, 'Set CUSTOM_OTA_MANIFEST_URL or pass --url https://updates.example.com/api/manifest.');
    return;
  }

  const response = await fetch(url, {
    headers: {
      'expo-protocol-version': '1',
      'expo-platform': platform,
      'expo-runtime-version': runtimeVersion,
      accept: 'application/expo+json, application/json, multipart/mixed',
    },
  });

  const protocol = response.headers.get('expo-protocol-version');
  const contentType = response.headers.get('content-type') || '';

  if (response.status === 204) {
    finish(protocol === '1', `no update for ${platform} runtime ${runtimeVersion}`);
    return;
  }

  if (!response.ok) {
    finish(false, `manifest request returned HTTP ${response.status}`);
    return;
  }

  if (protocol !== '1') {
    finish(false, 'missing response header expo-protocol-version: 1');
    return;
  }

  if (!contentType.includes('application/expo+json') && !contentType.includes('application/json')) {
    finish(false, `unexpected content-type: ${contentType}`);
    return;
  }

  const manifest = await response.json();
  const missing = ['id', 'createdAt', 'runtimeVersion', 'launchAsset', 'assets'].filter((key) => !(key in manifest));
  if (missing.length) {
    finish(false, `manifest is missing fields: ${missing.join(', ')}`);
    return;
  }

  if (manifest.runtimeVersion !== runtimeVersion) {
    finish(false, `runtime mismatch: expected ${runtimeVersion}, got ${manifest.runtimeVersion}`);
    return;
  }

  finish(true, `manifest ${manifest.id} is reachable for ${platform} runtime ${runtimeVersion}`);
}

main().catch((error) => {
  finish(false, error.message);
});
