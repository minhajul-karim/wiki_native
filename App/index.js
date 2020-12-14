import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import DetailScreen from './screens/DetailScreen'
import EditorScreen from './screens/EditorScreen'
import HomeScreen from './screens/HomeScreen'
import RandomScreen from './screens/RandomScreen'

const HomeStack = createStackNavigator()

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Wiki' }}
      />
      <HomeStack.Screen name="Details" component={DetailScreen} />
      <HomeStack.Screen name="Editor" component={EditorScreen} />
    </HomeStack.Navigator>
  )
}

const RandomStack = createStackNavigator()

const RandomStackScreen = () => {
  return (
    <RandomStack.Navigator>
      <RandomStack.Screen
        name="Random"
        component={RandomScreen}
        options={{ title: 'Random Post' }}
      />
      <RandomStack.Screen name="Details" component={DetailScreen} />
    </RandomStack.Navigator>
  )
}

const NewPostStack = createStackNavigator()

const NewPostStackScreen = ({ navigation }) => {
  return (
    <NewPostStack.Navigator>
      <NewPostStack.Screen name="NewPost" component={EditorScreen} />
      <NewPostStack.Screen name="Details" component={DetailScreen} />
    </NewPostStack.Navigator>
  )
}

const Tab = createMaterialBottomTabNavigator()

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          shifting
          barStyle={{ backgroundColor: '#fff' }}
          activeColor="#2B29C6"
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{ tabBarIcon: 'home', title: 'Home' }}
          />
          <Tab.Screen
            name="Random"
            component={RandomStackScreen}
            options={{ tabBarIcon: 'dice-5', title: 'Random' }}
          />
          <Tab.Screen
            name="New"
            component={NewPostStackScreen}
            options={{ tabBarIcon: 'file-plus', title: 'New' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
