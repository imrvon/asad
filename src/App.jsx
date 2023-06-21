import Playlist from './Components/Playlist/Playlist';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Playlist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;