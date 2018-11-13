const addPlaylistBtn = document.getElementById('add-playlist')
// add form for playlist name 
// takes form values, sends post request
// redirects to empty playlist
// when add playlist is clicked, check if user is logged in 
// 

const renderAddPlaylistHeader = () => {
    const addPlaylistHeader = document.createElement('h2')
    addPlaylistHeader.innerText = 'Add Playlist'
    contentContainer.appendChild(addPlaylistHeader)
}

const renderNewPlaylistForm = () => {
    const newPlaylistFormContainer = document.createElement('form')
    newPlaylistFormContainer.id = 'add-playlist-form'
    newPlaylistFormContainer.innerHTML = `
        <div class="form-row">
          <div class="col">
            <input id='playlist-name-input' type="text" class="form-control" placeholder="Playlist Name...">
          </div>
        <button type="submit" class="btn btn-primary">Create Playlist</button>
    `
    contentContainer.appendChild(newPlaylistFormContainer)
    newPlaylistFormListener()
}

const createNewPlaylistInDatabase = () => {
    const playlistNameInput = document.getElementById('playlist-name-input')
    const newPlaylist = {
        name: playlistNameInput.value,
        songs: []
    }
    return createNewPlaylist(newPlaylist)
        .then(playlist => {
            findCurrentUserInState().playlists.push(playlist)
        })
}

const newPlaylistFormListener = () => {
    const newPlaylistFormContainer = document.getElementById('add-playlist-form')
    newPlaylistFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        createNewPlaylistInDatabase()
        console.log(findCurrentUserInState())
        // updateUsersPlaylist(findCurrentUserInState())

        // creates playlist in database
        // need to post to playlist 
        // might need to post to user_playlist - add routes in backend
        // can update local state by pushing in new playlist, then patching
    })
}


addPlaylistBtn.addEventListener('click', () => {
    contentContainer.innerHTML = ''
    renderAddPlaylistHeader()
    renderNewPlaylistForm()
})

