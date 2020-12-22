import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import Card from '../components/Card'
import CustomActivityIndicator from '../components/CustomActivityIndicator'
import { fetchEntries } from '../utils/Helpers'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchBar: {
    backgroundColor: '#f5f5f5',
    marginBottom: 20,
  },
  boldText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

// Generates a random id
const randomIdGenerator = () => Math.random().toString(36).substring(7)

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [entries, setEntries] = useState([])
  const [storedEntries, setStoredEntries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  // Refresh entries
  const onRefresh = () => {
    setIsLoading(true)
    setEntries([])
    fetchEntries().then((currentEntries) => {
      setEntries(currentEntries)
      setStoredEntries(currentEntries)
      setIsLoading(false)
    })
  }

  const renderItem = ({ item }) => <Card title={item} navigation={navigation} />

  const onChangeSearch = (query) => {
    const matchedEntries = []
    storedEntries.forEach((entryName) => {
      const formattedQuery = query.toLowerCase()
      if (entryName.indexOf(formattedQuery) !== -1) {
        matchedEntries.push(entryName)
      }
    })
    setSearchQuery(query)
    if (query.length > 0) {
      setEntries(matchedEntries)
    } else {
      setEntries(storedEntries)
    }
  }

  // Fetch and set entries
  useEffect(() => {
    let isSubscribed = true
    // Update state only if component is mounted
    if (isSubscribed) {
      fetchEntries().then((currentEntries) => {
        setEntries(currentEntries)
        setStoredEntries(currentEntries)
        setIsLoading(false)
      })
    }
    return () => {
      isSubscribed = false
    }
  }, [])

  if (isLoading) {
    return <CustomActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={randomIdGenerator}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ padding: 1 }}>
            <Text
              style={{
                color: '#2B29C6',
                fontSize: 30,
                fontWeight: 'bold',
                marginBottom: 10,
              }}
            >
              WiKi
            </Text>
            <Searchbar
              value={searchQuery}
              onChangeText={(text) => onChangeSearch(text)}
              placeholder="Search"
              style={styles.searchBar}
            />
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
    </View>
  )
}
