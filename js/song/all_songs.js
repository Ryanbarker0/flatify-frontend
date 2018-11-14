const allSongsBtn = document.getElementById('all-songs-btn')



const createAllSongsHeader = () => {
    const allSongsHeader = document.createElement('h2')
    allSongsHeader.innerText = 'All Songs'
    allSongsHeader.id = 'all-songs-header'
    contentContainer.appendChild(allSongsHeader)
}
const renderSong = (song) => {
    const songList = document.createElement('div')
    songList.className = 'song-list'
    songList.innerHTML = `
        <h5>${song.name}</h5>
        <p>${song.artist}</p>
    `
    contentContainer.appendChild(songList)
}

const getAllSongs = () => {
getSongs()
    .then(songs => {
        renderAllSongs(songs)
    })
}


const renderAllSongs = songs => 
    songs.forEach(song => renderSong(song))

allSongsBtn.addEventListener('click', () => {
    contentContainer.innerHTML = ''
    getAllSongs()
    createAllSongsHeader()
    // renderAllSongs()
})