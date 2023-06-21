// spotify.js
import {Buffer} from 'buffer';
import axios from 'axios';

const authEndpoint = 'https://accounts.spotify.com/api/token';
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

async function getAccessToken() {
  const response = await axios.post(
    authEndpoint,
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encodedCredentials}`
      }
    }
  );

  return response.data.access_token;
}

export async function getPlaylist(playlistId) {
  const accessToken = await getAccessToken();

  const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.data;
}
