// Convert a name into title case
export const makeTitleCase = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1)

// Generates a random index
export const generateRandomIndex = (numberofEntries) =>
  Math.floor(Math.random() * numberofEntries)
