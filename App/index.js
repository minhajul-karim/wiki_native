import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'
import SideBarScreen from './screens/SideBarScreen'
import { makeTitleCase } from './utils/Helpers'

const HomeStack = createStackNavigator()
const Drawer = createDrawerNavigator()

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="homeScreen"
        component={HomeScreen}
        options={{ title: 'Entries' }}
      />
      <HomeStack.Screen
        name="detailScreen"
        component={DetailScreen}
        options={({ route }) => ({
          title: makeTitleCase(route.params.title),
        })}
      />
    </HomeStack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="homeScreen"
          component={HomeStackNavigator}
          options={{ title: 'Home' }}
        />
        <Drawer.Screen
          name="sideBarScreen"
          component={SideBarScreen}
          options={{ title: 'Menu' }}
        />
      </Drawer.Navigator>
      {/* <Stack.Navigator>
        <Stack.Screen
          name="homeScreen"
          component={HomeScreen}
          options={{ title: 'Entries' }}
        />
        <Stack.Screen
          name="detailScreen"
          component={DetailScreen}
          options={({ route }) => ({
            title: makeTitleCase(route.params.title),
          })}
        />
      </Stack.Navigator> */}
    </NavigationContainer>
  )
}
