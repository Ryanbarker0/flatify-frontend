const topPlaylistList = document.getElementById('top-playlist')
const contentContainer = document.getElementById('content')

const state = {
    users: []
}

const createPlaylistHeader = () => {
    const topPlaylistHeader = document.createElement('h2')
    topPlaylistHeader.innerText = 'Top Playlists'
    topPlaylistHeader.id = 'playlist-header'
    contentContainer.appendChild(topPlaylistHeader)
}

const createPlaylistList = () => {
    const topPlaylistList = document.createElement('ul')
    topPlaylistList.id = 'playlist-list'
    contentContainer.appendChild(topPlaylistList)
}

const renderUserPlaylists = (user) => {
    const playlistContainer = document.getElementById('playlist-list')
    user.playlists.forEach(playlist => {
        const playlistElement = document.createElement('li')
        playlistElement.dataset.id = `${user.id}`
        playlistElement.innerText = `${playlist.name}`
        playlistContainer.appendChild(playlistElement)
    })  
}

const renderAllUserPlaylists = users => {
    createPlaylistHeader()
    createPlaylistList()
    users.forEach(user => renderUserPlaylists(user))
}

getUsers() 
    .then(users => {
        state.users = users
        renderAllUserPlaylists(state.users)
    })