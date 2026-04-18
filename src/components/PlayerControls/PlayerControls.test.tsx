import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayerControls from './PlayerControls';

const defaultProps = {
  isPlaying: false,
  onTogglePlay: vi.fn(),
  onPrev: vi.fn(),
  onNext: vi.fn(),
};

describe('PlayerControls', () => {
  it('renders play button when not playing', () => {
    render(<PlayerControls {...defaultProps} />);
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it('renders pause button when playing', () => {
    render(<PlayerControls {...defaultProps} isPlaying={true} />);
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
  });

  it('calls onTogglePlay when play/pause button is clicked', async () => {
    const onTogglePlay = vi.fn();
    render(<PlayerControls {...defaultProps} onTogglePlay={onTogglePlay} />);
    await userEvent.click(screen.getByRole('button', { name: /play/i }));
    expect(onTogglePlay).toHaveBeenCalledOnce();
  });

  it('calls onPrev when previous button is clicked', async () => {
    const onPrev = vi.fn();
    render(<PlayerControls {...defaultProps} onPrev={onPrev} />);
    await userEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(onPrev).toHaveBeenCalledOnce();
  });

  it('calls onNext when next button is clicked', async () => {
    const onNext = vi.fn();
    render(<PlayerControls {...defaultProps} onNext={onNext} />);
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(onNext).toHaveBeenCalledOnce();
  });

  it('renders all three control buttons', () => {
    render(<PlayerControls {...defaultProps} />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });
});
