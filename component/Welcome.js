import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Button,
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

const Welcome = ({navigation}) =>{
    return(
        <View>
            <Text>Welcome</Text>
            <ScrollView>
            <KeyboardAvoidingView behavior='padding'>
            <TextInput placeholder="First Name" style={styles.input}
            onChangeText={text=>setTitle(text)}
            />
            <TextInput underlineColorAndroid="transparent"
                placeholder="Last Name"
                style={styles.input}
                onChangeText={text=>setDescription(text)}    
            />
            <Button
            title="Register here"
            onPress={() => navigation.navigate('Map')}
            />
            </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
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
	},
	buttonText:{
		color: '#fff',
		textAlign: 'center',
		fontWeight: '700',
	}
})

export default Welcome;