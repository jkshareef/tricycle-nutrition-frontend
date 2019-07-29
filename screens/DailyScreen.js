import React, {Component} from 'react';
import { StyleSheet, ScrollView, SectionList, Text, View, FlatList, Button, AsyncStorage} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { List, Checkbox } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import VitaminDailyList from '../components/VitaminDailyList'

const NGROK_URL = "https://ecb0c20d.ngrok.io"



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
      fetch(NGROK_URL + '/api/v1/food/day', config)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          compoundData: json,
          days: json.day
        })
      })
      }

      percentProgress = (compound) => {
        const percentage = compound.amount / compound.rdv
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
     

      // compounds = () => {
       
      //     return Object.values(this.state.compoundData.total).map((compound, index) => {
      //       const percentage = compound.amount / compound.rdv
      //       return (
      //       <List.Item
      //       key = {index}
      //       title={compound.name}
            
      //       description={({
      //         ellipsizeMode,
      //         color: descriptionColor,
      //         fontSize,
      //       }) => (
      //     <View>
          
      //         <Text
      //         numberOfLines={1}
      //         >
      //         {`${compound.amount}/${compound.rdv}${compound.units} RDV`}
      //         </Text>
      //         {this.percentProgress(percentage)}
      //         <Text style={{marginTop: 10}}
            
      //         ellipsizeMode={ellipsizeMode}>
      //             {compound.description}
      //         </Text>
              
      //     </View>
      //       )}
       
      //       />)
      
      //        })
      //     }
    

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
            <ScrollView>
           {this.state.compoundData? 
           <VitaminDailyList data = {this.state.compoundData.total} percentProgress = {this.percentProgress}/>
          : null}
          {/* {this.state.compoundData === null?null:this.compounds()} */}
        
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
        </ScrollView>
      </View>
      );
    }
  }
  
        
