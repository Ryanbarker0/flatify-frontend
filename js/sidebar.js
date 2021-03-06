const sidebarContainer = document.getElementById('sticky-sidebar')


const createSidebarHeader = () => {
    const sidebarHeader = document.createElement('div')
    sidebarHeader.innerHTML = '<h6>My Playlists</h6>'
    sidebarHeader.id = 'sidebar-header'
    sidebarHeader.classList.add('sidebar-header')
    sidebarContainer.appendChild(sidebarHeader)
}

const createUserPlaylistList = () => {
    const userPlaylistList = document.createElement('div')
    userPlaylistList.id = 'playlist-list'
    userPlaylistList.classList.add('col-md-2')
    sidebarContainer.appendChild(userPlaylistList)
}

const getUserPlaylists = () => {
    createSidebarHeader()
    const userPlaylists = findCurrentUserInState().playlists
    userPlaylists.forEach(playlist => { renderUserPlaylistList(playlist)

    })
}


const renderUserPlaylistList = playlist => {
    // const userPlaylistContainer = document.getElementById('user-playlist-list')
    const userPlaylistElement = document.createElement('div')
        userPlaylistElement.classList.add("nav.nav-pills.nav-stacked.side-scroll")
        userPlaylistElement.innerHTML = `

            <p>${playlist.name}</p>
       
            
            `
            sidebarContainer.appendChild(userPlaylistElement)
        }
        
        
    
    //dom content loader
    
    // renderSidebar()
const renderSidebar = () => {
    sidebarContainer.innerHTML = ''
    getUserPlaylists()
}
