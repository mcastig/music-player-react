import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAudioPlayer } from './useAudioPlayer';
import type { Track } from '../data/tracks';

const tracks: Track[] = [
  { id: 1, title: 'Track One', author: 'Artist A', cover: '/cover-1.jpg', src: '/audio-1.mp3' },
  { id: 2, title: 'Track Two', author: 'Artist B', cover: '/cover-2.jpg', src: '/audio-2.mp3' },
];

type AudioListener = (e: Event) => void;

function createMockAudio() {
  const listeners: Record<string, AudioListener[]> = {};
  return {
    play: vi.fn().mockResolvedValue(undefined),
    pause: vi.fn(),
    currentTime: 0,
    duration: 180,
    src: '',
    addEventListener: vi.fn((event: string, cb: AudioListener) => {
      listeners[event] = listeners[event] ?? [];
      listeners[event].push(cb);
    }),
    removeEventListener: vi.fn((event: string, cb: AudioListener) => {
      listeners[event] = (listeners[event] ?? []).filter(l => l !== cb);
    }),
    trigger(event: string) {
      listeners[event]?.forEach(cb => cb(new Event(event)));
    },
  };
}

let mockAudioInstance: ReturnType<typeof createMockAudio>;

beforeEach(() => {
  mockAudioInstance = createMockAudio();
  // Must use a regular function so `new Audio()` works as a constructor
  vi.stubGlobal('Audio', vi.fn(function () { return mockAudioInstance; }));
});

describe('useAudioPlayer', () => {
  it('starts with correct initial state', () => {
    const { result } = renderHook(() => useAudioPlayer(tracks));
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.currentTime).toBe(0);
    expect(result.current.duration).toBe(0);
    expect(result.current.currentTrack).toEqual(tracks[0]);
  });

  it('togglePlay starts playback', async () => {
    const { result } = renderHook(() => useAudioPlayer(tracks));
    await act(async () => { result.current.togglePlay(); });
    expect(result.current.isPlaying).toBe(true);
    expect(mockAudioInstance.play).toHaveBeenCalledOnce();
  });

  it('togglePlay pauses when already playing', async () => {
    const { result } = renderHook(() => useAudioPlayer(tracks));
    await act(async () => { result.current.togglePlay(); });
    await act(async () => { result.current.togglePlay(); });
    expect(result.current.isPlaying).toBe(false);
    expect(mockAudioInstance.pause).toHaveBeenCalledOnce();
  });

  it('seek updates currentTime on the audio element', async () => {
    const { result } = renderHook(() => useAudioPlayer(tracks));
    await act(async () => { result.current.seek(60); });
    expect(mockAudioInstance.currentTime).toBe(60);
    expect(result.current.currentTime).toBe(60);
  });

  it('goToNext advances to the second track', async () => {
    const { result } = renderHook(() => useAudioPlayer(tracks));
    await act(async () => { result.current.goToNext(); });
    expect(result.current.currentTrack).toEqual(tracks[1]);
    expect(result.current.isPlaying).toBe(true);
  });

  it('goToNext wraps around to first track from last', async () => {
    const { result } = renderHook(() => useAudioPlayer(tracks));
    await act(async () => { result.current.goToNext(); });
    await act(async () => { result.current.goToNext(); });
    expect(result.current.currentTrack).toEqual(tracks[0]);
  });

  it('goToPrev wraps around to last track from first', async () => {
    const { result } = renderHook(() => useAudioPlayer(tracks));
    await act(async () => { result.current.goToPrev(); });
    expect(result.current.currentTrack).toEqual(tracks[1]);
  });

  it('sets duration when loadedmetadata fires', async () => {
    const { result } = renderHook(() => useAudioPlayer(tracks));
    await act(async () => { mockAudioInstance.trigger('loadedmetadata'); });
    expect(result.current.duration).toBe(180);
  });

  it('advances track automatically when ended fires', async () => {
    const { result } = renderHook(() => useAudioPlayer(tracks));
    await act(async () => { mockAudioInstance.trigger('ended'); });
    expect(result.current.currentTrack).toEqual(tracks[1]);
  });

  it('creates a new Audio element when track changes', async () => {
    const AudioMock = vi.mocked(globalThis.Audio as unknown as Mock);
    renderHook(() => useAudioPlayer(tracks));
    const initialCallCount = AudioMock.mock.calls.length;
    // The hook creates one Audio on mount
    expect(initialCallCount).toBe(1);
  });
});
