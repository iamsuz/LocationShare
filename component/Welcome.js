import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';

import {request,PERMISSION, PERMISSIONS} from 'react-native-permissions'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from '@react-native-community/async-storage';

const Welcome = ({navigation}) =>{

    const [fName,setFName] = useState('');
    const [lName,setLName] = useState('');
    const [uName,setUName] = useState('');

    // Store the user details in asyncStorage so we can use in Display location

    storeUserInfo = async () =>{
        try {
            console.log('i am in sttore userr');
            fetch('http://10.0.2.2:3000/createUser',{
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    firstName: fName,
                    lastName: lName,
                    userId: uName
                  })
            }).then((response)=>response.json())
            .then((responseJson)=>{
                console.log(responseJson)
                navigation.navigate('Map')
            })

            await AsyncStorage.setItem('fname', fName);
            await AsyncStorage.setItem('lname', lName);
        } catch (e) {
            console.log(e);
        }
    }


    return(
        <View>
            <Text style={styles.text}>Welcome</Text>
            <ScrollView>
            <KeyboardAvoidingView behavior='padding'>
                <TextInput 
                    placeholder="Username*" 
                    style={styles.input}
                    onChangeText={text=>setUName(text)}
                />
                <TextInput 
                    placeholder="First Name*" 
                    style={styles.input}
                    onChangeText={text=>setFName(text)}
                />
                <TextInput underlineColorAndroid="transparent"
                    placeholder="Last Name*"
                    style={styles.input}
                    onChangeText={text=>setLName(text)}    
                />
                <TouchableOpacity style = {styles.button} type='submit'
                onPress = {()=>{(uName !== '' && fName !== '' && lName !== '')? storeUserInfo() : Alert.alert('Please fill the details to see the information')}}>
                <Text style = {styles.buttonText}>See Friends Location</Text>
		    </TouchableOpacity>
            </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize:30,
        textAlign:'center',
        paddingVertical:30
    },
    input:{
		backgroundColor: 'rgba(255,100,255,0.2)',
		height: 60,
		color: '#000',
		marginBottom: 20,
        paddingHorizontal: 20,
        marginHorizontal:20
    },
    inputSearch:{
        backgroundColor: 'rgba(255,100,255,0.2)',
        height: 60,
		color: '#000',
		marginBottom: 20,
        paddingHorizontal: 15,
        marginHorizontal:15
    },
    button:{
		backgroundColor: 'darkslateblue',
        paddingVertical: 20, 
        marginHorizontal:20
	},
	buttonText:{
		color: '#fff',
		textAlign: 'center',
		fontWeight: '700',
	}
})

export default Welcome;