import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import gradientBg from './assets/gradient-bg.jpg';
import './App.css';

export default function App() {
  return (
    <main className="app" style={{ backgroundImage: `url(${gradientBg})` }}>
      <MusicPlayer />
    </main>
  );
}
