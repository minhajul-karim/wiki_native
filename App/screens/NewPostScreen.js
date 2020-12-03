import { Feather } from '@expo/vector-icons'
import React, { useLayoutEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native'
import { Appbar } from 'react-native-paper'

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
  const [content, setContent] = useState('')

  const headerLeftComponent = () => {
    return (
      <TouchableWithoutFeedback onPress={() => console.log('cancelled')}>
        <Feather name="x" size={24} color="black" />
      </TouchableWithoutFeedback>
    )
  }

  const customHeader = () => {
    return (
      <Appbar.Header style={{ justifyContent: 'space-between' }}>
        <Appbar.Action icon="mail" onPress={() => console.log('cancelled')} />
        <Appbar.Content
          title="Publish"
          onPress={() => console.log('published')}
        />
      </Appbar.Header>
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerLeft: headerLeftComponent,
      // headerRight: () => <Text>Publish</Text>,
      header: customHeader,
    })
  })

  return (
    <ScrollView
      style={[styles.container, { minHeight: Math.round(window.height) }]}
    >
      <TextInput
        style={[styles.input, { height: window.height - 140 }]}
        multiline
        autoFocus
        placeholder="Write something..."
        onChangeText={(text) => setContent(text)}
        value={content}
      />
    </ScrollView>
  )
}
