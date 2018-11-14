const usersURL = `http://localhost:3000/api/v1/users`
const playlistsURL = `http://localhost:3000/api/v1/playlists`
const userPlaylistsURL = `http://localhost:3000/api/v1/user_playlists`
const songsURL = `http://localhost:3000/api/v1/songs`
const likesURL = `http://localhost:3000/api/v1/likes`

const getUsers = async () => {
    const response = await fetch(usersURL)
    return response.json()
}

const getPlaylists = async () => {
    const response = await fetch(playlistsURL)
    return response.json()
}

const getPlaylist = async playlist => {
    const response = await fetch(`${usersURL}/${playlist.id}`)
    return response.json()
}

const createNewUser = newUser => 
    fetch(usersURL, {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
                },
        body: JSON.stringify(newUser)
    }).then(resp => resp.json())

const createNewPlaylist = newPlaylist =>
    fetch(playlistsURL, {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newPlaylist)
    }).then(resp => resp.json())

const updateUsersPlaylist = (user, mostRecentPlaylist) => 
    fetch(`${userPlaylistsURL}`, {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            user_id: user.id,
            playlist_id: mostRecentPlaylist.id
        })
    }).then(resp => resp.json())




const getSongs = async () => {
    const response = await fetch(songsURL)
    return response.json()
}

const createNewSong = newSong => 
    fetch(songsURL, {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
                },
        body: JSON.stringify(newSong)
    }).then(resp => resp.json())


const updateLikes = (user, songLikes) => 
fetch(`${likesURL}`, {
    method: 'POST',
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({
        user_id: user.id,
        song_id: song.id
    })
}).then(resp => resp.json())