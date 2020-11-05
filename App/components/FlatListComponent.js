import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { Searchbar } from 'react-native-paper'

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

export default function FlatListComponent() {
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
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
    </View>
  )
}
