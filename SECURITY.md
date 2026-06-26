# Security Policy

Skills are instructions for coding agents. Treat every third-party skill as code-adjacent and review it before installing.

## Supported Versions

This repository is distributed as source. Use the latest commit on the default branch unless your team pins a known revision.

## Reporting A Vulnerability

Use GitHub's private vulnerability reporting or security advisory flow for this repository when it is available.

If private reporting is not available, open a public issue that contains no sensitive details and ask a maintainer to enable a private channel. Do not include exploit steps, secrets, private app identifiers, or account-specific data in that public issue.

Do not open a public issue containing:

- tokens
- passwords
- private keys
- service account JSON
- keystores
- provisioning profiles
- private app identifiers tied to unreleased products

## Maintainer Rules

- Never request users to paste secrets into public issues.
- Replace real values with placeholders in examples.
- Prefer official documentation links for store, signing, and backend setup.
- Remove any committed private credential immediately and rotate it outside this repository.
