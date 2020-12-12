import React, { useEffect, useLayoutEffect, useState } from 'react'
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

export default function NewPostScreen({ navigation }) {
  const [content, setContent] = useState('')
  const [fileName, setFileName] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [
    isPublishButtonInDialogDisabled,
    setIsPublishButtonInDialogDisabled,
  ] = useState(true)
  const [publishButtonColor, setPublishButtonColor] = useState('grey')
  const [isLoading, setIsLoading] = useState(false)
  const [displayFileError, setDisplayFileError] = useState(false)

  const customHeader = ({ navigation }) => {
    return (
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
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
          console.log('Page already exists')
        } else {
          // Go to new page
          console.log('saved')
          setIsModalVisible(false)
          navigation.push('Details', {
            title: fileName.toLowerCase(),
          })
          setContent('')
          setFileName('')
        }
      })
  }

  const cancelHandler = () => {
    setIsModalVisible(false)
    setFileName('')
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      header: customHeader,
    })
  })

  useEffect(() => {
    content.length > 0
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
              animating={false}
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
        style={styles.input}
        multiline
        numberOfLines={5}
        autoFocus
        placeholder="Write markdowm here..."
        onChangeText={(text) => setContent(text)}
        value={content}
      />
    </KeyboardAvoidingView>
  )
}
