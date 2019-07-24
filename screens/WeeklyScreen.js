import React, {Component} from 'react';
import { StyleSheet, SectionList, Text, View, FlatList, Button, AsyncStorage} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class WeeklyScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            days: null,
            compoundData: null

        }
    }

    static navigationOptions= {
        title: "Weekly"
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
          fetch(`http://localhost:3000/api/v1/food/week`, config)
          .then(resp => resp.json())
          .then(json => {
            this.setState({
              compoundData: json.data,
              days: json.day
            })
          })
          }
         
    
          compounds = () => {
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

        return (
            
            <View style={styles.container}>
                <Button
                title="Go to Home"
                onPress={() => this.props.navigation.navigate('Home')}
                />
            <SectionList
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
                    />
            
            </View>
        )
    }
}