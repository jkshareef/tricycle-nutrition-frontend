import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, AsyncStorage, ART, TouchableHighlight} from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { TextInput } from 'react-native-gesture-handler';
import { List, Checkbox } from 'react-native-paper';


export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '', 
      compoundData: null,
      foodNames: null,
      foodItems: null,
      expanded: false
    }
    this.getRecent = this.getRecent.bind(this)
  }


  static navigationOptions= {
    title: "Home",
    headerStyle: {
      backgroundColor: '#023618',
    },
  }

  async componentDidMount() {
    const token = await this.getToken()
    const config = {
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + token
        }
      }
      fetch("http://localhost:3000/api/v1/food/recent", config)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          compoundData: json
        })
      })
      .catch(error => console.log('Error: ', error))
    }

    async getRecent() {
      const token = await this.getToken()
      const config = {
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + token
          }
        }
        fetch("http://localhost:3000/api/v1/food/recent", config)
        .then(resp => resp.json())
        .then(json => {
          this.setState({
            compoundData: json
          })
        })
        .catch(error => console.log('Error: ', error))
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
    AsyncStorage.removeItem('jwt')

  }


  onPressLogout = () => {
    this.clearToken()
    this.setState({isLoggedIn: false})
  }

  handlePress = () =>
  this.setState({
    expanded: !this.state.expanded
  });
  
  

  onAddMeal = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;
    const token = this.state.token
    const query = this.state.query
    const config = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type' : 'application/json'
      }
    }
    fetch(`http://localhost:3000/api/v1/add/${query}`, config)
    .then(resp=>resp.json())
    .catch(error => console.log("Error: ", error))
  }

  recentMeal = () => {
        result = []
        // console.log(Object.keys(this.state.compoundData).length)
          for (let i = 0; i < Object.keys(this.state.compoundData[data]).length; i++) {
            result.push({
              name: this.state.compoundData[Object.keys(this.state.compoundData)[i]].name, 
              amount: this.state.compoundData[Object.keys(this.state.compoundData)[i]].amount,
              rdv: this.state.compoundData[Object.keys(this.state.compoundData)[i]].rdv,
              description: this.state.compoundData[Object.keys(this.state.compoundData)[i]].description
            })
            }
           
       
       }

       mealNames = () => {
        for (let food in this.state.compoundData.data) {
          // console.log(typeof this.state.compoundData.data[food])
          // console.log(this.state.compoundData.data[Object.keys.this.state.compoundData.data.indexOf(food)])
          return(
          <List.Accordion
          title={food}
          style={{width: 400, alignItems: "center"}}
          left={props => <List.Icon {...props} icon="restaurant" />}
          expanded={this.state.expanded}
          onPress={this.handlePress}
        >
          {this.mealCompounds(this.state.compoundData.data[food])}
        </List.Accordion>
          )}

        }

        mealCompounds = (food) => {
          
            return food.map((compound) => {
               return (
              <List.Item 
              title={compound.name}
              description={`${compound.amount}/${compound.rdv} \n${compound.description}`}
              // left={props => <List.Icon {...props} icon="arrow_right" />}
            />    
              )
            }
            )
          }

    render() {
        const styles = StyleSheet.create({
            container: {
              flex: 1,
              flexDirection: "column",
              backgroundColor: '#F6F4F3',
              alignItems: "center"

            },
            textField : {
              fontSize: 20,
              height: 40,
              width: 400,
              margin: 2,
              backgroundColor: 'white',
              marginTop: 40
          },
          
          button: {
            marginBottom: 30,
            width: 260,
            alignItems: 'center',
            backgroundColor: '#023618',
          },
          buttonText: {
            padding: 20,
            color: 'white'
          },
          list: {
            width: 400,
            alignItems: "center"
          }
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
            <View style={styles.container}>
              {/* {ReactNativeART} */}

              <List.Section>
              <List.Accordion
                  title="Most Recent Meal"
                  style={styles.list}
                  left={props => <List.Icon {...props} icon="restaurant-menu" />}
                  expanded={this.state.expanded}
                  onPress={this.handlePress}
                >
                  {this.state.compoundData === null?null:this.mealNames()}
                </List.Accordion>
    
              </List.Section>

              {/* <Text style={{fontSize:20}}>Most Recent Food</Text>
              <Text>{this.state.compoundName === null?null:this.state.compoundName}</Text> */}
              
              <TextInput style={styles.textField}
              placeholder="Add Meal"
              value={this.state.query}
              onChangeText={(text) => this.setState({query: text})}
              />
              <TouchableHighlight onPress={this.onAddMeal} underlayColor="white">
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Add Meal</Text>
                </View>
              </TouchableHighlight>
              {/* <Button
              style={styles.button}
              title="Add Meal"
              onPress={this.onAddMeal}/> */}
              <TouchableHighlight onPress={() => {this.props.navigation.navigate('Daily')}} underlayColor="white">
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Daily</Text>
                </View>
              </TouchableHighlight>
              {/* <Button
                title="Daily"
                onPress={() => {this.props.navigation.navigate('Daily')}}
              /> */}
              <TouchableHighlight onPress={() => {this.props.navigation.navigate("Weekly")}} underlayColor="white">
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Weekly</Text>
                </View>
              </TouchableHighlight>
              {/* <Button 
              title="Weekly"
              onPress={() => {this.props.navigation.navigate("Weekly")}}/> */}
              <Button
                color="#442D2D"
                title="Login"
                onPress={() => {this.props.navigation.navigate('Login')}}/>
            </View>
           
        )
    }
}