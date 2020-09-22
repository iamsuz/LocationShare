/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform
} from 'react-native';

import {request,PERMISSION, PERMISSIONS} from 'react-native-permissions'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

// Main Application

const App = () => {


  useEffect(()=>{
    // calls the rerquest method on load
    requestLocationPermission();
  },[])

  // Requests the permission access to use the location when in use
  requestLocationPermission = async() =>{
    if(Platform.OS === 'ios'){
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)

      console.log('iPhone' + response)
      if(response === 'granted'){
        locateCurrentPosition();
      }

    }
  }
  // Locates the current position of the user
  locateCurrentPosition = () =>{
    Geolocation.getCurrentPosition(
      position =>{
        console.log(JSON.stringify(position))
      }
    )
  }

  return (
    // Viewing a user a full map
      <MapView
        showsUserLocation={true}
        style={styles.map}
        initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}
  />
  )
};

const styles = StyleSheet.create({
  map:{
    height: '100%'
  }
});

export default App;
