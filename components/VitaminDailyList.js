import React, {Component} from 'react';
import VitaminDailyItem from './VitaminDailyItem'

export default class VitaminDailyList extends Component {
    constructor(props) {
        super(props)
    }

    
  
    render() {  
        return (
          this.props.data.map((compound, index) => 
          <VitaminDailyItem index = {index} compound = {compound} 
          percentProgress = {this.props.percentProgress}/> ) 
          
        )
    }
}