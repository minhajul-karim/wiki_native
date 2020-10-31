import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Markdown from 'react-native-markdown-display'

import CustomActivityIndicator from '../components/CustomActivityIndicator'

const styles = StyleSheet.create({
  body: {
    fontSize: 15,
  },
  container: {
    backgroundColor: '#fff',
    height: '100%',
    padding: 10,
    paddingHorizontal: 20,
  },
  content: {
    fontSize: 15,
  },
  paragraph: {
    lineHeight: 25,
  },
  bullet_list: {
    lineHeight: 25,
  },
})

const generateRandomIndex = (numOfEntries) => {
  return Math.floor(Math.random() * numOfEntries)
}

export default function DetailScreen({ route }) {
  const [isLoading, setIsLoading] = useState(true)
  const [entries, setEntries] = useState([])
  const [content, setContent] = useState('')
  const [randInd, setRandInd] = useState(0)

  // Fetch entries from API
  //   async function loadEntries() {
  //     try {
  //       const response = await fetch(
  //         'https://wiki-rest-api.herokuapp.com/api/entries'
  //       )
  //       const allEntries = await response.json()
  //       if (response.ok) {
  //         setEntries(allEntries.entries)
  //       }
  //     } catch (error) {
  //       console.warn(error.message)
  //     }
  //   }

  // Fetch content
  async function loadContent(title) {
    try {
      const response = await fetch(
        `https://wiki-rest-api.herokuapp.com/api/entries/${title}`
      )
      const entry = await response.json()
      if (response.ok) {
        setContent(entry.content)
        setIsLoading(false)
      }
    } catch (error) {
      console.warn(error.message)
    }
  }

  // Load content of the card user tapped in home screen
  useEffect(() => {
    loadContent(route.params.title)
  })

  // Set random index
  //   useEffect(() => {
  //     if (entries.length > 0) {
  //       const randomNum = generateRandomIndex(entries.length)
  //       setRandInd(randomNum)
  //     }
  //   }, [])

  // Load a random entry
  //   useEffect(() => {
  //     if (entries.length > 0) {
  //       loadContent(entries[randInd])
  //     }
  //   }, [entries, randInd])

  // Display activity indicator when the content is not ready yet
  if (isLoading && !content) {
    return <CustomActivityIndicator />
  }

  return (
    <ScrollView style={styles.container}>
      <Markdown style={styles}>{content}</Markdown>
    </ScrollView>
  )
}
