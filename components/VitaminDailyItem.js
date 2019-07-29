import React, {Component} from 'react';
import {List} from 'react-native-paper';
import { StyleSheet, Text, View, Button} from 'react-native';


export default class VitaminDailyItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
        debugger
    }

    handlePress = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    readMore = () => {
        const compound = this.props.compound[0]
                return (
                    <View>
                            <Text style={{marginTop: 10}}
                                numberOfLines = {2}>
                                {compound.description}
                            </Text>
                            <Button
                            onPress={this.handlePress} 
                            title="Show More"/>
                    </View>
                )
            }
                 
        readLess = () => {
            const compound = this.props.compound[0]
            return (
                <View> 
                        <Text style={{marginTop: 10}}
                        numberOfLines = {10}>
                        {compound.description}
                        </Text>
                        <Button 
                        onPress={this.handlePress}
                        title="Show Less"/>       
                </View>
            )
        }



    render() {
        
        const compound = this.props.compound[0]

        return (
            <View>
                <Text>{compound.name}</Text>
                <Text>{compound.name}/{compound.rdv} RDV</Text>
                {this.props.percentProgress}
                {this.state.expanded? this.readLess() : this.readMore()}
            </View>
            
        )
   
        
        
    }
}

// return (
//     <List.Item
//     key={index}
//     title={compound.name}
//     description={({
//     color: descriptionColor,
//     fontSize,
//     }) => (
//     <View>

//     <Text
//     numberOfLines={1}
//     >
//     {`${compound.amount}/${compound.rdv}${compound.units} RDV`}
//     </Text>
//     {this.props.percentProgress(compound)}
//     {this.state.expanded? this.readLess() : this.readMore()}
// </View>
// )
// />}