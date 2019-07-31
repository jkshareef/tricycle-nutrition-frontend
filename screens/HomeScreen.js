import React, {Component} from 'react';
import {View, Text, StyleSheet, AsyncStorage, ART, TouchableHighlight, ListView, ScrollView} from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { TextInput } from 'react-native-gesture-handler';
import { List, Checkbox, Appbar} from 'react-native-paper';
import {Button} from 'react-native-elements';
import RecentMeal from '../components/RecentMeal'

const NGROK_URL = "https://ecb0c20d.ngrok.io"

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '', 
      compoundData: null,
      foodNames: null,
      foodItems: null,
      expanded: true,

      
    
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
    // this.getFoodNames()
    }

  async getRecent() {
    const token = await this.getToken()
    const config = {
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + token
        }
      }
      fetch(NGROK_URL + '/api/v1/food/recent', config)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          compoundData: json
        })
      })
      .catch(error => console.log('Error: ', error))
    }
  
  

  // getFoodNames = () => {
    
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  //   fetch("http://127.0.0.1:4041/foodnames", config)
  //   .then(resp => resp.json())
  //   .then(json => {
  //     return json
  //   })
  // }
  

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
    fetch(NGROK_URL + '/api/v1/add/${query}', config)
    .then(resp=>resp.json())
    .then(this.setState({
      query: '',
    }))
    .then(json => {

    })
    .then(()=> this.getRecent())
    .catch(error => console.log("Error: ", error))
  }

    // searchedFoodNames = (text) => {
    //   this.setState({
    //     query: text
    //   })
      
    //   let foodNames = this.getFoodNames().food_item
    //   let names = foodNames.filter((foodName) => {
    //     return foodName.name.toLowerCase().includes?(text)
    //   })
    //   this.setState({
    //     filteredNames: names
    //   })
    // }
       

    render() {


      
      

        const styles = StyleSheet.create({
            container: {
              backgroundColor: '#F6F4F3',
            },
            viewContainer : {
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
            },
            textField : {
              fontSize: 20,
              height: 40,
              flex: 1,
              backgroundColor: 'white',
              marginTop: 40
          },
          
          button: {
            width: 200,
            margin: 20,
            alignItems: 'center',
            backgroundColor: '#023618',
            borderRadius: 30,
          },
          buttonCircle: {
            margin: 10,
            height: 150,
            width: 150,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#023618',
            

          },
          buttonText: {
            padding: 20,
            color: 'white',
          },
          list: {
            width: 400,
            alignItems: "center"
          }
          });

        
        // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          // console.log("In render")
          // console.log(this.state.compoundData)

        return(
          <View>
          <Appbar.Header style={{backgroundColor: "#023618"}}>
            {/* <Appbar.BackAction
              onPress={this._goBack}
            /> */}
            <Appbar.Content
              title="TriCycle"
              subtitle="Home"
            />
            {/* <Appbar.Action icon="search" onPress={this._onSearch} />
            <Appbar.Action icon="more-vert" onPress={this._onMore} /> */}
        </Appbar.Header>
            <ScrollView contentContainerStyle={styles.container} 
            automaticallyAdjustContentInsets={false}
            >
             <View style={styles.viewContainer}>
               <View style={{flexDirection: "row"}}>
               <TextInput style={styles.textField}
                placeholder="Add Meal"
                value={this.state.query}
                onChangeText={(text) => this.setState({
                  query: text})}
                />
               </View>
            
              
              <Button raised onPress={this.onAddMeal} title="Add Meal" containerStyle={styles.button} 
              buttonStyle={{backgroundColor: '#023618', width: 200, borderRadius: 30}}/>
                {/* <View style={styles.button}>
                  <Text style={styles.buttonText}>Add Meal</Text>
                </View>
              </Button> */}
                  <View style={{flex: 1, flexDirection: "row", justifyContent: "space-evenly"}}>
              {/* <TouchableHighlight style={styles.buttonCircle} onPress={() => {this.props.navigation.navigate('Daily')}} underlayColor="white">
                <View>
                  <Text style={styles.buttonText}>Daily</Text>
                </View>
              </TouchableHighlight>
           
              <TouchableHighlight style={styles.buttonCircle} onPress={() => {this.props.navigation.navigate("Weekly")}} underlayColor="white">
                <View>
                  <Text style={styles.buttonText}>Weekly</Text>
                </View>
              </TouchableHighlight> */}
              </View>
              <List.Section>
              <List.Accordion
                  title="Most Recent Meal"
                  style={styles.list}
                  left={props => <List.Icon {...props} icon="restaurant-menu" />}
                  expanded={this.state.expanded}
                  onPress={this.handlePress}
                >
                  
                  {this.state.compoundData? <RecentMeal meals={this.state.compoundData}/>:null}
                  
                </List.Accordion>
    
              </List.Section>
              {/* <View> */}
               
                {/* <ListView
                      dataSource={ds.cloneWithRows(this.state.filteredNames)}
                renderRow={this.renderFoodNames} /> */}
              {/* </View> */}
              
              
          
              
       
              {/* <Button
                color="#442D2D"
                title="Login"
                onPress={() => {this.props.navigation.navigate('Login')}}/> */}
                </View>
                  </ScrollView>
                  </View>
               
           
           
        )
    }
}