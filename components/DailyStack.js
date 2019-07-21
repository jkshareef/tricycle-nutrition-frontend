import React, {Component} from 'react';
import {StyleSheet, Text, View, ART} from 'react-native';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import {stack} from 'd3';
import * as d3Array from 'd3-array';


const d3 = {
    scale,
    shape,
    stack
  };





let stack = d3.stack()
.keys(["apples", "bananas", "cherries", "dates"])
.order(d3.stackOrderNone)
.offset(d3.stackOffsetNone);

let series = stack(data);

export default class DailyStack extends Component {
    render() {
        return (
            <Surface width={this.props.width} height={this.props.height}>
                <Group x={x} y={y}> 
                    <Shape
                            d={series}
                            stroke={"#2ca02c"}  // green line
                            strokeWidth={3}     
                        />
                </Group>
            </Surface>

        )
    }
}