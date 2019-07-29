import React, {Component} from 'react';
import { StyleSheet, SectionList, View, Text, FlatList, Button, AsyncStorage} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { ToggleButton} from 'react-native-paper';
import * as Progress from 'react-native-progress';


const NGROK_URL = "https://ecb0c20d.ngrok.io"
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
          fetch(NGROK_URL + '/api/v1/food/week', config)
          .then(resp => resp.json())
          .then(json => {
            this.setState({
              compoundData: json,
              days: json.day
            })
          })
          }
         
    
          compounds = () => {
            result = []
            if (this.state.compoundData !== null) {
              for (let i = 0; i < Object.keys(this.state.compoundData.total).length; i++) {
                result.push({
                  name: this.state.compoundData.total[Object.keys(this.state.compoundData.total)[i]].name, 
                  amount: this.state.compoundData.total[Object.keys(this.state.compoundData.total)[i]].amount,
                  rdv: this.state.compoundData.total[Object.keys(this.state.compoundData.total)[i]].rdv,
                  description: this.state.compoundData.total[Object.keys(this.state.compoundData.total)[i]].description,
                  units: this.state.compoundData.total[Object.keys(this.state.compoundData.total)[i]].units,

                })
                }
                return result
              } else {
                return ["Loading..."]
            }
           }

           percentProgress = (percentage) => {
            if (percentage > 1) {
              return (
                <Progress.Bar progress={1} width={null} color={"green"} />
              )
            } else if (percentage == NaN) {
              return (
                null
              )
            } else if (percentage == Infinity) {
              return (
                null
              )
            } else if (percentage < 0.9) {
              return (
                <Progress.Bar progress={percentage} width={null} color={"yellow"} />
              )
            } else if (percentage >= 9 && percentage <= 1) {
              return (
                <Progress.Bar progress={percentage} width={null} color={"green"} />
              )
            } else {
              return (
                null
              )
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
              // height: 40
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
                        <Text style={styles.subText}>{`${item.amount}/${item.rdv * 7}${item.units} RWV`}</Text>
                        {this.percentProgress(item.amount/(item.rdv *7))}
                        <Text numberOfLines={12} style={styles.subText}>{item.description}</Text>
                    </View>
            }
                
            
            
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                    />
            
            </View>
        )
    }
}