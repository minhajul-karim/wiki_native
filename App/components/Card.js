import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { makeTitleCase } from '../utils/Helpers'

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
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
    fontSize: 15,
    fontWeight: '600',
    color: '#121212',
  },
  cardText: {
    fontSize: 15,
    color: '#EDEDED',
    marginTop: 10,
  },
})

export default function Card({ title, navigation }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.push('detailScreen', {
          title,
        })
      }
    >
      <Text style={styles.cardTitle}>{makeTitleCase(title)}</Text>
      {/* <Text style={styles.cardText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
          ad.ipsum dolor sit amet consectetur adipisicing elit. Exercitationem,
          nihil...
        </Text> */}
    </TouchableOpacity>
  )
}
