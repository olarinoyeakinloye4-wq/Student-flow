export interface ProgressBarProps {
  value: number;
  label?: string;
}

export function ProgressBar({ value, label = 'Completion' }: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <div className="progress-track" role="progressbar" aria-label={label} aria-valuenow={safeValue} aria-valuemin={0} aria-valuemax={100}>
      <span className="progress-fill" style={{ width: `${safeValue}%` }} />
    </div>
  );
}
