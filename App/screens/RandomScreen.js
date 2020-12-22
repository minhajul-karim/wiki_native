import { FontAwesome5 } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native'
import Card from '../components/Card'
import CustomActivityIndicator from '../components/CustomActivityIndicator'
import { fetchEntries, generateRandomIndex } from '../utils/Helpers'

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    marginLeft: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  diceButton: {
    backgroundColor: '#2B29C6',
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
})

export default function RandomScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [entries, setEntries] = useState([])
  const [randomPost, setRandomPost] = useState('')
  const [isRotated, setIsRotated] = useState(false)
  const rotationValue = useRef(new Animated.Value(0)).current
  const window = useWindowDimensions()

  const rotationStyle = {
    transform: [
      {
        rotate: rotationValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  }

  const startRotation = () => {
    const toValue = isRotated ? 0 : 1
    setIsRotated(!isRotated)
    Animated.timing(rotationValue, {
      toValue,
      duration: 150,
      useNativeDriver: true,
    }).start()
  }

  const onPressHandler = () => {
    setTimeout(() => {
      const randomIndex = generateRandomIndex(entries.length)
      setRandomPost(entries[randomIndex])
    }, 150)
    startRotation()
  }

  useEffect(() => {
    if (entries.length === 0) {
      fetchEntries().then((data) => setEntries(data))
    }
    if (entries.length > 0 && randomPost === '') {
      setRandomPost(entries[0])
      setIsLoading(false)
    }
  }, [entries, randomPost])

  if (isLoading) {
    return <CustomActivityIndicator />
  }
  return (
    <View>
      <Text style={styles.header}>Random Post</Text>
      <View
        style={[
          styles.container,
          {
            minHeight: Math.round(window.height),
          },
        ]}
      >
        <View style={{ marginBottom: 50, width: '100%' }}>
          <Card title={randomPost} navigation={navigation} />
        </View>
        <TouchableWithoutFeedback onPress={onPressHandler}>
          <Animated.View style={[styles.diceButton, rotationStyle]}>
            <FontAwesome5 name="dice-five" size={40} color="white" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}
