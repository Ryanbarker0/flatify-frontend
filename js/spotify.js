const spotifySearchURL = `https://api.spotify.com/v1/search`
const token = `BQDyHNY3uyZp7eaGRxyMulVCgb9fl-efyuulO4WXAljlNmelvg8igDgif4UiEQq0oMURB4IkHijS0Fbi2HoQMh39-EeK2natpGFdHnh9r2R2jG5TPK8MNWqBL2Xiyp_zaW8YjmI9dnp72ZtvuCGxe6951hfb_IIzSE1ciRl2rsGgNJ_bdTI6uetpR-7hdn3J8ez8hTgXX77ZSfk1WL-t29WNQEFQBparJLUl1tk_mK3cGPKzn2MzE6elx9Pa2j_4Aw0Kigz-EBAoHgGrdg0`

const trackSearchRequest = query => 
    fetch(`${spotifySearchURL}?q=${query}&type=track&market=GB&limit=10&offset=5`, {
        method: 'GET',
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    }).then(resp => resp.json())


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