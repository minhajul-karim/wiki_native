import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, Button } from 'react-native'

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

  const renderItem = ({ item }) => <Card title={item} navigation={navigation} />

  if (isLoading) {
    return <CustomActivityIndicator />
  }
  return (
    // Display entries instead of ActivityIndicator
    <View style={styles.container}>
      <Button title="Go" onPress={() => navigation.navigate('testScreen')} />
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={() => randomIdGenerator()}
      />
    </View>
  )
}
