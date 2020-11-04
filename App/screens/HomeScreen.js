import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import Card from '../components/Card'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
})

// Generates a random id
const randomIdGenerator = () => Math.random().toString(36).substring(7)

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [entries, setEntries] = useState([])

  useEffect(() => {
    let isSubsribed = true
    // Fetch entries from API
    async function loadEntries() {
      try {
        const response = await fetch(
          'https://wiki-rest-api.herokuapp.com/api/entries'
        )
        const allEntries = await response.json()
        if (response.ok) {
          // Set state to mounted components only
          if (isSubsribed) {
            setEntries(allEntries.entries)
            setIsLoading(false)
          }
        }
      } catch (error) {
        console.warn(error.message)
      }
    }
    loadEntries()
    return () => {
      isSubsribed = false
    }
  }, [])

  const renderItem = ({ item }) => <Card title={item} navigation={navigation} />

  if (isLoading) {
    return <CustomActivityIndicator />
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
