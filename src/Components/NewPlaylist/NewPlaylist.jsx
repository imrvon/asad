import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewPlaylist = () => {
    const clientId = '10d69cb846124cf6a3e16a19f4a86afa';
    const clientSecret = '561c37356d4b4667b87ce6f67d904edb';
    const playlistId = '0asnqXXmrSvDciDZlqa6wr';
  
    const [latestTrack, setLatestTrack] = useState(null);
  
    useEffect(() => {
      const getAccessToken = async () => {
        const authEndpoint = 'https://accounts.spotify.com/api/token';
        const encodedCredentials = btoa(`${clientId}:${clientSecret}`).toString('base64');
  
        try {
          const response = await axios.post(
            authEndpoint,
            'grant_type=client_credentials',
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${encodedCredentials}`,
              },
            }
          );
  
          return response.data.access_token;
        } catch (error) {
          console.error('Error fetching access token:', error);
          return null;
        }
      };
  
      const fetchLatestTrackFromPlaylist = async () => {
        const accessToken = await getAccessToken();
        if (!accessToken) return;
  
        const playlistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}`;
  
        try {
          const response = await axios.get(playlistEndpoint, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const playlist = response.data;

            if (playlist.tracks && playlist.tracks.items.length > 0) {
                const latestAddedTrack = playlist.tracks.items.reduce(
                (latestTrack, track) => {
                    if (
                    !latestTrack ||
                    new Date(track.added_at) > new Date(latestTrack.added_at)
                    ) {
                    return track;
                    }
                    return latestTrack;
                },
                null
                );

                if (latestAddedTrack) {
                setLatestTrack(latestAddedTrack.track);
                } else {
                console.error('Unable to determine the latest track.');
                }
            } else {
                console.error('No tracks found in the playlist.');
            }
            } catch (error) {
            console.error('Error fetching playlist:', error);
            }
        };
  
      fetchLatestTrackFromPlaylist();
    }, []);
  
    return (
      <div>
        {latestTrack ? (
          <div>
            <h2>Latest Track:</h2>
            <p>Track Name: {latestTrack.name}</p>
            <p>Artist: {latestTrack.artists[0].name}</p>
            <img src={latestTrack.album.images[0].url} alt="" />
            {/* Render additional track details as needed */}
          </div>
        ) : (
          <p>Loading latest track...</p>
        )}
      </div>
    );
  };

  export default NewPlaylist