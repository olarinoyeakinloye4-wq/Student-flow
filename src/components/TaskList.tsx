import type { Task, TaskFilter } from '../types/task';
import { EmptyState } from './EmptyState';
import { TaskCard } from './TaskCard';

export interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, filter, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    const isInitial = filter === 'all';
    return <EmptyState title={isInitial ? 'No study tasks yet. Add your first task to get started.' : filter === 'completed' ? 'No completed tasks yet' : 'No pending tasks'} description={isInitial ? 'Your study plan will show up here.' : 'Try another filter or update your task list.'} />;
  }
  return <div className="task-list">{tasks.map((task) => <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />)}</div>;
}
