const playlistList = document.getElementById('playlist-list')


const state = {
    users: []
}

const renderUserPlaylists = user => {
    user.playlists.forEach(playlist => {
        const playlistElement = document.createElement('li')
        playlistElement.dataset.id = `${user.id}`
        playlistElement.innerText = `${playlist.name}`
        playlistList.appendChild(playlistElement)
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