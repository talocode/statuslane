# StatusLane

**Open-source uptime monitoring, incident tracking, and status pages for developers and agents.**

StatusLane exists because a failed endpoint should become an actionable incident, not a surprise reported by users. Run checks locally for free, or use hosted monitoring for managed schedules, alert routing, history, and team operations.

## Install

```bash
npm install -g @talocode/statuslane
pip install talocode-statuslane
```

## Quickstart

```bash
statuslane monitor-add --name "Tera" --url "https://teraai.chat"
statuslane monitor-list
```

Use the local HTTP server when you want a self-hosted API:

```bash
statuslane-server
curl http://localhost:3070/v1/statuslane/health
```

## JavaScript SDK

```ts
import { createMonitor, checkMonitor } from '@talocode/statuslane'

const monitor = createMonitor({ name: 'Tera', url: 'https://teraai.chat' })
console.log(await checkMonitor(monitor.id))
```

For hosted monitoring:

```ts
import { StatusLaneClient } from '@talocode/statuslane'

const client = new StatusLaneClient({ apiKey: process.env.TALOCODE_API_KEY })
await client.createMonitor({ name: 'Tera', url: 'https://teraai.chat' })
```

## Python SDK

```python
from statuslane import StatusLaneClient

client = StatusLaneClient(api_key="your-key")
monitor = client.create_monitor("Tera", "https://teraai.chat")
print(client.check_monitor(monitor["id"]))
```

## CLI

```bash
statuslane health
statuslane monitor-add --name "API" --url "https://api.talocode.site/v1/statuslane/health"
statuslane monitor-check --monitor <monitor-id>
statuslane history --monitor <monitor-id>
statuslane incident-open --monitor <monitor-id> --note "Endpoint is unavailable"
statuslane incident-resolve --incident <incident-id>
```

## MCP

```bash
statuslane-mcp
```

Tools: `statuslane_create_monitor`, `statuslane_check_monitor`, `statuslane_list_monitors`, `statuslane_history`, `statuslane_open_incident`, and `statuslane_resolve_incident`.

## Hosted API

Set:

```bash
export TALOCODE_API_KEY=your-key
export TALOCODE_BASE_URL=https://api.talocode.site
```

| Method | Path | Purpose |
|---|---|---|
| GET | `/v1/statuslane/health` | Service health |
| GET | `/v1/statuslane/pricing` | Credit pricing |
| GET | `/v1/statuslane/capabilities` | Supported operations |
| POST | `/v1/statuslane/monitors` | Create a monitor |
| GET | `/v1/statuslane/monitors` | List monitors |
| GET | `/v1/statuslane/monitors/:id` | Get monitor |
| POST | `/v1/statuslane/monitors/:id/check` | Run a check |
| GET | `/v1/statuslane/monitors/:id/history` | Check history |
| POST | `/v1/statuslane/monitors/:id/incident` | Open incident |
| POST | `/v1/statuslane/incidents/:id/resolve` | Resolve incident |

## Talocode ecosystem

| Project | What it is |
|---|---|
| [StatusLane](https://github.com/talocode/statuslane) | Uptime monitoring and incidents (this repo) |
| [Tera](https://github.com/talocode/tera) | AI learning companion |
| [Codra](https://github.com/talocode/codra) | Coding agent |
| [StackLane](https://github.com/talocode/stacklane) | Cloud projects, keys, and credits |
| [VerifyLane](https://github.com/talocode/verifylane) | Deterministic verification |
| [TraceLane](https://github.com/talocode/tracelane) | Agent run tracing |
| [RetryLane](https://github.com/talocode/retrylane) | Retries and circuit breakers |
| [PolicyLane](https://github.com/talocode/policylane) | Agent policy control |
| [MemoryLane](https://github.com/talocode/memorylane) | Durable agent memory |
| [VideoLane](https://github.com/talocode/videolane) | Product video workflows |

More: [github.com/talocode](https://github.com/talocode) · [talocode.site](https://talocode.site) · [docs.talocode.site](https://docs.talocode.site)

## Code of Conduct

Please note that this project is released with a [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## License

MIT © Talocode
