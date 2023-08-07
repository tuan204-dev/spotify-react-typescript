//fix 403 Forbidden

const deleteAllCookies = () => {
  document.cookie = document.cookie.split(';').reduce((newCookie1, keyVal) => {
    const pair = keyVal.trim().split('=')
    if (pair[0]) {
      if (pair[0] !== 'path' && pair[0] !== 'expires') {
        newCookie1 += pair[0] + '=;'
      }
    }
    return newCookie1
  }, 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path:/;')

  caches.keys().then((keys) => {
    keys.forEach((key) => caches.delete(key))
  })

  // indexedDB.databases().then((dbs) => {
  //   dbs.forEach((db) => indexedDB.deleteDatabase(db.name as string))
  // })

  sessionStorage.clear()
}

export default deleteAllCookies
