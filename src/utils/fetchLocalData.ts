const fetchLocalData = async (fileName: string) => {
  const response = await fetch(`../assets/data/${fileName}.json`)
  const data = await response.json()

  return data
}

export default fetchLocalData
