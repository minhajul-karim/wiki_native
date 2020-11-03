import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import Card from '../components/Card'
import CustomActivityIndicator from '../components/CustomActivityIndicator'
import { EntriesContext } from '../utils/EntriesContext'

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
  const { loadEntries } = useContext(EntriesContext)

  let entries = null
  const loadData = async () => {
    const data = await loadEntries()
    entries = data
  }
  loadData()

  console.log(entries)

  //   useEffect(() => {
  //     const entries = loadEntries()
  //     console.log(entries)
  //   }, [])

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
