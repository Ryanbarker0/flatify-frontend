const allSongsBtn = document.getElementById('all-songs-btn')
const errorDiv = document.createElement('div')

let localLikes = []

const createAllSongsHeader = () => {
    const allSongsHeader = document.createElement('h2')
    allSongsHeader.innerText = 'All Songs'
    allSongsHeader.id = 'all-songs-header'
    contentContainer.appendChild(allSongsHeader)
}


const renderSong = (song, user, usersLikes) => {
    const songList = document.createElement('div')
    songList.className = 'song-list'
    songList.innerHTML = `
        <h5 id='${song.id}'>${song.name}</h5>
        <p id='song-${song.id}'>${song.artist} <i id="like-heart" data-id="${song.id}" class="heart far fa-heart"> Like</i> </p>
        
    `
    contentContainer.appendChild(songList)
    const songItem = document.getElementById(`song-${song.id}`)
    const likeBtnTag = document.querySelector(`i[data-id='${song.id}']`)
    if (currentUser.id > 0) {
        const foundLike = usersLikes.find(element => element.song_id === parseInt(song.id))
        if (!!foundLike) {
            likeBtnTag.dataset.likeId = `${foundLike.id}`
        }
        addPlaylistDropDownMenu(songItem, user, song)
     }
}

const getAllSongs = () => {
    getSongs()
    .then(songs => {
        getLikes()
        .then(likes => {
            localLikes = likes
            const usersLikes = () => {
                if (currentUser.id > 0) {
                    return findLikesOfCurrentUser()
                }
            }
            renderAllSongs(songs, usersLikes())
            checkIfSongIsLiked()
            })
        })
}

const renderAllSongs = (songs, usersLikes) => {
    const user = findCurrentUserInState()
    songs.forEach(song => renderSong(song, user, usersLikes))
}



const findLikesOfCurrentUser = () => localLikes.filter(element => (element.user_id == findCurrentUserInState().id))

allSongsBtn.addEventListener('click', () => {
    contentContainer.innerHTML = ''
    getAllSongs()
    createAllSongsHeader()
    })

const checkIfSongIsLiked = () => {
    const iTags = document.getElementsByTagName('i')
    const iTagsArray = [...iTags]
    iTagsArray.forEach(el => {
        matchSongIdWithTargetId(el)
    })
}

const matchSongIdWithTargetId = element => {
    findCurrentUserInState().songs.forEach(song => {
        if (song.id == parseInt(element.dataset.id)) {
            toggleLikeClassToHeart(element)
        }   
    })
}

const toggleLikeClassToHeart = element => {
    element.classList.toggle('fas')
}

document.addEventListener('click', event => {
       
    if (event.target.classList.contains('heart')) {
       if (!currentUser.id) { return notLoggedInError() }
       
       const id = event.target.dataset.id
       const likeId = event.target.dataset.likeId
       const likedSong = event.target
       toggleLikeClassToHeart(likedSong)

       if (event.target.classList.contains('fas')) { 
           likeSong(currentUser.id, parseInt(id))
            .then(getLikes()
                    .then(likes => {
                        localLikes = likes
                    })
            )
       } else {
            deleteLike(likeId)
            .then(getLikes()
                .then(likes => {
                    localLikes = likes
                })
            ) 
        }
    }  
})

const addPlaylistDropDownMenu = (element, user, song) => {
    const dropDownContainer = document.createElement('div')
    dropDownContainer.className = 'dropdown'
    dropDownContainer.innerHTML = `
    <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Add To Playlist...
    <span class="caret"></span></button>
    <ul id='dropdown-menu-${song.id}' class="dropdown-menu" role="menu" aria-labelledby="menu1">
    </ul>

    `
    element.appendChild(dropDownContainer)
    user.playlists.forEach(playlist => addPlaylistElementsToDropDown(playlist, song))
}

const addPlaylistElementsToDropDown = (playlist, song) => {
    const dropdownMenu = document.getElementById(`dropdown-menu-${song.id}`)
    const dropdownItem = document.createElement('li')
    dropdownItem.role = 'presentation'
    dropdownItem.innerHTML = `
    <a data-song='${song.id}' data-playlist='${playlist.id}' class='menuitem' role="menuitem" tabindex="-1" href="#">${playlist.name}</a>

    `
    dropdownMenu.appendChild(dropdownItem)
}

const checkIfSongIsInPlayList = (playlistId, songId) => {
    const user = findCurrentUserInState()
    const foundPlaylist = user.playlists.find(playlist => playlist.id === parseInt(playlistId))
    const songSearch = foundPlaylist.songs.find(song => song.id === parseInt(songId))
    if (!!songSearch) {
        notifyError()
    } else {
        createPlaylistSong(playlistId, songId)
        notifySuccess()
    }
}

document.addEventListener('click', event => {
    if (event.target.className === 'menuitem') {
        const playlistId = event.target.dataset.playlist
        const songId = event.target.dataset.song
        checkIfSongIsInPlayList(playlistId, songId)
    }
})

const notifySuccess = () => 
    $.notify({
        message: 'Song Successfully Added'
    }, {
        type: 'success',
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
            }
        }
    );

const notifyError = () => 
    $.notify({
        message: 'You have already added this song.'
    }, {
        type: 'danger',
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        }
    });

const notLoggedInError = () => {
    errorDiv.innerHTML = ''
    errorDiv.innerHTML = `
    <div class="alert alert-danger" role="alert">
    You must be logged in to like a song
    </div>
    `
    contentContainer.prepend(errorDiv)
}