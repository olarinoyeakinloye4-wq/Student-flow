export interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="empty-illustration" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none"><rect x="13" y="11" width="38" height="44" rx="8" fill="currentColor" opacity=".1"/><path d="M23 25h18M23 33h18M23 41h11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="m42 48 3 3 7-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}
