const allSongsBtn = document.getElementById('all-songs-btn')
const errorDiv = document.createElement('div')


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
        <h5 id='${song.id}'>${song.name}</h5>
        <p>${song.artist} <i id="like-heart" data-id="${song.id}" class="far fa-heart"> Like</i></p>
        
    `
    contentContainer.appendChild(songList)
}

const getAllSongs = () => {
getSongs()
    .then(songs => {
        renderAllSongs(songs)
        checkIfElementIsLiked()
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
            addLikeClassToHeart(element)
        }   
    })
}

const addLikeClassToHeart = element => {
    element.setAttribute('class', "fas fa-heart liked-song")
    element.setAttribute('id', "liked-song-heart")
}




document.addEventListener('click', event => {

     if (currentUser.id === 0) {
        if (event.target.id === 'like-heart') {
            notLoggedInError()
    }
        } else {
            if (event.target.id === 'like-heart') {
            const id = event.target.dataset.id
            const likedSong = event.target
            addLikeClassToHeart(likedSong)
                likeSong(currentUser.id, parseInt(id))
        }  
    }
})



const notLoggedInError = () => {
    errorDiv.innerHTML = ''
    errorDiv.innerHTML = `
    <div class="alert alert-danger" role="alert">
    You must be logged in to like a song
    </div>
    `
    contentContainer.prepend(errorDiv)
}