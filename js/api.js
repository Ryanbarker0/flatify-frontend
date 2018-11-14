const usersURL = `http://localhost:3000/api/v1/users`
const playlistsURL = `http://localhost:3000/api/v1/playlists`
const userPlaylistsURL = `http://localhost:3000/api/v1/user_playlists`

const getUsers = async () => {
    const response = await fetch(usersURL)
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