import Playlist from './Components/Playlist/Playlist';
import NewPlaylist from './Components/NewPlaylist/NewPlaylist.jsx';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/newp" element={<Playlist />} />
          <Route path="/" element={<NewPlaylist />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;