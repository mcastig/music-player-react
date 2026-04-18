import { useRef, useState, useCallback, useEffect } from 'react';
import type { Track } from '../data/tracks';

export function useAudioPlayer(tracks: Track[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Ref tracks play intent so new Audio elements know whether to auto-play
  const isPlayingRef = useRef(false);
  const tracksLengthRef = useRef(tracks.length);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    tracksLengthRef.current = tracks.length;
  }, [tracks.length]);

  useEffect(() => {
    const audio = new Audio(tracks[currentTrackIndex].src);
    audioRef.current = audio;
    setCurrentTime(0);
    setDuration(0);

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoaded = () => {
      if (isFinite(audio.duration)) setDuration(audio.duration);
    };
    const handleEnded = () => {
      isPlayingRef.current = true;
      setIsPlaying(true);
      setCurrentTrackIndex(prev => (prev + 1) % tracksLengthRef.current);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoaded);
    audio.addEventListener('durationchange', handleLoaded);
    audio.addEventListener('ended', handleEnded);

    if (isPlayingRef.current) {
      audio.play().catch(() => {});
    }

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoaded);
      audio.removeEventListener('durationchange', handleLoaded);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, tracks]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlayingRef.current) {
      audio.pause();
      isPlayingRef.current = false;
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      isPlayingRef.current = true;
      setIsPlaying(true);
    }
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const goToNext = useCallback(() => {
    isPlayingRef.current = true;
    setIsPlaying(true);
    setCurrentTrackIndex(prev => (prev + 1) % tracksLengthRef.current);
  }, []);

  const goToPrev = useCallback(() => {
    isPlayingRef.current = true;
    setIsPlaying(true);
    setCurrentTrackIndex(prev => (prev - 1 + tracksLengthRef.current) % tracksLengthRef.current);
  }, []);

  return {
    isPlaying,
    currentTime,
    duration,
    currentTrack: tracks[currentTrackIndex],
    togglePlay,
    seek,
    goToNext,
    goToPrev,
  };
}
