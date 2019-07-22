import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, AsyncStorage, ART} from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { TextInput } from 'react-native-gesture-handler';


export default class HomeScreen extends Component {

  state = {
    isLoggedIn: '',
    query: ''
  }

  static navigationOptions= {
    title: "Home"
  }

  componentWillMount() {
    this.setState({isLoggedIn: this.getToken()?true:false, token: this.getToken()})
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


  clearToken() {
    AsyncStorage.setItem('jwt', '')

  }


  onPressLogout = () => {
    this.clearToken()
    this.setState({isLoggedIn: false})
  }

  onAddMeal = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;
    const token = this.getToken()
    const query = this.state.query
    const config = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type' : 'application/json'
      }
    }
    fetch(`http://localhost:3000/api/v1/add/${query}`, config)
    .then(resp=>resp.json())
    .then(json => {
      this.setState({
        data: json
      })
    })
    .catch(error => console.log("Error: ", error))
  }

    render() {
        const styles = StyleSheet.create({
            container: {
              flex: 1,
              backgroundColor: '#f57e42',
              alignItems: 'center',
              justifyContent: 'center',
            },
            textField : {
              fontSize: 20,
              height: 40,
              margin: 2,
              backgroundColor: 'white'
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
              <TextInput style={styles.textField}
              placeholder="Add Meal"
              value={this.state.query}
              onChangeText={(text) => this.setState({query: text})}
              />
              <Button 
              title="Add Meal"
              onPress={this.onAddMeal}/>
              <Button
                title="Daily"
                onPress={() => {this.props.navigation.navigate('Daily', 
                {data: this.state.data})}}
              />
              <Button
                title="Login"
                onPress={() => {this.props.navigation.navigate('Login', 
                {data: this.state.data})}}
              />
            </View>
           
        )
    }
}