import React, {Component} from 'react';
import { StyleSheet, ScrollView, SectionList, Text, View, FlatList, AsyncStorage} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {Button} from 'react-native-paper';
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
            <View style={{flex: 1, flexDirection: "row"}}>
              <Progress.Bar borderColor={"black"} borderRadius={10} progress={1} height={15} width={300} color={"green"}/>
              <Button icon="done-all" compact="true" contentStyle={{alignSelf: "flex-end", height: 15, width: 50}}></Button>
            </View>
          )
        } else if (percentage == NaN) {
          return (
            null
          )
        } else if (percentage == Infinity) {
          return (
            null
          )
        } else if (percentage < 0.1) {
          return (
            <View style={{flex: 1, flexDirection: "row"}}>
            <Progress.Bar borderColor={"black"} borderRadius={10} progress={percentage} height={15} width={300} color={"red"}/>
            </View>
          )
        } else if (percentage < 0.9) {
          return (
            <View style={{flex: 1, flexDirection: "row"}}>
            <Progress.Bar borderColor={"black"} borderRadius={10} progress={percentage} height={15} width={300} color={"blue"}/>
            </View>
          )
        } else if (percentage >= 9 && percentage <= 1) {
          return (
            <View style={{flex: 1, flexDirection: "row"}}>
            <Progress.Bar borderColor={"black"} borderRadius={10} progress={percentage} height={15} width={300} color={"green"}/>
            <Button icon="done-all" compact="true" contentStyle={{alignSelf: "flex-end", height: 15, width: 50}}></Button>
          </View>
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
         paddingLeft: 20,
         paddingRight: 20
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
            <ScrollView>
           {this.state.compoundData? 
           <VitaminDailyList data = {this.state.compoundData.total} percentProgress = {this.percentProgress}/>
          : null}
        </ScrollView>
      </View>
      );
    }
  }
  
        
