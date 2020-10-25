import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Searchbar, Drawer } from 'react-native-paper'
import { Foundation, FontAwesome } from '@expo/vector-icons'

const styles = StyleSheet.create({
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
    marginVertical: 15,
  },
})

export default function DrawerContent(props) {
  const [searchQuery, setSearchQuery] = useState('')
  const onChangeSearch = (query) => setSearchQuery(query)
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={{ padding: 10 }}>
          <Text style={styles.logo}>Wiki</Text>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
          />
          <DrawerItem
            label="Create new page"
            onPress={() => {
              props.navigation.navigate('homeScreen')
            }}
            icon={() => <Foundation name="page-add" size={24} color="black" />}
          />
          <DrawerItem
            label="Random page"
            onPress={() => null}
            icon={() => <FontAwesome name="random" size={24} color="black" />}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  )
}
