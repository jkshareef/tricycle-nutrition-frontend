import React, {Component} from 'react';
import {List} from 'react-native-paper';
import { StyleSheet, Text, View, Button} from 'react-native';


export default class VitaminDailyItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
    }

    _onHandlePress() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    readMore = () => {
        const compound = this.props.compound
                return (
                    <View>
                        <View>  
                            <Text style={{marginTop: 10}}
                                numberOfLines = {2}>
                                {compound.description}
                            </Text>
                        </View>
                        <View>
                            <Button
                            onPress={() => this.setState({
                                expanded : !this.state.expanded
                            })} 
                            title="Show More"/>
                        </View>
                   
                       
                    </View>
                )
            }
                 
        readLess = () => {
            const compound = this.props.compound
            return (
                <View> 
                    <View>
                        <Text style={{marginTop: 10}}
                        numberOfLines = {10}>
                        {compound.description}
                        </Text>
                    </View>
                   
                    <View>
                        <Button 
                        onPress={() => this.setState({
                            expanded: !this.state.expanded
                        })}
                        title="Show Less"/>
                    </View>
                   
                          
                </View>
            )
        }



    render() {
        const index = this.props.index
        const compound = this.props.compound
        return (
            <List.Item
            key = {index}
            title={compound.name}
            description={({
            color: descriptionColor,
            fontSize,
            }) => (
            <View>
      
            <Text
            numberOfLines={1}
            >
            {`${compound.amount}/${compound.rdv}${compound.units} RDV`}
            </Text>
            {this.props.percentProgress(compound)}
            {this.state.expanded? this.readLess() : this.readMore()}
        </View>
        )}
   
        />)
        
    }
}