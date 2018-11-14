
const renderLoginHeader = () => {
    const loginFormHeader = document.createElement('h2')
    loginFormHeader.innerText = 'Login'
    contentContainer.appendChild(loginFormHeader)
}

const renderLoginForm = () => {
    const loginFormContainer = document.createElement('form')
    loginFormContainer.id = 'login-form'
    loginFormContainer.innerHTML = `
        <div class="form-row">
          <div class="col">
            <input id='username-input' type="text" class="form-control" placeholder="Enter A Username...">
          </div>
        <button type="submit" class="btn btn-primary">Login</button>
    `
    contentContainer.appendChild(loginFormContainer)
    loginFormListener()
}

const findCurrentUser = userInput => {
    const foundUser = state.users.find(user => user.username === userInput.value)
    if (foundUser) {
        currentUser.id = foundUser.id
        currentUser.username = foundUser.username
        toggleLogoutButton()
        renderHomepage()
    } else {
        alert('This username does not exist, please sign up.')
    }
} 

const loginFormListener = () => {
    const loginForm = document.getElementById('login-form')
    loginForm.addEventListener('submit', event => {
        event.preventDefault()
        const usernameInput = document.getElementById('username-input')
        findCurrentUser(usernameInput)
    })
}

loginBtn.addEventListener('click', () => {
    contentContainer.innerHTML = ''
    findAndRemoveActiveNavButton()
    renderLoginHeader()
    renderLoginForm()
})