import React, {Component} from 'react';
import RecentMealItem from './RecentMealItem';
import {List, DataTable} from 'react-native-paper';
import {Text, SectionList, StyleSheet} from 'react-native';
import {acceptedList} from '../helpers/acceptedList'




export default class RecentMealFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
    }

    handlePress = () => {
      this.setState({
        expanded: !this.state.expanded
      })
    }


    render() {
        return (
          <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{fontSize: 8}}>{Object.values(this.props.foodHash)[0][0].food}</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
            <DataTable.Title numeric>RDV</DataTable.Title>
          </DataTable.Header>

           {[].concat.apply([], Object.values(this.props.foodHash)).filter(compound => acceptedList.includes(compound.name)).map((compound, idx) => 
          <RecentMealItem compound={compound}/>)}

          </DataTable>
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