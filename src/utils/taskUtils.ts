import type { Task } from '../types/task';

export function getGreeting(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function formatToday(date = new Date()): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatDueDate(value: string): string {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function isDueToday(value: string, date = new Date()): boolean {
  const [year, month, day] = value.split('-').map(Number);
  return year === date.getFullYear() && month - 1 === date.getMonth() && day === date.getDate();
}

export function isOverdue(value: string, date = new Date()): boolean {
  const [year, month, day] = value.split('-').map(Number);
  const due = new Date(year, month - 1, day);
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return due < today;
}

export function getCompletionPercentage(tasks: Task[]): number {
  if (tasks.length === 0) return 0;
  return Math.round((tasks.filter((task) => task.completed).length / tasks.length) * 100);
}
