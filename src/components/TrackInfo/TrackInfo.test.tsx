import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TrackInfo from './TrackInfo';
import type { Track } from '../../data/tracks';

const track: Track = {
  id: 1,
  title: 'Lost in the City Lights',
  author: 'Cosmo Sheldrake',
  cover: '/images/cover-1.jpg',
  src: '/audio/lost-in-city-lights-145038.mp3',
};

describe('TrackInfo', () => {
  it('renders the track title', () => {
    render(<TrackInfo track={track} />);
    expect(screen.getByText('Lost in the City Lights')).toBeInTheDocument();
  });

  it('renders the track author', () => {
    render(<TrackInfo track={track} />);
    expect(screen.getByText('Cosmo Sheldrake')).toBeInTheDocument();
  });

  it('updates when track changes', () => {
    const { rerender } = render(<TrackInfo track={track} />);
    const next: Track = { ...track, title: 'Forest Lullaby', author: 'Lesfm' };
    rerender(<TrackInfo track={next} />);
    expect(screen.getByText('Forest Lullaby')).toBeInTheDocument();
    expect(screen.getByText('Lesfm')).toBeInTheDocument();
  });
});
