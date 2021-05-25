import getHashParameters from "../utils/index";
import axios from "axios";

const EXPIRATION_TIME = 3600 * 1000;

const setTokenTimestamp = () => {
  window.localStorage.setItem("spotify_token_timestamp", Date.now());
};

const setLocalAccessToken = (token) => {
  setTokenTimestamp();
  window.localStorage.setItem("spotify_access_token", token);
};

const setLocalRefreshToken = (token) => {
  window.localStorage.setItem("spotify_refresh_token", token);
};

const getTokenTimestamp = () =>
  window.localStorage.getItem("spotify_token_timestamp");

const getLocalAccessToken = () =>
  window.localStorage.getItem("spotify_access_token");

const getLocalRefreshToken = () =>
  window.localStorage.getItem("spotify_refresh_token");

export const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${getLocalRefreshToken()}`
    );
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParameters();

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  //if token has expired, refresh the token

  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn("token has expired, refreshing ...");
    refreshAccessToken();
  }

  // check for local token

  const localAccessToken = getLocalAccessToken();

  if ((!localAccessToken || localAccessToken === undefined) && access_token) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem("spotify_access_token");
  window.localStorage.removeItem("spotify_refresh_token");
  window.localStorage.removeItem("spotify_token_timestamp");
  window.location.assign("/");
};

// API calls:

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

export const getUser = async () => {
  return axios.get("https://api.spotify.com/v1/me", {
    headers,
  });
};

export const getTopTracks = (timeRange) => {
  return axios.get(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`,
    { headers }
  );
};

export const getFollowing = () => {
  return axios.get("https://api.spotify.com/v1/me/following?type=artist", {
    headers,
  });
};

export const getTopArtists = (timeRange) => {
  if (timeRange === "following") return getFollowing();
  return axios.get(
    `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=50`,
    { headers }
  );
};

export const getPlaylists = () => {
  return axios.get("https://api.spotify.com/v1/me/playlists", { headers });
};

export const getPlaylist = (playlistId) => {
  return axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers,
  });
};

export const getTrack = (trackId) =>
  axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers });

export const getTrackFeatures = (trackId) =>
  axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
    headers,
  });

export const getTrackInfo = (trackId) =>
  axios.all([getTrack(trackId), getTrackFeatures(trackId)]).then(
    axios.spread((track, audioFeatures) => ({
      track: track.data,
      audioFeatures: audioFeatures.data,
    }))
  );

export const getArtist = (artistId) =>
  axios.get(`https://api.spotify.com/v1/artists/${artistId}`, { headers });

export const getSimilarArtists = (artistId) => {
  return axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
    {
      headers,
    }
  );
};

export const getArtistTopTracks = (artistId) => {
  return axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=from_token`,
    {
      headers,
    }
  );
};

export const getArtistInfo = (artistId) =>
  axios
    .all([
      getArtist(artistId),
      getArtistTopTracks(artistId),
      getSimilarArtists(artistId),
    ])
    .then(
      axios.spread((artist, topTracks, similarArtists) => {
        let data = {
          artist: artist.data,
          topTracks: topTracks.data.tracks,
          similarArtists: similarArtists.data.artists,
        };
        return data;
      })
    );

export const getRecentlyPlayed = () =>
  axios.get(`https://api.spotify.com/v1/me/player/recently-played`, {
    headers,
  });

export const getArtistsRecommandation = async () => {
  let topArtists = await getTopArtists("long_term");
  let seed = [];

  if (topArtists.data.items.length === 0) return { tracks: [] };

  topArtists.data.items.forEach((artist) => seed.push(artist.id));
  seed = seed.join(",");

  return axios.get(
    `https://api.spotify.com/v1/recommendations?seed_artists=${seed}&limit=10`,
    {
      headers,
    }
  );
};

export const getTracksRecommendation = (seed) => {
  return axios.get(
    `https://api.spotify.com/v1/recommendations?seed_tracks=${seed}&limit=25`,
    { headers }
  );
};

export const getNewReleases = () => {
  return axios.get(`https://api.spotify.com/v1/browse/new-releases?limit=10`, {
    headers,
  });
};

export const createPlaylist = (playlistName, userId) => {
  return axios({
    method: "POST",
    url: `https://api.spotify.com/v1/users/${userId}/playlists`,
    headers,
    data: JSON.stringify({ name: playlistName, public: false }),
  });
};

export const addTracksToPlaylist = (playlistId, uris) => {
  return axios({
    method: "POST",
    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    data: JSON.stringify(uris),
    headers,
  });
};

export const getUserInfo = () => {
  return axios
    .all([
      getUser(),
      getFollowing(),
      getPlaylists(),
      getNewReleases(),
      getArtistsRecommandation(),
    ])
    .then(
      axios.spread(
        (user, following, playlists, newReleases, recommandations) => {
          let data = {
            user: user.data,
            following: following.data,
            playlists: playlists.data,
            newReleases: newReleases.data,
            recommandations: recommandations.data,
          };

          return data;
        }
      )
    );
};
