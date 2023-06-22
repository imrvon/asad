import { useEffect, useState } from 'react';
import axios from 'axios';

const NewPlaylist = () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
    const playlistId = import.meta.env.VITE_PLAYLIST_ID;

    // console.log('ClientId:', clientId)
  
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
          console.log(playlist)

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
        console.log('ClientId:', clientId)
      fetchLatestTrackFromPlaylist();
    }, []);
  
    return (
      <div>
        {latestTrack ? (
          <div className='flex flex-col justify-center items-center mt-[5%]'>
            <h2>Latest Track:</h2>
            <p>Track Name: {latestTrack.name}</p>
            <p>Artist: {latestTrack.artists[0].name}</p>
            <img src={latestTrack.album.images[1].url} alt="" />
            {console.log(latestTrack.preview_url)}
            {latestTrack.preview_url && (
              <audio controls className='mt-[1%]'>
                <source src={latestTrack.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
            <a href={latestTrack.external_urls.spotify} className='text-white bg-green-500 py-[2%] px-[3%] rounded-[40px] mt-[1%]'>Listen to Full Song</a>
          </div>
        ) : (
          <p>Loading latest track...</p>
        )}
      </div>
    );
  };

  export default NewPlaylist