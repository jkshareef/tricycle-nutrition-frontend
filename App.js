import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen'
import DailyScreen from './screens/DailyScreen'
import WeeklyScreen from './screens/WeeklyScreen'
import { createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Provider as PaperProvider } from 'react-native-paper';




 
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

              const BottomTabNavigator = createMaterialBottomTabNavigator({
                Login: {screen: LoginScreen,
                navigationOptions: {
                  tabBarLabel: "Login",
                  tabBarIcon: ({focused}) => (
                    <Icon name="pencil" size={25} color={focused ? '#FFF' : '#757876'}/>
                  )
                }
              },
                Home: {screen: HomeScreen, 
                  navigationOptions: {
                    tabBarLabel: "Home",
                    tabBarIcon: ({focused}) => (
                      <Icon name="home" size={25} color={focused ? '#FFF' : '#757876'}/>
                    )
                  }
                },
                Daily: { screen: DailyScreen,
                navigationOptions: {
                  tabBarIcon: ({focused}) => (
                    <Icon name="calendar-check-o" size={25} color={focused ? '#FFF' : '#757876'}/>
                  )
                }
              },
                Weekly: { screen: WeeklyScreen,
                  navigationOptions: {
                    tabBarIcon: ({focused}) => (
                      <Icon name="calendar" size={25} color={focused ? '#FFF' : '#757876'}/>
                    )
                  } 
                }
              },
               {
                        initialRouteName: 'Login',
                        activeColor: "#FFF",
                        inactiveColor: "#757876",
                        barStyle: {backgroundColor: "#023618"},
                        shifting: false,
                        labeled: true
                     
               }
             )
        
              const AppSwitchNavigator = createSwitchNavigator(
                {
                  Login: {screen: LoginScreen},
                  Home: {screen: HomeScreen},
                  Daily: {screen: DailyScreen},
                  Weekly: {screen: WeeklyScreen},
                  Dashboard: {screen: BottomTabNavigator},

                },
                {
                  initialRouteName: "Home"
                }

              )
        
              const AppContainer = createAppContainer(BottomTabNavigator)
        
          return(
            <PaperProvider>
                <AppContainer />     
            </PaperProvider>
             
          ) 
        }
      }

      
    
   
  
 
   




