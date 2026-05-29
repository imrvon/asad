export default async (request, context) => {
  // We only want to modify requests for the main HTML
  const response = await context.next();
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    return response;
  }

  const clientId = Netlify.env.get("VITE_CLIENT_ID");
  const clientSecret = Netlify.env.get("VITE_CLIENT_SECRET");
  const playlistId = Netlify.env.get("VITE_PLAYLIST_ID");

  if (!clientId || !clientSecret || !playlistId) {
    console.error("Missing environment variables for Edge Function");
    return response;
  }

  let latestTrackUrl = "";

  try {
    // 1. Get Access Token
    const authEndpoint = "https://accounts.spotify.com/api/token";
    const credentials = btoa(`${clientId}:${clientSecret}`);
    const authRes = await fetch(authEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!authRes.ok) {
        throw new Error(`Failed to get access token: ${authRes.status}`);
    }

    const authData = await authRes.json();
    const accessToken = authData.access_token;

    // 2. Fetch tracks in the playlist to find the latest
    let tracks = [];
    let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`;

    // To prevent edge function from timing out on massive playlists, we will bound the loop
    let pageCount = 0;
    while (url && pageCount < 10) { // Max 1000 tracks
      const tracksRes = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
      if (!tracksRes.ok) {
        throw new Error(`Failed to fetch tracks: ${tracksRes.status}`);
      }

      const tracksData = await tracksRes.json();
      if (tracksData.items) {
        tracks = tracks.concat(tracksData.items);
      }
      url = tracksData.next;
      pageCount++;
    }

    // 3. Determine the latest track added
    if (tracks.length > 0) {
      const latestAddedTrack = tracks.reduce((latest, item) => {
        if (!latest || new Date(item.added_at) > new Date(latest.added_at)) {
          return item;
        }
        return latest;
      }, null);

      if (
        latestAddedTrack &&
        latestAddedTrack.track &&
        latestAddedTrack.track.album.images.length > 0
      ) {
        // Prefer the second image (medium size) if available, otherwise fallback to the first
        latestTrackUrl =
          latestAddedTrack.track.album.images[1]?.url ||
          latestAddedTrack.track.album.images[0]?.url;
      }
    }
  } catch (error) {
    console.error("Error fetching Spotify data in Edge Function:", error);
  }

  // If we found a track image, replace the placeholder
  if (latestTrackUrl) {
    const text = await response.text();
    const metaTags = `
    <meta property="og:image" content="${latestTrackUrl}" />
    <meta name="twitter:image" content="${latestTrackUrl}" />`;
    const newText = text.replace("<!-- OG_TAGS -->", metaTags);

    // We must return a new response object with the updated text
    return new Response(newText, {
      status: response.status,
      headers: response.headers,
    });
  }

  return response;
};
