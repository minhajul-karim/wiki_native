import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Provider as PaperProvider } from 'react-native-paper'

import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'
import { makeTitleCase } from './utils/Helpers'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function CreateEntryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Create Entry</Text>
    </View>
  )
}

function RandomScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Random</Text>
    </View>
  )
}

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Random" component={RandomScreen} />
      <Tab.Screen name="Create" component={CreateEntryScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeStack" component={HomeTabs} />
          <Stack.Screen
            name="detailScreen"
            component={DetailScreen}
            options={({ route }) => ({
              title: makeTitleCase(route.params.title),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
