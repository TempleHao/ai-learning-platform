# Site Audit · 2026-10-10

Current published version: v0.17 · 38 learning nodes. v0.18 remains in development.

## Changes delivered

- Replaced legacy `site/labs.html` with a redirect and fallback links to `progress.html` and `labs/index.html`. This removes a known mismatch between legacy DOM IDs and the current progress script.
- Added `scripts/validate-site.mjs`, a dependency-free Node.js static checker.

## Checks performed

- Scanned 30 HTML pages for local link targets and balanced section/article/nav/main tags.
- Scanned 41 JS/CSS/JSON assets for syntax/parse issues and CSS brace balance.
- No new issues found in these static checks.
- Verified that the two related GitHub Pages runs completed successfully.

## Running the validator

From repository root:

```sh
node scripts/validate-site.mjs
```

The validator checks local link targets, simple HTML tag balance, JavaScript syntax, JSON parsing, and CSS brace balance. It does not replace browser interaction tests, accessibility testing, or external URL validation.

## Remaining work

The Pages workflow has not yet been updated to run the validator automatically; a workflow write attempt was blocked. Consequently a successful Pages build does not yet prove that the validator ran. Add the validator as a required pre-deployment step once workflow editing is available.

Deep Dive 10 / Lab 12 online integration remains pending. Source documents already exist; do not count these as published learning nodes.
