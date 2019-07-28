import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native'
import { List, Checkbox, Text, Modal, Portal, Button, Provider } from 'react-native-paper';



export default class RecentMeal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
            visible: false
        }
    }

    
    
    //   _showModal = () => this.setState({ visible: true });
    //   _hideModal = () => this.setState({ visible: false });




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
        // const { visible } = this.state;
        
        
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
                titleStyle={{fontSize: 20}}
                title={compound.name}
                description={({
                    ellipsizeMode,
                    
                  }) => (
                <View>
                    
                    <Text
                    numberOfLines={1}
                    >
                    {`${compound.amount}/${compound.rdv}${compound.units} RDV`}
                    </Text>
                    <Text style={{marginTop: 10}}
                  
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