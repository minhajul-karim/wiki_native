import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

import DetailScreen from './screens/DetailScreen'
import HomeScreen from './screens/HomeScreen'
import RandomScreen from './screens/RandomScreen'
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

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName
          if (route.name === 'Home') {
            iconName = 'ios-home'
          } else if (route.name === 'Random') {
            iconName = 'md-shuffle'
          } else if (route.name === 'Create') {
            iconName = 'md-create'
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Random" component={RandomScreen} />
      <Tab.Screen name="Create" component={CreateEntryScreen} />
    </Tab.Navigator>
  )
}

// Get header title from tab route
const getHeaderTitle = (route) => {
  // Define route name for the initial screen
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'
  switch (routeName) {
    case 'Home':
      return 'All Entries'
    case 'Random':
      return 'Random Page'
    default:
      return 'Create Page'
  }
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={({ route }) => ({
              headerTitle: getHeaderTitle(route),
            })}
          />
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
