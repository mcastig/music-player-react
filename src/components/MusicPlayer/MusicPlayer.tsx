import AlbumArt from '../AlbumArt/AlbumArt';
import TrackInfo from '../TrackInfo/TrackInfo';
import ProgressBar from '../ProgressBar/ProgressBar';
import PlayerControls from '../PlayerControls/PlayerControls';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { tracks } from '../../data/tracks';
import './MusicPlayer.css';

export default function MusicPlayer() {
  const { isPlaying, currentTime, duration, currentTrack, togglePlay, seek, goToNext, goToPrev } =
    useAudioPlayer(tracks);

  return (
    <article className="music-player" aria-label="Music Player">
      <AlbumArt track={currentTrack} />
      <div className="player-body">
        <TrackInfo track={currentTrack} />
        <ProgressBar currentTime={currentTime} duration={duration} onSeek={seek} />
        <PlayerControls
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      </div>
    </article>
  );
}
