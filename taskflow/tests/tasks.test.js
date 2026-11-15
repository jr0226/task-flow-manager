import { test } from 'node:test'
import assert from 'node:assert/strict'
import { changeStatus, filterTasks, isOverdue, loadTasks, STORAGE_KEY, summarize, todayKey, validateTask } from '../src/tasks.js'

const base = { id: 'one', title: 'Design dashboard', description: 'Responsive layout', project: 'TaskFlow', status: 'To Do', priority: 'High', dueDate: '2026-01-02', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z', completedAt: null }
test('validation rejects empty titles, impossible dates and invalid enum values', () => {
  assert.equal(validateTask(base), '')
  for (const patch of [{ title: '   ' }, { title: 'x'.repeat(121) }, { dueDate: '2026-02-30' }, { dueDate: 'bad' }, { status: 'Secret' }, { priority: 'Extreme' }]) assert.notEqual(validateTask({ ...base, ...patch }), '')
})
test('overdue uses local date boundaries and excludes completed or undated tasks', () => {
  assert.equal(isOverdue(base, '2026-01-02'), false)
  assert.equal(isOverdue(base, '2026-01-03'), true)
  assert.equal(isOverdue({ ...base, dueDate: '' }, '2026-01-03'), false)
  assert.equal(isOverdue({ ...base, status: 'Completed' }, '2026-01-03'), false)
  assert.equal(todayKey(new Date(2026, 0, 2, 23, 59)), '2026-01-02')
})
test('completing and reopening tasks manages timestamps without mutating the task', () => {
  const completed = changeStatus(base, 'Completed', '2026-01-03T12:00:00.000Z')
  assert.equal(completed.completedAt, '2026-01-03T12:00:00.000Z')
  assert.equal(changeStatus(completed, 'Completed').completedAt, completed.completedAt)
  assert.equal(changeStatus(completed, 'In Progress').completedAt, null)
  assert.equal(base.status, 'To Do')
})
test('search combines with filters, sorting handles missing dates, and input remains unchanged', () => {
  const tasks = [base, { ...base, id: 'two', title: 'Write docs', priority: 'Low', status: 'Completed', project: 'Portfolio', dueDate: '' }]
  assert.deepEqual(filterTasks(tasks, { search: 'RESPONSIVE', priority: 'High', project: 'TaskFlow', status: 'To Do' }).map(task => task.id), ['one'])
  assert.deepEqual(filterTasks(tasks, { status: 'Completed', priority: 'High' }), [])
  assert.deepEqual(filterTasks(tasks, { sort: 'deadline' }).map(task => task.id), ['one', 'two'])
  assert.deepEqual(filterTasks([...tasks].reverse(), { sort: 'priority' }).map(task => task.id), ['one', 'two'])
  assert.equal(tasks[0], base)
})
test('summaries reflect actual tasks including an empty workspace', () => {
  assert.deepEqual(summarize([]), { total: 0, completed: 0, progress: 0, overdue: 0, rate: 0, projects: 0 })
  const summary = summarize([base, { ...base, id: 'two', status: 'Completed' }])
  assert.equal(summary.total, 2); assert.equal(summary.completed, 1); assert.equal(summary.rate, 50); assert.equal(summary.projects, 1)
})
test('stored tasks round-trip; malformed and inaccessible storage is preserved and reported', () => {
  assert.deepEqual(loadTasks({ getItem: key => { assert.equal(key, STORAGE_KEY); return JSON.stringify([base]) } }), { tasks: [base], error: '' })
  assert.deepEqual(loadTasks({ getItem: () => null }), { tasks: [], error: '' })
  for (const raw of ['oops', '{}', '[null]', JSON.stringify([base, base]), JSON.stringify([{ ...base, createdAt: 'bad' }])]) {
    assert.notEqual(loadTasks({ getItem: () => raw, setItem: () => assert.fail('Must not overwrite damaged data') }).error, '')
  }
  assert.notEqual(loadTasks({ getItem: () => { throw new Error('Blocked storage') } }).error, '')
})
