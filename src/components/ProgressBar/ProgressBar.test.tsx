import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProgressBar, { formatTime } from './ProgressBar';

describe('formatTime', () => {
  it('formats zero', () => expect(formatTime(0)).toBe('0:00'));
  it('formats seconds under a minute', () => expect(formatTime(45)).toBe('0:45'));
  it('formats minutes and seconds', () => expect(formatTime(195)).toBe('3:15'));
  it('pads single-digit seconds', () => expect(formatTime(61)).toBe('1:01'));
  it('returns 0:00 for negative values', () => expect(formatTime(-5)).toBe('0:00'));
  it('returns 0:00 for Infinity', () => expect(formatTime(Infinity)).toBe('0:00'));
  it('returns 0:00 for NaN', () => expect(formatTime(NaN)).toBe('0:00'));
});

describe('ProgressBar', () => {
  const defaultProps = {
    currentTime: 30,
    duration: 180,
    onSeek: vi.fn(),
  };

  it('renders current time and duration', () => {
    render(<ProgressBar {...defaultProps} />);
    expect(screen.getByText('0:30')).toBeInTheDocument();
    expect(screen.getByText('3:00')).toBeInTheDocument();
  });

  it('range input has correct value and max', () => {
    render(<ProgressBar {...defaultProps} />);
    const input = screen.getByRole('slider', { name: /seek/i });
    expect(input).toHaveValue('30');
    expect(input).toHaveAttribute('max', '180');
  });

  it('calls onSeek with numeric value on change', () => {
    const onSeek = vi.fn();
    render(<ProgressBar {...defaultProps} onSeek={onSeek} />);
    const input = screen.getByRole('slider', { name: /seek/i });
    fireEvent.change(input, { target: { value: '60' } });
    expect(onSeek).toHaveBeenCalledWith(60);
  });

  it('shows 0:00 for both labels when duration is 0', () => {
    render(<ProgressBar currentTime={0} duration={0} onSeek={vi.fn()} />);
    const labels = screen.getAllByText('0:00');
    expect(labels).toHaveLength(2);
  });
});
