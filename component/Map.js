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
  Platform,
  Alert
} from 'react-native';

import {request,PERMISSION, PERMISSIONS} from 'react-native-permissions'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

// Main Application

const Map = ({navigation}) => {

  const [initialPosition, setInitialPosition] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  useEffect(()=>{
    requestLocationPermission()
  },[])

  // Requests the permission access to use the location when in use
  requestLocationPermission = async() =>{
    if(Platform.OS === 'ios'){
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)

      console.log('iPhone' + response)
      if(response === 'granted'){
        await locateCurrentPosition();
      }

    }
  }

  // Locates the current position of the user
  locateCurrentPosition = () =>{
    Geolocation.getCurrentPosition(
      position =>{
        let positionObj = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
        setInitialPosition(positionObj)
        console.log(JSON.stringify(position))
      },
      error=>Alert.alert(error.message),
      {enableHighAccuracy:true,timeout:10000,maximumAge:1000}
    )
  }

  console.log(initialPosition)

  return (
    <MapView
      showsUserLocation={true}
      style={styles.map}
      initialRegion={initialPosition}
      onRegionChange={region => setInitialPosition(region)}
      region={initialPosition}
    >
      <Marker
      coordinate={{latitude: 37.78825,
        longitude: -122.4324,}}
        title={initialPosition.latitude.toString()}
       />
    </MapView>
  )
};

const styles = StyleSheet.create({
  map:{
    height: '100%'
  }
});

export default Map;
