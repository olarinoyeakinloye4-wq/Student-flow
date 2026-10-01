import { useState, type FormEvent } from 'react';
import type { Task } from '../types/task';
import { formatToday, getCompletionPercentage, getGreeting } from '../utils/taskUtils';
import { ProgressBar } from './ProgressBar';

export interface DashboardProps {
  tasks: Task[];
  todayTasks: Task[];
  name: string;
  onNameSave: (name: string) => void;
}

export function Dashboard({ tasks, todayTasks, name, onNameSave }: DashboardProps) {
  const [editingName, setEditingName] = useState(!name);
  const [nameDraft, setNameDraft] = useState(name);
  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;
  const percentage = getCompletionPercentage(tasks);
  const stats = [
    { label: 'Total tasks', value: tasks.length, icon: '▤', tone: 'blue' },
    { label: 'Completed', value: completed, icon: '✓', tone: 'green' },
    { label: 'Pending', value: pending, icon: '◷', tone: 'amber' },
    { label: 'Completion', value: `${percentage}%`, icon: '↗', tone: 'violet' },
  ];

  function handleNameSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = nameDraft.trim();
    if (!trimmedName) return;
    onNameSave(trimmedName);
    setNameDraft(trimmedName);
    setEditingName(false);
  }

  return (
    <>
      <section className="welcome-row" aria-labelledby="welcome-heading">
        <div>
          <p className="eyebrow">{formatToday()}</p>
          {editingName ? (
            <form className="name-form" onSubmit={handleNameSubmit}>
              <label id="welcome-heading" htmlFor="user-name">{name ? 'Change your name' : 'What should we call you?'}</label>
              <div className="name-form-controls">
                <input id="user-name" value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} placeholder="Your name or nickname" autoComplete="given-name" required autoFocus />
                <button className="button button-primary" type="submit">Save</button>
              </div>
            </form>
          ) : (
            <div className="greeting-line">
              <h1 id="welcome-heading">{getGreeting()}, <span>{name}</span></h1>
              <button className="edit-name-button" type="button" onClick={() => { setNameDraft(name); setEditingName(true); }}>Edit name</button>
            </div>
          )}
          <p className="welcome-copy">A little progress each day adds up to big results.</p>
        </div>
        <div className="focus-chip"><span className="focus-spark">✦</span><span>Keep your focus</span></div>
      </section>

      <section className="stats-grid" aria-label="Task overview">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <span className={`stat-icon ${stat.tone}`} aria-hidden="true">{stat.icon}</span>
            <div><p>{stat.label}</p><strong>{stat.value}</strong></div>
          </article>
        ))}
      </section>

      <section className="overview-card" aria-label="Overall progress">
        <div className="overview-copy"><div><span className="section-kicker">YOUR PROGRESS</span><h2>Every task moves you forward</h2></div><strong className="progress-number">{percentage}%</strong></div>
        <ProgressBar value={percentage} label="Overall task completion" />
        <p className="progress-caption">{completed} of {tasks.length} tasks completed</p>
      </section>

      <section className="today-card" aria-labelledby="today-heading">
        <div className="today-heading"><div className="today-icon" aria-hidden="true">☼</div><div><h2 id="today-heading">Today's study tasks</h2><p>Your pending tasks due today</p></div><span className="today-count">{todayTasks.length}</span></div>
        {todayTasks.length > 0 ? <ul className="today-list">{todayTasks.map((task) => <li key={task.id}><span className="today-check" aria-hidden="true" /><span>{task.title}</span><span className="today-course">{task.course}</span></li>)}</ul> : <p className="today-empty">Nothing due today. Enjoy the breathing room.</p>}
      </section>
    </>
  );
}
