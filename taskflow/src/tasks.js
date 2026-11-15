export const STATUSES = ['To Do', 'In Progress', 'In Review', 'Completed']
export const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent']
export const STORAGE_KEY = 'taskflow.tasks.v1'
export const todayKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
export const isOverdue = (task, today = todayKey()) => Boolean(task.dueDate && task.dueDate < today && task.status !== 'Completed')
export function validateTask(task) {
  if (!task.title.trim()) return 'Give your task a title.'
  if (task.title.trim().length > 120) return 'Keep the title under 121 characters.'
  if (task.description.length > 2000) return 'Keep the description under 2,001 characters.'
  if (task.project.trim().length > 60) return 'Keep the project name under 61 characters.'
  if (!STATUSES.includes(task.status) || !PRIORITIES.includes(task.priority)) return 'Choose a valid status and priority.'
  if (task.dueDate && (!/^\d{4}-\d{2}-\d{2}$/.test(task.dueDate) || !Number.isFinite(Date.parse(`${task.dueDate}T00:00:00`)) || todayKey(new Date(`${task.dueDate}T00:00:00`)) !== task.dueDate)) return 'Choose a valid due date.'
  return ''
}
export function isTask(task) {
  return task && typeof task.id === 'string' && ['title', 'description', 'project', 'dueDate', 'createdAt', 'updatedAt'].every(key => typeof task[key] === 'string') && !validateTask(task) && Number.isFinite(Date.parse(task.createdAt)) && Number.isFinite(Date.parse(task.updatedAt)) && (task.completedAt == null || (typeof task.completedAt === 'string' && Number.isFinite(Date.parse(task.completedAt))))
}
export function loadTasks(storage) {
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (!raw) return { tasks: [], error: '' }
    const tasks = JSON.parse(raw)
    if (!Array.isArray(tasks) || !tasks.every(isTask) || new Set(tasks.map(task => task.id)).size !== tasks.length) throw new Error('Invalid saved tasks')
    return { tasks, error: '' }
  } catch {
    return { tasks: [], error: 'Saved tasks could not be read. Existing storage has been preserved. Recover it before clearing it; changes cannot be saved in this session.' }
  }
}
export function filterTasks(tasks, { search = '', status = 'All', priority = 'All', project = 'All', due = 'All', sort = 'updated' } = {}) {
  const query = search.trim().toLowerCase()
  return tasks.filter(task => `${task.title} ${task.description} ${task.project}`.toLowerCase().includes(query) && (status === 'All' || task.status === status) && (priority === 'All' || task.priority === priority) && (project === 'All' || task.project === project) && (due === 'All' || (due === 'Overdue' ? isOverdue(task) : task.dueDate === todayKey())))
    .sort((a, b) => sort === 'deadline' ? (a.dueDate || '9999').localeCompare(b.dueDate || '9999') : sort === 'priority' ? PRIORITIES.indexOf(b.priority) - PRIORITIES.indexOf(a.priority) : sort === 'created' ? b.createdAt.localeCompare(a.createdAt) : b.updatedAt.localeCompare(a.updatedAt))
}
export function summarize(tasks) {
  const completed = tasks.filter(task => task.status === 'Completed').length
  return { total: tasks.length, completed, progress: tasks.filter(task => task.status === 'In Progress').length, overdue: tasks.filter(task => isOverdue(task)).length, rate: tasks.length ? Math.round(completed / tasks.length * 100) : 0, projects: new Set(tasks.filter(task => task.project && task.status !== 'Completed').map(task => task.project)).size }
}
export function changeStatus(task, status, now = new Date().toISOString()) {
  return { ...task, status, updatedAt: now, completedAt: status === 'Completed' ? task.completedAt || now : null }
}
