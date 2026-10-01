export type Priority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
};

export type TaskFilter = 'all' | 'pending' | 'completed';
