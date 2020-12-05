import { Feather } from '@expo/vector-icons'
import React, { useLayoutEffect, useState } from 'react'
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native'
import { Appbar } from 'react-native-paper'

const styles = StyleSheet.create({
  container: {
    padding: 15,
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

  const customHeader = ({ navigation }) => {
    return (
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.Content
          title="Publish"
          titleStyle={{ color: 'green', fontSize: 17 }}
          color="#000"
          onPress={() => console.log(content)}
        />
        <Appbar.Action
          icon="close"
          color="#000"
          onPress={() => {
            setContent('')
            navigation.goBack()
            Keyboard.dismiss()
          }}
        />
      </Appbar.Header>
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
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
