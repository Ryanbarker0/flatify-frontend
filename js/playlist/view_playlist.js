let localPlaylistSongs = []

const storePlaylistSongsLocally = () => {
    getPlaylistSongs()
    .then(playlistSongs => {
        localPlaylistSongs = playlistSongs
    })
}

const findSongsOfCurrentPlaylist = () => {
    const playlistHeader = document.getElementById('playlist-head')
    return localPlaylistSongs.filter(element => (element.playlist_id == playlistHeader.dataset.id))
}


const renderPlaylistTitle = playlist => {
    const playlistTitle = document.createElement('h2')
    playlistTitle.id = `playlist-head`
    playlistTitle.dataset.id = `${playlist.id}`
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
    contentContainer.appendChild(songsContainer)
    playlist.songs.forEach(song => {
        const songElement = document.createElement('li')
        songElement.id = `${song.id}`
        if (!!currentUser.id) { 
            songElement.innerHTML = `${song.name} <button id='delete-btn' data-id="${song.id}">Delete Song</button>`
            songsContainer.appendChild(songElement)
            deleteBtnListener(songElement, song)
        } else {
            songElement.innerHTML = `${song.name}`
            songsContainer.appendChild(songElement)

        }    
    })
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
        storePlaylistSongsLocally()
    } else {
        renderEmptyPlaylist()
    }
}  

const deleteBtnListener = (songElement, song) => {
    const deleteBtn = document.querySelector(`button[data-id='${song.id}']`)
    deleteBtn.addEventListener('click', event => {
        const playlistSong = findSongsOfCurrentPlaylist().find(element => element.song_id == songElement.id)
        deletePlaylistSong(playlistSong)
        event.target.parentElement.remove()
    })
}
