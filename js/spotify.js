const spotifySearchURL = `https://api.spotify.com/v1/search`
const token = `BQAMiUQUhjM7qiXj31Oox2sw2k9HjCuiM2c6GwP7LtP1L_KWAL535tqWA5DKSv6JfP27alGB8iFCpqG4rOXgiKI4rwEi27SVteWbvEtPwy7odaQUqPHvLDiLG_r9jVdO7SmB8XjsBt545bdjuXY34vSsVazF81yITRobMaf4ZPGqkJJn610NMiewSkII93sotJCjIDdgtzaB_ydZjg6kd2XQext1KM6pNQ4igM7GfmJxFVhm0f6x3TAFL_mCbh_cX7AXF46o1rXqsOtdS5Q`

const trackSearchRequest = query => {
    fetch(`${spotifySearchURL}?q=${query}type=track&market=GB&limit=10`, {
        method: 'GET',
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
} 

const initializeSpotifySDK = () =>
    window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQCEU4tfBALJRCVxARkB1FuxIh--GfT4E7bYxoS2xCU3X7T-uVJ16tEnQ-iEn_h0OwMva15anJ281Di5kJeN5r6Pl8aK8ASDyxDUUYyvzO9w4XL4lCrCCNrgyGliqFlAl9xgFNguyFcGMUsNjS7TyqZI9n_CReE7ZJtZ8RrW';
    const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); }
    });

    // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  player.addListener('player_state_changed', state => { console.log(state); });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();
};

// initializeSpotifySDK()