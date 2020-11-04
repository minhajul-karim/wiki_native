import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native'

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

  // Fetch entries from API
  const fetchEntries = async () => {
    try {
      const response = await fetch(
        'https://wiki-rest-api.herokuapp.com/api/entries'
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

  // Refresh entries
  const onRefresh = () => {
    setEntries([])
    fetchEntries().then((currentEntries) => setEntries(currentEntries))
  }

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) {
      fetchEntries().then((currentEntries) => {
        setEntries(currentEntries)
        setIsLoading(false)
      })
    }
    return () => {
      isSubscribed = false
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
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
    </View>
  )
}
