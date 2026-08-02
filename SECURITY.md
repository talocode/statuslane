# Security Policy

StatusLane takes security seriously. We appreciate responsible disclosure of vulnerabilities and will acknowledge valid reports promptly.

## Reporting a vulnerability

Please **do not** open a public issue for security problems.

Prefer GitHub private vulnerability reporting:

- https://github.com/talocode/statuslane/security/advisories/new

You can also reach the maintainers directly at **security@talocode.site**.

When reporting, include:

- The affected component (CLI, TypeScript SDK, Python SDK, MCP server, local HTTP server)
- Steps to reproduce
- The impact you observed
- Your environment (OS, Node/Python versions)

We aim to acknowledge reports within 5 business days and to keep you updated as we triage and fix the issue. We will credit reporters in the security advisory unless they prefer to stay anonymous.

## Supported versions

| Version | Supported |
|---|---|
| Latest release | ✅ |
| Older releases | ⚠️ Best effort |

Security fixes are released for the latest version of each published package (`@talocode/statuslane`, `talocode-statuslane`). Backports to older versions are handled case by case.

## Scope

The open-source StatusLane repository and its published npm and PyPI packages. The hosted Talocode Cloud API is operated separately; report issues with it through the same channels.

MIT © Talocode
