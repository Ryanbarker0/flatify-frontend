const usersURL = `http://localhost:3000/api/v1/users`

const getUsers = async () => {
    const response = await fetch(usersURL)
    return response.json()
}

const createNewUser = newUser => 
    fetch(usersURL, {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
                },
        body: JSON.stringify(newUser)
    }).then(resp => resp.json())