const usersURL = `http://localhost:3000/api/v1/users`
const playlistsURL = `http://localhost:3000/api/v1/playlists`

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

// Needs checking - updating the playlist of the user
const updateUsersPlaylist = user => 
    fetch(`${usersURL}/${user.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })