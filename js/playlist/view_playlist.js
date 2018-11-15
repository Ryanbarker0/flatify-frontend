// add functionality for when an individual playlist is clicked
const renderPlaylistTitle = playlist => {
    const playlistTitle = document.createElement('h2')
    playlistTitle.innerText = `${playlist.name}`
    contentContainer.appendChild(playlistTitle)
}

const renderEmptyPlaylist = () => {
    const emptyPlaylistContainer = document.createElement('div')
    emptyPlaylistContainer.className = 'empty-playlist'
    emptyPlaylistContainer.innerHTML = `
    <p>This playlist has no songs :(</p>
    <button id='view-songs-btn' class='hide'>Add Songs</button>
        `
    contentContainer.appendChild(emptyPlaylistContainer)
    hideSongsBtn()
    addSongsListener()
}

const renderPlaylistSongs = playlist => {
    const songsContainer = document.createElement('ol')
    console.log(playlist.songs)
    playlist.songs.forEach(song => {
        const songElement = document.createElement('li')
        songElement.innerHTML = `${song.name} <button data-id="${song.id}">Delete Song</button>`
        songsContainer.appendChild(songElement)
    })
    contentContainer.appendChild(songsContainer)
}

const addSongsListener = () => {
    const addSongsBtn = document.getElementById('view-songs-btn')
    addSongsBtn.addEventListener('click', () => {
        getAllSongs()
    })
}

const hideSongsBtn = () => {
    const addSongsBtn = document.getElementById('view-songs-btn')
    currentUser.id > 0 ? addSongsBtn.classList.remove('hide') : addSongsBtn.classList.add('')
}

const renderPlaylist = playlist => {
    contentContainer.innerHTML = ''
    renderPlaylistTitle(playlist)
    if (playlist.songs.length > 0) {
        renderPlaylistSongs(playlist)
    } else {
        renderEmptyPlaylist()
    }
}   