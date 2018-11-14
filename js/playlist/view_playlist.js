// add functionality for when an individual playlist is clicked
const renderPlaylistTitle = playlist => {
    const playlistTitle = document.createElement('h2')
    playlistTitle.innerText = `${playlist.name}`
    contentContainer.appendChild(playlistTitle)
}

const renderEmptyPlaylist = () => {
    const emptyPlaylistContainer = document.createElement('div')
    emptyPlaylistContainer.className = 'empty-playlist'
    emptyPlaylistContainer.innerHTML = `<p>This playlist has no songs :(</p>`
    contentContainer.appendChild(emptyPlaylistContainer)
}

const renderPlaylistSongs = playlist => {
    const songsContainer = document.createElement('ol')
    playlist.songs.forEach(song => {
        const songElement = document.createElement('li')
        songElement.innerHTML = `${song.name} <button data-id="${song.id}">Delete Song</button>`
        songsContainer.appendChild(songElement)
    })
    contentContainer.appendChild(songsContainer)
}

const renderPlaylist = playlist => {
    contentContainer.innerHTML = ''
    renderPlaylistTitle(playlist)
    if (playlist.songs) {
        renderPlaylistSongs(playlist)
    } else {
        renderEmptyPlaylist()
    }
}   