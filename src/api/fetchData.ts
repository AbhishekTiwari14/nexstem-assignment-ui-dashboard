export const fetchData = async (key: string) => {
  try {
    const res = await fetch("./dummyData.json")
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
    const data = await res.json()
    return data[key]
  } catch (error) {
    console.error("Error fetching data for key:", key, error)
    return null
  }
}
