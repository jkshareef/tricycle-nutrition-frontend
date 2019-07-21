import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Button, AsyncStorage} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
// import compounds from '../helpers/compounds'



export default class DailyScreen extends Component {

   
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
    componentWillUpdate() {
      let token = this.getToken()
      const config = {
        headers: {
           'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
        
      }
      fetch('http://localhost:3000/api/v1/profile', config)
      .then(resp = resp.json())
      // .then(json => {
      //   this.setState({meals: json.user.meals})
      // })
    }
    render() {

        const styles = StyleSheet.create({
            container: {
              flex: 1,
              flexDirection: 'column',
              backgroundColor: '#f57e42',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              paddingTop: 22
            },
            item: {
              marginTop: 10,
              fontSize: 18,
              height: 44,
            },
            baseText: {
              fontFamily: 'Cochin',
            },
            titleText: {
              fontSize: 20,
              fontWeight: 'bold',
            },
          });

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
          {/* <DailyStack /> */}
          <FlatList
          data={[
            {key: "protein"},
            {key: "fiber"},
            {key: "calcium"},
            {key: "iron"},
            {key:  "manganese"},
            {key: "phosphorus"},
            {key:  "potassium"},
            {key: "sodium"},
            {key: "zinc"},
            {key: "copper"},
            {key: "selenium"},
            {key: "vitamin_a"},
            {key:  "vitamin_d"},
            {key: "vitamin_c"},
            {key: "thiamin"},
            {key: "riboflavin"},
            {key: "niacin"},
            {key: "vitamin_b5"},
            {key: "vitamin_b6"},
            {key: "choline"},
            {key: "vitamin_k"},
            {key: "folate"}
          ]}
          renderItem={({item}) =>
          
            <View>
              
              <Text style={styles.titleText}>
                {item.key}  
              </Text>
              <Text>
                Hello
            </Text>
            
            </View>
            
        }
        />
            <Button
                title="Go to Home"
                onPress={() => this.props.navigation.navigate('Home')}
                />
          </View>
        )
    }
}