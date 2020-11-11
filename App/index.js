import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'

import DetailScreen from './screens/DetailScreen'
import HomeScreen from './screens/HomeScreen'
import RandomScreen from './screens/RandomScreen'
import { makeTitleCase } from './utils/Helpers'

const Stack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

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
      shifting
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: 'home-account' }}
      />
      <Tab.Screen
        name="Random"
        component={RandomScreen}
        options={{ tabBarIcon: 'dice-5' }}
      />
      <Tab.Screen
        name="Create"
        component={CreateEntryScreen}
        options={{ tabBarIcon: 'file-plus' }}
      />
    </Tab.Navigator>
  )
}

// Get header title from tab route
const getHeaderTitle = (route) => {
  // Define route name for the initial screen
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'
  switch (routeName) {
    case 'Home':
      return 'Wiki'
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
