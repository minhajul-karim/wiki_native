import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Markdown from 'react-native-markdown-display'
import CustomActivityIndicator from '../components/CustomActivityIndicator'
import { makeTitleCase } from '../utils/Helpers'

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

export default function DetailScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState('')
  const postTitle = route.params.title

  // Load content of the card user tapped in home screen
  useEffect(() => {
    // Update screen header
    navigation.setOptions({
      headerTitle: makeTitleCase(postTitle),
    })

    let isSubscribed = true
    // Fetch content
    async function fetchContent(title) {
      try {
        const response = await fetch(
          `https://wiki-rest-api.herokuapp.com/api/entries/${title}`
        )
        const entry = await response.json()
        if (response.ok) {
          // Update state only if component is mounted
          if (isSubscribed) {
            setContent(entry.content)
            setIsLoading(false)
          }
        }
      } catch (error) {
        console.warn('err', error.message)
      }
    }
    fetchContent(postTitle)
    return () => {
      isSubscribed = false
    }
  }, [])

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
