import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {DataTable} from 'react-native-paper';





export default class RecentMealItem extends Component {
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

    renderViewMore = (onPress) => {
        return(
          <Text onPress={onPress}>View more</Text>
        )
      }

      renderViewLess = (onPress) => {
        return(
          <Text onPress={onPress}>View less</Text>
        )
      }


    moreInfo = () => {

    }

    readMore = () => {
        const compound = this.props.compound
        return (
            <View>
                    <Text style={{marginTop: 5, paddingRight: 20}}
                        numberOfLines = {2}>
                        {compound.description}
                    </Text>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.handlePress}
                        >
                        <Text style={{paddingRight: 20}}> Show More </Text>
                    </TouchableHighlight>
            </View>
        )
    }
         
    readLess = () => {
        const compound = this.props.compound
        return (
            <View> 
                <Text style={{marginTop: 5, paddingRight: 20}}
                numberOfLines = {10}>
                {compound.description}
                </Text>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handlePress}
                    >
                    <Text style={{paddingRight: 20}}> Show Less</Text>
                </TouchableHighlight>     
            </View>
        )
}

capitalize = (string) => {
    arr = string.split(/\s*(\s|,|=>)\s*/)
    arr[0] = arr[0].charAt(0).toUpperCase() + arr[0].slice(1)
    return arr.join(' ')
}



    render() {
        const {compound, index} = this.props
        return (

            <DataTable.Row>
                <DataTable.Cell>{compound.name}</DataTable.Cell>
                <DataTable.Cell numeric>{compound.amount}{compound.units}</DataTable.Cell>
                <DataTable.Cell numeric>{compound.rdv}{compound.units}</DataTable.Cell>
          </DataTable.Row>

            // <View>
            //     <Text style={styles.textHeader}>{this.capitalize(compound.name)}</Text>
            //     {this.props.time === "week"?
            //     <Text>
            //     {compound.amount}/{compound.rdv * 7}{compound.units} RWV
            //     </Text>:
            //     <Text>
            //         {compound.amount}/{compound.rdv}{compound.units} RDV
            //     </Text>}
            //     {this.state.expanded? this.readLess() : this.readMore()}
            // </View>
            
                // <List.Item
                //     key= {index} 
                //     titleStyle={{fontSize: 20}}
                //     title={this.capitalize(compound.name)}
                //     description={({
                     
                //       }) => (
                //     <View>
                //         <Text
                //         numberOfLines={1}
                //         >
                //         {`${compound.amount}/${compound.rdv}${compound.units} RDV`}
                //         </Text>
                //         {/* <Text style={{marginTop: 10}}
                      
                //         ellipsizeMode={ellipsizeMode}>
                //             {compound.description}
                //         </Text> */}
                //         {this.state.readLess? this.readMore():this.readLess()}
                //     </View>
                //       )}
                
                //     />
                    )
    }
}

const styles = StyleSheet.create({
    textHeader : {
        fontSize: 20,
    },
    button: {
        alignItems: 'flex-end',
        padding: 10
      }
  })