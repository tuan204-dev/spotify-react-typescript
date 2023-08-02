//fix 403 Forbidden

const deleteAllCookies = () => {
  const cookies = document.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }

  caches.keys().then((keys) => {
    keys.forEach((key) => caches.delete(key))
  })

  indexedDB.databases().then((dbs) => {
    dbs.forEach((db) => indexedDB.deleteDatabase(db.name as string))
  })
}

export default deleteAllCookies
