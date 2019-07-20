import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, AsyncStorage} from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class HomeScreen extends Component {

  state = {
    isLoggedIn: ''
  }

  componentWillMount() {
    this.setState({isLoggedIn: this.getToken()?true:false})
  }


  getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('jwt');
        if (token !== null) {
        // We have data!!
        return token

        } else {
         null
        }
    } catch (error) {
        // Error retrieving data
    }
    }


  clearToken() {
    AsyncStorage.setItem('jwt', '')

  }


  onPressLogout = () => {
    this.clearToken()
    this.setState({isLoggedIn: false})
  }

    render() {
        const styles = StyleSheet.create({
            container: {
              flex: 1,
              backgroundColor: '#f57e42',
              alignItems: 'center',
              justifyContent: 'center',
            },
          });

         



        return(
            <View>
              <Text>Today</Text>
              <Button
                title="Daily"
                onPress={() => this.props.navigation.navigate('Daily')}
              />
            </View>
           
        )
    }
}