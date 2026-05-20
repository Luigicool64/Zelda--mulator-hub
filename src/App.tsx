import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Play } from './pages/Play';
import { Library } from './pages/Library';
import { Profile } from './pages/Profile';
import { Achievements } from './pages/Achievements';
import { Guide } from './pages/Guide';
import { Timeline } from './pages/Timeline';
import { Navigation } from './components/Navigation';
import { css } from '../styled-system/css';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const styles = {
  app: css({
    minHeight: '100vh',
    background: 'radial-gradient(circle at 20% 50%, #0a1c12, #051007)',
    position: 'relative',
    _before: {
      content: '""',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      backgroundImage: 'url("/noise.png")',
      opacity: 0.05
    }
  })
};

export default App;