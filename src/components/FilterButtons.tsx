import type { TaskFilter } from '../types/task';

export interface FilterButtonsProps {
  activeFilter: TaskFilter;
  counts: Record<TaskFilter, number>;
  onFilterChange: (filter: TaskFilter) => void;
}

const filters: { key: TaskFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
];

export function FilterButtons({ activeFilter, counts, onFilterChange }: FilterButtonsProps) {
  return (
    <div className="filter-group" role="group" aria-label="Filter tasks">
      {filters.map(({ key, label }) => <button key={key} type="button" className={`filter-button ${activeFilter === key ? 'active' : ''}`} aria-pressed={activeFilter === key} onClick={() => onFilterChange(key)}>{label}<span>{counts[key]}</span></button>)}
    </div>
  );
}
