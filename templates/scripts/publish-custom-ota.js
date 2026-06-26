#!/usr/bin/env node

const args = process.argv.slice(2);

function readFlag(name, fallback) {
  const index = args.indexOf(`--${name}`);
  if (index !== -1 && args[index + 1]) return args[index + 1];
  const prefix = `--${name}=`;
  const value = args.find((arg) => arg.startsWith(prefix));
  return value ? value.slice(prefix.length) : fallback;
}

const flavor = readFlag('flavor', process.env.APP_VARIANT || 'staging');
const platform = readFlag('platform', process.env.CUSTOM_OTA_PLATFORM || 'all');
const runtimeVersion = readFlag('runtime-version', process.env.CUSTOM_OTA_RUNTIME_VERSION);
const assetBaseUrl = readFlag('asset-base-url', process.env.CUSTOM_OTA_ASSET_BASE_URL);
const manifestEndpoint = readFlag('manifest-url', process.env.CUSTOM_OTA_MANIFEST_URL);

const missing = [];
if (!runtimeVersion) missing.push('CUSTOM_OTA_RUNTIME_VERSION or --runtime-version');
if (!assetBaseUrl) missing.push('CUSTOM_OTA_ASSET_BASE_URL or --asset-base-url');
if (!manifestEndpoint) missing.push('CUSTOM_OTA_MANIFEST_URL or --manifest-url');

console.log('[custom-ota] Publish scaffold');
console.log(`[custom-ota] flavor=${flavor}`);
console.log(`[custom-ota] platform=${platform}`);

if (missing.length) {
  console.error(`[custom-ota] Missing required values: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('[custom-ota] Implement project-specific steps here:');
console.log('1. Run npm run verify and npm run ota:check.');
console.log('2. Export JS/assets with the current Expo CLI export command.');
console.log('3. Upload immutable assets to storage/CDN.');
console.log('4. Generate and optionally sign the Expo Updates manifest.');
console.log('5. Insert/promote the update in the custom OTA server database.');
console.log('6. Run node scripts/check-custom-ota-server.js --strict with the target runtime.');

process.exit(1);
