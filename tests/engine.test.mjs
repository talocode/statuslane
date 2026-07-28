import assert from 'node:assert/strict'
import test from 'node:test'
import { createMonitor, getMonitor, health, openIncident, resetForTests, resolveIncident } from '../dist/index.js'
test('creates monitors and incidents', () => { resetForTests(); const monitor = createMonitor({ name: 'site', url: 'https://example.com' }); assert.equal(getMonitor(monitor.id).name, 'site'); const incident = openIncident(monitor.id, 'down'); assert.equal(resolveIncident(incident.id).status, 'resolved'); assert.equal(health().monitors, 1) })
test('rejects invalid monitor URLs', () => { resetForTests(); assert.throws(() => createMonitor({ name: 'site', url: 'not-a-url' })) })
