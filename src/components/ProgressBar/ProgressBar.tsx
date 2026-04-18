import { memo, useCallback } from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const ProgressBar = memo(function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSeek(Number(e.target.value));
    },
    [onSeek],
  );

  return (
    <div className="progress-section">
      <div className="time-labels">
        <span className="time-label">{formatTime(currentTime)}</span>
        <span className="time-label">{formatTime(duration)}</span>
      </div>
      <input
        type="range"
        className="progress-bar"
        min={0}
        max={duration || 0}
        step={0.1}
        value={currentTime}
        onChange={handleChange}
        aria-label="Seek"
        style={{ '--progress': `${progress}%` } as React.CSSProperties}
      />
    </div>
  );
});

export default ProgressBar;
