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
        const playlistElement = document.createElement('div')
        setElementAttributes(playlistElement, playlist, user)
        playlistElement.innerHTML = `
        <h5 data-id='${playlist.id}'>${playlist.name}</h5>
        <p><i id="like-heart" data-id="${playlist.id}" class="far fa-heart"> Like</i></p>
        `
        playlistContainer.appendChild(playlistElement)
        viewPlaylistListener(playlist)
        likePlaylistListener(user, playlist)

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
            checkIfPlaylistIsLiked()
        })
}

const findPlaylistInState = playlist => state.users.forEach(user => user.playlists.find(element => element.id === playlist.id))

const viewPlaylistListener = playlist => {
    const playlistElement = document.querySelector(`h5[data-id='${playlist.id}']`)
    playlistElement.addEventListener('click', () => {
            renderPlaylist(playlist)
    })
}

const setElementAttributes = (element, playlist, user) => {
    element.dataset.id = `${playlist.id}`
    element.dataset.user = `${user.id}`
}

const likePlaylistListener = (user, playlist) => {
    const likeBtn = document.querySelector(`i[data-id='${playlist.id}']`)
    likeBtn.addEventListener('click', event => {
        addLikeClassToHeart(likeBtn)
        updateUsersPlaylist(user, playlist)
    })
}

const checkIfPlaylistIsLiked = () => {
    const iTags = document.getElementsByTagName('i')
    const iTagsArray = [...iTags]
    iTagsArray.forEach(el => {
        matchPlaylistIdWithTargetId(el)
    })
}
const matchPlaylistIdWithTargetId = element => {
    findCurrentUserInState().playlists.forEach(playlist => {
        if (playlist.id == parseInt(element.dataset.id)) {
            addLikeClassToHeart(element)
        }
    })
}

allPlaylistsBtn.addEventListener('click', () => {
    renderAllPlaylistsPage()
})