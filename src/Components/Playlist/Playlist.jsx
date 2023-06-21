// Playlist.js

import React, { useEffect, useState } from 'react';
import { getPlaylist } from '../../spotify';

export default function Playlist() {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const playlistId = '0asnqXXmrSvDciDZlqa6wr';
        const fetchedPlaylist = await getPlaylist(playlistId);
        setPlaylist(fetchedPlaylist);
      } catch (error) {
        console.error('Error fetching playlist:', error.response.data);
      }
    }

    fetchPlaylist();
  }, []);

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{playlist.name}</h1>
      <ul>
        {playlist.tracks.items.map((item) => (
          <li key={item.track.id}>{item.track.name}</li>
        ))}
      </ul>
    </div>
  );
}
