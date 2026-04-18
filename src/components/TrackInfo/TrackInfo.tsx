import { memo } from 'react';
import type { Track } from '../../data/tracks';
import './TrackInfo.css';

interface TrackInfoProps {
  track: Track;
}

const TrackInfo = memo(function TrackInfo({ track }: TrackInfoProps) {
  return (
    <div className="track-info">
      <h1 className="track-title">{track.title}</h1>
      <p className="track-author">{track.author}</p>
    </div>
  );
});

export default TrackInfo;
