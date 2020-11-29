import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  publish: {
    fontSize: 17,
    color: 'green',
  },
})

export default function NewPostScreenHeader() {
  const navigation = useNavigation()
  const cancelHandler = () => {
    Keyboard.dismiss()
    navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={cancelHandler}>
        <Feather name="x" size={24} color="black" />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => console.log('Pressed publish')}>
        <Text style={styles.publish}>Publish</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}
