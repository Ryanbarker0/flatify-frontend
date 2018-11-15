const loginBtn = document.getElementById('login-btn')
const signUpBtn = document.getElementById('sign-up-btn')

const renderSignUpHeader = () => {
    const signUpFormHeader = document.createElement('h2')
    signUpFormHeader.classList.add('text-center')
    signUpFormHeader.innerText = 'Sign Up'
    contentContainer.appendChild(signUpFormHeader)
}

const renderSignUpForm = () => {
    const signUpFormContainer = document.createElement('form')
    signUpFormContainer.id = 'sign-up-form'
    signUpFormContainer.innerHTML = `
        <div class="form-row">
          <div class="col text-center">
            <br>
            <input id='username-input' type="text" class="form-control-lg" placeholder="Enter A Username">
            <br><br>
            <button type="submit" class="btn btn-primary">Sign Up</button>
          </div>
    `
    contentContainer.appendChild(signUpFormContainer)
    signUpFormListener()

}

const createNewUserInDatabase = () => {
    const usernameInput = document.getElementById('username-input')
    const newUser = {
        username: usernameInput.value
    }
    return createNewUser(newUser)
        .then(user => setCurrentUser(user))
}

const setCurrentUser = user => {
    currentUser = {
        id: user.id,
        username: user.username
    }
}

const signUpFormListener = () => {
    const signUpForm = document.getElementById('sign-up-form')
    signUpForm.addEventListener('submit', event => {
        event.preventDefault()
        createNewUserInDatabase()
            .then(() => {
                if (currentUser.id > 0) {
                    updateNavbar()
                    renderHomepage()
                } else {
                    alert('This username is in-use, please Login.')
                }
            })
    })
}

const updateNavbar = () => {
    if (currentUser.id > 0) {
        toggleLogoutButton()
    }
}

signUpBtn.addEventListener('click', () => {
    contentContainer.innerHTML = ''
    // findAndRemoveActiveNavButton()
    renderSignUpHeader()
    renderSignUpForm()
})