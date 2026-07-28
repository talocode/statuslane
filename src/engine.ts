export type Monitor = { id: string; name: string; url: string; expectedStatus: number; timeoutMs: number; createdAt: string }
export type Check = { id: string; monitorId: string; ok: boolean; status: number | null; latencyMs: number; error: string | null; checkedAt: string }
export type Incident = { id: string; monitorId: string; status: 'open' | 'resolved'; startedAt: string; resolvedAt: string | null; note: string | null }

const monitors = new Map<string, Monitor>()
const checks = new Map<string, Check[]>()
const incidents = new Map<string, Incident>()
let sequence = 0
const id = (prefix: string) => `${prefix}_${Date.now().toString(36)}_${(++sequence).toString(36)}`

export function createMonitor(input: { name: string; url: string; expectedStatus?: number; timeoutMs?: number }): Monitor {
  if (!input.name?.trim()) throw new Error('name is required')
  try { new URL(input.url) } catch { throw new Error('url must be absolute') }
  const monitor = { id: id('mon'), name: input.name.trim(), url: input.url, expectedStatus: input.expectedStatus ?? 200, timeoutMs: input.timeoutMs ?? 10_000, createdAt: new Date().toISOString() }
  monitors.set(monitor.id, monitor); checks.set(monitor.id, []); return monitor
}
export const listMonitors = () => [...monitors.values()]
export function getMonitor(monitorId: string) { const monitor = monitors.get(monitorId); if (!monitor) throw new Error('monitor not found'); return monitor }
export async function checkMonitor(monitorId: string): Promise<Check> {
  const monitor = getMonitor(monitorId); const started = performance.now(); let status: number | null = null; let error: string | null = null
  try { const response = await fetch(monitor.url, { signal: AbortSignal.timeout(monitor.timeoutMs), redirect: 'follow' }); status = response.status } catch (cause) { error = cause instanceof Error ? cause.message : 'request failed' }
  const result = { id: id('chk'), monitorId, ok: status === monitor.expectedStatus && !error, status, latencyMs: Math.round(performance.now() - started), error, checkedAt: new Date().toISOString() }
  checks.get(monitorId)!.unshift(result); return result
}
export function history(monitorId: string, limit = 50) { getMonitor(monitorId); return checks.get(monitorId)!.slice(0, Math.max(1, limit)) }
export function openIncident(monitorId: string, note?: string): Incident { getMonitor(monitorId); const incident = { id: id('inc'), monitorId, status: 'open' as const, startedAt: new Date().toISOString(), resolvedAt: null, note: note || null }; incidents.set(incident.id, incident); return incident }
export function resolveIncident(incidentId: string): Incident { const incident = incidents.get(incidentId); if (!incident) throw new Error('incident not found'); const resolved = { ...incident, status: 'resolved' as const, resolvedAt: new Date().toISOString() }; incidents.set(incidentId, resolved); return resolved }
export const listIncidents = () => [...incidents.values()]
export function health() { return { ok: true, service: 'statuslane', version: '0.1.0', monitors: monitors.size, now: new Date().toISOString() } }
export function pricing() { return { local: 'free', hosted: [{ action: 'managed check', credits: 1 }, { action: 'incident analytics', credits: 5 }] } }
export function capabilities() { return { local: ['monitor.create', 'monitor.check', 'monitor.history', 'incident.open', 'incident.resolve'], api: ['/v1/statuslane/health', '/v1/statuslane/monitors', '/v1/statuslane/incidents'] } }
export function resetForTests() { monitors.clear(); checks.clear(); incidents.clear(); sequence = 0 }
