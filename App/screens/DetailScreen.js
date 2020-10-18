import React, { useState, useEffect } from 'react'
import { View, body, StyleSheet, ScrollView } from 'react-native'
import Markdown from 'react-native-markdown-display'

import CustomActivityIndicator from '../components/CustomActivityIndicator'

const styles = StyleSheet.create({
  body: {
    fontSize: 15,
  },
  container: {
    backgroundColor: '#fff',
    height: '100%',
    padding: 15,
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

export default function DetailScreen({ route }) {
  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState('')

  // Fetch content
  async function loadContent() {
    try {
      const response = await fetch(
        `https://wiki-rest-api.herokuapp.com/api/entries/${route.params.title}`
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

  useEffect(() => {
    loadContent()
  }, [])

  if (isLoading) {
    return <CustomActivityIndicator />
  }
  return (
    <ScrollView style={styles.container}>
      <Markdown style={styles}>{content}</Markdown>
    </ScrollView>
  )
}
