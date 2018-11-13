const signUpBtn = document.getElementById('sign-up-btn')

const renderSignUpHeader = () => {
    const signUpFormHeader = document.createElement('h2')
    signUpFormHeader.innerText = 'Sign Up'
    contentContainer.appendChild(signUpFormHeader)
}

const renderSignUpForm = () => {
    const signUpFormContainer = document.createElement('form')
    signUpFormContainer.id = 'sign-up-form'
    signUpFormContainer.innerHTML = `
        <div class="form-row">
          <div class="col">
            <input id='username-input' type="text" class="form-control" placeholder="Enter A Username...">
          </div>
        <button type="submit" class="btn btn-primary">Sign Up</button>
    `
    contentContainer.appendChild(signUpFormContainer)
    signUpFormListener()
    
}

const createNewUserInDatabase = () => {
    const usernameInput = document.getElementById('username-input')
    const newUser = {
        username: usernameInput.value
    }
    createNewUser(newUser)
        .then(user => getCurrentUser(user))
}

const signUpFormListener = () => {
    const signUpForm = document.getElementById('sign-up-form')
    signUpForm.addEventListener('submit', event => {
        event.preventDefault()
        createNewUserInDatabase()
    })
}

const getCurrentUser = user => {
    currentUser = {
        id: user.id,
        username: user.username
    }
}

signUpBtn.addEventListener('click', () => {
    contentContainer.innerHTML = ''
    renderSignUpHeader()
    renderSignUpForm()
})



