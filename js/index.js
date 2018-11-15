const topPlaylistList = document.getElementById('top-playlist')
const contentContainer = document.getElementById('content')
const navbarContainer = document.getElementById('navbarSupportedContent')
const navbarItems = [...(document.querySelectorAll('.nav-item'))]
const homeBtn = document.getElementById('home-btn')
const logoutBtn = document.getElementById('logout-btn')


const state = {
    users: []
}

let currentUser = {
    id: 0,
    username: ''
}

const localPlaylists = {
    playlists: []
}


const createPlaylistHeader = () => {
    const topPlaylistHeader = document.createElement('h2')
    topPlaylistHeader.innerText = 'Top Playlists'
    topPlaylistHeader.id = 'playlist-header'
    contentContainer.appendChild(topPlaylistHeader)
}

const createPlaylistList = () => {
    const topPlaylistList = document.createElement('div')
    topPlaylistList.id = 'playlist-list'
    contentContainer.appendChild(topPlaylistList)
}

//WIP
const renderUserPlaylists = (user) => {
    const playlistContainer = document.getElementById('playlist-list')
    user.playlists.forEach(playlist => {
        playlist
        const playlistElement = document.createElement('div')
        playlistElement.dataset.id = `${user.id}`
        playlistElement.innerHTML = `
        

<div class="card text-white bg-dark mb-3" style="max-width: 20rem;">
  <div class="card-header">${user.username}'s Playlist</div>
  <div class="card-body">
    <h4 class="card-title">${playlist.name}</h4>
    <p class="card-text">${playlist.name}</p>
  </div>
</div>
        
        
        
        `
        playlistContainer.appendChild(playlistElement)
    })
}

const renderAllUserPlaylists = users => {
    createPlaylistHeader()
    createPlaylistList()
    users.forEach(user => renderUserPlaylists(user))
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
            renderAllUserPlaylists(state.users)
        })
}

renderHomepage()

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


// ======= Recent Songs ========

const createRecentSongsHeader = () => {
    const recentSongsHeader = document.createElement('h2')
    recentSongsHeader.innerText = 'Recent Songs'
    recentSongsHeader.id = 'recent-songs-header'
    contentContainer.appendChild(recentSongsHeader)
}