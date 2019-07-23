import React, {Component} from 'react';
import { StyleSheet, SectionList, Text, View, FlatList, Button, AsyncStorage} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';



// import compounds from '../helpers/compounds'



export default class DailyScreen extends Component {
  constructor() {
    super()
    this.state = {
      compoundData: null,
      compoundNames: null,
      recentDay: '',
      token: ''
    }
  }
  

  static navigationOptions= {
    title: "Daily"
  }
   
    getToken = async () => {
      try {
          const token = await AsyncStorage.getItem('jwt');
          if (token !== null) {
          // We have data!!
          this.setState({token: token})

          return token
          } else {
            return null
          }
      } catch (error) {
          // Error retrieving data
      }
      }
    
   
    
    async componentDidMount() {
     
      
      const token = await this.getToken()
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
        
      }
      fetch("http://localhost:3000/api/v1/food", config)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          compoundData: json.data,
          recentDay: json.day
        })
      })
      }
     

      compoundNames = () => {
        result = []
        if (this.state.compoundData !== null) {
          for (let i = 0; i < Object.keys(this.state.compoundData).length; i++) {
            result.push({
              name: this.state.compoundData[Object.keys(this.state.compoundData)[i]].name, 
              amount: this.state.compoundData[Object.keys(this.state.compoundData)[i]].amount,
              rdv: this.state.compoundData[Object.keys(this.state.compoundData)[i]].rdv,
              description: this.state.compoundData[Object.keys(this.state.compoundData)[i]].description
            })
            }
            return result
          } else {
            return ["Loading..."]
        }
       }

       compoundAmounts = () => {
        result = []
        if (this.state.compoundData !== null) {
          for (let i = 0; i < Object.keys(this.state.compoundData).length; i++) {
            result.push(this.state.compoundData[Object.keys(this.state.compoundData)[i]].amount)
          }
          return result
        } else {
          return
        }
       }
    
      
     

      
    

    

    render() {

      const styles = StyleSheet.create({
        container: {
         flex: 1,
         paddingTop: 22
        },
        sectionHeader: {
          paddingTop: 2,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 2,
          fontSize: 24,
          fontWeight: 'bold',
          backgroundColor: 'rgba(247,247,247,1.0)',
        },
        item: {
          padding: 10,
          fontSize: 18,
          height: 44,
        },
        subText: {
          padding: 10,
          fontSize: 14,
          height: 40,
        }
      })
      
          // const compounds = [
          //   "protein", "fiber", "calcium","iron", "iron", "manganese",
          //   "phosphorus", "potassium", "sodium", "zinc", "copper", 
          //   "selenium", "vitamin_a", "vitamin_e", "vitamin_d", "vitamin_c", 
          //   "thiamin", "riboflavin", "niacin", "vitamin_b5", "vitamin_b6",
          //   "vitamin_b12", "choline", "vitamin_k", "folate"] 

        
       
              
          

          let compoundAmounts = () => {
            
          }

          let compoundRdv = () => {

          }

          let compoundDescription = () => {

          }



          

          
        return (
          <View style={styles.container}>
          <SectionList
          sections={[
            {title: this.state.recentDay, data: this.compoundNames()},]}
            // {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          
          renderItem={({item}) =>
            <View>
            <Text style={styles.item}>{item.name} </Text>
            <Text style={styles.subText}>{item.amount}/{item.rdv}</Text>
            <Text style={styles.subText}>{item.description}</Text>
            </View>
          }
            
        
          
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
        <Button
                title="Go to Home"
                onPress={() => this.props.navigation.navigate('Home')}
                />
      </View>
      );
    }
  }
  
        
