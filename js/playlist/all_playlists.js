const allPlaylistsBtn = document.getElementById('all-playlists')

const createAllPlaylistHeader = () => {
    const allPlaylistHeader = document.createElement('h2')
    allPlaylistHeader.innerText = 'All Playlists'
    allPlaylistHeader.id = 'playlist-header'
    contentContainer.appendChild(allPlaylistHeader)
}

const createAllPlaylistList = () => {
    const allPlaylistList = document.createElement('div')
    allPlaylistList.id = 'playlist-list'
    contentContainer.appendChild(allPlaylistList)
}

const renderAllPlaylistsForUsers = playlist => {
    const playlistContainer = document.getElementById('playlist-list')
    const playlistElement = document.createElement('div')
    playlistElement.classList.add('col-md-4')
    playlistElement.dataset.id = `${playlist.id}`
    playlistElement.innerHTML = `


    <div id="${playlist.id}" class="">
    <div class="thecard">
        <div class="thecard__side thecard__side--front text-center">
            <h5 class='card-title' data-id='${playlist.id}'>${playlist.name}</h5>
        </div>
        <div class="thecard__side thecard__side--back text-center">
            <h5 class='card-title'>${playlist.name}</h5>
            <i id="like-heart" data-id="${playlist.id}" class="far fa-heart"> Like</i>
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
    console.log(likeBtn);
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