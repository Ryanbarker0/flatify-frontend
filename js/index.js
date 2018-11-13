const topPlaylistList = document.getElementById('top-playlists')


const state = {
    users: []
}

const renderUserPlaylists = user => {
    user.playlists.forEach(playlist => {
        const playlistElement = document.createElement('li')
        playlistElement.dataset.id = `${user.id}`
        playlistElement.innerText = `${playlist.name}`
        topPlaylistList.appendChild(playlistElement)
    })
}

const renderAllUserPlaylists = users => {
    users.forEach(user => renderUserPlaylists(user))
}

getUsers() 
    .then(users => {
        state.users = users
        renderAllUserPlaylists(state.users)
    })