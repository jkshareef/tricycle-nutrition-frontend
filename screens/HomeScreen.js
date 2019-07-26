import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, AsyncStorage, ART, TouchableHighlight, ListView} from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { TextInput } from 'react-native-gesture-handler';
import { List, Checkbox } from 'react-native-paper';
import RecentMeal from '../components/RecentMeal'


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
    this.getRecent()
    this.getFoodNames()
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
  
  

  getFoodNames = () => {
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch("http://localhost:3000/foodnames", config)
    .then(resp => resp.json())
    .then(json => {
      return json
    })
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
    .then(this.setState({
      query: '',
    }))
    .then(this.getRecent())
    .catch(error => console.log("Error: ", error))
  }

  // recentMeal = () => {
  //       result = []
  //       // console.log(Object.keys(this.state.compoundData).length)
  //         for (let i = 0; i < Object.keys(this.state.compoundData[data]).length; i++) {
  //           result.push({
  //             name: this.state.compoundData[Object.keys(this.state.compoundData)[i]].name, 
  //             amount: this.state.compoundData[Object.keys(this.state.compoundData)[i]].amount,
  //             rdv: this.state.compoundData[Object.keys(this.state.compoundData)[i]].rdv,
  //             description: this.state.compoundData[Object.keys(this.state.compoundData)[i]].description
  //           })
  //           }
           
       
  //      }

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
      
      return food.map((compound, index) => {
         return (
        <List.Item
          key= {index} 
          title={compound.name}
          description={`${compound.amount}/${compound.rdv} \n${compound.description}`}
          // left={props => <List.Icon {...props} icon="arrow_right" />}
      />    
        )
      }
      )
    }
       
    
    renderFoodNames = (food) => {
      return (
        <View>
          <Text>{food.name}</Text>
        </View>
      )
    }

    searchedFoodNames = (text) => {
      this.setState({
        query: text
      })
      
      let foodNames = this.getFoodNames().food_item
      let names = foodNames.filter((foodName) => {
        return foodName.name.toLowerCase().includes?(text)
      })
      this.setState({
        filteredNames: names
      })
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

        
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          
    

        return(
            <View style={styles.container}>
             

              <List.Section>
              <List.Accordion
                  title="Most Recent Meal"
                  style={styles.list}
                  left={props => <List.Icon {...props} icon="restaurant-menu" />}
                  expanded={this.state.expanded}
                  onPress={this.handlePress}
                >
                  
                  {this.state.compoundData? <RecentMeal meals={this.state.compoundData}/> : null}
                  
                </List.Accordion>
    
              </List.Section>
              <View>
                <TextInput style={styles.textField}
                placeholder="Add Meal"
                value={this.state.query}
                onChangeText={(text) => this.setState({
                  query: text})}
                />
                <ListView
                      dataSource={ds.cloneWithRows(this.state.filteredNames)}
                renderRow={this.renderFoodNames} />
              </View>
              
              <TouchableHighlight onPress={this.onAddMeal} underlayColor="white">
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Add Meal</Text>
                </View>
              </TouchableHighlight>
          
              <TouchableHighlight onPress={() => {this.props.navigation.navigate('Daily')}} underlayColor="white">
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Daily</Text>
                </View>
              </TouchableHighlight>
           
              <TouchableHighlight onPress={() => {this.props.navigation.navigate("Weekly")}} underlayColor="white">
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Weekly</Text>
                </View>
              </TouchableHighlight>
       
              <Button
                color="#442D2D"
                title="Login"
                onPress={() => {this.props.navigation.navigate('Login')}}/>
            </View>
           
        )
    }
}