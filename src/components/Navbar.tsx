export interface NavbarProps {
  taskCount: number;
}

export function Navbar({ taskCount }: NavbarProps) {
  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="StudyFlow home">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 6.5 12 3l8 3.5v11L12 21l-8-3.5v-11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="m8 12 2.5 2.5L16.5 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span>StudyFlow</span>
      </a>
      <div className="nav-meta"><span className="nav-dot" /> <span>{taskCount} {taskCount === 1 ? 'task' : 'tasks'} in your planner</span></div>
    </header>
  );
}
