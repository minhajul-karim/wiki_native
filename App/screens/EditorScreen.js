import { useDimensions, useKeyboard } from '@react-native-community/hooks'
import React, { useEffect, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native'
import {
  ActivityIndicator,
  Appbar,
  Button,
  Dialog,
  HelperText,
  Paragraph,
  Portal,
} from 'react-native-paper'

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

export default function NewPostScreen({ route, navigation }) {
  const [content, setContent] = useState('')
  const [fileName, setFileName] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [
    isPublishButtonInDialogDisabled,
    setIsPublishButtonInDialogDisabled,
  ] = useState(true)
  const [publishButtonColor, setPublishButtonColor] = useState('grey')
  const [isSaving, setIsSaving] = useState(false)
  const [displayFileError, setDisplayFileError] = useState(false)
  const { height } = useDimensions().window
  const { keyboardHeight } = useKeyboard()
  const [textInputHeight, setTextInputHeight] = useState(0)

  const customHeader = ({ navigation }) => {
    return (
      <Appbar.Header style={{ backgroundColor: '#fff', marginTop: 0 }}>
        <Appbar.Content
          title="Publish"
          titleStyle={{ color: publishButtonColor, fontSize: 17 }}
          color="#000"
          onPress={() => {
            Keyboard.dismiss()
            content.length > 0 && setIsModalVisible(true)
          }}
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

  const publishHandler = () => {
    setIsSaving(true)
    // Publish new post
    if (!route.params) {
      fetch('https://wiki-rest-api.herokuapp.com/api/entries/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: fileName,
          content: content,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.page_exists) {
            setDisplayFileError(true)
            setIsSaving(false)
          } else {
            // Go to new post
            setIsSaving(false)
            setIsModalVisible(false)
            navigation.navigate('Details', {
              title: fileName.toLowerCase(),
              content: content,
            })
            setContent('')
            setFileName('')
          }
        })
    } else {
      // Update post
      fetch(`https://wiki-rest-api.herokuapp.com/api/entries/${fileName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: fileName,
          content: content,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.file_updated) {
            // Go to updated post
            setIsSaving(false)
            setIsModalVisible(false)
            navigation.navigate('Details', {
              title: fileName.toLowerCase(),
            })
            setContent('')
            setFileName('')
          }
        })
    }
  }

  const cancelHandler = () => {
    setIsModalVisible(false)
    setFileName('')
  }

  useEffect(() => {
    if (route.params) {
      setContent(route.params.editableContent)
      setFileName(route.params.editableContentTitle)
    }
  }, [route.params])

  useEffect(() => {
    setTextInputHeight(Math.floor(height) - Math.floor(keyboardHeight))
    // Set custom screen header
    navigation.setOptions({
      header: customHeader,
    })
    // Dim publish button in customer header for empty content
    content && content.length > 0
      ? setPublishButtonColor('#2B29C6')
      : setPublishButtonColor('grey')
    if (fileName.length > 0) {
      setIsPublishButtonInDialogDisabled(false)
    } else {
      setIsPublishButtonInDialogDisabled(true)
      setDisplayFileError(false)
    }
  })

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
            <Text style={{ marginTop: 5, color: 'grey' }}>
              *Usually its the title of your post.
            </Text>
            <TextInput
              placeholder="File name"
              style={{
                height: 35,
                borderBottomWidth: 1,
                borderColor: '#2B29C6',
              }}
              value={fileName}
              onChangeText={(text) => {
                setFileName(text)
                displayFileError && setDisplayFileError(false)
              }}
            />
            <HelperText type="error" visible={displayFileError}>
              A file with this name already exists!
            </HelperText>
          </Dialog.Content>
          <Dialog.Actions>
            <ActivityIndicator
              animating={isSaving}
              color="#2B29C6"
              style={{ marginRight: 10 }}
            />
            <Button color="#2B29C6" onPress={cancelHandler}>
              Not yet
            </Button>
            <Button
              color="#2B29C6"
              disabled={isPublishButtonInDialogDisabled}
              onPress={publishHandler}
            >
              Publish
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <TextInput
        style={[styles.input, { height: textInputHeight - 100 }]}
        multiline
        autoFocus
        placeholder="Write markdown"
        onChangeText={(text) => setContent(text)}
        value={content}
      />
    </KeyboardAvoidingView>
  )
}
