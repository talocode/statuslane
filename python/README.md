# StatusLane Python SDK

**StatusLane is open-source uptime monitoring and incident tracking for developers and agents.** It turns endpoint failures into explicit checks, incidents, and a recovery history instead of waiting for users to report an outage.

Run monitoring locally with the open-source CLI, then use Talocode Cloud when you need managed schedules, alert routing, long-term history, and team operations.

## Install

```bash
pip install talocode-statuslane
```

## Quickstart

```python
from statuslane import StatusLaneClient

client = StatusLaneClient(api_key="your-key")
monitor = client.create_monitor("Tera", "https://teraai.chat")
print(client.check_monitor(monitor["id"]))
```

## Authentication

Set these environment variables for cloud calls:

```bash
export TALOCODE_API_KEY=your-key
export TALOCODE_BASE_URL=https://api.talocode.site
```

The client uses `https://api.talocode.site` by default and sends `Authorization: Bearer $TALOCODE_API_KEY`.

## Client methods

```python
client.health()
client.pricing()
client.capabilities()
client.create_monitor("API", "https://api.talocode.site/v1/statuslane/health")
client.list_monitors()
client.get_monitor("monitor-id")
client.check_monitor("monitor-id")
client.history("monitor-id")
client.open_incident("monitor-id", "Endpoint is unavailable")
client.resolve_incident("incident-id")
```

## Hosted API

| Method | Path | Purpose |
|---|---|---|
| GET | `/v1/statuslane/health` | Service health |
| GET | `/v1/statuslane/pricing` | Pricing data |
| GET | `/v1/statuslane/capabilities` | Supported operations |
| POST | `/v1/statuslane/monitors` | Create monitor |
| GET | `/v1/statuslane/monitors` | List monitors |
| POST | `/v1/statuslane/monitors/:id/check` | Run check |
| GET | `/v1/statuslane/monitors/:id/history` | Check history |
| POST | `/v1/statuslane/monitors/:id/incident` | Open incident |
| POST | `/v1/statuslane/incidents/:id/resolve` | Resolve incident |

## CLI

The npm package provides the local `statuslane` CLI and `statuslane-mcp` server. Install it with `npm install -g @talocode/statuslane` for local self-hosted checks.

## Talocode ecosystem

| Project | Package |
|---|---|
| [StatusLane](https://github.com/talocode/statuslane) | `pip install talocode-statuslane` (this package) |
| [Tera](https://github.com/talocode/tera) | `pip install talocode-tera` |
| [Codra](https://github.com/talocode/codra) | `pip install talocode-codra` |
| [VerifyLane](https://github.com/talocode/verifylane) | `pip install talocode-verifylane` |
| [TraceLane](https://github.com/talocode/tracelane) | `pip install talocode-tracelane` |
| [StackLane](https://github.com/talocode/stacklane) | `pip install talocode` |

More: [github.com/talocode](https://github.com/talocode) · [talocode.site](https://talocode.site) · [docs.talocode.site](https://docs.talocode.site)

MIT © Talocode
