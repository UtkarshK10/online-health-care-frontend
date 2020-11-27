const key = 'userData'
export const saveLocalStorage = val => {
    window.localStorage.setItem(key, JSON.stringify(val));
}

export const loadLocalStorage = () => {
    return JSON.parse(window.localStorage.getItem(key));
}
export const updateLocalStorage = val => {
    window.localStorage.clear()
    return window.localStorage.setItem(key, JSON.stringify(val));
}
export const clearLocalStorage = val => {
    window.localStorage.clear()
}
export const checkForToken = val => {
    return JSON.parse(window.localStorage.getItem(key))?.token ? true : false;
}