# Contributing to StatusLane

Thanks for your interest in contributing to StatusLane! Uptime monitoring and incident tracking should be open and accessible to developers and agents alike, and every contribution helps.

Please read our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

## What you can work on

StatusLane is a multi-surface project:

- **Core engine** (`src/engine.ts`) — local monitoring checks, history, and incidents
- **TypeScript SDK** (`src/client.ts`) — `@talocode/statuslane`
- **CLI** (`src/cli.ts`) — the `statuslane` command
- **MCP server** (`src/mcp.ts`) — the `statuslane-mcp` server for agents
- **Local HTTP server** (`src/server.ts`) — the `statuslane-server` self-hosted API
- **Python SDK** (`python/`) — `talocode-statuslane`

Good first issues are usually labeled `good first issue`. If you want to work on something, say so in the issue thread so we don't duplicate effort.

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm
- Python 3.10 or newer (for the Python SDK)

### Set up the TypeScript project

```bash
git clone https://github.com/talocode/statuslane.git
cd statuslane
npm install
npm run build
npm test
```

The test suite uses Node's built-in test runner and lives in `tests/`.

### Set up the Python SDK

```bash
cd python
pip install -e .
```

## Opening an issue

Before opening a new issue, search the existing issues to see if it has already been reported.

- **Bug reports** — use the bug report template and include a minimal reproduction, expected vs. actual behavior, and your environment (OS, Node/Python versions).
- **Feature requests** — use the feature request template and explain the problem you are trying to solve, not just the feature you want.
- **Security issues** — do **not** open a public issue. See [SECURITY.md](SECURITY.md).

## Making a change

1. Fork the repository and create a feature branch:

   ```bash
   git checkout -b feat/your-feature
   ```

   Use a short, descriptive branch name such as `feat/alert-webhooks`, `fix/incident-resolution`, or `docs/contributing-guide`.

2. Make your change, keeping it focused. Smaller PRs are easier to review and merge.

3. Add or update tests for your change. Bug fixes should include a failing test that passes with the fix.

4. Run the checks:

   ```bash
   npm run build
   npm test
   ```

5. Commit with a clear message. We use conventional commit prefixes:

   - `feat:` — new capability
   - `fix:` — bug fix
   - `docs:` — documentation
   - `refactor:` — code change that does not alter behavior
   - `test:` — tests only
   - `chore:` — maintenance

   For example: `fix: resolve incident with an empty note`

## Pull request checklist

- [ ] Branch is based on the latest `main`
- [ ] Build passes (`npm run build`)
- [ ] Tests pass (`npm test`)
- [ ] New behavior is covered by tests
- [ ] README and SDK docs updated if the public surface changed
- [ ] Commit messages follow the conventional prefix convention
- [ ] Code of Conduct followed

## Review and merge

Maintainers review every PR. A change may be requested, and that is normal — it keeps the project healthy. Once approved, a maintainer merges the PR. If you would like to become a maintainer, open an issue and introduce yourself; contributions history matters.

## Questions

Open a discussion or an issue and we will help you get unstuck. Thank you for contributing to StatusLane!

MIT © Talocode
