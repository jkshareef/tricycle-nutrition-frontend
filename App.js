import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen'

export default class App extends Component {
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#f57e42',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    
    const getToken = (jwt) => {
      return localStorage.getItem('jwt')
    }
    
    return(
      <View style={styles.container}>
      <LoginScreen/>
      </View>
    )
  }
 }
   




