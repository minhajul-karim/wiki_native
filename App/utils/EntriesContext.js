import React, { createContext, useEffect, useState } from 'react'

export const EntriesContext = createContext()

export const EntriesProvider = (props) => {
  const [entries, setEntries] = useState([])

  // Fetch entries from API
  const loadEntries = async () => {
    try {
      const response = await fetch(
        'https://wiki-rest-api.herokuapp.com/api/entries'
      )
      const allEntries = await response.json()
      if (response.ok) {
        return allEntries.entries
      }
    } catch (error) {
      console.warn(error.message)
    }
  }

  return (
    <EntriesContext.Provider
      value={{
        entries,
        loadEntries,
      }}
    >
      {props.children}
    </EntriesContext.Provider>
  )
}
