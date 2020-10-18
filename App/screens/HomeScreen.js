import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import Card from '../components/Card'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

// Generates a random id
const randomIdGenerator = () => Math.random().toString(36).substring(7)

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [entries, setEntries] = useState([])

  // Fetch entries from API
  async function loadEntries() {
    try {
      const response = await fetch(
        'https://wiki-rest-api.herokuapp.com/api/entries'
      )
      const allEntries = await response.json()
      if (response.ok) {
        setEntries(allEntries.entries)
        setIsLoading(false)
      }
    } catch (error) {
      console.warn(error.message)
    }
  }

  useEffect(() => {
    loadEntries()
  }, [])

  const renderItem = ({ item }) => <Card title={item} />

  if (isLoading) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
  return (
    // Display entries instead of ActivityIndicator
    <View style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={() => randomIdGenerator()}
      />
    </View>
  )
}
