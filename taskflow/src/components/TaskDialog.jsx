import { useEffect, useRef, useState } from 'react'
import { PRIORITIES, STATUSES, validateTask } from '../tasks'
import Icon from './Icon'
export default function TaskDialog({ task, projects, onClose, onSave }) {
  const ref = useRef(null)
  const [form, setForm] = useState(task || { title: '', description: '', project: '', status: 'To Do', priority: 'Medium', dueDate: '' })
  const [error, setError] = useState('')
  useEffect(() => { const dialog = ref.current; dialog.showModal(); dialog.querySelector('input').focus(); return () => dialog.close() }, [])
  const field = key => ({ value: form[key], onChange: event => setForm({ ...form, [key]: event.target.value }) })
  function submit(event) {
    event.preventDefault()
    const submitted = { ...form, dueDate: event.currentTarget.elements.namedItem('dueDate').value }
    const message = validateTask(submitted)
    if (message) { setError(message); return }
    if (onSave({ ...submitted, title: form.title.trim(), project: form.project.trim(), description: form.description.trim() }) === false) setError('This task could not be saved. Your form is preserved. Check browser storage; close this form to view the storage error details.')
  }
  return <dialog ref={ref} onCancel={onClose} aria-labelledby="task-dialog-title"><form onSubmit={submit}>
    <div className="dialog-heading"><div><span className="eyebrow">MAKE ROOM FOR GOOD WORK</span><h2 id="task-dialog-title">{task ? 'Edit task' : 'Create a task'}</h2></div><button type="button" className="icon-button" aria-label="Close task form" onClick={onClose}><Icon name="close" /></button></div>
    <label>Task title <span className="required">*</span><input autoFocus required maxLength={120} placeholder="What needs to get done?" {...field('title')} /></label>
    <label>Description<textarea rows={3} maxLength={2000} placeholder="Add a little context…" {...field('description')} /></label>
    <div className="form-grid"><label>Status<select aria-label="Status" {...field('status')}>{STATUSES.map(value => <option key={value}>{value}</option>)}</select></label><label>Priority<select aria-label="Priority" {...field('priority')}>{PRIORITIES.map(value => <option key={value}>{value}</option>)}</select></label><label>Project<input list="project-options" maxLength={60} placeholder="e.g. Portfolio website" {...field('project')} /><datalist id="project-options">{projects.map(project => <option key={project} value={project} />)}</datalist></label><label>Due date<input type="date" name="dueDate" {...field('dueDate')} onInput={event => setForm(previous => ({ ...previous, dueDate: event.target.value }))} /></label></div>
    {error && <p className="error" role="alert">{error}</p>}
    <div className="dialog-footer"><button type="button" className="button secondary" onClick={onClose}>Cancel</button><button className="button primary" type="submit">{task ? 'Save changes' : 'Create task'}<Icon name="arrow" size={16} /></button></div>
  </form></dialog>
}
