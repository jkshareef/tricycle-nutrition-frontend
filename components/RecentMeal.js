import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import { List, Checkbox } from 'react-native-paper';


export default class RecentMeal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
    }




    // componentWillMount() {
    //     console.log(this.props.meals.data)
    // }

    handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

    handleExpanded = () => {
        this.props.expanded
    }

    render() {

        const styles = StyleSheet.create({
           
        })
        
        return(
        this.props.meals.data.map((foodHash, index) => 
        
          <List.Accordion
          key = {index}
          title={Object.keys(foodHash)[0]}
          style={{width: 400, alignItems: "center"}}
          left={props => <List.Icon {...props} icon="restaurant" />}
          expanded={this.state.expanded}
          onPress={this.handlePress}
          
        >
        
          {[].concat.apply([], Object.values(foodHash)).map((compound, idx) => 
            <List.Item
                key= {idx} 
                titleStyle={{fontSize: 28}}
                title={compound.name}
                description={({
                    ellipsizeMode,
                    color: descriptionColor,
                    fontSize,
                  }) => (
                <View>
                    <Text
                    numberOfLines={1}
                    ellipsizeMode={ellipsizeMode}>
                    {compound.amount}/{compound.rdv}{compound.units}
                    </Text>
                    <Text
                    numberOfLines={2}
                    ellipsizeMode={ellipsizeMode}>
                        {compound.description}
                    </Text>
                </View>
                  )}
                />)}
          </List.Accordion>
        )
        )
    }
}