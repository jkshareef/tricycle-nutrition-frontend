import React, { Component } from "react";
import { List } from "react-native-paper";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

export default class VitaminItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  componentDidMount() {
    this.graphData();
  }

  handlePress = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  readMore = () => {
    const compound = this.props.compound;
    return (
      <View>
        <Text style={{ marginTop: 10 }} numberOfLines={2}>
          {compound.description}
        </Text>
        <TouchableHighlight style={styles.button} onPress={this.handlePress}>
          <Text> Show More </Text>
        </TouchableHighlight>
      </View>
    );
  };

  readLess = () => {
    const compound = this.props.compound;
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 10 }} numberOfLines={10}>
          {compound.description}
        </Text>
        <TouchableHighlight style={styles.button} onPress={this.handlePress}>
          <Text> Show Less</Text>
        </TouchableHighlight>
      </View>
    );
  };

  capitalize = string => {
    arr = string.split(/\s*(\s|,|=>)\s*/);
    arr[0] = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
    return arr.join(" ");
  };

  graphData = () => {
    if (this.props.time === "week") {
      this.props.graphData({
        Vitamin: this.props.compound.name,
        Percent:
          (this.props.compound.amount.toFixed(2) / this.props.compound.rdv) * 7
      });
    } else if (this.props.time === "day") {
      this.props.graphData({
        Vitamin: this.props.compound.name,
        Percent: this.props.compound.amount.toFixed(2) / this.props.compound.rdv
      });
    }
  };

  render() {
    const compound = this.props.compound;

    return (
      <View>
        <Text style={styles.textHeader}>{this.capitalize(compound.name)}</Text>
        {this.props.time === "week" ? (
          <Text>
            {compound.amount.toFixed(2)}/{compound.rdv * 7}
            {compound.units} RWV
          </Text>
        ) : (
          <Text>
            {compound.amount.toFixed(2)}/{compound.rdv}
            {compound.units} RDV
          </Text>
        )}
        {this.props.percentProgress(compound)}
        {this.state.expanded ? this.readLess() : this.readMore()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 20
  },
  button: {
    alignItems: "flex-end",
    padding: 10
  },
  container: {
    backgroundColor: "#F6F4F3"
  }
});
