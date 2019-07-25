import React, {Component} from 'react';
import { StyleSheet, SectionList, Text, View, FlatList, Button, AsyncStorage} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { List, Checkbox } from 'react-native-paper';



// import compounds from '../helpers/compounds'



export default class DailyScreen extends Component {
  constructor() {
    super()
    this.state = {
      compoundData: null,
      days: '',
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
      fetch(`http://localhost:3000/api/v1/food/day`, config)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          compoundData: json,
          days: json.day
        })
      })
      }
     

      compounds = () => {
        // console.log(this.state.compoundData.total)
          return Object.values(this.state.compoundData.total).map((compound) => {
          // for (let i = 0; i < Object.keys(this.state.compoundData.total).length; i++) {
            return (<List.Item
            title={compound.name}
            description={`${compound.amount} /${compound.rdv} \n${compound.description}`}
            // left={props => <List.Icon {...props} icon="arrow_right" />}
            />)
          // result.push({
          //   name: this.state.compoundData.total[Object.keys(this.state.compoundData.total)[i]].name, 
          //   amount: this.state.compoundData.total[Object.keys(this.state.compoundData.total)[i]].amount,
          //   rdv: this.state.compoundData.total[Object.keys(this.state.compoundData.total)[i]].rdv,
          //   description: this.state.compoundData.total[Object.keys(this.state.compoundData.total)[i]].description
          // })
             })
          }
          

       

      //  compoundAmounts = () => {
      //   result = []
      //   if (this.state.compoundData !== null) {
      //     for (let i = 0; i < Object.keys(this.state.compoundData.total).length; i++) {
      //       result.push(this.state.compoundData[Object.keys(this.state.compoundData)[i]].amount)
      //     }
      //     return result
      //   } else {
      //     return
      //   }
      //  }
    
      
     

      
    

    

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
            <Button
                title="Go to Home"
                onPress={() => this.props.navigation.navigate('Home')}
                />
          {this.state.compoundData === null?null:this.compounds()}
            
          {/* <SectionList
          sections={[
            {title: this.state.days, data: this.compounds()},]}
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
        /> */}
        
      </View>
      );
    }
  }
  
        
