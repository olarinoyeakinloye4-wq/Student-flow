import { useState, type FormEvent } from 'react';
import type { Priority, Task } from '../types/task';

export interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTitle = title.trim();
    const cleanCourse = course.trim();
    if (!cleanTitle || !cleanCourse || !dueDate) {
      setError('Please fill in the title, course, and due date.');
      return;
    }
    onAddTask({ id: crypto.randomUUID(), title: cleanTitle, course: cleanCourse, dueDate, priority, completed: false });
    setTitle('');
    setCourse('');
    setDueDate('');
    setPriority('medium');
    setError('');
  }

  return (
    <section className="form-panel" aria-labelledby="add-task-heading">
      <div className="panel-heading"><div className="panel-icon" aria-hidden="true">＋</div><div><h2 id="add-task-heading">Add a study task</h2><p>Make a plan, then make it happen.</p></div></div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="field field-title"><label htmlFor="task-title">Task title</label><input id="task-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Review chapter 4" /></div>
          <div className="field"><label htmlFor="task-course">Course / subject</label><input id="task-course" value={course} onChange={(event) => setCourse(event.target.value)} placeholder="e.g. Biology" /></div>
          <div className="field"><label htmlFor="task-date">Due date</label><input id="task-date" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} /></div>
          <div className="field"><label htmlFor="task-priority">Priority</label><select id="task-priority" value={priority} onChange={(event) => setPriority(event.target.value as Priority)}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div>
          <button className="button button-primary add-button" type="submit"><span aria-hidden="true">＋</span> Add task</button>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
      </form>
    </section>
  );
}
