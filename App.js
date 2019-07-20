import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen'
import { createStackNavigator, createAppContainer } from "react-navigation";



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

    
      

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#f57e42',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    
    const getToken = async () => {
      try {
          const token = await AsyncStorage.getItem('jwt');
          if (token !== null) {
          // We have data!!
          this.setState({async: token})
          return token
          } else {
            return null
          }
      } catch (error) {
          // Error retrieving data
      }
      }

      const AppNavigator = createStackNavigator({
        Home: HomeScreen,
        Daily: DailyScreen

      });

      const Login = createStackNavigator({
        Login: {
          screen: LoginScreen
        }
      });

      const AppContainer = createAppContainer(getToken()?AppNavigator:Login);

      export default class App extends Component {
        render() {
          return <AppContainer />;
        }
      }

      
    
   
  
 
   




