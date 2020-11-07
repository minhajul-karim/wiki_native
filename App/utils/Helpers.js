// Convert a name into title case
export const makeTitleCase = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1)

// Generates a random index
export const generateRandomIndex = (numberofEntries) =>
  Math.floor(Math.random() * numberofEntries)

// Fetch entries from API
export const fetchEntries = async () => {
  try {
    const response = await fetch(
      'https://wiki-rest-api.herokuapp.com/api/entries/'
    )
    const allEntries = await response.json()
    if (response.ok) {
      return allEntries.entries
    }
  } catch (error) {
    console.error(error)
  }
  return []
}
