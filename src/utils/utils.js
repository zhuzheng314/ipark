export function storageSet (name, value) {
  sessionStorage.setItem(name, JSON.stringify(value))
}

export function storageGet (name) {
  if (!sessionStorage.getItem(name) || sessionStorage.getItem(name) === 'undefined') {
    return null
  } else {
    return JSON.parse(sessionStorage.getItem(name))
  }
}
