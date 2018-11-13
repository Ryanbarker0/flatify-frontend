const usersURL = `http://localhost:3000/api/v1/users`

const getUsers = async () => {
    const response = await fetch(usersURL)
    return response.json()
}