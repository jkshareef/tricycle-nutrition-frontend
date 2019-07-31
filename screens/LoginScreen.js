import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Button, AsyncStorage} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {Appbar} from 'react-native-paper';

NGROK_URL = "https://ecb0c20d.ngrok.io"




export default class LoginScreen extends Component {
    constructor() {
        super()
        this.state = {
            username: '', 
            password: '',
            async: ''
        }
    }

    static navigationOptions= {
        title: "Login",
        headerStyle: {
          backgroundColor: '#023618',
        },
      }

    onPressLogin = () => {
        const username = this.state.username
        const password = this.state.password
        const payload = {user: {username: username, password: password}}
        const config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }
        this.clearToken()
        fetch(NGROK_URL + '/api/v1/login', config)
        .then(resp => resp.json())
        .then(json => {
            if(json && json.jwt) {
                this.saveToken(json.jwt)
            }
        })
        .then(this.goHome())
       .catch(error => console.log('Error: ', error))
    }

    onPressSignup = () => {
        const username = this.state.username
        const password = this.state.password
        const payload = {user: {username: username, password: password}}
        const config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }
        fetch(NGROK_URL + '/api/v1/users', config)
        .then(resp => resp.json())
        .then(json => {
            if(json && json.jwt) {
                this.saveToken(json.jwt)
            }
        })
        .then(this.goHome())
        .catch(error => console.log('Error: ', error))
    }



    saveToken = async (jwt) => {
    try {
        await AsyncStorage.setItem('jwt', jwt);
    } catch (error) {
        // Error saving data
    }
    }
      
    clearToken = () => {
        AsyncStorage.setItem('jwt', '')
      }

    getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('jwt');
            if (token !== null) {
            // We have data!!
            this.setState({token: token})
            return token
    
            } else {
             null
            }
        } catch (error) {
            // Error retrieving data
        }
        }

    goHome = async () => {
        try {
            const token = await AsyncStorage.getItem('jwt')
            if (token !== null) {
                this.props.navigation.navigate('Home')
            } else {
                return null
            }
        } catch (error) {

        }
        
    }
    
      

  

    render() {
        const styles = StyleSheet.create({
       
            container: {
                // flex: 1,
                backgroundColor: '#F6F4F3'
            }
            ,
            textField : {
                fontSize: 20,
                height: 40,
                margin: 2,
                backgroundColor: 'white'
            },
            textFieldUser: {
                fontSize: 20,
                height: 40,
                margin: 2,
                backgroundColor: 'white',
                marginTop: 40
                
            }
           })
        
        
        return (
            <View style={{flex: 1}}>
            <Appbar.Header style={{backgroundColor: "#023618"}}>
                {/* <Appbar.BackAction
                onPress={this._goBack}
                /> */}
                <Appbar.Content
                title="TriCycle"
                // subtitle="Login"
                />
                {/* <Appbar.Action icon="search" onPress={this._onSearch} />
                <Appbar.Action icon="more-vert" onPress={this._onMore} /> */}
            </Appbar.Header>
            <View style={styles.container}>
              <TextInput
              style={styles.textFieldUser}
              placeholder="username"
              value={this.state.username}
              name="username"
              onChangeText={(text) => this.setState({username: text})}/>
              <TextInput
              style={styles.textField}
              placeholder="password"
              name="password"
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(text) => this.setState({password: text})}/>
                
                    <Button
                    title="Go Home" 
                    onPress={() => this.props.navigation.navigate("Home")}/>
                    <Button
                    onPress={this.onPressLogin}
                    title="Login"/>
                    <Button 
                    onPress={this.onPressSignup}
                    title="Sign up"
                    onPress={() => this.onPressSignup}/>
                    <Text style={{textAlign: "center"}}>Don't have an account? Click here to sign-up</Text>
                
            </View>
            </View>
        )
    }

}
