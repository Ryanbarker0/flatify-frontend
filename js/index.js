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
    const topPlaylistList = document.createElement('ul')
    topPlaylistList.id = 'playlist-list'
    contentContainer.appendChild(topPlaylistList)
}

const renderUserPlaylists = (user) => {
    const playlistContainer = document.getElementById('playlist-list')
    user.playlists.forEach(playlist => {
        const playlistElement = document.createElement('li')
        playlistElement.dataset.id = `${user.id}`
        playlistElement.innerText = `${playlist.name}`
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