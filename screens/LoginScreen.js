import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Button, AsyncStorage} from 'react-native';






export default class LoginScreen extends Component {
    constructor() {
        super()
        this.state = {
            username: '', 
            password: '',
            async: ''
        }
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
        fetch('http://localhost:3000/api/v1/login', config)
        .then(resp => resp.json())
        .then(json => {
            if(json && json.jwt) {
                this.saveToken(json.jwt)
            }
        })
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
        fetch('http://localhost:3000/api/v1/users', config)
        .then(resp => resp.json())
        .then(json => {
            if(json && json.jwt) {
                this.saveToken(json.jwt)
            }
        })
        .catch(error => console.log('Error: ', error))
    }

    
    // saveToken() {
    //     localStorage.setItem('jwt', jwt)
    //   }

    saveToken = async (jwt) => {
    try {
        await AsyncStorage.setItem('jwt', jwt);
    } catch (error) {
        // Error saving data
    }
    }
      
    // clearToken() {
    //     localStorage.setItem('jwt', '')
    //   }

    getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('jwt');
        if (token !== null) {
        // We have data!!
        this.setState({async: token})
        // return token
        }
    } catch (error) {
        // Error retrieving data
    }
    }
      

  

    render() {
        const styles = StyleSheet.create({
            textField : {
                fontSize: 20,
                height: 40,
                margin: 2,
                backgroundColor: 'white'
            } 
        })
        
        return (
            <View style={{padding:10}}>
              <TextInput
              style={styles.textField}
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
                <View>
                    <Button 
                    onPress={this.onPressLogin}
                    title="Login"/>
                    <Button 
                    onPress={this.onPressSignup}
                    title="Sign up"/>
                    <Text>Don't have an account? Click here to sign-up</Text>

                </View>

            </View>
        )
    }

}
