const USER_STORAGE_NAME = "userData"

export const getUserData = () => {
    try {
        return JSON.parse(localStorage.getItem(USER_STORAGE_NAME))
    } catch (error) {
        return null
    }
}

export const setUserData = (data) => {
    localStorage.setItem(USER_STORAGE_NAME, JSON.stringify(data))
}

export const deleteUserData = () => {
    localStorage.removeItem(USER_STORAGE_NAME)
}