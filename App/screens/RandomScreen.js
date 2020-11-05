import React, { useEffect, useState } from 'react'
import { Button, View } from 'react-native'

import { generateRandomIndex } from '../utils/Helpers'
import Card from '../components/Card'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

export default function RandomScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [entries, setEntries] = useState([])
  const [randomPost, setRandomPost] = useState('')

  // Fetch entries from API
  async function loadEntries() {
    try {
      const response = await fetch(
        'https://wiki-rest-api.herokuapp.com/api/entries'
      )
      const allEntries = await response.json()
      if (response.ok) {
        setEntries(allEntries.entries)
      }
    } catch (error) {
      console.warn(error.message)
    }
  }

  useEffect(() => {
    if (entries.length === 0) {
      loadEntries()
    }
    if (entries.length > 0 && randomPost === '') {
      setRandomPost(entries[0])
      setIsLoading(false)
    }
  }, [entries, randomPost])

  if (isLoading) {
    return <CustomActivityIndicator />
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card title={randomPost} navigation={navigation} />
      <Button
        title="Load a random page"
        onPress={() => {
          const randomIndex = generateRandomIndex(entries.length)
          setRandomPost(entries[randomIndex])
        }}
      />
    </View>
  )
}
