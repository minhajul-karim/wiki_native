import React, { useEffect, useState } from 'react'
import { Animated, Button, View, TouchableOpacity, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import { generateRandomIndex, fetchEntries } from '../utils/Helpers'
import Card from '../components/Card'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

export default function RandomScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [entries, setEntries] = useState([])
  const [randomPost, setRandomPost] = useState('')
  const rotation = new Animated.Value(0)
  const rotationData = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const onPressHandler = () => {
    const randomIndex = generateRandomIndex(entries.length)
    setRandomPost(entries[randomIndex])
    // Handle rotation
    rotation.setValue(0)
    Animated.timing(rotation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
      }}
    >
      <Card title={randomPost} navigation={navigation} />
      <TouchableOpacity
        style={{
          backgroundColor: '#2B29C6',
          width: 60,
          height: 60,
          borderRadius: 60 / 2,
          borderWidth: 1,
          borderColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
          transform: [{ rotate: rotationData }],
        }}
        onPress={onPressHandler}
      >
        <FontAwesome5 name="dice-six" size={30} color="white" />
      </TouchableOpacity>
    </View>
  )
}
