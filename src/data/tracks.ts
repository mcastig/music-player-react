export interface Track {
  id: number;
  title: string;
  author: string;
  cover: string;
  src: string;
}

const base = import.meta.env.BASE_URL;

export const tracks: Track[] = [
  {
    id: 1,
    title: 'Lost in the City Lights',
    author: 'Cosmo Sheldrake',
    cover: `${base}images/cover-1.jpg`,
    src: `${base}audio/lost-in-city-lights-145038.mp3`,
  },
  {
    id: 2,
    title: 'Forest Lullaby',
    author: 'Lesfm',
    cover: `${base}images/cover-2.jpg`,
    src: `${base}audio/forest-lullaby-110624.mp3`,
  },
];
