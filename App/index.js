import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import DetailScreen from './screens/DetailScreen'
import HomeScreen from './screens/HomeScreen'
import NewPostScreen from './screens/NewPostScreen'
import RandomScreen from './screens/RandomScreen'

const Stack = createStackNavigator()

const HomeStack = createStackNavigator()

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailScreen} />
    </HomeStack.Navigator>
  )
}

const RandomStack = createStackNavigator()

const RandomStackScreen = () => {
  return (
    <RandomStack.Navigator>
      <RandomStack.Screen name="Random" component={RandomScreen} />
      <RandomStack.Screen name="Details" component={DetailScreen} />
    </RandomStack.Navigator>
  )
}

const NewPostStack = createStackNavigator()

const NewPostStackScreen = ({ navigation }) => {
  return (
    <NewPostStack.Navigator>
      <NewPostStack.Screen
        name="NewPost"
        component={NewPostScreen}
        options={{
          title: '',
        }}
      />
      <NewPostStack.Screen name="Details" component={DetailScreen} />
    </NewPostStack.Navigator>
  )
}
// const HomeTabs = () => {
//   return (
//     <Tab.Navigator
//       shifting
//       tabBarOptions={{
//         keyboardHidesTabBar: true,
//       }}
//       barStyle={{ backgroundColor: '#fff' }}
//       activeColor="#2A78C7"
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{ tabBarIcon: 'home' }}
//       />
//       <Tab.Screen
//         name="Random"
//         component={RandomScreen}
//         options={{ tabBarIcon: 'dice-5' }}
//       />
//       <Tab.Screen
//         name="New"
//         component={NewPostScreen}
//         options={{ tabBarIcon: 'file-plus' }}
//       />
//     </Tab.Navigator>
//   )
// }

// Get header title from tab route
// const getHeaderTitle = (route) => {
//   // Define route name for the initial screen
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'
//   switch (routeName) {
//     case 'Home':
//       return 'Wiki'
//     case 'Random':
//       return 'Random Post'
//     default:
//       return 'New Post'
//   }
// }

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
            options={{ tabBarIcon: 'home' }}
          />
          <Tab.Screen
            name="Random"
            component={RandomStackScreen}
            options={{ tabBarIcon: 'dice-5' }}
          />
          <Tab.Screen
            name="NewPost"
            component={NewPostStackScreen}
            options={{ tabBarIcon: 'file-plus' }}
          />
        </Tab.Navigator>
        {/* <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#000',
          }}
        >
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
        </Stack.Navigator> */}
      </NavigationContainer>
    </PaperProvider>
  )
}
