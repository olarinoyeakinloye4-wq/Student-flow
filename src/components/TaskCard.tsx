import type { Task } from '../types/task';
import { formatDueDate, isOverdue } from '../utils/taskUtils';

export interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const overdue = !task.completed && isOverdue(task.dueDate);
  return (
    <article className={`task-card ${task.completed ? 'is-completed' : ''}`}>
      <button className={`task-check ${task.completed ? 'checked' : ''}`} type="button" aria-label={task.completed ? `Mark ${task.title} as pending` : `Complete ${task.title}`} onClick={() => onToggle(task.id)}>{task.completed && <span aria-hidden="true">✓</span>}</button>
      <div className="task-main"><div className="task-title-row"><h3 className={task.completed ? 'strikethrough' : ''}>{task.title}</h3>{task.completed && <span className="status-badge completed-badge">Completed</span>}{overdue && <span className="status-badge overdue-badge">Overdue</span>}</div><div className="task-meta"><span className="course-pill">{task.course}</span><span className="due-date"><svg aria-hidden="true" viewBox="0 0 16 16" fill="none"><rect x="2" y="3.5" width="12" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M5 2v3M11 2v3M2 6.5h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>{formatDueDate(task.dueDate)}</span></div></div>
      <div className="task-actions"><span className={`priority-badge priority-${task.priority}`}>{task.priority[0].toUpperCase() + task.priority.slice(1)}</span><button className="button button-quiet toggle-button" type="button" onClick={() => onToggle(task.id)}>{task.completed ? 'Undo' : 'Complete'}</button><button className="delete-button" type="button" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task.id)}><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 6h12M8 6V4h4v2m3 0-.7 10H5.7L5 6m3 3v4m4-4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button></div>
    </article>
  );
}
