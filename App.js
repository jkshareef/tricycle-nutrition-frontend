import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen'
import DailyScreen from './screens/DailyScreen'
import { createStackNavigator, createAppContainer } from "react-navigation";
// import { mapping, light as lightTheme } from '@eva-design/eva';
// import { ApplicationProvider, Layout } from 'react-native-ui-kitten';



 
      export default class App extends Component {
        state = {
          hasToken: false
        }

        render() {


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
                  this.setState({hasToken: true})
                  return token
                  } else {
                    return null
                  }
              } catch (error) {
                  // Error retrieving data
              }
              }
        
              const AppNavigator = createStackNavigator(
                {
                Home: HomeScreen,
                Daily: DailyScreen,
                
                },
                {
                  initialRouteName: "Home"
                }
        
              );
        
              const LoginNavigator = createStackNavigator(
                {
                  Login: LoginScreen,
                  Home: HomeScreen,
                  Daily: DailyScreen

                },
                {
                  initialRouteName: "Home"
                }

              );
        
              const AppContainer = createAppContainer(LoginNavigator)
        
          return(
              <AppContainer />
          ) 
        }
      }

      
    
   
  
 
   




