import { memo } from 'react';
import './PlayerControls.css';

interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const PlayerControls = memo(function PlayerControls({
  isPlaying,
  onTogglePlay,
  onPrev,
  onNext,
}: PlayerControlsProps) {
  return (
    <div className="player-controls">
      <button className="ctrl-btn" onClick={onPrev} aria-label="Previous track">
        {/* Previous */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M17.8136 14.2517L23.6953 10.9841C25.0284 10.2435 26.6666 11.2074 26.6666 12.7324V19.2676C26.6666 20.7926 25.0284 21.7566 23.6953 21.016L17.8136 17.7483C16.442 16.9863 16.442 15.0137 17.8136 14.2517Z"
            fill="currentColor"
          />
          <path d="M10.6666 22.6667L10.6666 9.33335" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M5.33325 22.6667L5.33325 9.33335" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <button className="play-btn" onClick={onTogglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
        {isPlaying ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <rect x="5" y="4" width="4" height="14" rx="1.5" fill="currentColor" />
            <rect x="13" y="4" width="4" height="14" rx="1.5" fill="currentColor" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M7 4.5v13l10-6.5-10-6.5z" fill="currentColor" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        )}
      </button>

      <button className="ctrl-btn" onClick={onNext} aria-label="Next track">
        {/* Next */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M14.1864 14.2517L8.30466 10.9841C6.9716 10.2435 5.33337 11.2074 5.33337 12.7324V19.2676C5.33337 20.7926 6.9716 21.7566 8.30466 21.016L14.1864 17.7483C15.558 16.9863 15.558 15.0137 14.1864 14.2517Z"
            fill="currentColor"
          />
          <path d="M21.3334 22.6667L21.3334 9.33335" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M26.6667 22.6667L26.6667 9.33335" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
});

export default PlayerControls;
