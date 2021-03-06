const formContainer = document.getElementById('formContainer')
const topPlaylistList = document.getElementById('top-playlist')
const contentContainer = document.getElementById('content')
const navbarContainer = document.getElementById('navbarSupportedContent')
const navbarItems = [...(document.querySelectorAll('.nav-item'))]
const homeBtn = document.getElementById('home-btn')
const logoutBtn = document.getElementById('logout-btn')
const navbarBrand = document.getElementById('brand')
const searchBtn = document.getElementById('search')

const state = {
    users: []
}

let currentUser = {
    id: 0,
    username: ''
}

let localPlaylists = []

const createPlaylistHeader = () => {
    const topPlaylistHeader = document.createElement('h2')
    topPlaylistHeader.innerText = 'Popular Playlists'
    topPlaylistHeader.id = 'playlist-header'
    contentContainer.appendChild(topPlaylistHeader)
}

const createPlaylistList = () => {
    const topPlaylistList = document.createElement('div')
    topPlaylistList.id = 'playlist-list'
    topPlaylistList.classList.add('row')
    topPlaylistList.classList.add('container')
    contentContainer.appendChild(topPlaylistList)
}

// const getSongsFromPlaylist = (playlist) => {
//     playlist.songs
//     getSongsFromPlaylist.forEach(song => song.name)
//     console.log(getSongsFromPlaylist);
// } 



const renderTopPlaylist = playlist => {
    const playlistContainer = document.getElementById('playlist-list')
    const playlistElement = document.createElement('div')
    // findSongsOfCurrentPlaylist(playlist)


    playlistElement.classList.add('col-md-4')
    playlistElement.innerHTML = `

    <div id="${playlist.id}" class="">
      <div class="thecard">
        <div class="thecard__side thecard__side--front text-center">
            <h5 class='card-title'>${playlist.name}</h5>
        </div>
        <div class="thecard__side thecard__side--back text-center">
            <h6 class="card-title">Songs</h6>
        <ul id="playlist-song-list"></ul>
        </div>
      </div>
        `
        playlistContainer.appendChild(playlistElement)
        playListCardListener(playlist)
}

const renderTopPlaylists = playlists => {
    createPlaylistHeader()
    createPlaylistList()
    playlists.forEach(playlist => renderTopPlaylist(playlist))

}

const activateHomepageButton = () => {
    if (!homeBtn.classList.contains('active')) {
        homeBtn.classList.add('active')
        homeBtn.parentElement.classList.add('active')
    }
}

const renderHomepage = () => {
    contentContainer.innerHTML = ''
    activateHomepageButton()
    
    getUsers()
    .then(users => {
        state.users = users
        getPlaylists()
        .then(playlists => {
            localPlaylists = playlists
            renderTopPlaylists(getArrayOfPopularPlaylists())
        })
    })
    
    renderSidebar()
}

const findCurrentUserInState = () => state.users.find(user => user.id === currentUser.id)

const findAndRemoveActiveNavButton = () => {
    const activeButton = navbarItems.find(el => el.classList.contains('active'))
    activeButton.classList.remove('active')
    activeButton.firstElementChild.classList.remove('active')
}

const toggleLogoutButton = () => {
    loginBtn.classList.toggle('hide')
    logoutBtn.classList.toggle('hide')
    signUpBtn.classList.toggle('hide')
}

const removeElement = element => {
    element.parentNode.removeChild(element)
}

const addElement = (parent, element) => {
    parent.appendChild(element)
}

homeBtn.addEventListener('click', () => { renderHomepage() })
logoutBtn.addEventListener('click', () => { window.location.reload() })
searchBtn.addEventListener('click', () => { renderSearchPage() })

const playListCardListener = playlist => {
    const playlistCard = document.getElementById(`${playlist.id}`)
    playlistCard.addEventListener('click', () => {
        renderPlaylist(playlist)
    })
}

// Find and Render Popular Playlists

const findPlaylistLocally = playlistId => localPlaylists.find(playlist => playlist.id === playlistId)

const getPlaylistIdsFromUsers = () =>
    state.users.map(user =>
        user.playlists.map(playlist =>
            playlist.id)).flat()

const getArrayOfPopularPlaylistIds = () => 
    sortByPopularAndRemoveDuplicates(getPlaylistIdsFromUsers()).map(element =>
        parseInt(element))

const getArrayOfPopularPlaylists = () => getArrayOfPopularPlaylistIds().map(element => findPlaylistLocally(element))

const sortByPopularAndRemoveDuplicates = array => {
    var frequency = {},
        value;
    for (var i = 0; i < array.length; i++) {
        value = array[i];
        if (value in frequency) {
            frequency[value]++;
        } else {
            frequency[value] = 1;
        }
    }
    var uniques = [];
    for (value in frequency) {
        uniques.push(value);
    }

    function compareFrequency(a, b) {
        return frequency[b] - frequency[a];
    }
    return uniques.sort(compareFrequency);
}

navbarBrand.addEventListener('click', () => renderHomepage())

renderHomepage()



