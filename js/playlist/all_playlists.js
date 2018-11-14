const allPlaylistsBtn = document.getElementById('all-playlists')

const createAllPlaylistHeader = () => {
    const allPlaylistHeader = document.createElement('h2')
    allPlaylistHeader.innerText = 'All Playlists'
    allPlaylistHeader.id = 'playlist-header'
    contentContainer.appendChild(allPlaylistHeader)
}

const createAllPlaylistList = () => {
    const allPlaylistList = document.createElement('ul')
    allPlaylistList.id = 'playlist-list'
    contentContainer.appendChild(allPlaylistList)
}

const renderAllPlaylistsForUsers = user => {
    const playlistContainer = document.getElementById('playlist-list')
    user.playlists.forEach(playlist => {
        const playlistElement = document.createElement('li')
        setElementAttributes(playlistElement, playlist, user)
        playlistElement.innerText = `${playlist.name}`
        playlistContainer.appendChild(playlistElement)
        viewPlaylistListener(playlist)

    })
}

const renderAllPlaylists = users => {
    createAllPlaylistHeader()
    createPlaylistList()
    users.forEach(user => renderAllPlaylistsForUsers(user))
}

const renderAllPlaylistsPage = () => {
    contentContainer.innerHTML = ''
    getUsers()
        .then(users => {
            state.users = users
            renderAllPlaylists(state.users)
        })
}

const findPlaylistInState = playlist => state.users.forEach(user => user.playlists.find(element => element.id === playlist.id))

const viewPlaylistListener = playlist => {
    const playlistElement = document.querySelector(`li[data-id='${playlist.id}']`)
    playlistElement.addEventListener('click', () => {
            renderPlaylist(playlist)
    })

}

const setElementAttributes = (element, playlist, user) => {
    element.dataset.id = `${playlist.id}`
    element.dataset.user = `${user.id}`
}

allPlaylistsBtn.addEventListener('click', () => {
    renderAllPlaylistsPage()
})