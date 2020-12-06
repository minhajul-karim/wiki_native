import React, { useLayoutEffect, useState } from 'react'
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from 'react-native'
import { Appbar, Button, Dialog, Paragraph, Portal } from 'react-native-paper'

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    textAlignVertical: 'top',
    fontSize: 18,
    fontFamily: 'serif',
  },
  modal: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    alignSelf: 'center',
  },
})

export default function NewPostScreen({ navigation }) {
  const window = useWindowDimensions()
  const [content, setContent] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const customHeader = ({ navigation }) => {
    return (
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.Content
          title="Publish"
          titleStyle={{ color: '#2B29C6', fontSize: 17 }}
          color="#000"
          onPress={() => setIsModalVisible(true)}
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
      <Portal>
        <Dialog
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
        >
          <Dialog.Title>Ready to publish?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              We save your post in a file. So, please give this file a name.
            </Paragraph>
            <Paragraph>Usually its the title of your post.</Paragraph>
            <TextInput
              placeholder="File name"
              style={{
                height: 35,
                borderBottomWidth: 1,
                borderColor: '#2B29C6',
              }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button color="#2B29C6" onPress={() => setIsModalVisible(false)}>
              Not yet
            </Button>
            <Button color="#2B29C6" onPress={() => setIsModalVisible(false)}>
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <TextInput
        style={[styles.input, { height: window.height - 140 }]}
        multiline
        autoFocus
        placeholder="Write markdowm here..."
        onChangeText={(text) => setContent(text)}
        value={content}
      />
    </ScrollView>
  )
}
