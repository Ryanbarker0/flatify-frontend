const results = {
    tracks: []
}

const renderSearchHeader = () => {
    const searchHeader = document.createElement('h2')
    searchHeader.innerText = 'Song Search'
    contentContainer.appendChild(searchHeader)
}

const renderSearchBar = () => {
    const searchForm = document.createElement('form')
    searchForm.id = 'search-form'
    searchForm.innerHTML = `
    <input id='search-bar' type="text" name="q" size="21" maxlength="120">
    <input id='submit' type="submit" value="Search">
    `
    contentContainer.appendChild(searchForm)
    searchSubmissionListener()
}

const renderResultsContainer = () => {
    const resultsContainer = document.createElement('div')
    resultsContainer.id = 'results-container'
    contentContainer.appendChild(resultsContainer)
}

const renderSearchPage = () => {
    contentContainer.innerHTML = ''
    renderSearchHeader()
    renderSearchBar()
    renderResultsContainer()
}

const searchSubmissionListener = () => {
    const submitBtn = document.getElementById('submit')
    submitBtn.addEventListener('click', event => {
        event.preventDefault()
        const searchInput = document.getElementById('search-bar')
        const query = searchInput.value
        const resultsContainer = document.getElementById('results-container')
        resultsContainer.innerHTML = ''
        renderResults(query)
    })
} 

const iterateAndAppendResults = () => {
    const resultsContainer = document.getElementById('results-container')
    results.tracks.forEach(track => {
        const trackItem = document.createElement('div')
        trackItem.id = 'track-item'
        trackItem.innerHTML = `<h5>${track.name}</h5>
        <p>${track.artist} <iframe src="https://open.spotify.com/embed/track/${track.id}" width="300" height="100" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
 </p>`
        resultsContainer.appendChild(trackItem)
    })
}

{/* <iframe src="https://open.spotify.com/embed/track/5mJrvv0QofK82eDhmZ7Rlv" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> */}
const renderResults = query => {
    trackSearchRequest(query)
    .then(object => {
        getDesiredResultsValues(object.tracks.items)
        iterateAndAppendResults()
    })
}

const getDesiredResultsValues = tracks => {
    const artists = tracks.map(track => track.artists)
    const artistsArray = getArtistNames(artists)
    const songsArray = tracks.map(element => element.name)
    const songId = tracks.map(element => element.id)
    results.tracks = []

    for (let i = 0; i < tracks.length; i++) {
        let song = {name: songsArray[i], artist: artistsArray[i], id: songId[i]}
        results.tracks.push(song)
    }
} 

const getArtistNames = artists => artists.map(artist => artist[0].name)
