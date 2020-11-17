export const saveLocalStorage = (key, val) => {
    window.localStorage.setItem(key, JSON.stringify(val));
}

export const loadLocalStorage = key => {
    return JSON.parse(window.localStorage.getItem(key));
}