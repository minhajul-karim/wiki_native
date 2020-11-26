import React from 'react'
import { ScrollView, StyleSheet, TextInput, useWindowDimensions } from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: { 
    textAlignVertical: "top", 
    fontSize: 18,
    fontFamily: 'serif',
  }
})

export default function CreateScreen() {
  const window = useWindowDimensions()
  
  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={[styles.input, {height: window.height - 140}]}
        autoFocus
        multiline
        placeholder="Write something..."
      />
    </ScrollView>
  )
}