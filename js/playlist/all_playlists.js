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

const renderAllPlaylistsForUsers = playlist => {
    const playlistContainer = document.getElementById('playlist-list')
    const playlistElement = document.createElement('div')
    playlistElement.dataset.id = `${playlist.id}`
    playlistElement.innerHTML = `


    <div class="card text-white bg-dark mb-3" style="max-width: 20rem;">
  <div class="card-body">
  <h5 data-id='${playlist.id}'><a href='#'>${playlist.name}</a></h5>
  <p><i id="like-heart" data-id="${playlist.id}" class="far fa-heart"> Like</i></p>

  </div>
</div>
    `
    playlistContainer.appendChild(playlistElement)
    viewPlaylistListener(playlist)
    likePlaylistListener(findCurrentUserInState(), playlist)
}

const renderAllPlaylists = playlists => {
    createAllPlaylistHeader()
    createPlaylistList()
    playlists.forEach(playlist => renderAllPlaylistsForUsers(playlist))
}

const renderAllPlaylistsPage = () => {
    contentContainer.innerHTML = ''
    getPlaylists()
        .then(playlists => {
            localPlaylists = playlists
            renderAllPlaylists(playlists)
            checkIfPlaylistIsLiked()
        })
}

const viewPlaylistListener = playlist => {
    const playlistElement = document.querySelector(`h5[data-id='${playlist.id}']`)
    playlistElement.addEventListener('click', () => {
            renderPlaylist(playlist)
    })
}

const likePlaylistListener = (user, playlist) => {
    const likeBtn = document.querySelector(`i[data-id='${playlist.id}']`)
    likeBtn.addEventListener('click', () => {
        toggleLikeClassToHeart(likeBtn)
        updateUsersPlaylist(user, playlist)
    })
}

const checkIfPlaylistIsLiked = () => {
    const iTags = document.getElementsByTagName('i')
    const iTagsArray = [...iTags]
    iTagsArray.forEach(element => {
        matchPlaylistIdWithTargetId(element)
    })
}

const matchPlaylistIdWithTargetId = element => {
    findCurrentUserInState().playlists.forEach(playlist => {
        if (playlist.id == parseInt(element.dataset.id)) {
            toggleLikeClassToHeart(element)
        }
    })
}

allPlaylistsBtn.addEventListener('click', () => {
    renderAllPlaylistsPage()
})