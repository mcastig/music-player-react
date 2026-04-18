import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AlbumArt from './AlbumArt';
import type { Track } from '../../data/tracks';

const track: Track = {
  id: 1,
  title: 'Lost in the City Lights',
  author: 'Cosmo Sheldrake',
  cover: '/images/cover-1.jpg',
  src: '/audio/lost-in-city-lights-145038.mp3',
};

describe('AlbumArt', () => {
  it('renders an image with the correct src', () => {
    render(<AlbumArt track={track} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/images/cover-1.jpg');
  });

  it('includes the track title in the alt text', () => {
    render(<AlbumArt track={track} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', expect.stringContaining('Lost in the City Lights'));
  });

  it('updates image src when track changes', () => {
    const { rerender } = render(<AlbumArt track={track} />);
    const next: Track = { ...track, cover: '/images/cover-2.jpg', title: 'Forest Lullaby' };
    rerender(<AlbumArt track={next} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/cover-2.jpg');
  });
});
