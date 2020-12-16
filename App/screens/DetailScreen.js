import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Markdown from 'react-native-markdown-display'
import { Button } from 'react-native-paper'
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
  const [title, setTitle] = useState('')

  // Load content of the post that user tapped in home screen
  useEffect(() => {
    // Update screen header
    navigation.setOptions({
      headerTitle: makeTitleCase(title),
      headerRight: () => (
        <Button
          color="#2B29C6"
          onPress={() =>
            navigation.navigate('Editor', {
              editableContentTitle: title,
              editableContent: content,
            })
          }
        >
          Edit
        </Button>
      ),
    })
    let isSubscribed = true

    // Set title and content
    setTitle(route.params.title)
    if (route.params.content) {
      setContent(route.params.content)
    } else {
      // Fetch content
      fetch(`https://wiki-rest-api.herokuapp.com/api/entries/${title}`)
        .then((response) => {
          if (!response.ok)
            console.error(`HTTP error! status: ${response.status}`)
          return response.json()
        })
        .then((response) => {
          if (isSubscribed) {
            setContent(response.content)
            setIsLoading(false)
          }
        })
    }
    return () => {
      isSubscribed = false
    }
  })

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
