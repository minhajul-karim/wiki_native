import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Provider as PaperProvider } from 'react-native-paper'

import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'
import DrawerContent from './screens/DrawerContent'
import { makeTitleCase } from './utils/Helpers'

const HomeStack = createStackNavigator()
const Drawer = createDrawerNavigator()

function TestScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Test Screen</Text>
    </View>
  )
}

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
      <HomeStack.Screen
        name="testScreen"
        component={TestScreen}
        options={{ title: 'Test' }}
      />
    </HomeStack.Navigator>
  )
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen
            name="homeScreen"
            component={HomeStackNavigator}
            options={{ title: 'Home' }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
