import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, AsyncStorage, ART} from 'react-native'
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

          // const {
          //   Surface,
          //   Group,
          //   Shape,
          // } = ART;
          
          // const ReactNativeART = 
          //     <View>
          //       <Surface width={500} height={500}>
          //         <Group x={100} y={0}>
          //           <Shape
          //             d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
          //             stroke="#000"
          //             strokeWidth={1}/>
          //         </Group>
          //       </Surface>
          //     </View>
          
            
          

         



        return(
            <View>
              {/* {ReactNativeART} */}
              <Button
                title="Daily"
                onPress={() => this.props.navigation.navigate('Daily')}
              />
            </View>
           
        )
    }
}