import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import { List } from 'react-native-paper';
import {acceptedList} from '../helpers/acceptedList';
import RecentMealItem from '../components/RecentMealItem'




export default class RecentMeal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
            visible: false,
        }
    }


    handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

    



  

    render() {
      debugger
      const compounds = [].concat.apply([], Object.values(this.props.meals.data))
      .filter(compound => acceptedList.includes(compound.name)).map((compound))

        
        return (
        this.props.meals.data.map((foodHash, index) => 
          <List.Accordion
          key = {index}
          title={Object.keys(foodHash)[0]}
          style={{width: 400, alignItems: "center"}}
          left={props => <List.Icon {...props} icon="restaurant" />}
          expanded={this.state.expanded}
          onPress={this.handlePress}
          >
            <ScrollView>
            {/* {[].concat.apply([], Object.values(foodHash))
            .filter(compound => acceptedList.includes(compound.name))
            .map((compound, idx) => */}
    
            <SectionList
              sections={[
                {title: '', data: {compounds}},
              ]}
              renderItem={({item}) => <RecentMealItem compound = {item}/>}
              renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
              keyExtractor={(item, index) => index}
        />
            <RecentMealItem compound={compound} index={idx}/>)}
            </ScrollView>
          </List.Accordion>
          
        )
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

