import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, RefreshControl, Text } from 'react-native'
import { Searchbar } from 'react-native-paper'

import { fetchEntries } from '../utils/Helpers'
import Card from '../components/Card'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchBar: {
    backgroundColor: '#EDEDED',
    marginBottom: 20,
  },
  errorMessage: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

// Generates a random id
const randomIdGenerator = () => Math.random().toString(36).substring(7)

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [entries, setEntries] = useState([])
  const [filteredEntries, setFilteredEntries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  // Refresh entries
  const onRefresh = () => {
    setEntries([])
    fetchEntries().then((currentEntries) => setEntries(currentEntries))
  }

  const renderItem = ({ item }) => <Card title={item} navigation={navigation} />

  const onChangeSearch = (query) => {
    setSearchQuery(query)
    if (query.length > 0) {
      const matchedEntries = []
      entries.forEach((entryName) => {
        if (entryName.indexOf(query.toLowerCase()) !== -1) {
          matchedEntries.push(entryName)
        }
      })
      setFilteredEntries(matchedEntries)
    } else {
      setFilteredEntries([])
    }
  }

  // Fetch and set entries
  useEffect(() => {
    let isSubscribed = true
    // Update state only if component is mounted
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

  if (isLoading) {
    return <CustomActivityIndicator />
  }
  if (filteredEntries.length > 0) {
    return (
      <View style={styles.container}>
        <Searchbar
          value={searchQuery}
          onChangeText={onChangeSearch}
          placeholder="Search"
          style={styles.searchBar}
        />
        <FlatList
          data={filteredEntries}
          renderItem={renderItem}
          keyExtractor={() => randomIdGenerator()}
          ListEmptyComponent={
            <Text style={styles.errorMessage}>No result</Text>
          }
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        />
      </View>
    )
  }
  if (filteredEntries.length === 0 && searchQuery.length > 0) {
    return (
      <View style={styles.container}>
        <Searchbar
          value={searchQuery}
          onChangeText={onChangeSearch}
          placeholder="Search"
          style={styles.searchBar}
        />
        <FlatList
          data={filteredEntries}
          renderItem={renderItem}
          keyExtractor={() => randomIdGenerator()}
          ListEmptyComponent={
            <Text style={styles.errorMessage}>No result</Text>
          }
        />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Searchbar
        value={searchQuery}
        onChangeText={onChangeSearch}
        placeholder="Search"
        style={styles.searchBar}
      />
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={() => randomIdGenerator()}
        ListEmptyComponent={
          <Text style={styles.errorMessage}>No wikis? Create one.</Text>
        }
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
    </View>
  )
}
