/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';

import Welcome from './component/Welcome';
import Map from './component/Map';


import { createStackNavigator } from '@react-navigation/stack';

// Main Application

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>{
    <Stack.Navigator initialRouteName="Welcome"  swipeEnabled= 'false'>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
}</NavigationContainer>
  )
};

const styles = StyleSheet.create({
  map:{
    height: '100%'
  }
});

export default App;
