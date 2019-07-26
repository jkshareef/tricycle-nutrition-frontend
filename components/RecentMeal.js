import React, {Component} from 'react';
import { List, Checkbox } from 'react-native-paper';


export default class RecentMeal extends Component {
    constructor(props) {
        super(props)
    }




    // componentWillMount() {
    //     console.log(this.props.meals.data)
    // }

    handlePress = () => {
        this.props.handlePress
    }

    handleExpanded = () => {
        this.props.expanded
    }

    render() {
        
        return(
        Object.values(this.props.meals.data).map((food, index) => 
          <List.Accordion
          key = {index}
          title={food}
          style={{width: 400, alignItems: "center"}}
          left={props => <List.Icon {...props} icon="restaurant" />}
          expanded={true}
          
        >
          {food.map((compound, idx) => 
          <List.Item
            key= {idx} 
            title={compound.name}
            description={`${compound.amount}/${compound.rdv} \n${compound.description}`}
              />)}
          </List.Accordion>
        )
        )
    }
}