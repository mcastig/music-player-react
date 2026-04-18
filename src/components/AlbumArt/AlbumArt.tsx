import { memo } from 'react';
import type { Track } from '../../data/tracks';
import './AlbumArt.css';

interface AlbumArtProps {
  track: Track;
}

const AlbumArt = memo(function AlbumArt({ track }: AlbumArtProps) {
  return (
    <div className="album-art">
      <img src={track.cover} alt={`${track.title} cover`} />
    </div>
  );
});

export default AlbumArt;
