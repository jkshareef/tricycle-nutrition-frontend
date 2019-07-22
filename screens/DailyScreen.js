import React, {Component} from 'react';
import { StyleSheet, SectionList, Text, View, FlatList, Button, AsyncStorage} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
// import compounds from '../helpers/compounds'



export default class DailyScreen extends Component {


  static navigationOptions= {
    title: "Daily"
  }
   
    getToken = async () => {
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
    componentDidMount() {
      let token = this.getToken()
      const config = {
        headers: {
           'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
        
      }
      fetch('http://localhost:3000/api/v1/food', config)
      .then(resp => resp.json())
      .then(json => {
        this.setState({compoundAmounts: json})
      })

      
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
          fontSize: 14,
          fontWeight: 'bold',
          backgroundColor: 'rgba(247,247,247,1.0)',
        },
        item: {
          padding: 10,
          fontSize: 18,
          height: 44,
        },
      })
      
          const compounds = [
            "protein", "fiber", "calcium","iron", "iron", "manganese" ,
            "phosphorus", "potassium", "sodium", "zinc", "copper", 
            "selenium", "vitamin_a", "vitamin_e", "vitamin_d", "vitamin_c", 
            "thiamin", "riboflavin", "niacin", "vitamin_b5", "vitamin_b6",
            "vitamin_b12", "choline", "vitamin_k", "folate"] 

          // const listCompounds = compounds.map((compound) => {
          //   {key: compound}
          // })

        return (
          <View style={styles.container}>
          <SectionList
          sections={[
            {title: 'Most Recent', data: ['protein', "fiber", "calcium", "iron",
          "manganese", "phosphorus", "potassium", "sodium", "zinc", "copper",
        "selenium", "vitamin_a", "vitamin_d", "vitamin_c", "thiamin",
      "riboflavin", "niacin", "vitamin_b5", "vita,min_b6", "choline", "vitamin_k", "folate"]},
            // {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) =>
          <View>
            <Text style={styles.item}>{item}
          <Text>

          </Text>
          </Text>

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
  
        
