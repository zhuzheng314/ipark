export function storageSet (name, value) {
  sessionStorage.setItem(name, JSON.stringify(value))
}

export function storageGet (name) {
  return JSON.parse(sessionStorage.getItem(name))
}
