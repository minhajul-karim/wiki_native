import React from 'react'
import {
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    textAlignVertical: 'top',
    fontSize: 18,
    fontFamily: 'serif',
  },
})

export default function NewPostScreen({ navigation }) {
  const window = useWindowDimensions()

  return (
    <ScrollView
      style={[styles.container, { minHeight: Math.round(window.height) }]}
    >
      <TextInput
        style={[styles.input, { height: window.height - 140 }]}
        multiline
        autoFocus
        placeholder="Write something..."
      />
    </ScrollView>
  )
}