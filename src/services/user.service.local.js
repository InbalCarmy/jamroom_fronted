import { storageService } from "./async-storage.service"


const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    remove,
    // update,
    getLoggedinUser,
    saveLoggedinUser,
    getUsers,
    _createDemoUsers
}

_createDemoUsers()

async function getUsers(){
    const users = await storageService.query('user')
    return users.map(user => {
        delete user.password
        return user
    })
}

function remove(userId) {
    return storageService.remove('user', userId)
}

function getLoggedinUser(){
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function signup(userCred) {
    const user = await storageService.post('user', userCred)
    return saveLoggedinUser(user)
}

async function login(userCred) {
    try{
        const users = await storageService.query('user')
        const user = users.find(user => user.username === userCred.username)
        console.log('user:', user);
        if(user) return saveLoggedinUser(user)   
        throw new Error('Invalid username or password')
    }catch(err){
        console.log('userService: cannotlogin', err);
        throw err
}

}

async function saveLoggedinUser(user){
    user = {
        _id: user._id,
        username: user.username,
        instrument: user.instrument,
        isAdmin: user.isAdmin
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function _createDemoUsers() {
    const demoUsers = [
        {
            username: 'admin',
            password: 'admin123',
            instrument: 'Piano',
            isAdmin: true
        },
        {
            username: 'john_guitar',
            password: 'pass123',
            instrument: 'Guitar',
            isAdmin: false
        },
        {
            username: 'sarah_drums',
            password: 'pass123',
            instrument: 'Drums',
            isAdmin: false
        },
        {
            username: 'mike_bass',
            password: 'pass123',
            instrument: 'Bass',
            isAdmin: false
        },
        {
            username: 'emma_vocals',
            password: 'pass123',
            instrument: 'Vocals',
            isAdmin: false
        }
    ]

    const existingUsers = await storageService.query('user')
    if (existingUsers.length > 0) {
        console.log('Demo users already exist')
        return existingUsers
    }

    const createdUsers = []
    for (const userCred of demoUsers) {
        const user = await storageService.post('user', userCred)
        createdUsers.push(user)
    }

    console.log('Created 5 demo users (1 admin, 4 regular users)')
    return createdUsers
}