// added validates on rails backend - so no duplicate songs. 
// add if else for dupe errors

const addSongBtn = document.getElementById('add-song-btn')


let addedSong = []

const renderAddSongHeader = () => {
    const addSongFormHeader = document.createElement('h2')
    addSongFormHeader.classList.add('text-center')
    addSongFormHeader.classList.add('add-song-title')
    addSongFormHeader.innerText = 'Add Song'
    contentContainer.appendChild(addSongFormHeader)
}

const renderAddSongForm = () => {
    const addSongContainer = document.createElement('form')
    addSongContainer.id = 'add-song-form'
    addSongContainer.innerHTML = `
        <div class="form-row">
          <div class="col text-center">
            <br>
            <input id='artist-name-input' type="text" class="form-control-lg" placeholder="Enter An Artist..."><br><br>
            <input id='song-name-input' type="text" class="form-control-lg" placeholder="Enter A Song..."><br><br>
            <input id='song-genre-input' type="text" class="form-control-lg" placeholder="Enter A Genre...">
            <br><br>
            <button type="submit" class="btn btn-primary">Add Song</button>
          </div>
    `
    contentContainer.appendChild(addSongContainer)
    addSongFormListener() 
}

const createNewSongInDatabase = () => {
    const songName = document.getElementById('song-name-input')
    const songArtist = document.getElementById('artist-name-input')
    const songGenre = document.getElementById('song-genre-input')
    const newSong = {
        name: songName.value,
        artist: songArtist.value,
        genre: songGenre.value,
    }
    return createNewSong(newSong)
    .then(song => {
        addedSong = song
        createLikeWhenAdded(findCurrentUserInState(), addedSong)
        console.log(addedSong);
    }).then(songAdded)
}

const songAdded = () => {
    contentContainer.innerHTML = ''
    renderAddSongHeader.innerHTML = ''
    const songAddedHeader = document.createElement('h2')
    songAddedHeader.innerText = 'Song Added'
    contentContainer.appendChild(songAddedHeader)
}

const addSongFormListener = () => {
    const signUpForm = document.getElementById('add-song-form')
    signUpForm.addEventListener('submit', event => {
        event.preventDefault()
        createNewSongInDatabase()
        
    })
}

const userLoggedIn = () => {
    if (currentUser.id > 0) {
        contentContainer.innerHTML = ''
        renderAddSongHeader()
        renderAddSongForm()
    } else
    contentContainer.innerHTML = `
    <div class="alert alert-danger" role="alert">
     You must be logged in to add a song.
      </div>
     `
     
    // alert("You must be logged in to add a song")
}

addSongBtn.addEventListener('click', () => {
    userLoggedIn()
})




