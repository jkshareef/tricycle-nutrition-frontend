import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, SectionList} from 'react-native';
import { List } from 'react-native-paper';
import RecentMealItem from './RecentMealItem';
import RecentMealFood from './RecentMealFood'
import {acceptedList} from '../helpers/acceptedList';




export default class RecentMeal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
            visible: false,
        }
    }


    // handlePress = () =>
    // this.setState({
    //   expanded: !this.state.expanded
    // });

    

    // sectionListData = (foodHash) => {
       
    //   return (
    //     [].concat.apply([], Object.values(foodHash)).filter(compound => acceptedList.includes(compound.name))
    //   )
    // } 


  

    render() {

    
        
        return(
        this.props.meals.data?
        this.props.meals.data.map((foodHash, index) => 
          <RecentMealFood index = {index} foodHash = {foodHash}/>
        ):null
        )
    }
}

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


