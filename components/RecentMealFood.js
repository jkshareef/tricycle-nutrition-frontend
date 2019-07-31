import React, {Component} from 'react';
import RecentMealItem from './RecentMealItem';
import {List} from 'react-native-paper';
import {Text, SectionList, StyleSheet} from 'react-native';
import {acceptedList} from '../helpers/acceptedList';




export default class RecentMealFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
    }
    handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

    sectionListData = (foodHash) => {
       
        return (
          [].concat.apply([], Object.values(foodHash)).filter(compound => acceptedList.includes(compound.name))
        )
      } 

    render() {
        return (
            <List.Accordion
          key = {this.props.index}
          title={[].concat.apply([], Object.values(this.props.foodHash))[0].food}
          style={{width: 400, alignItems: "center"}}
          left={props => <List.Icon {...props} icon="restaurant" />}
          expanded={this.state.expanded}
          onPress={this.handlePress}
          >
            
            {/* {[].concat.apply([], Object.values(foodHash))
            .filter(compound => acceptedList.includes(compound.name))
            .map((compound, idx) => */}
    
            <SectionList
              sections={[
                {title: '', data: this.sectionListData(this.props.foodHash)},
              ]}
              renderItem={({item}) => <RecentMealItem compound = {item}/>}
            //   renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
              keyExtractor={(item, index) => index}
        />
            
            
          </List.Accordion>
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