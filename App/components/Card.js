import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { makeTitleCase } from '../utils/Helpers'

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DBDBDB',
    padding: 20,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#121212',
  },
})

export default function Card({ title, navigation }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.push('Details', {
          title,
        })
      }
    >
      <Text style={styles.cardTitle}>{makeTitleCase(title)}</Text>
    </TouchableOpacity>
  )
}
