#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
let failed = false;

function fail(message) {
  failed = true;
  console.error(`[validate] ${message}`);
}

function warn(message) {
  console.warn(`[validate] warning: ${message}`);
}

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function walk(dir) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return [];
  const out = [];
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['.git', 'tmp', 'node_modules'].includes(entry.name)) continue;
      out.push(...walk(rel));
    } else {
      out.push(rel);
    }
  }
  return out;
}

function validateSkills() {
  const skillsDir = path.join(root, 'skills');
  const skillNames = fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const name of skillNames) {
    const skillPath = `skills/${name}/SKILL.md`;
    const absSkillPath = path.join(root, skillPath);
    if (!fs.existsSync(absSkillPath)) {
      fail(`${skillPath} is missing.`);
      continue;
    }

    const content = fs.readFileSync(absSkillPath, 'utf8');
    const match = content.match(/^---\n([\s\S]*?)\n---\n/);
    if (!match) {
      fail(`${skillPath} is missing YAML frontmatter.`);
      continue;
    }

    const fields = Object.fromEntries(
      match[1]
        .split('\n')
        .filter(Boolean)
        .map((line) => {
          const index = line.indexOf(':');
          return index === -1 ? [line.trim(), ''] : [line.slice(0, index).trim(), line.slice(index + 1).trim()];
        })
    );

    if (fields.name !== name) fail(`${skillPath} frontmatter name must match folder name.`);
    if (!fields.description || fields.description.length < 24) fail(`${skillPath} needs a useful description.`);
    if (/\[TODO\]|TODO:|TBD/.test(content)) fail(`${skillPath} contains TODO/TBD placeholder text.`);

    const agentPath = path.join(root, 'skills', name, 'agents', 'openai.yaml');
    if (!fs.existsSync(agentPath)) warn(`${name} has no agents/openai.yaml metadata.`);
  }

  return skillNames.length;
}

function validateBadges(skillCount) {
  for (const file of ['README.md', 'README.ko.md', 'README.ja.md', 'README.zh-CN.md']) {
    const content = read(file);
    const badge = content.match(/skills-(\d+)-/);
    if (!badge) {
      fail(`${file} has no skills badge.`);
      continue;
    }
    if (Number(badge[1]) !== skillCount) {
      fail(`${file} skills badge is ${badge[1]}, expected ${skillCount}.`);
    }
  }
}

function validateBoilerplateDocs() {
  const readme = read('README.md');
  if (!readme.includes('mkdir -p /path/to/app/.expo-skills /path/to/app/docs /path/to/app/scripts')) {
    fail('README boilerplate must create .expo-skills, docs, and scripts directories before cp commands.');
  }

  const baseStructure = read('templates/base-structure.md');
  for (const scriptName of ['typecheck', 'lint', 'test', 'release:check', 'ota:check', 'release:auth', 'verify']) {
    if (!baseStructure.includes(`"${scriptName}"`)) {
      fail(`templates/base-structure.md should document package script ${scriptName}.`);
    }
  }
}

function validateJavaScriptSyntax() {
  const files = [...walk('scripts'), ...walk('templates/scripts')].filter((file) => file.endsWith('.js'));
  for (const file of files) {
    const result = spawnSync(process.execPath, ['--check', path.join(root, file)], { encoding: 'utf8' });
    if (result.status !== 0) {
      fail(`${file} has invalid JS syntax:\n${result.stderr || result.stdout}`);
    }
  }
}

function validatePublicSafety() {
  const files = [
    'README.md',
    'README.ko.md',
    'README.ja.md',
    'README.zh-CN.md',
    'CHANGELOG.md',
    'CONTRIBUTING.md',
    'SECURITY.md',
    'CODEX.md',
    'CLAUDE.md',
    ...walk('docs'),
    ...walk('skills'),
    ...walk('templates'),
    ...walk('examples'),
    ...walk('.github'),
  ].filter((file) => fs.existsSync(path.join(root, file)));

  const assignmentPatterns = [
    { name: 'Supabase service role assignment', regex: /(SUPABASE_(SERVICE_ROLE|SECRET)_KEY)\s*=\s*([^\s"'`|]+)/ },
    { name: 'Expo token assignment', regex: /(EXPO_TOKEN)\s*=\s*([^\s"'`|]+)/ },
    { name: 'Match password assignment', regex: /(MATCH_PASSWORD)\s*=\s*([^\s"'`|]+)/ },
    { name: 'Android keystore password assignment', regex: /(ANDROID_(KEYSTORE|KEY)_PASSWORD)\s*=\s*([^\s"'`|]+)/ },
    { name: 'Review demo password assignment', regex: /(APP_REVIEW_DEMO_PASSWORD)\s*=\s*([^\s"'`|]+)/ },
  ];

  const filePatterns = [
    { name: 'App Store Connect private key filename', regex: /AuthKey_[A-Z0-9]{10}\.p8/ },
    { name: 'Private key block', regex: /-----BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY-----/ },
  ];

  for (const file of files) {
    const content = fs.readFileSync(path.join(root, file), 'utf8');
    for (const pattern of filePatterns) {
      if (pattern.regex.test(content)) {
        fail(`${file} appears to contain ${pattern.name}.`);
      }
    }

    content.split('\n').forEach((line, index) => {
      for (const pattern of assignmentPatterns) {
        const match = line.match(pattern.regex);
        if (!match) continue;

        const value = match[match.length - 1];
        const isPlaceholder =
          !value ||
          value === '.+\\S' ||
          value === '.+\\\\S' ||
          value.includes('PLACEHOLDER') ||
          value.includes('example') ||
          value.startsWith('<') ||
          value.startsWith('$');

        if (!isPlaceholder) {
          fail(`${file}:${index + 1} appears to contain ${pattern.name}.`);
        }
      }
    });
  }
}

const skillCount = validateSkills();
validateBadges(skillCount);
validateBoilerplateDocs();
validateJavaScriptSyntax();
validatePublicSafety();

if (failed) {
  process.exit(1);
}

console.log(`[validate] OK: ${skillCount} skills`);
