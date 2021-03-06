const addPlaylistBtn = document.getElementById('add-playlist')

let recentPlaylist = []

const renderAddPlaylistHeader = () => {
    const addPlaylistHeader = document.createElement('h2')
    addPlaylistHeader.classList.add('text-center')
    addPlaylistHeader.innerText = 'Add Playlist'
    contentContainer.appendChild(addPlaylistHeader)
}

const renderNewPlaylistForm = () => {
    const newPlaylistFormContainer = document.createElement('form')
    newPlaylistFormContainer.id = 'add-playlist-form'
    newPlaylistFormContainer.innerHTML = `
        <div class="form-row">
          <div class="col text-center">
            <br>
            <input id='playlist-name-input' type="text" class="form-control-lg" placeholder="Playlist Name...">
            <br><br>
            <button type="submit" class="btn btn-primary">Create Playlist</button>
          </div>
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
            recentPlaylist = playlist
            updateUsersPlaylist(findCurrentUserInState(), recentPlaylist)
            renderPlaylist(recentPlaylist)

        })
}

const newPlaylistFormListener = () => {
    const newPlaylistFormContainer = document.getElementById('add-playlist-form')
    newPlaylistFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        createNewPlaylistInDatabase()
    })
}


addPlaylistBtn.addEventListener('click', () => {
    contentContainer.innerHTML = ''
    if (currentUser.id > 0) {
        renderAddPlaylistHeader()
        renderNewPlaylistForm()
    } else {
    contentContainer.innerHTML = `
    <div class="alert alert-danger" role="alert">
     You must be logged in to add a playlist.
      </div>
     `
    }
})

