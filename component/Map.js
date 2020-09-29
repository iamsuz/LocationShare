/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect,useRef,useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  Alert,
  AppState
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

import Pusher from 'pusher-js/react-native';

// Main Application


const Map = ({navigation}) => {


    // check the app is in forground or background
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [initialPosition, setInitialPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  

  useEffect(()=>{
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
    // call the for the request permission of the location
    requestLocationPermission()

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('868cdae3d3ff85b9cf73', {
    cluster: 'ap1'
    });
    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
    alert(JSON.stringify(data));
    });
    
  },[])


  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log("AppState", appState.current);
  };


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
