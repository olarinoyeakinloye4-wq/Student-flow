import { useMemo, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { FilterButtons } from './components/FilterButtons';
import { Navbar } from './components/Navbar';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Task, TaskFilter } from './types/task';
import { isDueToday } from './utils/taskUtils';

const STORAGE_KEY = 'studyflow-tasks';
const NAME_STORAGE_KEY = 'studyflow-name';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, []);
  const [name, setName] = useLocalStorage<string>(NAME_STORAGE_KEY, '');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const completedCount = tasks.filter((task) => task.completed).length;
  const counts: Record<TaskFilter, number> = { all: tasks.length, pending: tasks.length - completedCount, completed: completedCount };
  const todayTasks = useMemo(() => tasks.filter((task) => !task.completed && isDueToday(task.dueDate)), [tasks]);
  const visibleTasks = useMemo(() => tasks.filter((task) => filter === 'all' || (filter === 'completed' ? task.completed : !task.completed)), [tasks, filter]);

  function addTask(task: Task) {
    setTasks((current) => [...current, task]);
  }

  function toggleTask(id: string) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  function deleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <div className="app-shell" id="home">
      <Navbar taskCount={tasks.length} />
      <main className="page-content">
        <Dashboard tasks={tasks} todayTasks={todayTasks} name={name} onNameSave={setName} />
        <TaskForm onAddTask={addTask} />
        <section className="tasks-section" aria-labelledby="tasks-heading">
          <div className="tasks-header"><div><span className="section-kicker">YOUR PLANNER</span><h2 id="tasks-heading">Study tasks <span className="heading-count">{tasks.length}</span></h2></div><FilterButtons activeFilter={filter} counts={counts} onFilterChange={setFilter} /></div>
          <TaskList tasks={visibleTasks} filter={filter} onToggle={toggleTask} onDelete={deleteTask} />
        </section>
        <footer className="footer"><span>© {new Date().getFullYear()} StudyFlow</span><span>Small steps. Strong habits.</span><span>Created by Mathew Web</span></footer>
      </main>
    </div>
  );
}

export default App;
