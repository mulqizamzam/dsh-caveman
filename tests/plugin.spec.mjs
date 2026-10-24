import test from 'node:test'
import assert from 'node:assert/strict'
import { apply, name, skills } from '../index.js'

const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

test('plugin exposes DSH-compatible name and a non-empty unique skill catalogue', () => {
  assert.equal(name, 'dsh-caveman')
  assert.ok(skills.length >= 10)
  const names = skills.map(skill => skill.name)
  assert.equal(new Set(names).size, names.length)
  for (const skill of skills) {
    assert.match(skill.name, kebab)
    assert.ok(skill.description.trim().length >= 15)
    assert.ok(skill.content.trim().length >= 100)
  }
})

test('skills retain essential engineering and communication workflows', () => {
  const names = new Set(skills.map(skill => skill.name))
  for (const required of [
    'caveman', 'ultracave', 'megacave', 'caveman-review', 'caveman-commit',
    'investigate-first', 'lean-build', 'migration', 'safe-refactor',
    'surgical-patch', 'verify-and-stop', 'caveman-help',
  ]) assert.ok(names.has(required), \`missing \${required}\`)
})

test('apply registers every skill and refuses a context without the DSH registry', () => {
  const registered = []
  apply({ skills: { register(skill) { registered.push(skill) } } })
  assert.deepEqual(registered.map(s => s.name), skills.map(s => s.name))
  assert.throws(() => apply({}), /requires the DSH Skill Registry/)
})

test('style and review guidance preserve negation, exact payloads, and honest evidence', () => {
  const all = skills.map(s => s.content).join('\n')
  assert.match(all, /Preserve all material facts.*negations/)
  assert.match(all, /Keep code, commands, paths/)
  assert.match(all, /Do not claim tests ran without execution evidence/)
  assert.match(all, /Do not claim token or cost savings without a measured baseline/)
})
